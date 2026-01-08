---
sidebar_position: 1
title: Legacy Wallet Support
description: Maintained legacy wallet functionality in Bitcoin Knots
---

# Legacy Wallet Support

Bitcoin Core v30 completely removed Berkeley DB legacy wallet support, forcing users to migrate to descriptor wallets. **Bitcoin Knots maintains full legacy wallet support** — one reason Knots adoption surged 850% in 2025.

## Why This Matters

| Feature | Core v30 | Knots v29.2 |
|---------|----------|-------------|
| Legacy wallet creation | **Removed** | Supported |
| Berkeley DB wallets | **Removed** | Supported |
| `dumpprivkey` RPC | Descriptor only | **Both types** |
| `importprivkey` RPC | Descriptor only | **Both types** |
| Direct key management | Limited | **Full** |

Many users need legacy wallets for:
- **Older hardware wallets** with specific BIP32 paths
- **Cold storage setups** using direct private key management
- **Business workflows** built around `importprivkey`/`dumpprivkey`
- **Compatibility** with older software and scripts
- **Migration at your own pace** — not forced by an upgrade

## Creating a Legacy Wallet

### Via RPC

```bash
# Create a legacy wallet (descriptors=false is the key parameter)
bitcoin-cli createwallet "mylegacy" false false "" false false
```

Parameters:
| Position | Name | Value | Description |
|----------|------|-------|-------------|
| 1 | `wallet_name` | "mylegacy" | Name of wallet |
| 2 | `disable_private_keys` | false | Enable private keys |
| 3 | `blank` | false | Create with keys |
| 4 | `passphrase` | "" | Optional encryption |
| 5 | `avoid_reuse` | false | Address reuse policy |
| 6 | `descriptors` | **false** | **Legacy wallet** |

### Via GUI

1. File → Create Wallet
2. **Uncheck** "Descriptor Wallet"
3. Set wallet name and options

## Legacy Wallet Commands

### Export Private Keys

```bash
# Dump a single address's private key
bitcoin-cli -rpcwallet=mylegacy dumpprivkey "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"

# Dump the HD master private key (Knots-only)
bitcoin-cli -rpcwallet=mylegacy dumpmasterprivkey
```

### Import Private Keys

```bash
# Import a WIF private key
bitcoin-cli -rpcwallet=mylegacy importprivkey "5KJvsngHeMpm..." "label" false

# Import multiple (importmulti)
bitcoin-cli -rpcwallet=mylegacy importmulti '[{"scriptPubKey":{"address":"..."},"keys":["..."]}]'
```

### Backup and Restore

```bash
# Backup wallet
bitcoin-cli -rpcwallet=mylegacy backupwallet "/path/to/backup.dat"

# Wallet file location
~/.bitcoin/wallets/mylegacy/wallet.dat
```

## HD Wallet Derivation

Legacy wallets use BIP32/44 derivation paths:

```
m/44'/0'/0'/0/0  # First receiving address
m/44'/0'/0'/0/1  # Second receiving address
m/44'/0'/0'/1/0  # First change address
```

## Migration to Descriptor Wallet

If you eventually want to migrate (optional in Knots):

```bash
# Migrate legacy to descriptor wallet
bitcoin-cli -rpcwallet=mylegacy migratewallet
```

:::warning Migration Notes
- Creates a new descriptor wallet
- Old wallet becomes read-only backup
- Watchonly items go to separate watchonly wallet
- **Make a backup before migrating**
:::

## Descriptor Wallets (Default in v23+)

Since Knots v23.0, new wallets default to descriptor format. Key differences:

| Feature | Legacy | Descriptor |
|---------|--------|------------|
| Database | Berkeley DB | SQLite |
| Key model | Key-based | Script-based |
| `dumpprivkey` | Works | Not available |
| `importprivkey` | Works | Not available |
| Output descriptors | No | Yes |

To create a descriptor wallet explicitly:

```bash
bitcoin-cli createwallet "mydesc" false false "" false true
```

## Knots-Specific Wallet Commands

| Command | Description |
|---------|-------------|
| `dumpmasterprivkey` | Export HD master key (legacy) |
| `sweepprivkeys` | Import and sweep in one step |
| `importfromcoldcard` | Import Coldcard wallet |

## See Also

- [Sweep Keys](/patches/wallet/sweep-keys) — Import and sweep private keys
- [Codex32 Support](/patches/wallet/codex32) — Seed phrase recovery
- [Wallet Management](/guides/wallet-management) — Full wallet guide
