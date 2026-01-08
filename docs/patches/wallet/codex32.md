---
sidebar_position: 3
title: Codex32 Support
description: Paper-based seed backup with error correction and secret sharing
---

# Codex32 Support

Bitcoin Knots includes support for [Codex32 (BIP-93)](https://github.com/bitcoin/bips/blob/master/bip-0093.mediawiki), a revolutionary scheme for backing up and restoring Bitcoin seeds using only paper, pencil, and printed worksheets — no electronics required.

## What is Codex32?

Codex32 is a seed backup standard developed by [Blockstream Research](https://blog.blockstream.com/codex32-a-shamir-secret-sharing-scheme/) that combines:

| Feature | Benefit |
|---------|---------|
| **Bech32 encoding** | Human-readable, error-detecting format |
| **Shamir's Secret Sharing** | Split seeds into multiple shares |
| **Hand computation** | Verify and generate without electronics |
| **Error correction** | Detect and fix transcription mistakes |

### Why Paper Computation Matters

Electronic devices, despite their precision, introduce security risks:
- Hardware vulnerabilities and backdoors
- Malware and keyloggers
- Screen capture and memory dumps
- Network-based exfiltration

Codex32 allows you to:
- Generate seeds using dice (true randomness)
- Split seeds into shares by hand
- Verify checksums without any computer
- Recover seeds using only printed tools

## How Codex32 Works

### The Format

A Codex32 string looks like this:

```
MS12NAMEA320ZYXWVUTSRQPNMLKJHGFEDCAXRPP870HKKQRM
│││ │    │└─────────────────────────────────────┘
│││ │    │              Data + Checksum
│││ │    └── Share index (A-Z, or S for secret)
│││ └────── Identifier (4 characters)
││└──────── Threshold (1-9 shares needed)
│└───────── Version (always 1 for now)
└────────── Human readable part (MS = "master seed")
```

**Components:**
- **MS**: Human-readable prefix (case-insensitive)
- **1**: Version number
- **2**: Threshold (2 shares needed to recover)
- **NAME**: 4-character identifier for this backup set
- **A**: Share index (A = first share, S = the secret itself)
- **Data**: The actual seed data in Bech32 encoding
- **Checksum**: 13-character error-correcting code

### Threshold Secret Sharing

Codex32 uses [Shamir's Secret Sharing](https://en.wikipedia.org/wiki/Shamir%27s_secret_sharing):

```
              ┌─────────────┐
              │   Secret    │
              │  (Seed)     │
              └──────┬──────┘
                     │
         ┌───────────┼───────────┐
         │           │           │
         ▼           ▼           ▼
    ┌─────────┐ ┌─────────┐ ┌─────────┐
    │ Share A │ │ Share B │ │ Share C │
    └─────────┘ └─────────┘ └─────────┘

    Threshold 2: Any 2 shares can recover the secret
                 1 share reveals NOTHING
```

**Key properties:**
- Split into up to **31 shares**
- Threshold from **1 to 9** shares required
- Below threshold: **zero information** about secret
- Mathematical guarantee, not just obscurity

### Error Correction

The 13-character checksum can:
- **Detect** up to 8 errors anywhere in the string
- **Correct** up to 4 character substitutions
- **Handle** up to 15 consecutive erasures (unreadable characters)

This means small transcription errors when copying by hand can be automatically fixed.

## Using Codex32 in Bitcoin Knots

### Importing a Codex32 Seed

```bash
# Import a single share (if threshold = 1) or the secret directly
bitcoin-cli importcodex32 "MS10TESTSXXXXXXXXXXXXXXXXXXXXXXXXXX4NZVSHKZ"
```

### Importing Multiple Shares

For threshold > 1, you need to combine shares:

```bash
# Import with multiple shares
bitcoin-cli importcodex32 '[
  "MS12NAMEA320ZYXWVUTSRQPNMLKJHGFEDCAXRPP870HKKQRM",
  "MS12NAMEB320ZYXWVUTSRQPNMLKJHGFEDCADH7HDLHPMS5X"
]'
```

### Verifying a Share

```bash
# Check if a share is valid (checksum verification)
bitcoin-cli validatecodex32 "MS12NAMEA320ZYXWVUTSRQPNMLKJHGFEDCAXRPP870HKKQRM"
```

## Creating Codex32 Backups

### The Paper Computer Method

Codex32 includes printable tools for hand computation:

1. **Volvelles** — Rotating paper discs for calculations
2. **Worksheets** — Guided computation sheets
3. **Lookup tables** — Reference charts for operations

**Resources:**
- [secretcodex32.com](https://secretcodex32.com/) — Interactive guide and printable booklet
- [Blockstream Codex32 Book](https://store.blockstream.com/products/codex32-shamir-secret-sharing-scheme-book) — Physical booklet

### Step-by-Step Overview

```
1. GENERATE RANDOMNESS
   Roll dice → Convert to Bech32 characters

2. CREATE INITIAL SHARES
   Use worksheets to generate k random shares
   (k = your threshold)

3. COMPUTE DERIVED SHARES
   Use volvelles to derive additional shares
   (up to 31 total)

4. CALCULATE CHECKSUMS
   Use checksum worksheet for each share

5. VERIFY
   Cross-check using recovery wheel

6. DISTRIBUTE
   Store shares in separate secure locations
```

### Using External Tools

For those comfortable with electronics during creation:

```bash
# Using seedtool (Blockchain Commons)
seedtool --format codex32 --shares 3 --threshold 2

# Using Python library
pip install codex32
python -c "from codex32 import generate; print(generate(threshold=2, shares=3))"
```

## Security Considerations

### Advantages

| Aspect | Benefit |
|--------|---------|
| **Air-gapped** | No electronic device ever sees your seed |
| **Verifiable** | Check integrity without trusting software |
| **Distributed** | Geographic separation of shares |
| **Redundant** | Lose some shares, still recover |
| **Durable** | Paper lasts decades if stored properly |

### Best Practices

:::warning Share Distribution
Never store all shares in one location. The whole point of splitting is geographic and custodial distribution.
:::

:::tip Threshold Selection
- **Threshold 2 of 3**: Good balance of security and convenience
- **Threshold 3 of 5**: Higher security for large holdings
- **Threshold 1**: No splitting (just checksummed backup)
:::

**Storage recommendations:**
- Use acid-free paper or metal backup plates
- Store in fireproof, waterproof containers
- Consider safe deposit boxes for some shares
- Give shares to trusted family members
- Document the threshold and identifier separately

### What Codex32 Does NOT Protect Against

- Physical theft of sufficient shares
- Coercion/rubber-hose attacks
- Forgetting your threshold/identifier
- All shares being destroyed

## Comparison with Other Backup Methods

| Method | Error Detection | Secret Sharing | Hand Verifiable | Electronics-Free |
|--------|-----------------|----------------|-----------------|------------------|
| **BIP-39 Words** | Checksum word | No (SLIP-39 adds) | No | No |
| **SLIP-39** | Yes | Yes | No | No |
| **Codex32** | **Yes (strong)** | **Yes** | **Yes** | **Yes** |
| **Raw Hex** | No | No | No | No |

## Supported Seed Lengths

Codex32 supports standard BIP-32 seed lengths:

| Seed Size | Codex32 Length | Security Level |
|-----------|----------------|----------------|
| 128-bit | 48 characters | Standard |
| 256-bit | 74 characters | High |

## Example Workflow

### Creating a 2-of-3 Backup

```
1. Generate seed using dice + Codex32 worksheets

2. Create 3 shares with threshold 2:
   - MS12VAULTA... (Share A - your safe)
   - MS12VAULTB... (Share B - bank box)
   - MS12VAULTC... (Share C - family member)

3. Verify each share's checksum by hand

4. Test recovery with any 2 shares

5. Destroy working papers securely
```

### Recovering Your Seed

```
1. Gather any 2 shares (A+B, A+C, or B+C)

2. Use recovery wheel or:
   bitcoin-cli importcodex32 '["MS12VAULTA...", "MS12VAULTB..."]'

3. Wallet is restored with full funds access
```

## Technical Details

### The Math (Simplified)

Codex32 uses polynomial interpolation over a finite field:
- Each share is a point on a polynomial
- The secret is the y-intercept
- k points determine a degree-(k-1) polynomial
- Fewer than k points = infinite possible polynomials

### Checksum Specification

- **Generator polynomial**: Specifically chosen for Bech32 alphabet
- **Error detection**: Guaranteed for up to 8 errors
- **Error correction**: Can fix 4 substitutions automatically
- **Erasure handling**: Up to 15 consecutive unreadable characters

## Wallet Support Status

| Wallet | Codex32 Support |
|--------|-----------------|
| **Bitcoin Knots** | Import supported |
| Bitcoin Core | PR pending |
| Blockstream Green | Planned |
| Sparrow | Under consideration |
| Liana | Planned |

## See Also

- [BIP-93 Specification](https://github.com/bitcoin/bips/blob/master/bip-0093.mediawiki) — Technical standard
- [secretcodex32.com](https://secretcodex32.com/) — Interactive tools and printable booklet
- [Blockstream Blog Post](https://blog.blockstream.com/codex32-a-shamir-secret-sharing-scheme/) — Introduction and rationale
- [Legacy Wallet](/patches/wallet/legacy-wallet) — Wallet features in Knots
- [Sweep Keys](/patches/wallet/sweep-keys) — Importing private keys
