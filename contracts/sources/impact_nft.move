module charity_ledger::impact_nft {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::table::{Self, Table};
    use sui::url::{Self, Url};
    use std::string::{Self, String};
    use std::option::{Self, Option};

    // Error codes
    const E_INSUFFICIENT_BALANCE: u64 = 0;
    const E_INVALID_TIER: u64 = 1;
    const E_NFT_NOT_FOUND: u64 = 2;
    const E_ALREADY_CLAIMED: u64 = 3;

    // NFT Tiers
    const TIER_BRONZE: u8 = 1;
    const TIER_SILVER: u8 = 2;
    const TIER_GOLD: u8 = 3;
    const TIER_PLATINUM: u8 = 4;
    const TIER_DIAMOND: u8 = 5;

    // Achievement types
    const ACHIEVEMENT_FIRST_DONATION: u8 = 1;
    const ACHIEVEMENT_MILESTONE_COMPLETER: u8 = 2;
    const ACHIEVEMENT_PROJECT_FINISHER: u8 = 3;
    const ACHIEVEMENT_VALIDATOR: u8 = 4;
    const ACHIEVEMENT_REFERRAL_MASTER: u8 = 5;

    // Structs
    struct ImpactNFT has key, store {
        id: UID,
        owner: address,
        name: String,
        description: String,
        tier: u8,
        achievement_type: u8,
        project_id: address,
        minted_at: u64,
        image_url: Url,
        metadata: Table<String, String>,
    }

    struct NFTCollection has key {
        id: UID,
        name: String,
        description: String,
        total_minted: u64,
        nfts: Table<address, ImpactNFT>,
    }

    struct DonorProfile has key, store {
        id: UID,
        address: address,
        total_donated: u64,
        projects_supported: u64,
        milestones_completed: u64,
        reputation_score: u64,
        nfts_owned: u64,
        achievements: Table<u8, bool>,
    }

    struct AchievementConfig has store {
        tier: u8,
        name: String,
        description: String,
        required_amount: u64,
        required_projects: u64,
        required_milestones: u64,
        image_url: Url,
    }

    // Events
    struct NFTMinted has copy, drop {
        nft_id: address,
        owner: address,
        name: String,
        tier: u8,
        achievement_type: u8,
    }

    struct AchievementUnlocked has copy, drop {
        donor: address,
        achievement_type: u8,
        tier: u8,
        project_id: address,
    }

    struct DonorProfileUpdated has copy, drop {
        donor: address,
        total_donated: u64,
        reputation_score: u64,
    }

    // Functions
    public fun init(ctx: &mut TxContext) {
        let collection = NFTCollection {
            id: object::new(ctx),
            name: string::utf8(b"Charity Ledger Impact NFTs"),
            description: string::utf8(b"Recognition NFTs for charitable contributions"),
            total_minted: 0,
            nfts: table::new(ctx),
        };
        transfer::share_object(collection);
    }

    public fun create_donor_profile(
        address: address,
        ctx: &mut TxContext
    ): DonorProfile {
        let profile = DonorProfile {
            id: object::new(ctx),
            address,
            total_donated: 0,
            projects_supported: 0,
            milestones_completed: 0,
            reputation_score: 0,
            nfts_owned: 0,
            achievements: table::new(ctx),
        };
        profile
    }

    public fun mint_achievement_nft(
        collection: &mut NFTCollection,
        profile: &mut DonorProfile,
        name: String,
        description: String,
        tier: u8,
        achievement_type: u8,
        project_id: address,
        image_url: Url,
        ctx: &mut TxContext
    ): ImpactNFT {
        let nft_id = object::new(ctx);
        let nft_address = object::uid_to_address(&nft_id);

        let nft = ImpactNFT {
            id: nft_id,
            owner: profile.address,
            name,
            description,
            tier,
            achievement_type,
            project_id,
            minted_at: tx_context::epoch(ctx),
            image_url,
            metadata: table::new(ctx),
        };

        table::add(&mut collection.nfts, nft_address, nft);
        collection.total_minted = collection.total_minted + 1;
        profile.nfts_owned = profile.nfts_owned + 1;

        // Mark achievement as unlocked
        table::add(&mut profile.achievements, achievement_type, true);

        let nft_ref = table::borrow(&collection.nfts, nft_address);
        let nft_copy = ImpactNFT {
            id: object::new(ctx),
            owner: nft_ref.owner,
            name: nft_ref.name,
            description: nft_ref.description,
            tier: nft_ref.tier,
            achievement_type: nft_ref.achievement_type,
            project_id: nft_ref.project_id,
            minted_at: nft_ref.minted_at,
            image_url: nft_ref.image_url,
            metadata: table::new(ctx),
        };

        event::emit(NFTMinted {
            nft_id: nft_address,
            owner: profile.address,
            name: string::utf8(b"NFT Minted"),
            tier,
            achievement_type,
        });

        event::emit(AchievementUnlocked {
            donor: profile.address,
            achievement_type,
            tier,
            project_id,
        });

        nft_copy
    }

    public fun update_donor_stats(
        profile: &mut DonorProfile,
        donation_amount: u64,
        project_id: address,
        ctx: &mut TxContext
    ) {
        profile.total_donated = profile.total_donated + donation_amount;
        profile.projects_supported = profile.projects_supported + 1;
        
        // Calculate reputation based on donation amount
        let reputation_gain = donation_amount / 1000; // 1 reputation per 1000 units
        profile.reputation_score = profile.reputation_score + reputation_gain;

        event::emit(DonorProfileUpdated {
            donor: profile.address,
            total_donated: profile.total_donated,
            reputation_score: profile.reputation_score,
        });
    }

    public fun complete_milestone_achievement(
        profile: &mut DonorProfile,
        milestone_id: u64,
        ctx: &mut TxContext
    ) {
        profile.milestones_completed = profile.milestones_completed + 1;
        profile.reputation_score = profile.reputation_score + 50; // Bonus for milestone completion

        event::emit(DonorProfileUpdated {
            donor: profile.address,
            total_donated: profile.total_donated,
            reputation_score: profile.reputation_score,
        });
    }

    public fun get_achievement_tier(total_donated: u64): u8 {
        if (total_donated >= 100000) {
            TIER_DIAMOND
        } else if (total_donated >= 50000) {
            TIER_PLATINUM
        } else if (total_donated >= 25000) {
            TIER_GOLD
        } else if (total_donated >= 10000) {
            TIER_SILVER
        } else if (total_donated >= 1000) {
            TIER_BRONZE
        } else {
            0
        }
    }

    public fun check_achievement_eligibility(
        profile: &DonorProfile,
        achievement_type: u8,
        required_amount: u64,
        required_projects: u64,
        required_milestones: u64
    ): bool {
        if (table::contains(&profile.achievements, achievement_type)) {
            false // Already achieved
        } else if (achievement_type == ACHIEVEMENT_FIRST_DONATION) {
            profile.total_donated > 0
        } else if (achievement_type == ACHIEVEMENT_MILESTONE_COMPLETER) {
            profile.milestones_completed >= required_milestones
        } else if (achievement_type == ACHIEVEMENT_PROJECT_FINISHER) {
            profile.projects_supported >= required_projects
        } else if (achievement_type == ACHIEVEMENT_VALIDATOR) {
            profile.reputation_score >= 1000
        } else if (achievement_type == ACHIEVEMENT_REFERRAL_MASTER) {
            profile.nfts_owned >= 5
        } else {
            false
        }
    }

    public fun add_nft_metadata(
        nft: &mut ImpactNFT,
        key: String,
        value: String,
        ctx: &mut TxContext
    ) {
        table::add(&mut nft.metadata, key, value);
    }

    public fun transfer_nft(
        nft: ImpactNFT,
        new_owner: address,
        ctx: &mut TxContext
    ): ImpactNFT {
        let ImpactNFT { id, owner: _, name, description, tier, achievement_type, project_id, minted_at, image_url, metadata } = nft;
        
        let new_nft = ImpactNFT {
            id: object::new(ctx),
            owner: new_owner,
            name,
            description,
            tier,
            achievement_type,
            project_id,
            minted_at,
            image_url,
            metadata,
        };
        
        object::delete(id);
        new_nft
    }

    // View functions
    public fun get_nft(collection: &NFTCollection, nft_id: address): &ImpactNFT {
        assert!(table::contains(&collection.nfts, nft_id), E_NFT_NOT_FOUND);
        table::borrow(&collection.nfts, nft_id)
    }

    public fun get_donor_profile(profile: &DonorProfile): &DonorProfile {
        profile
    }

    public fun has_achievement(profile: &DonorProfile, achievement_type: u8): bool {
        table::contains(&profile.achievements, achievement_type)
    }

    public fun get_collection_stats(collection: &NFTCollection): (u64, String, String) {
        (collection.total_minted, collection.name, collection.description)
    }

    public fun get_nft_metadata(nft: &ImpactNFT, key: String): Option<String> {
        if (table::contains(&nft.metadata, key)) {
            option::some(*table::borrow(&nft.metadata, key))
        } else {
            option::none()
        }
    }
} 