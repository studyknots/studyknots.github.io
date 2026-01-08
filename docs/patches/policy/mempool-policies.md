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

### Reject Tokens (BRC-20, etc.)

Filter transactions related to token protocols that use inscriptions:

```ini title="bitcoin.conf"
rejecttokens=1
```

This filters transactions that appear to be BRC-20 or similar token transfers.

### Reject Parasites (Inscriptions)

Filter inscription/ordinal transactions:

```ini title="bitcoin.conf"
rejectparasites=1
```

This filters transactions that embed large amounts of arbitrary data via witness.

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
# Bitcoin Core default: 80 bytes
# Knots default: 83 bytes (for legacy protocol compatibility)
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

Set a specific dust limit (in satoshis):

```ini title="bitcoin.conf"
dustrelayfee=3000
```

## Sigops Policies

### Bytes Per Sigop

Control the ratio of transaction size to signature operations:

```ini title="bitcoin.conf"
bytespersigop=20
```

### Strict Sigops Enforcement

Enable stricter sigops enforcement:

```ini title="bitcoin.conf"
bytespersigopstrict=1
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
# Options: 0=never, 1=optin, 2=always
mempoolfullrbf=1
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
bytespersigopstrict=1
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
