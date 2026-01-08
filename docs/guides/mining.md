---
sidebar_position: 2
title: Mining
description: Mining configuration with Bitcoin Knots
---

# Mining with Bitcoin Knots

Bitcoin Knots includes several mining-related enhancements not available in Bitcoin Core.

## Block Template Configuration

### Block Size Limit

Restored `-blockmaxsize` option:

```ini title="bitcoin.conf"
# Maximum block size in bytes (default: 4000000)
blockmaxsize=750000
```

### Transaction Priority

Knots maintains transaction priority for miners:

```ini title="bitcoin.conf"
# Reserve space for high-priority transactions
blockprioritysize=50000
```

## Getting Block Templates

### Basic Usage

```bash
bitcoin-cli getblocktemplate '{"rules": ["segwit"]}'
```

### Extended Options

Knots enhances `getblocktemplate` with additional options:

```bash
bitcoin-cli getblocktemplate '{
  "rules": ["segwit"],
  "capabilities": ["proposal", "coinbasetxn", "workid"],
  "longpollid": "..."
}'
```

## Policy Configuration for Mining

### Fee Considerations

```ini title="bitcoin.conf"
# Minimum relay fee (affects what enters your mempool)
minrelaytxfee=0.00001

# Block minimum fee rate
blockmintxfee=0.00001
```

### Data Carrier Policy

Control OP_RETURN transactions:

```ini title="bitcoin.conf"
datacarriersize=42
datacarriercost=1.0
```

## Pool Integration

### Stratum Support

Bitcoin Knots can be used as a backend for mining pools that use `getblocktemplate`:

```ini title="bitcoin.conf"
server=1
rpcuser=miner
rpcpassword=SECURE_PASSWORD
rpcallowip=192.168.1.0/24
```

## Solo Mining (Testnet/Regtest)

For testing:

```bash
# Generate blocks (regtest only)
bitcoin-cli generatetoaddress 1 <address>
```

## Performance Optimization

### Memory

```ini title="bitcoin.conf"
# Larger mempool for more transaction selection
maxmempool=1000
```

### Block Assembly

The `mining_avoid_block_copy` patch improves block assembly performance.

## See Also

- [Configuration Guide](/guides/configuration) - Full configuration reference
- [RPC Reference](/reference/rpc) - RPC command documentation
