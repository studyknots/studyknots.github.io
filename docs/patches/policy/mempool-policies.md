---
sidebar_position: 1
title: Mempool Policies
description: Control what transactions your node relays and accepts
---

# Mempool Policies

Bitcoin Knots provides extensive control over what transactions your node accepts into its mempool and relays to other nodes.

## Why Policy Matters

Your node's mempool policy determines:
- What transactions you relay to peers
- What transactions miners see for block inclusion
- Your node's resource usage (CPU, memory, bandwidth)

:::info Policy vs Consensus
Policy rules are **local to your node**. They don't affect consensus validation. Even if you reject a transaction from your mempool, it can still be mined in a block and your node will accept that block.
:::

## Transaction Filtering

### Reject Tokens (Runes, Stamps)

Filter transactions related to token protocols (off by default):

```ini title="bitcoin.conf"
rejecttokens=1
```

This filters Runes transactions (OP_RETURN outputs starting with OP_13) and OLGA/Bitcoin Stamps data encoding. Note that BRC-20 tokens live in witness inscriptions and are not matched by this option — they are constrained by the data carrier limits instead.

### Reject Parasites (CAT21)

Filter CAT21 spam transactions (on by default):

```ini title="bitcoin.conf"
rejectparasites=1
```

Note: This option specifically targets CAT21 spam, not inscriptions or ordinals in general.

### Combined Filtering

For maximum filtering:

```ini title="bitcoin.conf"
rejecttokens=1
rejectparasites=1
datacarriersize=42
```

## Data Carrier (OP_RETURN)

### Size Limit

Control the maximum size of OP_RETURN outputs:

```ini title="bitcoin.conf"
# Bitcoin Core default: 83 bytes through v29 (80 bytes of data
# plus overhead); raised to 100,000 bytes in Core v30
# Knots default: 83 bytes (historically 42; raised in 29.2)
# Recommended for filtering: 42 bytes

datacarriersize=42
```

### Data Carrier Cost

Apply a weight multiplier to OP_RETURN data:

```ini title="bitcoin.conf"
# Multiplier for data carrier weight calculation
# Higher values = more "expensive" to include data
datacarriercost=1.0
```

## Dust Policies

### Dynamic Dust Threshold

Enable dynamic dust calculation based on fee rates:

```ini title="bitcoin.conf"
dustdynamic=1
```

This adjusts the dust threshold based on current fee conditions rather than using a fixed value.

### Custom Dust Limit

Set the fee rate used to calculate the dust threshold:

```ini title="bitcoin.conf"
# Fee rate in BTC per kvB (0.00003 = 3000 sat/kvB, the default)
dustrelayfee=0.00003
```

## Sigops Policies

### Bytes Per Sigop

Control the ratio of transaction size to signature operations:

```ini title="bitcoin.conf"
bytespersigop=20
```

### Strict Sigops Enforcement

Set the minimum bytes per sigop in transactions relayed and mined (a Knots-only option; Core has only `bytespersigop`):

```ini title="bitcoin.conf"
# Minimum bytes per sigop (default: 20)
bytespersigopstrict=20
```

## Script Policies

### Maximum Script Size

Limit script sizes beyond consensus limits:

```ini title="bitcoin.conf"
maxscriptsize=10000
```

### Bare Pubkey Outputs

Control bare pubkey (P2PK) output acceptance:

```ini title="bitcoin.conf"
permitbarepubkey=0
```

## RBF Policies

### RBF Mode Control

Configure Replace-By-Fee behavior:

```ini title="bitcoin.conf"
# Boolean: full RBF on (1, Knots default) or off (0)
mempoolfullrbf=1

# Knots also has a finer-grained option:
# 0 = disable RBF entirely
# fee,optin = honour the RBF opt-in signal
# fee,-optin = always allow replacement, aka full RBF (default)
mempoolreplacement=fee,-optin
```

### TRUC Transaction Options

Control Topologically Restricted Until Confirmation (v3) transactions:

```ini title="bitcoin.conf"
# TRUC-specific options available via truc_opts patch
```

## Mempool Limits

### Unique Script Per Mempool

Limit to one unconfirmed transaction per output script:

```ini title="bitcoin.conf"
# Enabled by unique_spk_mempool patch
# Helps prevent certain spam patterns
```

## Example Configurations

### Privacy-Focused Node

```ini title="bitcoin.conf"
# Minimal data relay
rejecttokens=1
rejectparasites=1
datacarriersize=42

# Conservative policies
bytespersigopstrict=20
permitbarepubkey=0
```

### Miner Node

```ini title="bitcoin.conf"
# More permissive for fee revenue
datacarriersize=80
rejecttokens=0
rejectparasites=0

# Standard policies
bytespersigop=20
```

### Standard Node

```ini title="bitcoin.conf"
# Knots defaults (generally reasonable)
datacarriersize=83
```

## Checking Current Policy

View your node's current policy settings:

```bash
bitcoin-cli getmempoolinfo
bitcoin-cli getnetworkinfo
```

## Policy vs Mining

Remember that policy settings affect:
- What enters YOUR mempool
- What YOU relay to peers

They do NOT affect:
- What other nodes relay
- What miners include in blocks
- Consensus validation

## See Also

- [Dust and Fees](/patches/policy/dust-and-fees) - Fee-related policies
- [Transaction Filtering](/patches/policy/transaction-filtering) - Detailed filtering options
- [Configuration Reference](/reference/configuration-options) - All options
