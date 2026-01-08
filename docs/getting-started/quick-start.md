---
sidebar_position: 3
title: Quick Start
description: Get your Bitcoin Knots node running in minutes
---

# Quick Start

Get your Bitcoin Knots node up and running in just a few minutes.

## Starting the Node

### GUI Mode (Bitcoin-Qt)

Simply run the Qt application:

```bash
# Linux
bitcoin-qt

# macOS
open /Applications/Bitcoin-Knots/bitcoin-qt.app

# Windows
# Use the Start Menu shortcut or run bitcoin-qt.exe
```

### Daemon Mode

For headless servers, run the daemon:

```bash
# Start the daemon
bitcoind -daemon

# Check status
bitcoin-cli getblockchaininfo
```

## Initial Block Download (IBD)

On first run, your node will download and verify the entire blockchain. This takes:

- **Time**: 6-24 hours depending on hardware and connection
- **Disk Space**: ~600 GB for full node, ~10 GB for pruned node
- **Bandwidth**: ~600 GB download

### Pruned Mode (Recommended for Limited Storage)

```bash
# Run with pruning enabled (keep only last 10GB of blocks)
bitcoind -prune=10000
```

### Monitor Progress

```bash
# Check sync progress
bitcoin-cli getblockchaininfo | grep -E "(blocks|headers|verificationprogress)"
```

## Basic Configuration

Create a configuration file at `~/.bitcoin/bitcoin.conf`:

```ini title="~/.bitcoin/bitcoin.conf"
# Network
server=1
listen=1

# RPC access
rpcuser=youruser
rpcpassword=yourpassword

# Performance
dbcache=4000
maxconnections=40

# Knots-specific: data carrier limit
datacarriersize=42
```

## Common Operations

### Check Node Status

```bash
# Blockchain info
bitcoin-cli getblockchaininfo

# Network info
bitcoin-cli getnetworkinfo

# Peer connections
bitcoin-cli getpeerinfo | jq '.[].addr'
```

### Wallet Operations

```bash
# Create a new wallet
bitcoin-cli createwallet "mywallet"

# Get a receiving address
bitcoin-cli getnewaddress

# Check balance
bitcoin-cli getbalance
```

### Stop the Node

```bash
# Graceful shutdown
bitcoin-cli stop
```

## Knots-Specific Quick Commands

### Check Mempool with Extended Info

```bash
# List mempool transactions
bitcoin-cli getrawmempool true | jq 'to_entries | .[0:5]'

# Get mempool info
bitcoin-cli getmempoolinfo
```

### Fee Estimation

```bash
# Get fee histogram (Knots feature)
bitcoin-cli getmempoolinfo
```

## Troubleshooting

### Node Won't Start

```bash
# Check for existing process
pgrep -a bitcoind

# Check logs
tail -f ~/.bitcoin/debug.log
```

### Slow Sync

1. Increase `dbcache` in config (use 50-75% of available RAM)
2. Ensure SSD storage
3. Check network connection

### RPC Connection Refused

Ensure `server=1` is in your config and the daemon is running:

```bash
bitcoin-cli -getinfo
```

## Next Steps

- [Configuration Options](/reference/configuration-options) - Full configuration reference
- [Differences from Core](/getting-started/differences-from-core) - Knots-specific features
- [Patches Overview](/patches/overview) - Explore available patches
