---
sidebar_position: 5
title: Code Analysis
description: Objective analysis of Bitcoin Knots code differences from Core
---

# Code Analysis

This page provides an objective, data-driven analysis of the code differences between Bitcoin Knots and Bitcoin Core. All numbers are verifiable by running `git diff` between the respective tags.

## The "40,000 Lines" Claim

A common criticism of Bitcoin Knots is that it contains "40,000 lines of unreviewed code." This page examines that claim against the actual codebase.

### Methodology

```bash
# Clone and compare
git clone https://github.com/bitcoinknots/bitcoin.git
cd bitcoin
git checkout v29.2.knots20251110
git remote add core https://github.com/bitcoin/bitcoin.git
git fetch core v29.0
git diff FETCH_HEAD..HEAD --stat
```

### Actual Numbers (v29.2.knots20251110 vs Core v29.0)

```
760 files changed, 36,438 insertions(+), 15,294 deletions(-)
```

**Net change: ~21,144 lines** — not 40,000.

The "40,000" figure appears to count only insertions while ignoring 15,000+ deletions.

## Breakdown by Category

### Zero Consensus Risk

These changes **cannot affect consensus** — they're GUI, tests, or build system code.

| Category | Files | Insertions | Deletions | Net | Notes |
|----------|-------|------------|-----------|-----|-------|
| **GUI (Qt)** | 149 | 11,442 | 11,450 | ~0 | Dark mode, mempool stats, network monitor |
| **Tests** | 211 | 9,113 | 821 | +8,292 | More tests = more safety |
| **Docs/Build** | ~100 | ~5,000 | ~2,000 | ~3,000 | CMake, documentation |

**Subtotal: ~70% of all changes — zero consensus risk**

### Low Risk (Your Node Only)

These changes affect your local node but cannot impact the network.

| Category | Files | Insertions | Deletions | Net | Notes |
|----------|-------|------------|-----------|-----|-------|
| **Wallet** | 38 | 1,532 | 239 | +1,293 | sweepprivkeys, legacy wallet support |
| **RPC** | 23 | 2,238 | 277 | +1,961 | New commands, enhanced existing |
| **Policy** | 14 | 770 | 72 | +698 | Relay policy, configurable |

**Subtotal: ~25% of changes — affects your node only**

### Consensus-Adjacent Code

This is the code that critics focus on. Let's examine it in detail.

| Category | Files | Insertions | Deletions | Net |
|----------|-------|------------|-----------|-----|
| **validation.cpp** | 1 | ~500 | ~150 | ~350 |
| **script/** | 16 | ~500 | ~100 | ~400 |
| **consensus/** | 3 | ~150 | ~50 | ~100 |
| **bitcoinconsensus** | 2 | 252 | 0 | +252 |

**Subtotal: ~950 net lines (~5% of total)**

## What's Actually in the Consensus-Adjacent Code?

### 1. bitcoinconsensus Library (252 lines)

This is **restored Bitcoin Core code** that was removed in Core v28.

```cpp
// Copyright (c) 2009-2010 Satoshi Nakamoto
// Copyright (c) 2009-2022 The Bitcoin Core developers
```

- Already reviewed by Core developers
- Maintained for backward compatibility
- Applications depending on libconsensus still work

### 2. validation.cpp Changes (~350 net lines)

Examining the actual diff reveals these are primarily:

**Policy options (configurable, can be disabled):**
```cpp
SpkReuseModes SpkReuseMode;  // Address reuse policy
ignore_rejects_type m_ignore_rejects;  // Configurable rejection
```

**Performance improvements:**
```cpp
// Randomize writing time to prevent network synchronization
static constexpr auto DATABASE_WRITE_INTERVAL_MIN{50min};
static constexpr auto DATABASE_WRITE_INTERVAL_MAX{70min};
```

**Explicitly non-consensus:**
```cpp
/** Compute accurate total signature operation cost of a transaction.
 *  Not consensus-critical, since legacy sigops counting is always 
 *  used in the protocol.
 */
int64_t GetAccurateTransactionSigOpCost(...)
```

### 3. script/ Changes (~400 net lines)

Primarily:
- Enhanced descriptor support
- BIP-322 message signing
- Codex32 seed support
- None modify consensus validation

## Risk Assessment

| Risk Level | % of Code | Description |
|------------|-----------|-------------|
| **Zero** | ~70% | GUI, tests, docs — physically cannot affect consensus |
| **Low** | ~25% | Wallet, RPC, policy — your node only |
| **Minimal** | ~5% | Policy options + restored Core code |
| **Consensus changes** | **0%** | No consensus rules are modified |

## Key Insight: Policy ≠ Consensus

Many Knots additions are **policy options** — they control what your node relays, not what it considers valid.

Example: `-rejectparasites=1`
- Your node won't **relay** inscription transactions
- Your node **will accept blocks** containing them
- Other nodes can still relay them
- Miners can still mine them

This is fundamentally different from a consensus change.

## Verify It Yourself

Don't trust this page — verify:

```bash
# Get the code
git clone https://github.com/bitcoinknots/bitcoin.git
cd bitcoin
git checkout v29.2.knots20251110

# Add Core remote
git remote add core https://github.com/bitcoin/bitcoin.git
git fetch core v29.0

# See total diff
git diff FETCH_HEAD..HEAD --stat | tail -5

# See consensus-critical files only
git diff FETCH_HEAD..HEAD --stat -- src/validation*.cpp src/consensus/ src/script/

# Read specific changes
git diff FETCH_HEAD..HEAD -- src/validation.cpp | less
```

## Addressing the "Unreviewed" Claim

The claim that Knots code is "unreviewed" ignores:

1. **Luke Dashjr has contributed to Bitcoin since 2011** — he's one of the longest-serving contributors
2. **Many Knots patches are rejected Core PRs** — they were reviewed, just not merged
3. **Restored code (libconsensus, UPnP) was already reviewed** when originally in Core
4. **Knots tracks Core releases** — it inherits all Core security fixes
5. **21% of nodes run Knots** — it's battle-tested on mainnet

## Conclusion

The "40,000 lines of unreviewed code" claim fails on multiple counts:

- **Not 40,000**: Net change is ~21,000 lines
- **Not all risky**: ~70% is GUI/tests/docs (zero risk)
- **Not consensus**: ~5% is consensus-adjacent, and even that is mostly policy options
- **Not unreviewed**: Much is restored Core code or reviewed PRs

The actual risk profile: ~950 lines of policy options and restored Core code, maintained by a 14+ year Bitcoin contributor, running on 21% of the network.

## See Also

- [FAQ: Is Knots safe?](/reference/faq#is-bitcoin-knots-safe-to-use)
- [Patches Overview](/patches/overview)
- [Differences from Core](/getting-started/differences-from-core)
