---
sidebar_position: 3
title: Mempool Statistics
description: Visual mempool statistics in the GUI
---

# Mempool Statistics

The `old_stats_qt` patch provides a mempool statistics widget in the GUI.

## Features

- Transaction count
- Memory usage
- Fee rate distribution
- Size distribution

## Accessing Stats

Available via:
- Window → Mempool Statistics
- Status bar (when enabled)

## Displayed Metrics

| Metric | Description |
|--------|-------------|
| TX Count | Number of unconfirmed transactions |
| Size | Total virtual size |
| Memory | RAM usage |
| Min Fee | Minimum fee rate |
| Fee Histogram | Distribution of fee rates |

## RPC Equivalent

The same data is available via RPC:

```bash
bitcoin-cli getmempoolinfo
```

## See Also

- [Network Monitor](/patches/gui/network-monitor) - Network widget
- [Block View](/patches/gui/block-view) - Block explorer
