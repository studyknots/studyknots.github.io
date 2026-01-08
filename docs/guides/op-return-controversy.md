---
sidebar_position: 5
title: The OP_RETURN Controversy
description: Understanding the Bitcoin Core v30 debate and why Bitcoin Knots takes a different approach
---

# The OP_RETURN Controversy

In 2025, Bitcoin experienced its most contentious debate since the 2017 block size wars. At the center: Bitcoin Core v30's decision to remove the long-standing 80-byte limit on OP_RETURN data. This page explains the controversy, the arguments on both sides, and how Bitcoin Knots provides an alternative approach.

## Background: What is OP_RETURN?

`OP_RETURN` is a Bitcoin script opcode that marks an output as **provably unspendable**. It was introduced in 2014 as a compromise — a designated place for small amounts of arbitrary data that:

- Does not bloat the UTXO set (since outputs are unspendable)
- Is explicitly prunable by nodes
- Originally limited to 80 bytes to discourage abuse

The limit was a deliberate policy choice: Bitcoin is for peer-to-peer electronic cash, not arbitrary data storage.

## What Changed in Core v30

Bitcoin Core v30, released in October 2025, made significant policy changes:

| Change | Before (v29) | After (v30) |
|--------|--------------|-------------|
| OP_RETURN size limit | 80 bytes | ~100,000 bytes (effectively unlimited) |
| OP_RETURN outputs per tx | 1 | Multiple allowed |
| Default relay policy | Conservative | Permissive |

