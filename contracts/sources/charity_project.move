module charity_ledger::charity_project {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    use sui::table::{Self, Table};
    use sui::vec_set::{Self, VecSet};
    use std::string::{Self, String};
    use std::option::{Self, Option};

    // Error codes
    const E_INSUFFICIENT_FUNDS: u64 = 0;
    const E_PROJECT_NOT_FOUND: u64 = 1;
    const E_MILESTONE_NOT_FOUND: u64 = 2;
    const E_INVALID_VALIDATOR: u64 = 3;
    const E_MILESTONE_NOT_COMPLETED: u64 = 4;
    const E_PROJECT_ALREADY_FUNDED: u64 = 5;
    const E_INVALID_FUNDING_AMOUNT: u64 = 6;

    // Project status
    const STATUS_DRAFT: u8 = 0;
    const STATUS_ACTIVE: u8 = 1;
    const STATUS_FUNDED: u8 = 2;
    const STATUS_COMPLETED: u8 = 3;
    const STATUS_CANCELLED: u8 = 4;

    // Milestone status
    const MILESTONE_PENDING: u8 = 0;
    const MILESTONE_IN_PROGRESS: u8 = 1;
    const MILESTONE_COMPLETED: u8 = 2;
    const MILESTONE_VERIFIED: u8 = 3;

    // Structs
    struct Milestone has store {
        id: u64,
        title: String,
        description: String,
        funding_amount: u64,
        status: u8,
        completion_date: Option<u64>,
        validator_signatures: VecSet<address>,
        required_signatures: u64,
    }

    struct CharityProject has key, store {
        id: UID,
        title: String,
        description: String,
        category: String,
        location: String,
        creator: address,
        total_funding_goal: u64,
        current_funding: u64,
        status: u8,
        created_at: u64,
        updated_at: u64,
        milestones: Table<u64, Milestone>,
        validators: VecSet<address>,
        donors: Table<address, u64>,
        next_milestone_id: u64,
    }

    struct ProjectRegistry has key {
        id: UID,
        projects: Table<address, CharityProject>,
        next_project_id: u64,
    }

    struct ProjectCapability has key, store {
        id: UID,
        project_id: address,
        owner: address,
    }

    // Events
    struct ProjectCreated has copy, drop {
        project_id: address,
        creator: address,
        title: String,
        funding_goal: u64,
    }

    struct MilestoneCreated has copy, drop {
        project_id: address,
        milestone_id: u64,
        title: String,
        funding_amount: u64,
    }

    struct MilestoneCompleted has copy, drop {
        project_id: address,
        milestone_id: u64,
        validator: address,
    }

    struct FundsReleased has copy, drop {
        project_id: address,
        milestone_id: u64,
        amount: u64,
    }

    struct DonationReceived has copy, drop {
        project_id: address,
        donor: address,
        amount: u64,
    }

    // Functions
    public fun init(ctx: &mut TxContext) {
        let registry = ProjectRegistry {
            id: object::new(ctx),
            projects: table::new(ctx),
            next_project_id: 0,
        };
        transfer::share_object(registry);
    }

    public fun create_project(
        registry: &mut ProjectRegistry,
        title: String,
        description: String,
        category: String,
        location: String,
        funding_goal: u64,
        validators: vector<address>,
        ctx: &mut TxContext
    ): ProjectCapability {
        assert!(funding_goal > 0, E_INVALID_FUNDING_AMOUNT);
        
        let project_id = object::new(ctx);
        let project_address = object::uid_to_address(&project_id);
        
        let mut validator_set = vec_set::empty();
        let i = 0;
        while (i < vector::length(&validators)) {
            vec_set::insert(&mut validator_set, *vector::borrow(&validators, i));
            i = i + 1;
        };

        let project = CharityProject {
            id: project_id,
            title,
            description,
            category,
            location,
            creator: tx_context::sender(ctx),
            total_funding_goal: funding_goal,
            current_funding: 0,
            status: STATUS_DRAFT,
            created_at: tx_context::epoch(ctx),
            updated_at: tx_context::epoch(ctx),
            milestones: table::new(ctx),
            validators: validator_set,
            donors: table::new(ctx),
            next_milestone_id: 0,
        };

        table::add(&mut registry.projects, project_address, project);
        registry.next_project_id = registry.next_project_id + 1;

        let capability = ProjectCapability {
            id: object::new(ctx),
            project_id: project_address,
            owner: tx_context::sender(ctx),
        };

        event::emit(ProjectCreated {
            project_id: project_address,
            creator: tx_context::sender(ctx),
            title: string::utf8(b"Project Created"),
            funding_goal,
        });

        capability
    }

    public fun add_milestone(
        capability: &ProjectCapability,
        registry: &mut ProjectRegistry,
        title: String,
        description: String,
        funding_amount: u64,
        required_signatures: u64,
        ctx: &mut TxContext
    ) {
        let project = table::borrow_mut(&mut registry.projects, capability.project_id);
        assert!(project.creator == tx_context::sender(ctx), E_INVALID_VALIDATOR);
        assert!(funding_amount <= project.total_funding_goal, E_INVALID_FUNDING_AMOUNT);

        let milestone = Milestone {
            id: project.next_milestone_id,
            title,
            description,
            funding_amount,
            status: MILESTONE_PENDING,
            completion_date: option::none(),
            validator_signatures: vec_set::empty(),
            required_signatures,
        };

        table::add(&mut project.milestones, project.next_milestone_id, milestone);
        project.next_milestone_id = project.next_milestone_id + 1;
        project.updated_at = tx_context::epoch(ctx);

        event::emit(MilestoneCreated {
            project_id: capability.project_id,
            milestone_id: project.next_milestone_id - 1,
            title: string::utf8(b"Milestone Added"),
            funding_amount,
        });
    }

    public fun donate(
        registry: &mut ProjectRegistry,
        project_id: address,
        payment: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        let project = table::borrow_mut(&mut registry.projects, project_id);
        assert!(project.status == STATUS_ACTIVE, E_PROJECT_NOT_FOUND);
        
        let donation_amount = coin::value(&payment);
        assert!(donation_amount > 0, E_INVALID_FUNDING_AMOUNT);
        assert!(project.current_funding + donation_amount <= project.total_funding_goal, E_INSUFFICIENT_FUNDS);

        let donor = tx_context::sender(ctx);
        let current_donation = if (table::contains(&project.donors, donor)) {
            *table::borrow(&project.donors, donor)
        } else {
            0
        };

        table::add_or_replace(&mut project.donors, donor, current_donation + donation_amount);
        project.current_funding = project.current_funding + donation_amount;
        project.updated_at = tx_context::epoch(ctx);

        // Transfer payment to project balance
        let balance = coin::into_balance(payment);
        // In a real implementation, this would be stored in the project's balance

        event::emit(DonationReceived {
            project_id,
            donor,
            amount: donation_amount,
        });
    }

    public fun complete_milestone(
        registry: &mut ProjectRegistry,
        project_id: address,
        milestone_id: u64,
        ctx: &mut TxContext
    ) {
        let project = table::borrow_mut(&mut registry.projects, project_id);
        assert!(table::contains(&project.milestones, milestone_id), E_MILESTONE_NOT_FOUND);
        
        let milestone = table::borrow_mut(&mut project.milestones, milestone_id);
        assert!(vec_set::contains(&project.validators, &tx_context::sender(ctx)), E_INVALID_VALIDATOR);
        
        if (!vec_set::contains(&milestone.validator_signatures, &tx_context::sender(ctx))) {
            vec_set::insert(&mut milestone.validator_signatures, tx_context::sender(ctx));
        };

        if (vec_set::length(&milestone.validator_signatures) >= milestone.required_signatures) {
            milestone.status = MILESTONE_VERIFIED;
            milestone.completion_date = option::some(tx_context::epoch(ctx));
        } else {
            milestone.status = MILESTONE_COMPLETED;
        };

        project.updated_at = tx_context::epoch(ctx);

        event::emit(MilestoneCompleted {
            project_id,
            milestone_id,
            validator: tx_context::sender(ctx),
        });
    }

    public fun release_funds(
        registry: &mut ProjectRegistry,
        project_id: address,
        milestone_id: u64,
        ctx: &mut TxContext
    ): Coin<SUI> {
        let project = table::borrow_mut(&mut registry.projects, project_id);
        assert!(table::contains(&project.milestones, milestone_id), E_MILESTONE_NOT_FOUND);
        
        let milestone = table::borrow(&project.milestones, milestone_id);
        assert!(milestone.status == MILESTONE_VERIFIED, E_MILESTONE_NOT_COMPLETED);
        assert!(vec_set::contains(&project.validators, &tx_context::sender(ctx)), E_INVALID_VALIDATOR);

        // In a real implementation, this would release funds from the project's balance
        // For now, we'll create a mock coin
        let coin = coin::mint_for_testing(milestone.funding_amount, ctx);

        event::emit(FundsReleased {
            project_id,
            milestone_id,
            amount: milestone.funding_amount,
        });

        coin
    }

    public fun get_project(registry: &ProjectRegistry, project_id: address): &CharityProject {
        assert!(table::contains(&registry.projects, project_id), E_PROJECT_NOT_FOUND);
        table::borrow(&registry.projects, project_id)
    }

    public fun get_milestone(project: &CharityProject, milestone_id: u64): &Milestone {
        assert!(table::contains(&project.milestones, milestone_id), E_MILESTONE_NOT_FOUND);
        table::borrow(&project.milestones, milestone_id)
    }

    public fun activate_project(
        capability: &ProjectCapability,
        registry: &mut ProjectRegistry,
        ctx: &mut TxContext
    ) {
        let project = table::borrow_mut(&mut registry.projects, capability.project_id);
        assert!(project.creator == tx_context::sender(ctx), E_INVALID_VALIDATOR);
        project.status = STATUS_ACTIVE;
        project.updated_at = tx_context::epoch(ctx);
    }
} 