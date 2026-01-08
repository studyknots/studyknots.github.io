---
sidebar_position: 1
title: Running a Node
description: Complete guide to running a Bitcoin Knots full node
---

# Running a Node

This guide covers setting up and operating a Bitcoin Knots full node.

## Hardware Requirements

### Minimum

| Resource | Requirement |
|----------|-------------|
| CPU | 2+ cores |
| RAM | 4 GB |
| Storage | 10 GB (pruned) |
| Network | 10+ Mbps |

### Recommended

| Resource | Requirement |
|----------|-------------|
| CPU | 4+ cores |
| RAM | 8+ GB |
| Storage | 1 TB SSD |
| Network | 50+ Mbps |

## Initial Setup

### 1. Install Bitcoin Knots

See [Installation Guide](/getting-started/installation).

### 2. Create Configuration

```ini title="~/.bitcoin/bitcoin.conf"
# Server mode
server=1
daemon=1

# RPC configuration
rpcuser=bitcoinrpc
rpcpassword=CHANGE_THIS_PASSWORD

# Performance
dbcache=4000
maxconnections=125

# Knots-specific
datacarriersize=42
```

### 3. Start the Node

```bash
bitcoind -daemon
```

### 4. Monitor Sync Progress

```bash
bitcoin-cli getblockchaininfo
```

## Operation Modes

### Full Node (Default)

Stores the complete blockchain:

```ini
# No special config needed - this is the default
```

### Pruned Node

Keeps only recent blocks:

```ini title="bitcoin.conf"
prune=10000  # Keep ~10GB of blocks
```

### Archive Node

Store all data including transaction index:

```ini title="bitcoin.conf"
txindex=1
```

## Monitoring

### Check Status

```bash
# Overall status
bitcoin-cli -getinfo

# Blockchain info
bitcoin-cli getblockchaininfo

# Network info
bitcoin-cli getnetworkinfo

# Memory pool
bitcoin-cli getmempoolinfo
```

### View Logs

```bash
tail -f ~/.bitcoin/debug.log
```

## Maintenance

### Backup

```bash
# Stop node first
bitcoin-cli stop

# Backup wallet
cp -r ~/.bitcoin/wallets ~/bitcoin-backup/

# Backup configuration
cp ~/.bitcoin/bitcoin.conf ~/bitcoin-backup/
```

### Updates

1. Stop the node: `bitcoin-cli stop`
2. Download new version
3. Replace binaries
4. Start node: `bitcoind -daemon`

## Troubleshooting

### Node Won't Sync

1. Check internet connection
2. Verify no firewall blocking port 8333
3. Increase `dbcache` for faster sync
4. Check disk space

### High Memory Usage

```ini title="bitcoin.conf"
dbcache=1000
maxmempool=300
```

### Disk Space Running Low

Enable pruning:

```ini title="bitcoin.conf"
prune=5000
```

## See Also

- [Configuration Guide](/guides/configuration) - Detailed configuration
- [Troubleshooting](/guides/troubleshooting) - Common issues
