# Localized Charity & Impact Funding Platform

A decentralized platform built on Sui blockchain that enables transparent, localized charity and impact funding with milestone-based fund releases.

## 🎯 Vision

Transform charitable giving by providing donors with real-time transparency into where their money goes, while enabling local communities to access funding through a trustless, milestone-driven system.

## 🚀 Key Features

- **Stablecoin Fundraising**: USDC-based donations with per-project sub-addresses
- **Milestone-Based Releases**: Funds released in tranches as milestones are confirmed
- **Local Validator DAO**: Multisig governance by on-the-ground validators
- **Real-Time Transparency**: Live tracking of fund allocation and project progress
- **Mobile-First Design**: Accessible to donors and validators worldwide

## 🏗️ Architecture

### Smart Contracts (Move)
- `CharityProject`: Core project management with milestone tracking
- `ValidatorDAO`: Multisig governance for local validators
- `FundManager`: USDC integration and fund distribution
- `ImpactNFT`: Achievement badges and donor recognition

### Frontend (React + TypeScript)
- Modern, responsive UI with real-time updates
- Interactive project maps and milestone tracking
- Wallet integration (Sui Wallet, Ethos, etc.)
- Mobile-optimized experience

### Backend (Node.js + Express)
- API for project management and validation
- Integration with external data sources
- Notification system for milestones and updates

## 📁 Project Structure

```
Charity_ledger/
├── contracts/           # Sui Move smart contracts
├── frontend/           # React frontend application
├── backend/            # Node.js backend API
├── docs/              # Documentation and guides
└── scripts/           # Deployment and utility scripts
```

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+
- Sui CLI
- Git

### Installation

1. **Clone and setup**
```bash
git clone <repository>
cd Charity_ledger
npm install
```

2. **Deploy smart contracts**
```bash
cd contracts
sui move build
sui client publish --gas-budget 10000000
```

3. **Start backend**
```bash
cd backend
npm install
npm run dev
```

4. **Start frontend**
```bash
cd frontend
npm install
npm start
```

## 🌍 Distribution Strategy

### Phase 1: Foundation (Months 1-3)
- Deploy MVP with 2-3 pilot projects
- Partner with local NGOs in target regions
- Build validator network

### Phase 2: Growth (Months 4-6)
- Launch ambassador program
- Integrate with DeFi platforms
- Develop content marketing strategy

### Phase 3: Scale (Months 7-12)
- Expand to new regions
- Launch mobile app
- Establish strategic partnerships

## 📊 Impact Metrics

- **Transparency**: 100% on-chain fund tracking
- **Efficiency**: 90% reduction in administrative overhead
- **Trust**: Real-time milestone validation
- **Accessibility**: Global reach with local validation

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🔗 Links

- [Live Demo](https://charity-ledger.vercel.app)
- [Documentation](https://docs.charity-ledger.com)
- [Discord Community](https://discord.gg/charity-ledger)
- [Twitter](https://twitter.com/charity_ledger) 