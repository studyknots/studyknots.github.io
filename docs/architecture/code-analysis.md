---
sidebar_position: 5
title: Code Analysis
description: Objective analysis of Bitcoin Knots code differences from Core
---

# Code Analysis

This page provides an objective, data-driven analysis of the code differences between Bitcoin Knots and Bitcoin Core. All numbers are verifiable by running `git diff` between the respective tags.

## The "40,000 Lines" Claim

A common concern about Bitcoin Knots is that it contains "40,000 lines of code" beyond Core. This page examines that claim and provides context about what those lines actually do.

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

**The ~40,000 lines figure is roughly accurate** when counting insertions (~36k rounds up). When reviewing code, both insertions and deletions need examination — deleted code must be verified as safe to remove.

The more important question isn't "how many lines?" but **"what do those lines do?"**

## Breakdown by Category

The key insight is that **not all code carries equal risk**. GUI code cannot affect consensus. Test code improves safety. Policy code is configurable.

### Zero Consensus Risk

These changes **cannot affect consensus** — they're GUI, tests, or build system code.

| Category | Files | Insertions | Deletions | Notes |
|----------|-------|------------|-----------|-------|
| **GUI (Qt)** | 149 | 11,442 | 11,450 | Dark mode, mempool stats, network monitor |
| **Tests** | 211 | 9,113 | 821 | More tests = more safety |
| **Docs/Build** | ~100 | ~5,000 | ~2,000 | CMake, documentation |

**Subtotal: ~25,500 insertions (~70%) — zero consensus risk**

Why zero risk?
- GUI code runs in a separate process on many setups
- Test code only runs during development
- Build system doesn't affect runtime behavior

### Low Risk (Your Node Only)

These changes affect your local node but cannot impact the network.

| Category | Files | Insertions | Deletions | Notes |
|----------|-------|------------|-----------|-------|
| **Wallet** | 38 | 1,532 | 239 | sweepprivkeys, legacy wallet support |
| **RPC** | 23 | 2,238 | 277 | New commands, enhanced existing |
| **Policy** | 14 | 770 | 72 | Relay policy, configurable |

**Subtotal: ~4,500 insertions (~12%) — affects your node only**

Why low risk?
- Wallet bugs affect your funds, not the network
- RPC commands are local interfaces
- Policy controls relay behavior, not validation

### Consensus-Adjacent Code

This is the code that warrants the most scrutiny. Let's examine it in detail.

| Category | Files | Insertions | Deletions | Notes |
|----------|-------|------------|-----------|-----|
| **validation.cpp** | 1 | ~500 | ~150 | Policy hooks, performance |
| **script/** | 16 | ~500 | ~100 | Descriptors, signing |
| **consensus/** | 3 | ~150 | ~50 | Mostly comments/structure |
| **bitcoinconsensus** | 2 | 252 | 0 | Restored Core code |

**Subtotal: ~1,400 insertions (~4%) — requires careful review**

## What's Actually in the Consensus-Adjacent Code?

### 1. bitcoinconsensus Library (252 lines)

This is **restored Bitcoin Core code** that was removed in Core v28.

```cpp
// Copyright (c) 2009-2010 Satoshi Nakamoto
// Copyright (c) 2009-2022 The Bitcoin Core developers
```

- Already reviewed by Core developers when originally written
- Maintained for backward compatibility with applications using libconsensus
- Not new code — just code that Core deprecated and Knots kept

### 2. validation.cpp Changes

Examining the actual diff reveals these are primarily:

**Policy options (configurable, can be disabled):**
```cpp
SpkReuseModes SpkReuseMode;  // Address reuse policy
ignore_rejects_type m_ignore_rejects;  // Configurable rejection
```

These add policy hooks that can be turned off with `corepolicy=1`.

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

### 3. script/ Changes

Primarily:
- Enhanced descriptor support
- BIP-322 message signing
- Codex32 seed support
- None modify consensus validation rules

## Risk Assessment Summary

| Risk Level | Insertions | % of Total | Description |
|------------|------------|------------|-------------|
| **Zero** | ~25,500 | ~70% | GUI, tests, docs — physically cannot affect consensus |
| **Low** | ~4,500 | ~12% | Wallet, RPC, policy — your node only |
| **Medium** | ~1,400 | ~4% | Consensus-adjacent but mostly policy/restored code |
| **Remaining** | ~5,000 | ~14% | Misc (translations, contrib scripts, etc.) |

**Consensus rule changes: 0%** — Knots follows identical consensus rules to Core.

## Key Insight: Policy ≠ Consensus

Many Knots additions are **policy options** — they control what your node relays, not what it considers valid.

Example: `-rejectparasites=1`
- Your node won't **relay** CAT21 spam transactions
- Your node **will accept blocks** containing them
- Other nodes can still relay them
- Miners can still mine them

This is fundamentally different from a consensus change.

## Context Matters

When evaluating the ~40k lines:

**Consider who wrote it:**
- Luke Dashjr has contributed to Bitcoin since 2011 (14+ years)
- He authored BIP 22/23 (mining protocols used by pools)
- He's a Bitcoin Core contributor, not an outsider

**Consider the "unreviewed" claim:**
- Many Knots patches are rejected Core PRs — they were reviewed, just not merged
- Restored code (libconsensus, UPnP) was reviewed when originally in Core
- Code has been reviewed post-merge by others (albeit poorly documented)
- The 21% of nodes running Knots provides real-world testing

**Consider what's configurable:**
- Most policy additions can be disabled with `corepolicy=1`
- You can run Knots with Core-identical behavior

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

# Count by directory
git diff FETCH_HEAD..HEAD --stat -- src/qt/ | tail -1      # GUI
git diff FETCH_HEAD..HEAD --stat -- src/test/ test/ | tail -1  # Tests
git diff FETCH_HEAD..HEAD --stat -- src/wallet/ | tail -1  # Wallet
```

## Summary

The ~40,000 lines figure is roughly accurate. What matters is understanding that:

1. **~70% is GUI/tests/docs** — cannot affect consensus
2. **~12% is wallet/RPC/policy** — affects your node only
3. **~4% is consensus-adjacent** — mostly policy hooks and restored Core code
4. **0% changes consensus rules** — Knots validates identically to Core

The question isn't whether to trust 40,000 lines blindly. It's whether you trust:
- A 14-year Bitcoin contributor
- Code that's 70% GUI/tests/docs
- Policy options you can disable
- 21% of the network running it in production

## See Also

- [FAQ: Is Knots safe?](/reference/faq#is-bitcoin-knots-safe-to-use)
- [Patches Overview](/patches/overview)
- [Differences from Core](/getting-started/differences-from-core)
