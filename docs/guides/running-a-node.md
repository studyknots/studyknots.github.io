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
| Storage | ~25 GB (pruned) |
| Network | 10+ Mbps |

:::note Pruned node footprint
A pruned node's real disk usage is more than just the retained blocks: the chainstate (UTXO database) alone is around 12 GB as of mid-2026, plus indexes and undo data. Budget roughly 20-25 GB even with aggressive pruning. An unpruned node needs on the order of 700 GB for the full blockchain.
:::

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

# RPC configuration (only needed for remote clients — see note below)
#rpcauth=<userpw generated with share/rpcauth/rpcauth.py>

# Performance
maxconnections=125

# Knots-specific (traditional Knots default; current releases
# temporarily default to 83)
datacarriersize=42
```

:::tip Prefer cookie auth or rpcauth
If you set no RPC credentials, bitcoind writes a random `.cookie` file to the data directory that local `bitcoin-cli` picks up automatically — this is the safest option for local use. For remote clients, use `rpcauth` (or Knots' `rpcauthfile`) rather than plaintext `rpcuser`/`rpcpassword` in `bitcoin.conf`.
:::

:::note dbcache
Since Knots v29.3, leaving `dbcache` unset auto-scales the database cache to your system memory (between 100 MiB and 2 GiB). Setting a large value manually (e.g. `dbcache=4000` and up) is only worthwhile to speed up the initial block download on machines with plenty of RAM — well beyond the 4 GB minimum — and can be removed once synced.
:::

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
3. Verify the release signatures and checksums before installing — see [Verify Downloads](/getting-started/installation#verify-downloads)
4. Replace binaries
5. Start node: `bitcoind -daemon`

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
