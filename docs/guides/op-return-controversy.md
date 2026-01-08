---
sidebar_position: 5
title: The OP_RETURN Controversy
description: Understanding the Bitcoin Core v30 debate and why Bitcoin Knots takes a different approach
---

# The OP_RETURN Controversy

In 2025, Bitcoin experienced its most contentious debate since the 2017 block size wars. At the center: Bitcoin Core v30's decision to remove the long-standing 80-byte limit on OP_RETURN data.

:::info This Is Not "Drama"
A common deflection frames this debate as tribal conflict — "two sides" fighting, personalities clashing, community "drama." This framing serves to exhaust observers and avoid engaging with substance.

**The actual issues are technical and procedural:**
- Does relay policy affect what gets mined? (Yes — miners mine what they see in mempools)
- Was the governance process followed? (No — the change was merged without rough consensus)
- Who bears the costs? (Node operators, not miners who profit from fees)
- What was Satoshi's design philosophy? (Explicitly against arbitrary data storage)

These arguments were **answered** (a statement was released) but never **addressed** (the counterarguments weren't engaged). This page documents what actually happened.
:::

This page explains the controversy, the substantive arguments, and how Bitcoin Knots provides an alternative approach.

## Background: What is OP_RETURN?

`OP_RETURN` is a Bitcoin script opcode that marks an output as **provably unspendable**. It was introduced in 2014 as a compromise — a designated place for small amounts of arbitrary data that:

- Does not bloat the UTXO set (since outputs are unspendable)
- Is explicitly prunable by nodes
- Originally limited to 80 bytes to discourage abuse

The limit was a deliberate policy choice: Bitcoin is for peer-to-peer electronic cash, not arbitrary data storage.

## Historical Context: The 2014 OP_RETURN Wars

The 2025 controversy isn't new — OP_RETURN limits have been contentious since introduction.

### The Original Compromise (2014)

OP_RETURN was added in Bitcoin Core v0.9.0 (March 2014) as a **harm reduction measure**. Before it existed, people embedded data using fake addresses that bloated the UTXO set permanently. OP_RETURN gave them a prunable alternative.

The limit was initially **80 bytes**, then reduced to **40 bytes** just before release after developer debate.

### Luke Dashjr's Original Rationale

Luke Dashjr explained why the limit was reduced:

> "Too many people were getting the impression that OP_RETURN was a feature meant to be used. **It was never intended as such**, only a way to 'leave the windows unlocked so we don't need to replace the glass when someone breaks in' — that is, to reduce the damage caused by people abusing Bitcoin."

On why 40 bytes was sufficient:

> "You get 32 bytes for a hash, plus 8 bytes for some kind of unique identifier."

### The 2015 Increase

In July 2015 (v0.11.0), the limit was raised back to 80 bytes after the ecosystem adapted without catastrophe. The pull request noted: "We have now been running with 40 bytes for about 9 months, and nothing catastrophic happened."

This history matters: the limit was **always contested**, never a settled norm that v30 casually updated.

## What Changed in Core v30

Bitcoin Core v30, released in October 2025, made significant policy changes:

| Change | Before (v29) | After (v30) |
|--------|--------------|-------------|
| OP_RETURN size limit | 80 bytes | ~100,000 bytes |
| OP_RETURN outputs per tx | 1 | Multiple allowed |
| Default relay policy | Conservative | Permissive |

The change was merged in June 2025 via [PR #32406](https://github.com/bitcoin/bitcoin/pull/32406) by maintainer Gloria Zhao, despite vocal opposition from many community members.

## The Case Against (Why Critics Say It's Harmful)

### Satoshi's Warning (2010)

Before examining the current debate, it's worth noting that Satoshi Nakamoto himself warned against storing arbitrary data on the blockchain. In an [October 2010 BitcoinTalk post](https://satoshi.nakamotoinstitute.org/posts/bitcointalk/threads/239/), responding to a suggestion about adding messages to transactions:

> "It would be unwise to have permanently recorded plaintext messages for everyone to see. **It would be an accident waiting to happen.** If there's going to be a message system, it should be a separate system parallel to the bitcoin network. Messages should not be recorded in the block chain."

This wasn't about technical limitations — it was a design philosophy: the blockchain is for financial transactions, not arbitrary data storage.

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

## The Two PRs: What Actually Happened

The OP_RETURN changes in Core v30 emerged from two competing pull requests in April-May 2025:

### PR #32359 — The Failed Approach

[PR #32359](https://github.com/bitcoin/bitcoin/pull/32359) by Peter Todd proposed removing limits entirely **and** removing the configuration options. Key details:

- Todd was reportedly asked to open it by an active Core developer
- The stated motivation: entities like Citrea were using **unprunable outputs** instead of OP_RETURN due to size limits, causing worse UTXO bloat
- The PR would have removed user choice entirely
- Closed on May 12, 2025 by Gloria Zhao with the note: "there seems to be consensus around leaving the config options in place"

### PR #32406 — The Merged Approach

[PR #32406](https://github.com/bitcoin/bitcoin/pull/32406) by Gregory Sanders (instagibbs) took a different tack:

- Uncapped the default (80 bytes → ~100KB)
- **Kept** configuration options (`-datacarriersize`, `-datacarrier`)
- Marked these options as **deprecated** (scheduled for future removal)
- Allowed multiple OP_RETURN outputs per transaction
- Merged by Gloria Zhao, shipped in Core v30.0

The distinction matters: PR #32406 preserved user choice (for now), but by marking options "deprecated," signaled intent to eventually remove them — achieving #32359's goal through gradual deprecation.

## The Bitcoin Core Statement

On June 6, 2025, Bitcoin Core published a statement titled "[Bitcoin Core development and transaction relay policy](https://bitcoincore.org/en/2025/06/06/relay-statement/)" signed by 31 contributors including Pieter Wuille (sipa), Gloria Zhao, Ava Chow, and Gregory Sanders.

### Key Claims

The statement argued:

1. **"Knowingly refusing to relay transactions that miners would include in blocks anyway forces users into alternate communication channels"**
2. Developers should "have a realistic idea of what will end up in the next block"
3. Bitcoin functions as "censorship-resistant infrastructure"
4. Policy should not attempt "to intervene between consenting transaction creators and miners"

### Problems With This Reasoning

The statement conflates several distinct concepts:

#### 1. Relay Policy ≠ Censorship

Nodes choosing not to relay certain transactions is **resource management**, not censorship. Every node operator has the right to decide what their hardware processes. The statement frames this choice as somehow improper.

#### 2. The "Miners Will Mine It Anyway" Fallacy

This argument is circular:
- Miners mine transactions they see in mempools
- If most nodes don't relay spam, miners see less of it
- Therefore, relay policy **does** affect what gets mined

The statement assumes the conclusion (spam gets mined regardless) to justify the premise (relay policy doesn't matter).

#### 3. Asymmetric Costs Ignored

As Nick Szabo pointed out, miners receive fees while node operators bear storage/bandwidth costs without compensation. The statement ignores this fundamental asymmetry when arguing fees provide "sufficient" protection.

#### 4. Changed Positions

Notably, Pieter Wuille (sipa) previously supported OP_RETURN limits. In a [Delving Bitcoin discussion](https://delvingbitcoin.org/t/response-to-pieter-wuilles-stackexchange-answer-re-nuking-the-opreturn-filter/1991/11), he acknowledged his position had evolved:

> "The reasons for discouragement have changed. I believe that historically...there was much more potential harm to the ecosystem from data storage."

This framing — that circumstances changed rather than the policy being wrong — sidesteps the question of whether the original limit was sound policy that should have been maintained.

#### 5. "Neutrality" as Ideology

The claim that software should be "neutral" is itself a value judgment. Bitcoin Knots takes the opposite view: defaults should embody judgments about Bitcoin's purpose. Both are valid positions — but claiming one is "neutral" while the other is "ideological" is misleading.

## The Restoration Attempts

Following the v30 release, several attempts were made to restore the previous behavior:

### Issue #33619 — Revert Request

[Issue #33619](https://github.com/bitcoin/bitcoin/issues/33619) requested reverting the OP_RETURN policy changes. It was quickly closed as a duplicate.

### PR #33453 — Deprecation Reversal

This PR successfully **removed the deprecation warnings** from the configuration options, representing a partial victory for critics. Users can still configure limits without seeing deprecation messages.

### PR #34214 — Restore 80-Byte Default

[PR #34214](https://github.com/bitcoin/bitcoin/pull/34214) in late 2025 attempted to restore the 80-byte default. It cited Nick Szabo's warnings as "new information" that wasn't available during the original debate.

The PR was closed with NACKs from maintainers achow101 and glozow, with arguments that:
- The debate had been settled
- Node operators can configure their own limits
- The change would be "going backwards"

Critics noted that "node operators can configure" ignores that **defaults matter** — most users run defaults.

## The Technical War: Libre Relay vs Garbageman

Beyond the policy debate, an active technical conflict is underway between software projects.

### Libre Relay

**Peter Todd's Libre Relay** is a modified Bitcoin Core that bypasses all OP_RETURN limits. Its slogan: *"Eliminate paternalism in Bitcoin Core's relay policy."*

Libre Relay nodes preferentially peer with each other to form a parallel relay network that propagates large data transactions. This is the infrastructure that makes "miners will mine it anyway" partially true — but only because this bypass exists.

### Garbageman

**Chris Guida's Garbageman** (created at a hackathon) counters Libre Relay by having Knots nodes impersonate Libre Relay nodes. When Libre Relay nodes connect, expecting a friendly peer, the Garbageman node accepts the "spam" transactions — then discards them instead of relaying.

~3,000 Bitcoin Knots nodes are running Garbageman, effectively sybil-attacking the Libre Relay network.

### Todd's Response

Peter Todd called Garbageman a "sybil attack" and proposed a punishment mechanism to detect and counter these nodes by measuring total fees relayed.

This isn't just a policy debate — it's an active software conflict with both sides deploying countermeasures.

## BIP-110: The Soft Fork Response

Some developers argued that policy-level changes weren't enough — **consensus-level restrictions** were needed. The result is **BIP-110** (originally called BIP-444), a temporary soft fork proposal.

### Quick Summary

- **Author**: Dathon Ohm (pseudonymous); Luke Dashjr supports but denies authorship
- **Mechanism**: UASF (User-Activated Soft Fork) requiring 55% miner support
- **Duration**: ~1 year, then auto-expires
- **Effect**: Seven consensus rules restricting data storage methods
- **Status**: RC2 released January 3, 2026; minimal miner signaling so far

### Controversy

- **Peter Todd** embedded the entire BIP text on-chain to prove it's bypassable
- **BitMEX Research** argued it creates perverse incentives for CSAM-based attacks
- **Alex Thorn** (Galaxy Digital) called it "an attack on Bitcoin"
- RC1 had failing tests; developers warned against running it

:::tip Full Analysis
See **[BIP-110: The Reduced Data Soft Fork](/guides/bip-110)** for complete details on the seven consensus rules, activation timeline, arguments for and against, and current status.
:::

## The Governance Failure

Perhaps the most damning aspect of this controversy isn't the technical change itself — it's **how** it was merged.

### The Standard They Abandoned

In December 2023, Bitcoin Core maintainer **Ava Chow** (achow101) articulated the project's supposed standard for controversial changes:

> "If it is controversial, then we don't touch it. If it is controversial, then someone else thinks that not merging it is critical for the longevity of the network."
>
> "The default state is the status quo. If you want to make a change, you must convince everyone that it is a good idea."

This is textbook open-source governance: **controversial changes don't get merged without rough consensus**. There's no urgency — you wait for another release cycle until consensus emerges.

### The Standard They Applied

In 2025, this standard was inverted:

- **PR #32406** (change the status quo): Merged despite vocal opposition, with critics' comments deleted or hidden
- **PR #34214** (restore the status quo): NACKed by the same maintainers, including Ava Chow herself

The hypocrisy is stark: "convince everyone" was required to *restore* the decade-old default, but not to *change* it.

### "No Clear Consensus"

Multiple engineers pointed this out directly:

> "There was no clear consensus on this, and therefore should have been never merged! This is a disgraceful precedent."
> — Juan David Diaz, software engineer

> "There is no consensus for this change."
> — GitHub commenter

The normal FOSS process — hold controversial changes for another release — was abandoned. There was no urgency. The 80-byte limit had worked for a decade.

## Community Response

The backlash was swift and came from prominent voices across the Bitcoin ecosystem:

### Samson Mow (JAN3 CEO, former Blockstream CSO)

> "If you are really such a talented developer, then how come you are completely incapable of convincing people that your changes are good?"

Mow called Bitcoin Core "a risk to Bitcoin" and urged users to "refuse to upgrade and stay on 29.0 or run Knots."

### Jimmy Song (Bitcoin Developer & Educator)

> "The idea that spam is difficult to define, and because of this ambiguity, we shouldn't be making any distinctions at all in the software, is a time-wasting argument from fiat politics where you pretend not to know the obvious."

Song accused Core developers of using "fiat mentality" — pretending not to understand obvious distinctions to avoid making judgments.

### Matt Kratter (Bitcoin Commentator)

> "You ignore community consensus, you lose trust. Since Bitcoin Core's OP_RETURN fiasco, Bitcoin Knots has surged from 2% to 11% of nodes. That's what happens when contentious changes are rammed through."

> "In 1-3 years from now, expect Bitcoin Core's market share to have fallen to 20-30%."

> "If you did it because you believe that Bitcoin is money and not an arbitrary file storage network, then run Bitcoin Knots."

### Jason Hughes (Ocean Mining VP of Engineering)

> "Bitcoin Core developers are about to merge a change that turns Bitcoin into a worthless altcoin, and no one seems to care to do anything about it. I've voiced objections, lost sleep over this, and despite clear community rejection of the PR it's moving."

> "This is far more than a small technical change. This is a fundamental change to the nature of what the Bitcoin network itself is in its entirety."

### The Gatekeeping Debate

**Jameson Lopp** articulated the Core position on who gets a voice:

> "Non-contributors' opinions on platforms like X do not affect formal development decisions."

This sparked sharp pushback.

**Bob Burnett** (Barefoot Mining CEO, Ocean board member):

> "If guys like Samson and I (or you) can't even weigh-in with an opinion to be considered, then the system is seriously, seriously broken."

Burnett distinguishes between "hashers" (who lease hashpower to pools) and "miners" (who construct block templates). He argues most public mining companies are hashers, not miners — and the actual miners have different incentives than Core developers assume.

**Marty Bent** (Ten31 Fund managing partner):

> "I think one thing is pretty clear, there is no consensus at the moment on this OP_RETURN issue."

### The Dissenting Voice: Adam Back

Notably, **Adam Back** (Blockstream CEO, Hashcash inventor) broke from other critics:

> "i will be running bitcoin v30"

Back argued that "filters don't fix anything empirically" — though this contradicts the observable 850% growth in Knots nodes suggesting many operators disagree.

## The Fallout

The controversy had significant consequences on both sides:

### Personal Attacks

- **Gloria Zhao** deleted her Twitter account in May 2025 following sustained personal attacks
- During a livestream, one critic attacked her credentials and suggested her romantic relationship with another developer was why she had GitHub commit access
- A contributor posted a public script designed to auto-ban Bitcoin Knots nodes

### The "Knotzis" Slur

In August 2025, some Core supporters began calling Knots users **"Knotzis"** — a portmanteau of "Knots" and "Nazis." Other documented behavior from Core-aligned developers:

- **Antoine Poinsot** called Knots users "filteroors" and branded any network they might fork "Bitcoin Brain Knots"
- **Peter Todd** claimed Knots nodes accomplish "nothing" and mocked node operators for falling for an "advertisement scam"
- **Sergi Delgado** (Chaincode Labs) proposed a joke fork called "Bitcoin Unknotted" and replied to mentions of Luke Dashjr with memes mocking his Catholic faith
- Another supporter laughed "Knotzis in shambles" while posting charts

This rhetoric — comparing users who prefer conservative defaults to Nazis — represents a breakdown in professional discourse.

### Chaincode Labs Influence

Many critics pointed to **Chaincode Labs** as a driving force behind the OP_RETURN changes. Chaincode is a well-funded Bitcoin development company and educational hub based in NYC. Critics argue their wealth and influence over developer careers creates concerning incentive structures.

### Manufactured Consensus: A Case Study

Media coverage of this controversy often framed critics' concerns as overblown. A revealing example is the October 2025 Protos article headlined **"Lawyers call Bitcoin Core v30 CSAM concerns 'overblown'"**.

Reading the actual lawyer quotes tells a different story:

| Lawyer | What the headline implies | What they actually said |
|--------|--------------------------|------------------------|
| **Unnamed lawyer** | Concerns overblown | Called it **"a huge concern"** — would make it "possible for a single bad actor to render the Bitcoin blockchain legally unhostable" |
| **Gabriel Shapiro** | Dismissed risk | Acknowledged **"some plausibility"** to Knots' concerns |
| **Patrick Gruhn** | No real issue | Warned **"regulatory optics deserve attention"** — narrative could increase legal pressure |
| **Julian Fahrer** | Legal risk minimal | Warned politicians could **"weaponize the narrative regardless of reality"** |
| **Yaël Ossowski** | FUD | Acknowledged **"the fringe case exists"** |

The technique: frame "low practical likelihood" as "overblown," bury the dissenting quote ("a huge concern"), and let the headline do the work — knowing most readers won't read past it.

This is how consensus gets manufactured: not by addressing arguments, but by controlling framing. The article technically contains the facts; the spin is in what gets emphasized.

### The Substantive Divide

The debate is often framed as tribal ("purists vs permissives") but the actual divide is about **unanswered technical questions**:

| Question | Critics' Position | Core's Response |
|----------|------------------|-----------------|
| Does relay policy affect mining? | Yes — miners mine what they see | Assertion: "miners mine it anyway" |
| Should defaults express values? | Yes — most users run defaults | Assertion: "neutrality" is correct |
| Who bears costs? | Node operators (unfairly) | Not addressed |
| Was process followed? | No — merged without consensus | Not addressed |

The "tribal" framing benefits those who'd rather not engage these substantive points.

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

### Primary Sources

- [Satoshi on blockchain messages (2010)](https://satoshi.nakamotoinstitute.org/posts/bitcointalk/threads/239/) — "It would be an accident waiting to happen"
- [PR #32359](https://github.com/bitcoin/bitcoin/pull/32359) — Peter Todd's original PR (closed)
- [PR #32406](https://github.com/bitcoin/bitcoin/pull/32406) — Gregory Sanders' PR (merged)
- [PR #34214](https://github.com/bitcoin/bitcoin/pull/34214) — Restoration attempt (closed)
- [Issue #33619](https://github.com/bitcoin/bitcoin/issues/33619) — Revert request (closed)
- [Bitcoin Core Relay Statement](https://bitcoincore.org/en/2025/06/06/relay-statement/) — The official statement signed by 31 developers

### Analysis & Commentary

- [Bitcoin Core v30 sparks OP_RETURN limit controversy](https://en.cryptonomist.ch/2025/10/13/bitcoin-core-update-v30-op-return-limit-controversy/)
- [Nick Szabo Breaks His Silence](https://www.cointribune.com/en/nick-szabo-breaks-his-silence-and-criticizes-the-controversial-bitcoin-core-update/)
- [Bitcoin Core v30 Release Guide](https://yellow.com/research/bitcoin-core-v30-release-guide-opreturn-changes-wallet-updates-and-network-impact)
- [Defending Bitcoin's 80-Byte OP_RETURN Limit](https://bitcoin.university/bitcoin-op_return/)
- [The Drama Surrounding Bitcoin Core 30](https://thebitcoinmanual.com/articles/drama-btc-core-30/)
- [Bitcoin's OP_RETURN Saga](https://satscryption.substack.com/p/bitcoins-op_return-saga)
- [OP_RETURN Attack Surface Analysis](https://opreturns.github.io/surface/) — Technical demonstration of the "Gallery vs. Drawer" problem
- [Response to Pieter Wuille's StackExchange Answer](https://delvingbitcoin.org/t/response-to-pieter-wuilles-stackexchange-answer-re-nuking-the-opreturn-filter/1991) — Delving Bitcoin discussion
- [Bitcoin Optech Newsletter #352](https://bitcoinops.org/en/newsletters/2025/05/02/) — Technical summary of the debate

### Community Voices

- [Samson Mow warns Bitcoin Core is a "risk to Bitcoin"](https://www.tokenpost.com/news/people/15761)
- [Jimmy Song slams Bitcoin Core devs for 'fiat' mentality](https://cointelegraph.com/news/jimmy-song-slams-bitcoin-core-fiat-mentality-op-return)
- [Jason Hughes warns of "worthless altcoin"](https://x.com/wk057/status/1917235710781690171)
- [Matt Kratter on Core's market share decline](https://x.com/mattkratter/status/1932129897486668180)
- [Bitcoin Core devs call dissidents 'Knotzis'](https://protos.com/bitcoin-core-devs-call-dissidents-knotzis-find-bug-in-their-software/)
- [Ava Chow on controversial changes (2023)](https://x.com/achow101/status/1735353097474048477) — "If it is controversial, then we don't touch it"
