---
sidebar_position: 3
title: Wallet Management
description: Managing wallets in Bitcoin Knots
---

# Wallet Management

Bitcoin Knots provides extended wallet functionality including legacy wallet support.

## Wallet Types

### Descriptor Wallet (Default)

Modern wallet using output descriptors:

```bash
bitcoin-cli createwallet "mydescriptor"
```

### Legacy Wallet

Traditional wallet with BIP32 HD keys:

```bash
bitcoin-cli createwallet "mylegacy" false false "" false false
```

The last `false` disables descriptors, creating a legacy wallet.

## Basic Operations

### Create Wallet

```bash
# Descriptor wallet
bitcoin-cli createwallet "wallet1"

# With encryption
bitcoin-cli createwallet "wallet2" false false "passphrase"
```

### Load/Unload

```bash
bitcoin-cli loadwallet "wallet1"
bitcoin-cli unloadwallet "wallet1"
```

### List Wallets

```bash
bitcoin-cli listwallets
```

## Receiving

### Get Address

```bash
bitcoin-cli -rpcwallet=wallet1 getnewaddress
bitcoin-cli -rpcwallet=wallet1 getnewaddress "label" "bech32m"
```

### Check Balance

```bash
bitcoin-cli -rpcwallet=wallet1 getbalance
```

## Sending

### Simple Send

```bash
bitcoin-cli -rpcwallet=wallet1 sendtoaddress "bc1q..." 0.001
```

### Advanced Send

```bash
bitcoin-cli -rpcwallet=wallet1 send '{
  "bc1q...": 0.001
}' null "unset" null '{"fee_rate": 10}'
```

## Knots-Specific Features

### Sweep Private Keys

`sweepprivkeys` takes a single options object and sweeps all coins controlled by the given WIF private keys **into the loaded wallet** (it scans the UTXO set directly — no rescan needed):

```bash
bitcoin-cli -rpcwallet=wallet1 sweepprivkeys '{"privkeys": ["5K..."], "label": "swept coins"}'
```

The destination and fee are handled by the wallet automatically; the call returns the sweep transaction id. As of Knots v29.3, sweeping covers legacy (P2PK/P2PKH), SegWit (P2WPKH and P2SH-P2WPKH), and Taproot (P2TR) outputs. The GUI also offers a **Sweep private key** dialog in the File menu.

### Dump Master Key (Legacy)

```bash
bitcoin-cli -rpcwallet=legacy dumpmasterprivkey
```

### Import Codex32 Seeds

Knots supports [codex32 (BIP 93)](/patches/wallet/codex32) seed backups via the `seeds` argument of `importdescriptors`. Pass a codex32-encoded seed (or a list of codex32 shares to be recombined) alongside the descriptors that use it:

```bash
bitcoin-cli -rpcwallet=wallet1 importdescriptors '[{"desc": "wpkh(...)", "timestamp": "now"}]' '[["ms1..."]]'
```

## Backup

### Descriptor Wallet

```bash
bitcoin-cli -rpcwallet=wallet1 backupwallet "/path/backup.dat"
```

You can also export the descriptors themselves as a text backup. With `private=true`, the output includes private keys — sufficient to fully restore the wallet via `importdescriptors`:

```bash
# Public descriptors (watch-only backup)
bitcoin-cli -rpcwallet=wallet1 listdescriptors

# Include private keys (guard this output carefully)
bitcoin-cli -rpcwallet=wallet1 listdescriptors true
```

### Legacy Wallet

```bash
bitcoin-cli -rpcwallet=legacy dumpwallet "/path/dump.txt"
```

### Migrating Legacy to Descriptor

To convert a legacy wallet into a descriptor wallet (a backup of the original is created automatically before migration):

```bash
bitcoin-cli -rpcwallet=legacy migratewallet
```

## Security

### Encryption

```bash
bitcoin-cli -rpcwallet=wallet1 encryptwallet "passphrase"
```

### Lock/Unlock

```bash
bitcoin-cli -rpcwallet=wallet1 walletlock
bitcoin-cli -rpcwallet=wallet1 walletpassphrase "pass" 60
```

## See Also

- [Legacy Wallet](/patches/wallet/legacy-wallet) - Legacy wallet details
- [Sweep Keys](/patches/wallet/sweep-keys) - Key sweeping
