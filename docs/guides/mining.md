---
sidebar_position: 2
title: Mining
description: Mining configuration with Bitcoin Knots
---

# Mining with Bitcoin Knots

Bitcoin Knots is the node software powering [Ocean](https://ocean.xyz/), the decentralized mining pool co-founded by Luke Dashjr, whose 2023 seed round was led by Jack Dorsey's Block. This guide covers Knots-specific mining features and configuration.

## Why Miners Choose Knots

### Ocean Mining Pool

Ocean launched in 2023 with a mission to decentralize Bitcoin mining by giving miners control over their own block templates. Key facts:

- **Runs Bitcoin Knots** as its node software
- **Filters inscriptions** by default (configurable)
- **Funding**: Jack Dorsey's Block led Ocean's $6.2M seed round (2023)
- **Tether**: announced roughly $500M of investment in its own mining operations, and separately partnered with Ocean, deploying hashrate to the pool
- **Headquarters** in El Salvador (2024)

Dashjr's argument for filtering: "Spam-filtered blocks often have more fees anyway for some reason." The pool allows miners to construct their own templates, reducing reliance on centralized operators.

### Block Template Control

Unlike Bitcoin Core, Knots gives miners fine-grained control over what goes into their blocks:

| Feature | Core | Knots |
|---------|------|-------|
| `-blockmaxsize` | Removed | **Restored** |
| `-blockprioritysize` | Removed | **Restored** |
| Per-call template params | No | **Yes** |
| Inscription filtering | No | **Yes** |

## Block Size Configuration

### Knots Defaults (Conservative)

```ini title="bitcoin.conf"
# Knots defaults - smaller, healthier blocks
blockmaxsize=300000      # 300 KB (Core removed this option)
blockmaxweight=1200000   # 1.2 MWU
```

### Maximum Revenue Settings

```ini title="bitcoin.conf"
# Maximum block size for maximum fees
blockmaxweight=4000000   # 4 MWU (full blocks)
# Note: Remove blockmaxsize when using blockmaxweight
```

:::warning blockmaxsize vs blockmaxweight
`blockmaxweight` is the preferred option since SegWit. Setting `blockmaxsize` to anything other than maximum will reduce your income. If you want full blocks, use only `blockmaxweight=4000000`.
:::

### Reserved Space

```ini title="bitcoin.conf"
# Reserve weight for coinbase transaction
blockreservedweight=8000

# Reserve space for high-priority/low-fee transactions
blockprioritysize=50000
```

## getblocktemplate Enhancements

### Per-Call Parameters (Knots v27.1+)

Knots allows overriding block limits on each `getblocktemplate` call:

```bash
bitcoin-cli getblocktemplate '{
  "rules": ["segwit"],
  "blockmaxsize": 750000,
  "blockmaxweight": 3000000,
  "minfeerate": 5
}'
```

**Parameters:**
- `blockmaxsize` — Override configured block size limit
- `blockmaxweight` — Override configured weight limit
- `minfeerate` — Only include transactions paying at least this fee rate, in sat/vB (default: set by `-blockmintxfee`)

:::note Performance
Setting per-call parameters disables template caching, which may reduce efficiency with multiple applications using `getblocktemplate`.
:::

### Skip Validity Test

For advanced setups using BIP 23 template proposals:

```bash
bitcoin-cli getblocktemplate '{
  "rules": ["segwit"],
  "capabilities": ["proposal", "skip_validity_test"]
}'
```

This skips the internal validity check and disables caching. Only use if you plan to follow up with a template proposal call.

## Transaction Filtering for Mining

### Filter Inscriptions

```ini title="bitcoin.conf"
# Reject inscription/ordinal transactions from mempool
rejectparasites=1

# Limit OP_RETURN data size
datacarriersize=42

# Charge full weight for data (no SegWit discount abuse)
datacarriercost=1.0
```

### Filter Tokens

```ini title="bitcoin.conf"
# Reject BRC-20 and similar token transactions
rejecttokens=1
```

### The Filtering Debate

Critics argue filtering reduces miner income. Dashjr's response:

> "Bitcoin works with the assumption that a majority of miners are honest, not malicious. Besides, spam-filtered blocks often have more fees anyway for some reason."

The choice is yours — Knots provides the options, you decide the policy.

## BIP-110/RDTS Signaling

Miners who want to go beyond relay policy can signal for **BIP-110**, the Reduced Data Temporary Softfork (RDTS). Knots v29.3 ships RDTS enforcement as a strictly opt-in feature:

```ini title="bitcoin.conf"
# Opt in to enforcing the RDTS consensus rules (Knots v29.3+)
consensusrules=rdts
```

GUI users are shown a consent prompt instead, and a separate non-RDTS build is published for those who decline. Ocean has been signaling for BIP-110 since around March 2026, though as of mid-2026 overall network signaling remains well below the 55% activation threshold.

See **[BIP-110: The Reduced Data Soft Fork](/guides/bip-110)** for the full rules, activation timeline, and risks before opting in.

## Fee Configuration

```ini title="bitcoin.conf"
# Minimum fee for relay (affects mempool)
minrelaytxfee=0.00001

# Minimum fee for block inclusion
blockmintxfee=0.00001

# Sigops limits
bytespersigop=20
bytespersigopstrict=20
maxtxlegacysigops=2500
```

## Pool Backend Setup

### RPC Configuration

```ini title="bitcoin.conf"
# Enable RPC server
server=1

# Authentication
rpcuser=miner
rpcpassword=SECURE_RANDOM_PASSWORD

# Allow pool server access
rpcbind=0.0.0.0
rpcallowip=192.168.1.0/24

# Increase connection limits for pool
rpcthreads=16
rpcworkqueue=64
```

### Memory Optimization

For pools that need fast block assembly:

```ini title="bitcoin.conf"
# Large mempool for more transaction selection
maxmempool=1000

# More database cache
dbcache=4096

# Keep entire UTXO set in memory (if RAM permits)
# Requires significant RAM but speeds up block creation
```

## Mining-Specific RPC Commands

| Command | Description |
|---------|-------------|
| `getblocktemplate` | Get block template (enhanced in Knots) |
| `submitblock` | Submit solved block |
| `getmininginfo` | Mining statistics |
| `prioritisetransaction` | Adjust transaction priority |
| `getblocklocations` | Block file locations (Knots) |

## Example Configurations

### Ocean-Style (Filtered)

```ini title="bitcoin.conf"
# Ocean-style configuration
server=1
rejectparasites=1
rejecttokens=1
datacarriersize=42
datacarriercost=1.0
blockmaxweight=3996000
blockreservedweight=4000
```

### Maximum Revenue (Unfiltered)

```ini title="bitcoin.conf"
# Maximum revenue configuration
server=1
corepolicy=1
blockmaxweight=4000000
maxmempool=1000
```

### Test Mining (Regtest)

For experimenting with block templates without real hashrate, use regtest — a private test network where you can generate blocks on demand:

```ini title="bitcoin.conf"
# Regtest mining sandbox
regtest=1
server=1
```

```bash
# Create a wallet and generate test blocks to your own address
bitcoin-cli -regtest createwallet "test"
bitcoin-cli -regtest generatetoaddress 101 $(bitcoin-cli -regtest getnewaddress)
```

:::note No built-in CPU mining
The old `gen=1` internal miner was removed from Bitcoin long ago. On mainnet, blocks are found by external mining hardware pointed at your node (directly or via a pool); `generatetoaddress` only works on regtest and similar test networks.
:::

## Performance Patches

Knots includes mining performance optimizations:

- **`mining_avoid_block_copy`** — Reduces memory copies during block assembly
- **`gbt_rpc_options`** — Per-call template customization
- **`mining_priority`** — Transaction priority support

## See Also

- [Ocean Mining Pool](https://ocean.xyz/) — Production pool running Knots
- [Configuration Options](/reference/configuration-options) — All mining options
- [The OP_RETURN Controversy](/guides/op-return-controversy) — Why filtering matters
- [Transaction Filtering](/patches/policy/transaction-filtering) — Filtering details
