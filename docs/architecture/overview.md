---
sidebar_position: 1
title: Architecture Overview
description: Understanding Bitcoin Knots codebase architecture
---

# Architecture Overview

Bitcoin Knots is built on top of Bitcoin Core, maintaining the same fundamental architecture while adding patches and enhancements.

## Relationship to Bitcoin Core

```
Bitcoin Core (upstream)
        │
        ├── Consensus Layer (unchanged)
        ├── P2P Network Layer (enhancements)
        ├── Wallet (legacy support maintained)
        ├── RPC Interface (extensions)
        └── Qt GUI (improvements)
        │
        v
Bitcoin Knots (patches applied)
```

## Core Components

### Consensus Engine

The consensus engine validates blocks and transactions according to Bitcoin's rules. **This is identical to Bitcoin Core** - Knots makes no consensus changes.

Key files:
- `src/consensus/` - Consensus rules
- `src/validation.cpp` - Block validation
- `src/script/` - Script interpreter

### P2P Network

Handles communication with other nodes:
- `src/net.cpp` - Network connections
- `src/net_processing.cpp` - Message handling
- `src/protocol.cpp` - Protocol messages

Knots enhancements:
- Tor subprocess management
- UPnP restoration
- Node identification (LibreRelay, Utreexo)

### Mempool

Transaction pool management:
- `src/txmempool.cpp` - Mempool implementation
- `src/policy/` - Policy rules

Knots additions:
- Extended policy options
- Transaction filtering
- Fee histogram

### Wallet

Transaction management and key storage:
- `src/wallet/` - Wallet implementation

Knots maintenance:
- Legacy wallet support
- Additional RPC commands
- Codex32 import

### RPC Interface

JSON-RPC API for programmatic access:
- `src/rpc/` - RPC handlers
- `src/rpc/server.cpp` - RPC server

Knots additions:
- New commands
- Enhanced existing commands

### Qt GUI

Graphical user interface:
- `src/qt/` - Qt implementation

Knots improvements:
- Dark mode
- Network monitor
- Mempool statistics

## Build System

Knots uses the same build system as Core:
- CMake (primary, v28+)
- Autotools (legacy)
- Guix for reproducible builds

## See Also

- [Codebase Structure](/architecture/codebase-structure) - Directory layout
- [Patch Management](/architecture/patch-management) - How patches are organized
- [Build System](/architecture/build-system) - Building from source
