module charity_ledger::validator_dao {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::table::{Self, Table};
    use sui::vec_set::{Self, VecSet};
    use std::string::{Self, String};
    use std::option::{Self, Option};

    // Error codes
    const E_VALIDATOR_NOT_FOUND: u64 = 0;
    const E_INSUFFICIENT_VOTES: u64 = 1;
    const E_PROPOSAL_NOT_FOUND: u64 = 2;
    const E_ALREADY_VOTED: u64 = 3;
    const E_PROPOSAL_EXPIRED: u64 = 4;
    const E_INVALID_VALIDATOR: u64 = 5;

    // Proposal status
    const STATUS_PENDING: u8 = 0;
    const STATUS_APPROVED: u8 = 1;
    const STATUS_REJECTED: u8 = 2;
    const STATUS_EXECUTED: u8 = 3;

    // Vote types
    const VOTE_YES: u8 = 1;
    const VOTE_NO: u8 = 2;
    const VOTE_ABSTAIN: u8 = 3;

    // Structs
    struct Validator has store {
        address: address,
        name: String,
        location: String,
        reputation_score: u64,
        total_validations: u64,
        is_active: bool,
        joined_at: u64,
    }

    struct Proposal has store {
        id: u64,
        title: String,
        description: String,
        proposer: address,
        target_project: address,
        action_type: u8, // 1: Add Validator, 2: Remove Validator, 3: Update Project, 4: Emergency Action
        action_data: vector<u8>,
        status: u8,
        created_at: u64,
        expires_at: u64,
        yes_votes: u64,
        no_votes: u64,
        abstain_votes: u64,
        votes: Table<address, u8>,
        required_quorum: u64,
    }

    struct ValidatorDAO has key {
        id: UID,
        name: String,
        description: String,
        validators: Table<address, Validator>,
        proposals: Table<u64, Proposal>,
        next_proposal_id: u64,
        total_validators: u64,
        quorum_percentage: u64, // Percentage of validators required for quorum
        proposal_duration: u64, // Duration in epochs
    }

    struct DAOCapability has key, store {
        id: UID,
        dao_id: address,
        owner: address,
    }

    // Events
    struct ValidatorAdded has copy, drop {
        dao_id: address,
        validator: address,
        name: String,
    }

    struct ValidatorRemoved has copy, drop {
        dao_id: address,
        validator: address,
    }

    struct ProposalCreated has copy, drop {
        dao_id: address,
        proposal_id: u64,
        title: String,
        proposer: address,
    }

    struct ProposalVoted has copy, drop {
        dao_id: address,
        proposal_id: u64,
        voter: address,
        vote: u8,
    }

    struct ProposalExecuted has copy, drop {
        dao_id: address,
        proposal_id: u64,
        executor: address,
    }

    // Functions
    public fun init(
        name: String,
        description: String,
        quorum_percentage: u64,
        proposal_duration: u64,
        ctx: &mut TxContext
    ): DAOCapability {
        let dao = ValidatorDAO {
            id: object::new(ctx),
            name,
            description,
            validators: table::new(ctx),
            proposals: table::new(ctx),
            next_proposal_id: 0,
            total_validators: 0,
            quorum_percentage,
            proposal_duration,
        };

        let dao_address = object::uid_to_address(&dao.id);
        transfer::share_object(dao);

        let capability = DAOCapability {
            id: object::new(ctx),
            dao_id: dao_address,
            owner: tx_context::sender(ctx),
        };

        capability
    }

    public fun add_validator(
        dao: &mut ValidatorDAO,
        validator_address: address,
        name: String,
        location: String,
        ctx: &mut TxContext
    ) {
        assert!(!table::contains(&dao.validators, validator_address), E_VALIDATOR_NOT_FOUND);

        let validator = Validator {
            address: validator_address,
            name,
            location,
            reputation_score: 100, // Starting reputation
            total_validations: 0,
            is_active: true,
            joined_at: tx_context::epoch(ctx),
        };

        table::add(&mut dao.validators, validator_address, validator);
        dao.total_validators = dao.total_validators + 1;

        event::emit(ValidatorAdded {
            dao_id: object::uid_to_address(&dao.id),
            validator: validator_address,
            name: string::utf8(b"Validator Added"),
        });
    }

    public fun create_proposal(
        dao: &mut ValidatorDAO,
        title: String,
        description: String,
        target_project: address,
        action_type: u8,
        action_data: vector<u8>,
        ctx: &mut TxContext
    ) {
        assert!(table::contains(&dao.validators, tx_context::sender(ctx)), E_INVALID_VALIDATOR);

        let proposal = Proposal {
            id: dao.next_proposal_id,
            title,
            description,
            proposer: tx_context::sender(ctx),
            target_project,
            action_type,
            action_data,
            status: STATUS_PENDING,
            created_at: tx_context::epoch(ctx),
            expires_at: tx_context::epoch(ctx) + dao.proposal_duration,
            yes_votes: 0,
            no_votes: 0,
            abstain_votes: 0,
            votes: table::new(ctx),
            required_quorum: (dao.total_validators * dao.quorum_percentage) / 100,
        };

        table::add(&mut dao.proposals, dao.next_proposal_id, proposal);
        dao.next_proposal_id = dao.next_proposal_id + 1;

        event::emit(ProposalCreated {
            dao_id: object::uid_to_address(&dao.id),
            proposal_id: dao.next_proposal_id - 1,
            title: string::utf8(b"Proposal Created"),
            proposer: tx_context::sender(ctx),
        });
    }

