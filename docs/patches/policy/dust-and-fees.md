---
sidebar_position: 2
title: Dust and Fees
description: Configure dust thresholds and fee policies
---

# Dust and Fees

Bitcoin Knots provides enhanced control over dust thresholds and fee-related policies.

## What is Dust?

"Dust" refers to transaction outputs so small that the cost to spend them exceeds their value. These outputs are economically irrational and can bloat the UTXO set.

## Dust Configuration

### Static Dust Relay Fee

Set the fee rate used to calculate dust threshold:

```ini title="bitcoin.conf"
# Satoshis per 1000 bytes
dustrelayfee=3000
```

### Dynamic Dust

Enable dynamic dust calculation based on current fee rates:

```ini title="bitcoin.conf"
dustdynamic=1
```

With dynamic dust enabled, the threshold adjusts based on mempool conditions.

## Fee Policies

### Minimum Relay Fee

Set the minimum fee rate for transaction relay:

```ini title="bitcoin.conf"
# Satoshis per 1000 virtual bytes
minrelaytxfee=1000
```

### Incremental Relay Fee

Fee increment required for RBF replacements:

```ini title="bitcoin.conf"
incrementalrelayfee=1000
```

### Confirmation Target Default

Set default confirmation target (Knots patch):

```ini title="bitcoin.conf"
# Default: 1 day (144 blocks)
# Knots uses 1-day default vs Core's 6-block default
```

## Fee Estimation

### Save Fee Estimates

Persist fee estimates across restarts:

```bash
bitcoin-cli savefeeestimates
```

### Accept Stale Estimates

Allow using older fee estimates on mainnet:

```ini title="bitcoin.conf"
acceptstalefeeestimates=1
```

## Fee Histogram

Knots includes fee histogram data in mempool info:

```bash
bitcoin-cli getmempoolinfo
```

Returns additional fee rate distribution data for better fee estimation.

## See Also

- [Mempool Policies](/patches/policy/mempool-policies) - General mempool settings
- [Configuration Reference](/reference/configuration-options) - All options
