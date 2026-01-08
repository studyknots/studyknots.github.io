---
sidebar_position: 4
title: FAQ
description: Frequently asked questions about Bitcoin Knots
---

# Frequently Asked Questions

## General

### What is Bitcoin Knots?

Bitcoin Knots is an enhanced derivative of Bitcoin Core, maintained by [Luke Dashjr](https://github.com/luke-jr) since 2011. It includes additional features, policy options, and improvements not available in Bitcoin Core while maintaining identical consensus rules.

### Is Bitcoin Knots safe to use?

Yes. Bitcoin Knots follows identical consensus rules to Bitcoin Core, ensuring full network compatibility. The differences are in local policy (what your node relays) and features (GUI, wallet, RPC). Your node will validate the blockchain exactly the same as Core.

### Who maintains Bitcoin Knots?

Luke Dashjr (luke-jr), one of the earliest Bitcoin developers (involved since 2010), maintains Bitcoin Knots. He's also a Bitcoin Core contributor, author of BIP 22/23 (mining protocols), and co-founder of the Ocean mining pool.

### Why is it called "Knots"?

The name has dual meaning:
- **Technical**: References the merging/tying together of code branches and patches
- **Personal**: A reference to a biblical passage significant to Dashjr's faith

The project was originally called "Bitcoin LJR" before being renamed.

### How popular is Bitcoin Knots?

As of late 2025, Bitcoin Knots powers approximately **21% of all Bitcoin nodes** — a significant portion of the network. Adoption surged 850% in 2024-2025, largely driven by the OP_RETURN controversy and Core v30's removal of data limits.

---

## Knots vs Core

### What about the "40,000 lines of unreviewed code" claim?

The ~40,000 lines figure is roughly accurate when counting insertions (~36k). The more important question is **what do those lines do?** Here's the breakdown (v29.2 vs Core v29.0):

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
- ~70% is GUI, tests, and docs (zero consensus risk)
- ~25% is wallet, RPC, policy (affects your node only)
- Only ~4% (~1,400 lines) is consensus-adjacent
- **0% changes consensus rules** — Knots validates identically to Core

**What's in the "consensus-adjacent" code?**
- `bitcoinconsensus`: **Restored Core code** removed in v28 — already reviewed
- `validation.cpp`: Mostly **policy options** (configurable, can be disabled)
- No changes to actual consensus rules

See [Code Analysis](/architecture/code-analysis) for the full breakdown.

### How is Knots different from Core?

| Feature | Bitcoin Core | Bitcoin Knots |
|---------|--------------|---------------|
| Consensus Rules | Standard | **Identical** |
| Legacy Wallet | Removed (v30) | **Maintained** |
| OP_RETURN Limit | Removed (v30) | **Configurable** |
| Inscription Filtering | No | **Yes (default on)** |
| Embedded Tor | No | **Yes** |
| Dark Mode | Partial | **Full support** |
| UPnP | Removed | **Restored** |
| Block Size Options | Removed | **Restored** |

### Will Knots fork Bitcoin?

**No.** Knots follows the same consensus rules as Bitcoin Core. It will never create a network fork. The differences are purely in:
- What transactions your node **relays** (policy)
- What features are **available** (GUI, RPC, wallet)
- What **defaults** are used

Your Knots node validates blocks identically to Core.

### Can I run Knots and Core on the same network?

Yes, they're fully compatible. Knots nodes communicate seamlessly with Core nodes. The network doesn't distinguish between them at the consensus level.

### Does filtering affect the Bitcoin network?

No. Policy is local to your node. When you filter transactions:
- They can still propagate through other nodes
- They can still be mined by any miner
- Your node will still accept blocks containing them

You're choosing what **your node** relays, not what the network allows.

---

## Installation & Upgrades

### Can I use my existing Bitcoin Core data?

Yes. Bitcoin Knots uses the same data directory format. Simply:
1. Stop Bitcoin Core
2. Install Bitcoin Knots
3. Start Knots (it uses the same data automatically)

No migration needed.

### How do I upgrade from Core to Knots?

```bash
# 1. Stop Core
bitcoin-cli stop

# 2. Install Knots (download from bitcoinknots.org)

# 3. Start Knots
bitcoind  # or bitcoin-qt
```

Your blockchain, wallets, and settings are preserved.

### Can I switch back to Core?

Yes, with one caveat:

- **Blockchain data**: Fully compatible
- **Descriptor wallets**: Fully compatible
- **Legacy wallets**: Core v30+ removed support

If you have legacy wallets, either:
- Keep using Knots
- Migrate wallets first: `bitcoin-cli migratewallet`
- Export keys: `bitcoin-cli dumpwallet`

### Do I need to re-sync the blockchain?

No. Knots uses the same data format as Core. Your existing blockchain is fully compatible.

### Where do I download Bitcoin Knots?

Official source: [bitcoinknots.org](https://bitcoinknots.org)

Always verify signatures when downloading.

---

## Policy & Filtering

### What does `rejectparasites` do?

It filters CAT21 spam transactions from your mempool. This:
- Reduces your mempool churn
- Saves bandwidth
- Doesn't affect what blocks you accept

Note: `rejectparasites` specifically targets CAT21 spam, not inscriptions or ordinals in general. Transactions can still be mined by others and your node accepts all valid blocks.

### What's a good `datacarriersize` setting?

| Setting | Effect |
|---------|--------|
| `0` | Disable all OP_RETURN relay |
| `42` | Restrictive (hash commitments only) |
| `83` | Knots default (legacy compatibility) |
| `100000+` | Effectively unlimited (Core v30 behavior) |

### How do I disable all filtering?

```ini title="bitcoin.conf"
corepolicy=1
```

Or explicitly:
```ini title="bitcoin.conf"
rejectparasites=0
rejecttokens=0
permitbaremultisig=1
datacarriersize=100000
```

### Does filtering reduce my fee income (if mining)?

Potentially yes, but:
- Luke Dashjr notes "spam-filtered blocks often have more fees anyway"
- Ocean pool runs filtered and reports competitive revenue
- You're choosing policy, not sacrificing consensus

### What are "parasites" and "tokens"?

- **Parasites** (`rejectparasites`): CAT21 spam transactions
- **Tokens** (`rejecttokens`): Runes protocol transactions using OP_RETURN with OP_13

Both are "data storage" uses of Bitcoin that some consider spam.

---

## Wallet

### Are legacy wallets deprecated?

- **Bitcoin Core**: Yes, removed in v30
- **Bitcoin Knots**: No, fully supported

This is a key reason many users switched to Knots.

### Can I import Core wallets into Knots?

Yes. Both descriptor and legacy wallets are compatible.

### What is `sweepprivkeys`?

A Knots command to import a private key and immediately send funds to a new address in one atomic operation. Safer than `importprivkey` because:
- The imported key isn't stored in your wallet
- Funds move to an address only you control
- Original key exposure doesn't matter after sweep

```bash
bitcoin-cli sweepprivkeys '["5KJvs..."]' "bc1q_your_address"
```

### What is Codex32?

[Codex32 (BIP-93)](/patches/wallet/codex32) is a seed backup scheme that:
- Uses paper and pencil (no electronics needed)
- Supports Shamir secret sharing
- Has error correction (detects/fixes mistakes)
- Can be verified entirely by hand

Knots supports importing Codex32 seeds.

---

## Mining

### Can I use Knots for mining?

Yes. Knots includes mining enhancements:
- Restored `-blockmaxsize` option
- Transaction priority support
- Per-call `getblocktemplate` parameters
- Used by Ocean mining pool in production

### Does Knots affect my hashrate?

No. Knots doesn't modify the mining algorithm or proof-of-work. It only affects block template construction.

### What mining pool uses Knots?

[Ocean](https://ocean.xyz/), co-founded by Luke Dashjr, runs Bitcoin Knots. It's backed by Jack Dorsey and reportedly processed $500M+ in mining.

---

## Privacy & Networking

### How do I use Tor with Knots?

**Simple way (embedded Tor):**
```ini title="bitcoin.conf"
torsubprocess=1
```

**Manual way:**
```ini title="bitcoin.conf"
proxy=127.0.0.1:9050
listenonion=1
```

See [Tor Integration](/patches/networking/tor-integration) for full details.

### Is UPnP safe?

UPnP automatically opens ports on your router. Considerations:
- **Pro**: Enables inbound connections, helps network
- **Con**: Exposes your node to internet
- **Risk**: Depends on your threat model

Use only if you understand the implications:
```ini title="bitcoin.conf"
upnp=1
```

### What is v2 transport?

Encrypted peer-to-peer connections (BIP 324). Even on clearnet, prevents ISPs from inspecting Bitcoin protocol traffic:
```ini title="bitcoin.conf"
v2transport=1
```

---

## GUI

### Does Knots have dark mode?

Yes. Knots includes proper dark mode support via the `qt_darkmode` patch. It:
- Follows system theme automatically
- Works on Windows, macOS, Linux
- Covers all dialogs and windows

See [Dark Mode](/patches/gui/dark-mode).

### What GUI improvements does Knots have?

- **Dark mode**: Full support
- **Network monitor**: Enhanced traffic graphs
- **Mempool stats**: Visual mempool widget (restored from old Core)
- **Tor settings**: GUI configuration for Tor
- **Policy options**: GUI access to filtering settings

---

## Troubleshooting

### My node won't sync

See [Troubleshooting Guide](/guides/troubleshooting). Common causes:
- No peer connections (firewall issue)
- Insufficient disk space
- Corrupted data (try `-reindex`)
- Stale peer connections (try `clearbanned`)

### RPC connection refused

Ensure `server=1` is in your config:
```ini title="bitcoin.conf"
server=1
```

### Where are the logs?

| OS | Location |
|----|----------|
| Linux | `~/.bitcoin/debug.log` |
| macOS | `~/Library/Application Support/Bitcoin/debug.log` |
| Windows | `%APPDATA%\Bitcoin\debug.log` |

### How do I report bugs?

Open an issue at [github.com/bitcoinknots/bitcoin/issues](https://github.com/bitcoinknots/bitcoin/issues)

Include:
- Knots version (`bitcoin-cli --version`)
- OS and version
- Relevant log entries
- Steps to reproduce

---

## Philosophy

### Why does Knots filter by default?

Luke Dashjr's view is that Bitcoin is designed for monetary transactions, not data storage. Filtering:
- Preserves block space for payments
- Reduces UTXO bloat (especially from Stamps)
- Is a **choice** — users can disable it

### Is filtering "censorship"?

No. Filtering is:
- **Local policy**: Only affects your node's relay
- **Not consensus**: Filtered transactions can still be mined
- **Optional**: You can disable all filtering with `corepolicy=1`
- **Your choice**: You decide what your node does

### What's the OP_RETURN controversy?

In 2025, Bitcoin Core v30 removed the 80-byte limit on OP_RETURN data. Critics (including Nick Szabo, who broke 5 years of silence) warned this:
- Increases attack surface for data storage abuse
- Changes Bitcoin's character from money to data layer
- Was done without broad community consensus

Knots maintains configurable limits. See [OP_RETURN Controversy](/guides/op-return-controversy).

---

## See Also

- [Differences from Core](/getting-started/differences-from-core) — Detailed comparison
- [Troubleshooting](/guides/troubleshooting) — Problem solving
- [Configuration Options](/reference/configuration-options) — All settings
- [Code Analysis](/architecture/code-analysis) — Detailed code breakdown
