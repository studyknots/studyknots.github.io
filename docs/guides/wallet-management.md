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

```bash
bitcoin-cli sweepprivkeys '["5K..."]' "bc1q..."
```

### Dump Master Key (Legacy)

```bash
bitcoin-cli -rpcwallet=legacy dumpmasterprivkey
```

### Import Codex32

```bash
bitcoin-cli importcodex32 "ms1..."
```

## Backup

### Descriptor Wallet

```bash
bitcoin-cli -rpcwallet=wallet1 backupwallet "/path/backup.dat"
```

### Legacy Wallet

```bash
bitcoin-cli -rpcwallet=legacy dumpwallet "/path/dump.txt"
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