    public fun vote_on_proposal(
        dao: &mut ValidatorDAO,
        proposal_id: u64,
        vote: u8,
        ctx: &mut TxContext
    ) {
        assert!(table::contains(&dao.validators, tx_context::sender(ctx)), E_INVALID_VALIDATOR);
        assert!(table::contains(&dao.proposals, proposal_id), E_PROPOSAL_NOT_FOUND);

        let proposal = table::borrow_mut(&mut dao.proposals, proposal_id);
        assert!(proposal.status == STATUS_PENDING, E_PROPOSAL_NOT_FOUND);
        assert!(tx_context::epoch(ctx) <= proposal.expires_at, E_PROPOSAL_EXPIRED);
        assert!(!table::contains(&proposal.votes, tx_context::sender(ctx)), E_ALREADY_VOTED);

        // Record the vote
        table::add(&mut proposal.votes, tx_context::sender(ctx), vote);

        // Update vote counts
        if (vote == VOTE_YES) {
            proposal.yes_votes = proposal.yes_votes + 1;
        } else if (vote == VOTE_NO) {
            proposal.no_votes = proposal.no_votes + 1;
        } else if (vote == VOTE_ABSTAIN) {
            proposal.abstain_votes = proposal.abstain_votes + 1;
        };

        // Check if proposal should be approved or rejected
        let total_votes = proposal.yes_votes + proposal.no_votes + proposal.abstain_votes;
        if (total_votes >= proposal.required_quorum) {
            if (proposal.yes_votes > proposal.no_votes) {
                proposal.status = STATUS_APPROVED;
            } else {
                proposal.status = STATUS_REJECTED;
            };
        };

        event::emit(ProposalVoted {
            dao_id: object::uid_to_address(&dao.id),
            proposal_id,
            voter: tx_context::sender(ctx),
            vote,
        });
    }

    public fun execute_proposal(
        dao: &mut ValidatorDAO,
        proposal_id: u64,
        ctx: &mut TxContext
    ) {
        assert!(table::contains(&dao.validators, tx_context::sender(ctx)), E_INVALID_VALIDATOR);
        assert!(table::contains(&dao.proposals, proposal_id), E_PROPOSAL_NOT_FOUND);

        let proposal = table::borrow(&dao.proposals, proposal_id);
        assert!(proposal.status == STATUS_APPROVED, E_PROPOSAL_NOT_FOUND);

        // Execute the proposal based on action_type
        if (proposal.action_type == 1) {
            // Add validator action
            // Implementation would add a new validator
        } else if (proposal.action_type == 2) {
            // Remove validator action
            // Implementation would remove a validator
        } else if (proposal.action_type == 3) {
            // Update project action
            // Implementation would update project parameters
        } else if (proposal.action_type == 4) {
            // Emergency action
            // Implementation would handle emergency situations
        };

        // Mark proposal as executed
        let proposal_mut = table::borrow_mut(&mut dao.proposals, proposal_id);
        proposal_mut.status = STATUS_EXECUTED;

        event::emit(ProposalExecuted {
            dao_id: object::uid_to_address(&dao.id),
            proposal_id,
            executor: tx_context::sender(ctx),
        });
    }

    public fun remove_validator(
        dao: &mut ValidatorDAO,
        validator_address: address,
        ctx: &mut TxContext
    ) {
        assert!(table::contains(&dao.validators, validator_address), E_VALIDATOR_NOT_FOUND);
        
        let validator = table::borrow_mut(&mut dao.validators, validator_address);
        validator.is_active = false;

        dao.total_validators = dao.total_validators - 1;

        event::emit(ValidatorRemoved {
            dao_id: object::uid_to_address(&dao.id),
            validator: validator_address,
        });
    }

    public fun update_validator_reputation(
        dao: &mut ValidatorDAO,
        validator_address: address,
        new_score: u64,
        ctx: &mut TxContext
    ) {
        assert!(table::contains(&dao.validators, validator_address), E_VALIDATOR_NOT_FOUND);
        
        let validator = table::borrow_mut(&mut dao.validators, validator_address);
        validator.reputation_score = new_score;
    }

    public fun increment_validations(
        dao: &mut ValidatorDAO,
        validator_address: address,
        ctx: &mut TxContext
    ) {
        assert!(table::contains(&dao.validators, validator_address), E_VALIDATOR_NOT_FOUND);
        
        let validator = table::borrow_mut(&mut dao.validators, validator_address);
        validator.total_validations = validator.total_validations + 1;
        
        // Increase reputation for successful validations
        validator.reputation_score = validator.reputation_score + 10;
    }

    // View functions
    public fun get_validator(dao: &ValidatorDAO, validator_address: address): &Validator {
        assert!(table::contains(&dao.validators, validator_address), E_VALIDATOR_NOT_FOUND);
        table::borrow(&dao.validators, validator_address)
    }

    public fun get_proposal(dao: &ValidatorDAO, proposal_id: u64): &Proposal {
        assert!(table::contains(&dao.proposals, proposal_id), E_PROPOSAL_NOT_FOUND);
        table::borrow(&dao.proposals, proposal_id)
    }

    public fun is_validator(dao: &ValidatorDAO, address: address): bool {
        table::contains(&dao.validators, address)
    }

    public fun get_active_validators_count(dao: &ValidatorDAO): u64 {
        dao.total_validators
    }
} 