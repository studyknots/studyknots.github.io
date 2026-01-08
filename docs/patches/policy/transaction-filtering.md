---
sidebar_position: 3
title: Transaction Filtering
description: Filter inscriptions, tokens, and data-heavy transactions from your mempool
---

# Transaction Filtering

Bitcoin Knots provides comprehensive tools to filter transactions you consider spam from your mempool. This is one of the most significant differences from Bitcoin Core and a primary reason for Knots' [850% adoption surge](https://blog.bitfinex.com/education/why-is-bitcoin-knots-becoming-so-popular/) in 2024-2025.

## Why Filter Transactions?

### The Problem

Since late 2022, several protocols have emerged that embed non-financial data into Bitcoin transactions:

| Protocol | Data Location | UTXO Impact | Prunable? |
|----------|---------------|-------------|-----------|
| **Ordinals/Inscriptions** | Witness data (OP_FALSE OP_IF) | Minimal | Yes |
| **BRC-20 Tokens** | Inscriptions (JSON) | Minimal | Yes |
| **Runes** | OP_RETURN | None | Yes |
| **Stamps** | Bare multisig outputs | **Severe** | **No** |

These protocols have caused:
- **Mempool congestion** during high-activity periods
- **Fee spikes** that price out small transactions
- **UTXO set bloat** (80M → 160M+ UTXOs in 2023)
- **Increased node resource requirements**

### The Philosophy

Bitcoin Knots gives node operators **choice**:

> "Bitcoin works with the assumption that a majority of miners are honest, not malicious. Besides, spam-filtered blocks often have more fees anyway for some reason."
> — Luke Dashjr

You decide what your node relays. These are **policy rules**, not consensus rules — your node still accepts all valid blocks regardless of your filter settings.

## How Each Protocol Works

Understanding how these protocols work helps you understand what the filters target.

### Ordinals & Inscriptions

