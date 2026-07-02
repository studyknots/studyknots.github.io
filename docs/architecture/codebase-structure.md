---
sidebar_position: 2
title: Codebase Structure
description: Directory layout and code organization
---

# Codebase Structure

The Bitcoin Knots codebase follows the same structure as Bitcoin Core.

## Top-Level Directories

```
bitcoin/
├── src/                 # Main source code
├── doc/                 # Documentation
├── test/                # Test framework
├── contrib/             # Contributed scripts and configs
├── depends/             # Dependency builder
├── share/               # Shared resources
└── ci/                  # Continuous integration
```

## Source Code (`src/`)

```
src/
├── common/              # Shared code between node, wallet, and tools
├── consensus/           # Consensus-critical code
├── crypto/              # Cryptographic primitives
├── index/               # Block and tx indexes
├── init/                # Initialization contexts
├── interfaces/          # Interface definitions
├── ipc/                 # Inter-process communication
├── kernel/              # libbitcoinkernel
├── node/                # Node-specific code
├── policy/              # Mempool policy
├── primitives/          # Basic data structures
├── rpc/                 # RPC handlers
├── script/              # Script interpreter
├── secp256k1/           # Elliptic-curve cryptography library (ECDSA and Schnorr)
├── support/             # Support utilities
├── univalue/            # JSON library
├── util/                # Utility functions
├── wallet/              # Wallet implementation
├── qt/                  # Qt GUI
├── bench/               # Benchmarks
└── test/                # Unit tests
```

## Key Files

| File | Purpose |
|------|---------|
| `src/bitcoind.cpp` | Daemon entry point |
| `src/init.cpp` | Initialization logic |
| `src/validation.cpp` | Block/tx validation |
| `src/net.cpp` | Network connections |
| `src/txmempool.cpp` | Mempool management |
| `src/rpc/server.cpp` | RPC server |

## Knots-Specific Changes

Knots patches are distributed throughout the codebase. To find Knots-specific code:

```bash
# Search for Knots-related changes
git log --oneline --grep="knots" | head -20

# Find files modified in a patch
git show --stat <commit-hash>
```

## Configuration Files

```
~/.bitcoin/
├── bitcoin.conf         # Main configuration
├── debug.log            # Debug output
├── wallets/             # Wallet directory
│   └── <name>/          # One subdirectory per wallet
│       └── wallet.dat   # Wallet database
├── blocks/              # Block data
├── chainstate/          # UTXO set
└── peers.dat            # Known peers
```

## See Also

- [Architecture Overview](/architecture/overview) - High-level architecture
- [Build System](/architecture/build-system) - Building the code
