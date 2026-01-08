---
sidebar_position: 1
title: Legacy Wallet Support
description: Maintained legacy wallet functionality in Bitcoin Knots
---

# Legacy Wallet Support

Bitcoin Knots maintains support for legacy wallets that Bitcoin Core has deprecated.

## Background

Bitcoin Core deprecated legacy (non-descriptor) wallets starting in version 24, with plans to remove support entirely. Bitcoin Knots maintains this functionality for users who need it.

## Creating a Legacy Wallet

```bash
# Create a legacy wallet
bitcoin-cli createwallet "mylegacy" false false "" false false
```

Parameters:
- `wallet_name`: Name of the wallet
- `disable_private_keys`: false
- `blank`: false
- `passphrase`: empty
- `avoid_reuse`: false
- `descriptors`: **false** (this makes it a legacy wallet)

## Legacy Wallet Features

### Dump Private Keys

```bash
bitcoin-cli -rpcwallet=mylegacy dumpprivkey <address>
```

### Import Private Keys

```bash
bitcoin-cli -rpcwallet=mylegacy importprivkey <privkey> "label" false
```

### HD Wallet Paths

Legacy wallets use BIP32/44 derivation paths:

```
m/44'/0'/0'/0/0  # First receiving address
m/44'/0'/0'/1/0  # First change address
```

## Migration Path

If you want to migrate to descriptor wallets later:

```bash
bitcoin-cli -rpcwallet=mylegacy migratewallet
```

## When to Use Legacy Wallets

Legacy wallets may be needed for:
- Compatibility with older software
- Specific BIP32 derivation paths
- Direct private key management
- Hardware wallet compatibility (some older devices)

## See Also

- [Sweep Keys](/patches/wallet/sweep-keys) - Import and sweep private keys
- [Codex32 Support](/patches/wallet/codex32) - Seed phrase recovery