The change was merged in June 2025 via [PR #32406](https://github.com/bitcoin/bitcoin/pull/32406) by maintainer Gloria Zhao, despite vocal opposition from many community members.

## The Case Against (Why Critics Say It's Harmful)

### 1. Bitcoin's Purpose is Money, Not Data Storage

Critics argue Bitcoin was designed as "peer-to-peer electronic cash" — not a general-purpose data storage platform. Expanding OP_RETURN limits encourages non-monetary uses that compete with financial transactions.

> "Bitcoin's purpose is peer-to-peer electronic cash, not arbitrary data storage. Relay policy should reinforce this purpose by discouraging non-financial uses."
> — Luke Dashjr

### 2. Blockchain Bloat and Node Costs

Every byte stored on Bitcoin must be processed and stored by every full node forever. The numbers tell a stark story:

| Metric | 2009-2023 | By 2025 |
|--------|-----------|---------|
| UTXO set size | 4 GB (14 years) | 12 GB |
| UTXOs < 1000 sats | Minimal | ~49% of all UTXOs |
| Ordinal-linked UTXOs | 0% | ~30% of all UTXOs |

This growth threatens decentralization by making it more expensive to run a node (disk space, RAM, bandwidth).

### 3. Legal Liability for Node Operators

**Nick Szabo**, the legendary cypherpunk who invented "bit gold" (a direct precursor to Bitcoin), broke five years of social media silence in September 2025 to warn about this change. His concerns:

- **Asymmetric costs**: Miners profit from fees while node operators bear storage costs without compensation
- **Legal exposure**: Node operators could be held liable for involuntarily storing illicit content
- **Visibility problem**: OP_RETURN data is standardized and directly readable, making it more visible to "lawyers, judges, and jurors" than hidden data
- **No removal option**: Unlike forum operators, node operators cannot simply remove offending data

> "I am talking about very real laws in very real jurisdictions."
> — Nick Szabo

### 4. The "Gallery vs. Drawer" Problem

A key technical distinction often missed: OP_RETURN data isn't just *stored* — it's **explicitly designed for retrieval and display**.

| Method | Analogy | Accessibility |
|--------|---------|---------------|
| OP_RETURN | **Public gallery** | Self-extracting, standard APIs expose it directly |
| Witness/P2SH | Hidden drawer | Requires specialized tools to reconstruct |

As demonstrated by the [OP_RETURN Attack Surface Analysis](https://opreturns.github.io/surface/):

- The `asm` field embeds data URIs directly after `OP_RETURN`
- Any HTTP-capable client can fetch, parse, and render the content instantly
- Standard RPC/REST APIs expose this data without specialized tools
- Node operators become **de facto content hosts** when exposing RPC endpoints
- Moderation is "impossible without protocol changes"

This is why the "data gets stored anyway" argument misses the point — it's not about *what* is stored, but how easily it's **surfaced**. OP_RETURN creates a public gallery; other methods hide data in drawers.

### 5. The "Spam Filter" Doesn't Protect Nodes

Szabo pointed out a fundamental flaw in the pro-change argument: network fees protect **miners** (who receive them) but provide no protection for **node operators** (who bear costs without compensation). Increasing OP_RETURN allowances worsens this imbalance.

### 6. Undermines Bitcoin's Value Proposition

**Jimmy Song** warned the change would worsen UTXO bloat by enabling more on-chain spam. **Jason Hughes** warned it could turn Bitcoin into a "worthless altcoin" by prioritizing non-monetary use cases.

Luke Dashjr called the changes "**malicious code**" that will "kill Bitcoin almost immediately" if widely adopted.

## The Case For (Core's Position)

Proponents of the change argue:

1. **Data storage happens anyway**: Users determined to store data use workarounds like Taproot witnesses (cheaper due to SegWit discount) or fake outputs that bloat the UTXO set permanently

2. **OP_RETURN is the lesser evil**: It's explicitly prunable, costs more in fees (4x witnesses), and doesn't pollute long-term UTXO storage

3. **Two-tier system**: The 80-byte limit only applied to relay policy — miners already accepted larger OP_RETURN via direct submission, favoring actors with miner connections

4. **Neutrality**: Software should be neutral about transaction content; market forces (fees) will naturally limit abuse

## The Fallout

The controversy had significant consequences:

- **Gloria Zhao** deleted her Twitter account in May 2025 following sustained personal attacks
- A contributor posted a public script designed to auto-ban Bitcoin Knots nodes
- The community split deepened between "purists" and "permissives"

## Bitcoin Knots: A Different Philosophy

Bitcoin Knots takes a fundamentally different approach: **defaults should embody value judgments about proper use**.

### Conservative Defaults

| Option | Core v30 | Knots v29.2 |
|--------|----------|-------------|
| `datacarriersize` | 100,000 bytes | **83 bytes** |
| `rejectparasites` | Not available | **Enabled by default** |
| `datacarriercost` | 0.25 | **1.0** (full cost) |
| Philosophy | Neutral relay | Purpose-aligned relay |

### Key Protective Features

```ini title="bitcoin.conf - Knots Defaults"
# Reject inscription/ordinal transactions (ON by default)
rejectparasites=1

# Conservative OP_RETURN limit
datacarriersize=83

# Charge full weight for data (no SegWit discount abuse)
datacarriercost=1.0

# Reject token protocol transactions
rejecttokens=0  # Off by default, available if needed
```

### User Choice

Critically, Knots provides **options**. If you disagree with the conservative defaults, you can:

```ini title="bitcoin.conf - Match Core behavior"
# Single flag to use Core-like defaults
corepolicy=1
```

This respects user autonomy while providing sensible defaults that align with Bitcoin's original purpose.

## Network Response

The community voted with their nodes:

| Metric | Early 2025 | Late 2025 |
|--------|------------|-----------|
| Bitcoin Knots nodes | ~2-4% | **~21%** |
| Growth | — | **~850%** |

This represents one of the largest shifts in node implementation share since Bitcoin's early days.

## Why This Matters

The OP_RETURN debate isn't just technical — it's philosophical:

1. **What is Bitcoin for?** Money, or a general-purpose blockchain?
2. **Who bears the costs?** Miners profit; node operators pay
3. **What should defaults express?** Neutrality, or purpose?
4. **How do we protect decentralization?** By minimizing node costs

Bitcoin Knots exists because some users believe defaults matter, purpose matters, and Bitcoin should remain focused on its original mission: decentralized peer-to-peer electronic cash.

## Further Reading

- [Configuration Options](/reference/configuration-options) — Full list of Knots policy options
- [Transaction Filtering](/patches/policy/transaction-filtering) — How filtering works
- [Mempool Policies](/patches/policy/mempool-policies) — Detailed policy configuration

## Sources

- [Bitcoin Core v30 sparks OP_RETURN limit controversy](https://en.cryptonomist.ch/2025/10/13/bitcoin-core-update-v30-op-return-limit-controversy/)
- [Nick Szabo Breaks His Silence](https://www.cointribune.com/en/nick-szabo-breaks-his-silence-and-criticizes-the-controversial-bitcoin-core-update/)
- [Bitcoin Core v30 Release Guide](https://yellow.com/research/bitcoin-core-v30-release-guide-opreturn-changes-wallet-updates-and-network-impact)
- [Defending Bitcoin's 80-Byte OP_RETURN Limit](https://bitcoin.university/bitcoin-op_return/)
- [The Drama Surrounding Bitcoin Core 30](https://thebitcoinmanual.com/articles/drama-btc-core-30/)
- [Bitcoin's OP_RETURN Saga](https://satscryption.substack.com/p/bitcoins-op_return-saga)
- [OP_RETURN Attack Surface Analysis](https://opreturns.github.io/surface/) — Technical demonstration of the "Gallery vs. Drawer" problem
