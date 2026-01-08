---
sidebar_position: 3
title: Transaction Filtering
description: Filter specific transaction types from your mempool
---

# Transaction Filtering

Bitcoin Knots includes patches to filter specific types of transactions from your mempool.

## Available Filters

### Reject Tokens

Filters transactions associated with token protocols (BRC-20, etc.):

```ini title="bitcoin.conf"
rejecttokens=1
```

### Reject Parasites

Filters inscription and ordinal transactions. **Enabled by default in Bitcoin Knots:**

```ini title="bitcoin.conf"
# On by default in Knots - disable if you want Core behavior
rejectparasites=1
```

### Accept Non-Standard Data Carrier

Control non-standard OP_RETURN acceptance:

```ini title="bitcoin.conf"
acceptnonstddatacarrier=0
```

## How Filtering Works

Filters examine transaction structure for patterns associated with:
- Large witness data (inscriptions)
- Specific OP_RETURN formats (tokens)
- Unusual script patterns

:::warning Limitations
Filtering is heuristic-based. Determined actors can craft transactions that bypass filters. These are policy tools, not consensus rules.
:::

## Combining Filters

For comprehensive filtering:

```ini title="bitcoin.conf"
rejecttokens=1
rejectparasites=1
datacarriersize=42
permitbarepubkey=0
```

## Checking Filter Status

Monitor rejected transactions in debug log:

```bash
tail -f ~/.bitcoin/debug.log | grep -i reject
```

## See Also

- [Mempool Policies](/patches/policy/mempool-policies) - Full policy configuration
