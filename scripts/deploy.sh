#!/bin/bash

# Charity Ledger Deployment Script
# This script helps deploy the complete Charity Ledger platform

set -e

echo "🚀 Charity Ledger Deployment Script"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_dependencies() {
    print_status "Checking dependencies..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    # Check Sui CLI
    if ! command -v sui &> /dev/null; then
        print_warning "Sui CLI is not installed. Installing now..."
        curl -fsSL https://raw.githubusercontent.com/MystenLabs/sui/main/docs/scripts/install-sui.sh | sh
    fi
    
    # Check Git
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install Git first."
        exit 1
    fi
    
    print_success "All dependencies are installed!"
}

# Setup environment
setup_environment() {
    print_status "Setting up environment..."
    
    # Create .env files if they don't exist
    if [ ! -f "backend/.env" ]; then
        cat > backend/.env << EOF
# Backend Environment Variables
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/charity_ledger

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Cloud Storage (optional)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Redis (optional)
REDIS_URL=redis://localhost:6379

# Sui Network
SUI_NETWORK=testnet
SUI_RPC_URL=https://fullnode.testnet.sui.io:443
EOF
        print_success "Created backend/.env file"
    fi
    
    if [ ! -f "frontend/.env" ]; then
        cat > frontend/.env << EOF
# Frontend Environment Variables
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_SUI_NETWORK=testnet
REACT_APP_SUI_RPC_URL=https://fullnode.testnet.sui.io:443
REACT_APP_CHAIN_ID=0x1
EOF
        print_success "Created frontend/.env file"
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Backend dependencies
    print_status "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
    
    # Frontend dependencies
    print_status "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    
    print_success "All dependencies installed!"
}

# Deploy smart contracts
deploy_contracts() {
    print_status "Deploying smart contracts to Sui testnet..."
    
    cd contracts
    
    # Check if Sui is configured
    if ! sui client active-address &> /dev/null; then
        print_warning "Sui client not configured. Please run 'sui client new-address ed25519' first."
        print_warning "Then fund your address with testnet SUI from the faucet."
        cd ..
        return 1
    fi
    
    # Build contracts
    print_status "Building Move contracts..."
    sui move build
    
    # Deploy contracts
    print_status "Deploying contracts..."
    sui client publish --gas-budget 10000000
    
    cd ..
    
    print_success "Smart contracts deployed successfully!"
}

# Start development servers
start_development() {
    print_status "Starting development servers..."
    
    # Start backend
    print_status "Starting backend server..."
    cd backend
    npm run dev &
    BACKEND_PID=$!
    cd ..
    
    # Wait a moment for backend to start
    sleep 3
    
    # Start frontend
    print_status "Starting frontend server..."
    cd frontend
    npm start &
    FRONTEND_PID=$!
    cd ..
    
    print_success "Development servers started!"
    print_status "Backend: http://localhost:3001"
    print_status "Frontend: http://localhost:3000"
    print_status "Health check: http://localhost:3001/health"
    
    # Save PIDs for cleanup
    echo $BACKEND_PID > .backend.pid
    echo $FRONTEND_PID > .frontend.pid
    
    print_warning "Press Ctrl+C to stop all servers"
    
    # Wait for interrupt
    trap cleanup EXIT
    wait
}

# Cleanup function
cleanup() {
    print_status "Cleaning up..."
    
    if [ -f ".backend.pid" ]; then
        kill $(cat .backend.pid) 2>/dev/null || true
        rm .backend.pid
    fi
    
    if [ -f ".frontend.pid" ]; then
        kill $(cat .frontend.pid) 2>/dev/null || true
        rm .frontend.pid
    fi
    
    print_success "Cleanup complete!"
}

# Production deployment
deploy_production() {
    print_status "Production deployment..."
    
    # Build frontend
    print_status "Building frontend for production..."
    cd frontend
    npm run build
    cd ..
    
    # Start production backend
    print_status "Starting production backend..."
    cd backend
    npm start
    cd ..
}

# Show help
show_help() {
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  setup     - Initial setup (check dependencies, create env files)"
    echo "  install   - Install all dependencies"
    echo "  deploy    - Deploy smart contracts to testnet"
    echo "  dev       - Start development servers"
    echo "  prod      - Deploy to production"
    echo "  help      - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 setup     # Initial setup"
    echo "  $0 install   # Install dependencies"
    echo "  $0 deploy    # Deploy contracts"
    echo "  $0 dev       # Start development"
}

# Main script logic
case "${1:-help}" in
    "setup")
        check_dependencies
        setup_environment
        print_success "Setup complete! Run '$0 install' to install dependencies."
        ;;
    "install")
        install_dependencies
        ;;
    "deploy")
        deploy_contracts
        ;;
    "dev")
        start_development
        ;;
    "prod")
        deploy_production
        ;;
    "help"|*)
        show_help
        ;;
esac 