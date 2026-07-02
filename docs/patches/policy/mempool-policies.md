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

### Reject Parasites (CAT21)

Filter CAT21 spam transactions:

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
# Bitcoin Core before v30: 83-byte scriptPubKey (80 bytes of data)
# Bitcoin Core v30+ (Oct 2025): limit removed (default 100,000 bytes)
# Knots default: 83 bytes
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

Automatically raise the dust fee rate based on current fee conditions (experimental, default `off`):

```ini title="bitcoin.conf"
# Syntax: off | [<multiplier>*]target:<blocks> | [<multiplier>*]mempool:<kvB>
dustdynamic=target:6
```

This adjusts the dust threshold based on current fee conditions rather than using a fixed value.

### Custom Dust Fee Rate

Set the fee rate used to define dust, in BTC per 1000 virtual bytes (not a satoshi output limit):

```ini title="bitcoin.conf"
# Default: 0.00003 BTC/kvB (3000 satoshis/kvB)
dustrelayfee=0.00003
```

An output counts as dust if spending it would cost more than its value at this fee rate.

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

Limit the size of scripts (including the entire witness stack) that your node relays and mines. The Knots default is 1650 bytes, so setting a higher value *loosens* the policy:

```ini title="bitcoin.conf"
# Knots default: 1650 bytes
# Lower values are stricter
maxscriptsize=1650
```

### Bare Pubkey Outputs

Control bare pubkey (P2PK) output acceptance:

```ini title="bitcoin.conf"
# Knots default (Core permits them)
permitbarepubkey=0
```

## RBF Policies

### RBF Mode Control

Configure Replace-By-Fee behavior. `mempoolfullrbf` is a simple boolean (default `1`): accept replacements without requiring replaceability signaling:

```ini title="bitcoin.conf"
# Boolean, default: 1
mempoolfullrbf=1
```

For finer control, Knots provides the three-way `mempoolreplacement` option:

```ini title="bitcoin.conf"
# 0           = disable RBF entirely
# "fee,optin" = honour the RBF opt-out signal
# "fee,-optin" = always allow RBF (full RBF) - default
mempoolreplacement=fee,-optin
```

### TRUC Transaction Options

Control how your node treats transactions requesting TRUC (Topologically Restricted Until Confirmation, v3) limits:

```ini title="bitcoin.conf"
# reject  = reject TRUC transactions entirely
# accept  = treat them like any other transaction (default)
# enforce = impose their requested restrictions
mempooltruc=accept
```

## Mempool Limits

### Unique Script Per Mempool

The `unique_spk_mempool` patch is controlled by the `spkreuse` option:

```ini title="bitcoin.conf"
# "allow"    = relay/mine transactions reusing addresses or other pubkey scripts (default)
# "conflict" = treat reused scripts as exclusive prior to being mined
spkreuse=conflict
```

With `spkreuse=conflict`, only one unconfirmed transaction per output script is allowed at a time, which helps prevent certain spam patterns. (`corepolicy=1` sets `spkreuse=allow`.)

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
datacarriersize=83
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
