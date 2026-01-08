---
sidebar_position: 3
title: Mempool Statistics
description: Visual mempool statistics in the GUI
---

# Mempool Statistics

Bitcoin Knots includes a visual mempool statistics widget — a feature that was in older Bitcoin Core versions but removed. The `old_stats_qt` patch restores and enhances this functionality.

## Accessing Mempool Stats

**Menu:** Window → Mempool Statistics

The mempool stats window appears above the debug window entries in the menu.

## Features

### Real-Time Metrics

| Metric | Description |
|--------|-------------|
| **TX Count** | Number of unconfirmed transactions |
| **Virtual Size** | Total vbytes of mempool transactions |
| **Memory Usage** | RAM consumed by mempool |
| **Min Fee Rate** | Lowest fee rate to get into mempool |
| **Loading Progress** | Shows progress when mempool is loading |

### Fee Histogram

Visual distribution of transactions by fee rate, showing:
- Number of transactions in each fee bracket
- Total size/weight per bracket
- Helps estimate confirmation times

### Min Relay Fee Fallback

When the mempool is empty, the stats display uses the minimum relay fee as a reference point — a [v29.2 enhancement](https://github.com/bitcoinknots/bitcoin/blob/v29.2.knots20251110/doc/release-notes.md) that prevents confusing zero displays.

## RPC Equivalent

The same data is available programmatically:

```bash
# Basic mempool info
bitcoin-cli getmempoolinfo

# Example output:
{
  "loaded": true,
  "size": 12345,
  "bytes": 5678901,
  "usage": 23456789,
  "total_fee": 0.12345678,
  "maxmempool": 300000000,
  "mempoolminfee": 0.00001000,
  "minrelaytxfee": 0.00001000
}
```

### Enhanced getmempoolinfo (Knots)

Knots adds a fee histogram to mempool info:

```bash
bitcoin-cli getmempoolinfo
```

The response includes fee distribution data not available in Bitcoin Core.

## Configuration

### Mempool Size

```ini title="bitcoin.conf"
# Maximum mempool size in MB (default: 300)
maxmempool=300

# Mempool expiry in hours (default: 336 = 2 weeks)
mempoolexpiry=336
```

### Fee Estimation

```ini title="bitcoin.conf"
# Minimum relay fee (affects what enters mempool)
minrelaytxfee=0.00001

# Save fee estimates to disk (Knots feature)
# Use RPC: bitcoin-cli savefeeestimates
```

## Use Cases

- **Fee estimation**: See current fee landscape before sending
- **Network health**: Monitor transaction volume and backlog
- **Debugging**: Identify mempool issues affecting your node
- **Research**: Study transaction patterns

## See Also

- [Network Monitor](/patches/gui/network-monitor) — Network activity widget
- [Dark Mode](/patches/gui/dark-mode) — UI theming options
- [Configuration Options](/reference/configuration-options) — Mempool settings
