---
sidebar_position: 4
title: External Resources
description: Node statistics, dashboards, and monitoring tools
---

# External Resources

Useful tools for monitoring the Bitcoin network and Knots adoption.

## Node Statistics

| Resource | Description |
|----------|-------------|
| [Coin Dance Nodes](https://coin.dance/nodes) | Live node counts by implementation (Core vs Knots) |
| [BTC Nodes](https://btcnodes.io) | Node explorer with search by version and service flags |
| [bitnod.es](https://bitnod.es) | BitMEX Research's node crawler, successor to the defunct Bitnodes |
| [bitdis.org](https://bitdis.org) | Node distribution dashboard: Core vs Knots share, release adoption, and BIP-110 signaling |
| [Bitbo Dashboard](https://bitbo.io) | Real-time Bitcoin stats, hash rate, fees, and network data |
| [Clark Moody Dashboard](https://bitcoin.clarkmoody.com/dashboard/) | Real-time Bitcoin network metrics |
| [The Bitcoin Portal](https://thebitcoinportal.com/) | Bitcoin monetary health intelligence |

:::note

Bitnodes (bitnodes.io), long the standard node explorer, went offline when its domain expired in May 2026. BTC Nodes and bitnod.es cover the same ground.

:::

### Searching for Specific Versions

On BTC Nodes, you can search for specific Knots versions by user agent:

```
/Satoshi:29.3.0/Knots:20260508/
```

This shows all nodes running Knots 29.3.knots20260508 (May 2026 release).

### Searching by Service Flags

On BTC Nodes, you can search by service flags to find nodes signaling specific capabilities. For example, [searching for `NODE_REDUCED_DATA`](https://btcnodes.io/nodes/?q=NODE_REDUCED_DATA) lists nodes signaling reduced data relay. bitdis.org presents the same data in a more readable dashboard format.

## Historical Data

| Resource | Description |
|----------|-------------|
| [Luke-Jr's Historical Charts](https://luke.dashjr.org/programs/bitcoin/files/charts/historical.html) | Long-term node count trends, Knots vs Core over time |

## Current Adoption

As of July 2, 2026:

- [bitdis.org](https://bitdis.org) measured **22.97%** of 23,874 reachable nodes running Bitcoin Knots
- [Coin Dance](https://coin.dance/nodes) showed a similar **22.7%** share

The Knots share peaked at roughly 25% in September 2025, after adoption surged following the OP_RETURN controversy in mid-2025. These figures date quickly — check the live dashboards above for current numbers.

## Official Resources

| Resource | Description |
|----------|-------------|
| [bitcoinknots.org](https://bitcoinknots.org) | Official Bitcoin Knots website |
| [GitHub Repository](https://github.com/bitcoinknots/bitcoin) | Source code and releases |

## Block Explorers

| Explorer | Notes |
|----------|-------|
| [mempool.guide](https://mempool.guide) | Community block explorer |
| [blockstream.info](https://blockstream.info) | Blockstream's explorer |

## See Also

- [Configuration Options](/reference/configuration-options) - All Knots settings
- [OP_RETURN Controversy](/guides/op-return-controversy) - Why adoption spiked
