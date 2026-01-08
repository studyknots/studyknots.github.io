---
sidebar_position: 1
title: RPC Reference
description: Bitcoin Knots RPC command reference
---

# RPC Reference

Bitcoin Knots includes all Bitcoin Core RPC commands plus additional Knots-specific commands.

## Blockchain

| Command | Description |
|---------|-------------|
| `getblockchaininfo` | Blockchain state info |
| `getblock` | Get block data |
| `getblockhash` | Get block hash by height |
| `getblockcount` | Current block height |
| `getblocklocations` | Block file locations (Knots) |
| `getblockfileinfo` | Block file details (Knots) |

## Mempool

| Command | Description |
|---------|-------------|
| `getmempoolinfo` | Mempool statistics (enhanced in Knots) |
| `getrawmempool` | List mempool transactions |
| `listmempooltxs` | List mempool txs (Knots) |
| `getmempoolentry` | Mempool entry details |

## Network

| Command | Description |
|---------|-------------|
| `getnetworkinfo` | Network state |
| `getpeerinfo` | Connected peers (enhanced) |
| `addnode` | Add peer |
| `disconnectnode` | Disconnect peer |
| `getrpcwhitelist` | RPC whitelist info (Knots) |

## Wallet

| Command | Description |
|---------|-------------|
| `createwallet` | Create wallet |
| `loadwallet` | Load wallet |
| `getnewaddress` | Generate address |
| `getbalance` | Wallet balance |
| `sendtoaddress` | Send bitcoin |
| `sweepprivkeys` | Sweep private keys (Knots) |
| `dumpmasterprivkey` | Dump master key (Knots) |

## Mining

| Command | Description |
|---------|-------------|
| `getblocktemplate` | Block template (enhanced) |
| `getmininginfo` | Mining info |

## Fee Estimation

| Command | Description |
|---------|-------------|
| `estimatesmartfee` | Fee estimation |
| `savefeeestimates` | Save estimates (Knots) |

## Utility

| Command | Description |
|---------|-------------|
| `getgeneralinfo` | General node info (Knots) |
| `validateaddress` | Validate address |
| `signmessage` | Sign message (BIP-322 enhanced) |
| `verifymessage` | Verify message (multi-format) |

## Getting Help

List all commands:
```bash
bitcoin-cli help
```

Get help for a command:
```bash
bitcoin-cli help getblockchaininfo
```

## See Also

- [New RPC Commands](/patches/rpc/new-commands) - Knots additions
- [Enhanced Commands](/patches/rpc/enhanced-commands) - Modified commands