Ordinals assign a serial number to each satoshi based on mining order. Inscriptions attach data to these satoshis using a clever trick that [bypasses the traditional datacarriersize limit](https://github.com/bitcoin/bitcoin/issues/29187):

```
OP_FALSE
OP_IF
  OP_PUSH "ord"
  OP_PUSH 1              # content-type tag
  OP_PUSH "image/png"    # MIME type
  OP_PUSH 0              # content tag
  OP_PUSH [image data]   # actual content
  OP_PUSH [more data]    # split into 520-byte chunks
OP_ENDIF
```

**Why this bypasses limits:**
- Traditional `datacarriersize` only applied to OP_RETURN
- The `OP_FALSE OP_IF ... OP_ENDIF` envelope is technically valid script that never executes
- Data is stored in the **witness** field, which gets a 75% fee discount (SegWit)
- This was [filed as CVE-2023-50428](https://github.com/bitcoin/bitcoin/issues/29187) by Luke Dashjr

### BRC-20 Tokens

[BRC-20 tokens](https://chain.link/education-hub/brc-20-token) embed JSON in inscriptions:

```json
{"p":"brc-20","op":"deploy","tick":"ordi","max":"21000000","lim":"1000"}
{"p":"brc-20","op":"mint","tick":"ordi","amt":"1000"}
{"p":"brc-20","op":"transfer","tick":"ordi","amt":"100"}
```

The token rules aren't enforced by Bitcoin — off-chain indexers interpret the JSON and track balances. The inscriptions just store the data.

### Runes

[Runes](https://docs.ordinals.com/runes.html) use OP_RETURN more efficiently than BRC-20:

```
OP_RETURN
OP_13              # Rune protocol identifier
[encoded data]     # Rune ID, amounts, outputs
```

**Runestones** (valid Runes messages) define token operations. **Cenotaphs** (malformed runestones) cause tokens to be burned.

Advantage over inscriptions: OP_RETURN outputs are provably unspendable, so they don't bloat the UTXO set.

### Stamps (Most Harmful)

[Bitcoin Stamps](https://github.com/mikeinspace/stamps/blob/main/BitcoinStamps.md) are the most problematic because they abuse **bare multisig** outputs:

```
OP_1 [pubkey1] [pubkey2] [pubkey3] OP_3 OP_CHECKMULTISIG
```

The "public keys" are actually encoded image data. These outputs:
- **Look spendable** to nodes (but aren't — the "keys" are fake)
- **Must be stored in the UTXO set** forever
- **Cannot be pruned** by pruned nodes
- **Increase every node's memory and storage requirements**

This is why `permitbaremultisig=0` is particularly important.

## Configuration Options

### Quick Reference

| Option | Default (Knots) | Effect |
|--------|-----------------|--------|
| `rejectparasites` | **1** (on) | Filters CAT21 spam |
| `rejecttokens` | 0 (off) | Filters Runes |
| `datacarriersize` | 83 | Max OP_RETURN bytes |
| `datacarriercost` | 1 | Weight multiplier for data |
| `maxscriptsize` | varies | Max witness script size |
| `permitbaremultisig` | **0** (off) | Blocks Stamps |
| `acceptnonstddatacarrier` | **0** (off) | Strict OP_RETURN format |
| `corepolicy` | 0 (off) | Use Core defaults instead |

### Detailed Options

#### rejectparasites

Filters CAT21 spam transactions. **Enabled by default in Knots.**

```ini title="bitcoin.conf"
# Default in Knots - filters CAT21 spam
rejectparasites=1

# Disable filtering
rejectparasites=0
```

Note: This option specifically targets CAT21 spam, not inscriptions or ordinals in general.

#### rejecttokens

Filters Runes protocol transactions.

```ini title="bitcoin.conf"
# Filter Runes
rejecttokens=1
```

Detects OP_RETURN outputs starting with OP_13 (the Runes identifier). Updated in v29.1 to also detect "OLGA" spam variants.

#### datacarriersize

Maximum size of data in OP_RETURN outputs.

```ini title="bitcoin.conf"
# Knots default (legacy compatibility)
datacarriersize=83

# Traditional limit (80 bytes of data)
datacarriersize=83

# Stricter (42 bytes - enough for hashes)
datacarriersize=42

# Disable all OP_RETURN relay
datacarriersize=0
```

**Why 83?** 1 byte OP_RETURN + 1-2 bytes pushdata + 80 bytes data = ~83 bytes.

:::tip Filtering Runes
Luke Dashjr's recommendation for filtering Runes: set `datacarriersize=0` in bitcoin.conf. [Source](https://x.com/LukeDashjr/status/1781749769431650700)
:::

#### datacarriercost

Adjusts the "virtual size" calculation for data-carrying bytes, making data more expensive.

```ini title="bitcoin.conf"
# Default - data bytes count as 1 vbyte each
datacarriercost=1

# Make data 4x more expensive (removes witness discount)
datacarriercost=4

# Effectively prohibit large data (very expensive)
datacarriercost=10
```

Higher values mean data-heavy transactions need higher fees to enter your mempool.

#### maxscriptsize

Limits the total witness script size per input.

```ini title="bitcoin.conf"
# Limit witness scripts (targets large inscriptions)
maxscriptsize=10000
```

In v29.1+, this applies to the **entire witness stack** of each input, closing evasion attempts.

#### permitbaremultisig

Controls relay of bare multisig outputs. **Disabled by default in Knots.**

```ini title="bitcoin.conf"
# Default in Knots - blocks Stamps
permitbaremultisig=0

# Allow bare multisig (Core behavior)
permitbaremultisig=1
```

This is critical for preventing UTXO bloat from Stamps.

#### acceptnonstddatacarrier

Controls whether non-standard OP_RETURN formats are accepted.

```ini title="bitcoin.conf"
# Default in Knots - strict format only
acceptnonstddatacarrier=0

# Allow any OP_RETURN format
acceptnonstddatacarrier=1
```

#### corepolicy

Revert to Bitcoin Core's default policies (disabling Knots filtering).

```ini title="bitcoin.conf"
# Use Core-compatible policies (no filtering)
corepolicy=1
```

Useful for testing or if you want Knots features but Core relay behavior.

## Recommended Configurations

### Maximum Filtering (Ocean-style)

Used by [Ocean mining pool](https://ocean.xyz/):

```ini title="bitcoin.conf"
# Inscriptions and ordinals
rejectparasites=1

# Runes and tokens
rejecttokens=1

# Minimal OP_RETURN (or 0 to disable)
datacarriersize=42

# Remove witness discount for data
datacarriercost=4

# Block Stamps
permitbaremultisig=0

# Strict OP_RETURN format
acceptnonstddatacarrier=0

# Limit script sizes
maxscriptsize=10000
```

### Moderate Filtering (Knots Default)

Default Knots behavior:

```ini title="bitcoin.conf"
# These are default in Knots - shown for clarity
rejectparasites=1
permitbaremultisig=0
acceptnonstddatacarrier=0
datacarriersize=83
```

### No Filtering (Core-compatible)

If you want Knots features but Core relay policy:

```ini title="bitcoin.conf"
corepolicy=1
```

Or explicitly:

```ini title="bitcoin.conf"
rejectparasites=0
rejecttokens=0
permitbaremultisig=1
acceptnonstddatacarrier=1
datacarriersize=100000
```

## How Detection Works

### Pattern Matching

Knots examines transaction structure for known patterns:

**Inscriptions:**
```
Witness contains: OP_FALSE OP_IF "ord" ... OP_ENDIF
```

**Runes:**
```
Output script: OP_RETURN OP_13 [data]
```

**Stamps:**
```
Output script: OP_n [pubkey...] OP_m OP_CHECKMULTISIG
(where pubkeys don't correspond to valid points)
```

### Limitations

:::warning Heuristic Filtering
Filtering is based on pattern matching, not perfect detection. Determined actors can:
- Modify envelope formats slightly
- Use novel encoding schemes
- Pay higher fees to get into blocks directly

These are **policy tools**, not consensus rules. They reduce spam propagation but cannot prevent it entirely.
:::

## Monitoring Filtered Transactions

### Check Filter Status

```bash
# See current mempool policies
bitcoin-cli getmempoolinfo

# Check specific policy settings (if exposed via RPC)
bitcoin-cli logging '["mempool"]'
```

### Watch Debug Log

```bash
# Monitor rejections in real-time
tail -f ~/.bitcoin/debug.log | grep -iE "reject|filter|policy"

# Count rejections
grep -c "rejected" ~/.bitcoin/debug.log
```

### Test Transaction Acceptance

```bash
# Test if a transaction would be accepted
bitcoin-cli testmempoolaccept '["<raw_transaction_hex>"]'
```

## Impact on Mining

If you mine (solo or pool), your filtering affects block templates:

```bash
# Get block template (filtered based on your policy)
bitcoin-cli getblocktemplate '{"rules":["segwit"]}'
```

**Revenue considerations:**
- Filtered transactions = potentially missed fees
- However, Dashjr notes "spam-filtered blocks often have more fees anyway"
- [Ocean pool](https://ocean.xyz/) runs filtered and reports competitive revenue

### Per-Template Overrides (v27.1+)

```bash
# Override policy for specific template
bitcoin-cli getblocktemplate '{
  "rules": ["segwit"],
  "minfeerate": 10
}'
```

## The Filtering Debate

### Arguments For Filtering

1. **Resource protection** — Reduces mempool churn and bandwidth
2. **UTXO set health** — Especially important for Stamps
3. **Network sustainability** — Prevents unbounded growth
4. **User choice** — Node operators decide their policy
5. **Historical precedent** — Spam filtering has existed since 2013

### Arguments Against Filtering

1. **Revenue** — May miss some fee-paying transactions
2. **Censorship concerns** — Who defines "spam"?
3. **Effectiveness** — Miners ultimately include what they want
4. **Cat and mouse** — Spammers adapt to filters

### The Reality

- Filtering is **your node's policy** — you're not preventing others from mining transactions
- Even without filtering, you can't prevent data on Bitcoin
- These are **relay policies**, not consensus changes
- Most pools don't filter, so filtered transactions still get mined

## GUI Configuration

Bitcoin Knots includes GUI options for filtering (unlike Core):

1. **Settings → Options → Network tab**
2. Look for policy options
3. Set datacarriersize, permitbaremultisig, etc.

The GUI exposes what would otherwise require editing bitcoin.conf.

## Verifying Your Configuration

After setting options, verify they're active:

```bash
# Restart bitcoind to apply changes
bitcoin-cli stop
bitcoind -daemon

# Check that node started with your settings
grep -E "datacarrier|permit|reject" ~/.bitcoin/debug.log | tail -20
```

## See Also

- [OP_RETURN Controversy](/guides/op-return-controversy) — The Core v30 debate
- [Mempool Policies](/patches/policy/mempool-policies) — All policy options
- [Dust and Fees](/patches/policy/dust-and-fees) — Fee-related filtering
- [Mining Guide](/guides/mining) — Block template configuration
- [CVE-2023-50428](https://github.com/bitcoin/bitcoin/issues/29187) — The inscription bypass issue

## Sources

- [Bitfinex: Why is Bitcoin Knots Becoming so Popular?](https://blog.bitfinex.com/education/why-is-bitcoin-knots-becoming-so-popular/)
- [Bitcoin Knots Release Notes](https://github.com/bitcoinknots/bitcoin/releases)
- [Ordinal Theory Handbook](https://docs.ordinals.com/inscriptions.html)
- [Runes Protocol Documentation](https://docs.ordinals.com/runes.html)
- [Bitcoin Stamps Protocol](https://github.com/mikeinspace/stamps/blob/main/BitcoinStamps.md)
- [CVE-2023-50428 Discussion](https://github.com/bitcoin/bitcoin/issues/29187)
