---
sidebar_position: 4
title: FAQ
description: Frequently asked questions about Bitcoin Knots
---

# Frequently Asked Questions

## General

### What is Bitcoin Knots?

Bitcoin Knots is an enhanced derivative of Bitcoin Core, maintained by Luke Dashjr. It includes additional features, policy options, and improvements not available in Bitcoin Core.

### Is Bitcoin Knots safe to use?

Yes. Bitcoin Knots follows identical consensus rules to Bitcoin Core, ensuring network compatibility. The differences are in local policy and features.

### What about the "40,000 lines of unreviewed code" claim?

This claim is misleading. Here's the actual data (v29.2 vs Core v29.0):

| Category | Insertions | Deletions | Net | Risk Level |
|----------|------------|-----------|-----|------------|
| GUI (Qt) | 11,442 | 11,450 | ~0 | **Zero** - can't affect consensus |
| Tests | 9,113 | 821 | +8,292 | **Zero** - improves safety |
| Docs/Build | ~5,000 | ~2,000 | ~3,000 | **Zero** |
| Wallet | 1,532 | 239 | +1,293 | **Low** - your keys only |
| RPC | 2,238 | 277 | +1,961 | **Low** - API commands |
| Policy | 770 | 72 | +698 | **Low** - relay, not consensus |
| Validation/Script | 1,256 | 306 | +950 | **Review below** |
| **Total** | **36,438** | **15,294** | **~21,144** | |

**Key facts:**
- Net change is ~21,000 lines, not 40,000
- ~70% is GUI, tests, and docs (zero consensus risk)
- ~25% is wallet, RPC, policy (affects your node only)
- Only ~5% (~950 lines) touches validation/script code

**What's in the "consensus-adjacent" code?**
- `bitcoinconsensus`: **Restored Core code** removed in v28 — already reviewed
- `validation.cpp`: Mostly **policy options** (configurable, can be disabled)
- No changes to actual consensus rules

See [Code Analysis](/architecture/code-analysis) for the full breakdown with links to specific patches.

### How is Knots different from Core?

- More policy configuration options
- Legacy wallet support maintained
- GUI improvements (dark mode, etc.)
- Additional RPC commands
- Built-in Tor support
- Restored features (UPnP, etc.)

### Will Knots fork Bitcoin?

No. Knots follows the same consensus rules as Bitcoin Core. It will never create a network fork.

## Installation

### Can I use my existing Bitcoin Core data?

Yes. Bitcoin Knots uses the same data directory format. Simply point Knots to your existing data directory.

### How do I upgrade from Core to Knots?

1. Stop Bitcoin Core
2. Install Bitcoin Knots
3. Start Bitcoin Knots (it will use the same data)

### Can I switch back to Core?

Yes. Your data is fully compatible. Just stop Knots and start Core.

## Policy

### What does `rejectparasites` do?

It filters inscription/ordinal transactions from your mempool. These transactions can still be mined by others and your node will accept blocks containing them.

### Does filtering affect the network?

No. Policy is local to your node. Filtered transactions can still propagate through other nodes and be mined.

### What's a good `datacarriersize` setting?

- `42` - Restrictive (filters most inscriptions)
- `80` - Bitcoin Core default
- `83` - Knots default (legacy compatibility)

## Wallet

### Are legacy wallets deprecated?

In Bitcoin Core, yes. In Knots, legacy wallets remain fully supported.

### Can I import Core wallets into Knots?

Yes. Both descriptor and legacy wallets are compatible.

## Mining

### Can I use Knots for mining?

Yes. Knots includes mining enhancements like restored `-blockmaxsize` and transaction priority.

### Does Knots affect my hashrate?

No. Knots doesn't modify the mining algorithm.

## Privacy

### How do I use Tor with Knots?

```ini title="bitcoin.conf"
torsubprocess=1
```

Or manually configure your proxy settings.

### Is UPnP safe?

UPnP exposes your node to the internet. Use only if you understand the implications.

## Troubleshooting

### My node won't sync

See [Troubleshooting Guide](/guides/troubleshooting).

### RPC connection refused

Ensure `server=1` is in your config and the node is running.

### Where are the logs?

`~/.bitcoin/debug.log` (Linux/macOS)
`%APPDATA%\Bitcoin\debug.log` (Windows)

## Contributing

### How can I contribute?

See [Contributing Guide](/reference/contributing).

### How do I report bugs?

Open an issue at [github.com/bitcoinknots/bitcoin/issues](https://github.com/bitcoinknots/bitcoin/issues).

## See Also

- [Differences from Core](/getting-started/differences-from-core)
- [Troubleshooting](/guides/troubleshooting)
- [Contributing](/reference/contributing)
