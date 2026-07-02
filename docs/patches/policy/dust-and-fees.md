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

Set the fee rate used to calculate the dust threshold. Like the other fee-rate options, it's expressed in BTC per 1000 virtual bytes (BTC/kvB):

```ini title="bitcoin.conf"
# BTC per kvB (default: 0.00003, i.e. 3000 satoshis/kvB)
dustrelayfee=0.00003
```

An output is dust if spending it would cost more than its value at this fee rate.

### Dynamic Dust

Automatically raise `dustrelayfee` based on current fee conditions (experimental):

```ini title="bitcoin.conf"
# Syntax: off | [<multiplier>*]target:<blocks> | [<multiplier>*]mempool:<kvB>
# Default: off

# Track the fee estimate for confirmation within 6 blocks
dustdynamic=target:6

# Or track the feerate of the best 3000 kvB of your mempool
dustdynamic=mempool:3000
```

With dynamic dust enabled, the threshold adjusts to either the expected fee to be mined within `<blocks>` blocks, or the feerate needed to be within the best `<kvB>` kilo-vbytes of your node's mempool. If no multiplier is given, 3.0 is used.

## Fee Policies

### Minimum Relay Fee

Set the minimum fee rate for transaction relay. Fees below this are treated as zero fee for relaying, mining, and transaction creation:

```ini title="bitcoin.conf"
# BTC per 1000 virtual bytes (default: 0.00001)
minrelaytxfee=0.00001
```

### Incremental Relay Fee

Fee rate used to define the cost of relay, applied to mempool limiting and replacement (RBF) policy:

```ini title="bitcoin.conf"
# BTC per kvB (default: 0.00001)
incrementalrelayfee=0.00001
```

### Sub-Dust Fee Penalty (v29.3+)

New in v29.3: transactions creating sub-dust outputs have their effective fee reduced by the dust threshold for each sub-dust output, so dust-creating transactions need higher fees to compete:

```ini title="bitcoin.conf"
# Default: 1 (enabled)
subdustfeepenalty=1

# Disable the penalty
subdustfeepenalty=0
```

### Confirmation Target Default

Set the default confirmation target used by the wallet for fee estimation (Knots patch):

```ini title="bitcoin.conf"
# Knots default: 144 blocks (~1 day) vs Core's 6-block default
txconfirmtarget=144
```

## Fee Estimation

### Save Fee Estimates

Persist fee estimates across restarts:

```bash
bitcoin-cli savefeeestimates
```

### Accept Stale Estimates

Allow reading fee estimates even if they are stale — **regtest only** (a debug/test option, not usable on mainnet):

```ini title="bitcoin.conf"
# Regtest only; default: 0
acceptstalefeeestimates=1
```

## Fee Histogram

Knots can include fee histogram data in mempool info when you pass the Knots-only argument:

```bash
bitcoin-cli getmempoolinfo true
```

This returns a `fee_histogram` field with fee statistics grouped by fee rate ranges, useful for better fee estimation.

## See Also

- [Mempool Policies](/patches/policy/mempool-policies) - General mempool settings
- [Configuration Reference](/reference/configuration-options) - All options
