---
sidebar_position: 3
title: Codex32 Support
description: Codex32 seed phrase import for wallet recovery
---

# Codex32 Support

Bitcoin Knots includes support for Codex32, a scheme for backing up and restoring Bitcoin seeds using paper and dice.

## What is Codex32?

Codex32 (BIP-93) is a seed backup scheme that:
- Uses Bech32 encoding for error detection
- Supports Shamir's Secret Sharing for splitting seeds
- Can be computed entirely by hand (no electronics needed)

## Importing Codex32 Seeds

```bash
bitcoin-cli importcodex32 "ms10testsxxxxxxxxxxxxxxxxxxxxxxxxxx..."
```

## Format

Codex32 strings have the format:

```
ms1[threshold][identifier][share_index][data][checksum]
```

Example:
```
MS12NAMES6XQGUZTTXKEQNJSJZV4JV3NZ5K3KWGSPHUH6EVW
```

## Use Cases

- **Paper backups**: Write down seed that can be verified by hand
- **Shamir splitting**: Split seed across multiple shares
- **Hardware wallet recovery**: Recover seeds from Codex32 backups

## Creating Codex32 Backups

Currently, Knots supports importing Codex32. For creating backups, use external tools or the specification at [BIP-93](https://github.com/bitcoin/bips/blob/master/bip-0093.mediawiki).

## See Also

- [Legacy Wallet](/patches/wallet/legacy-wallet) - Wallet features
- [BIP-93 Specification](https://github.com/bitcoin/bips/blob/master/bip-0093.mediawiki)
