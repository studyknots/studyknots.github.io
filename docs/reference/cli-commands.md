---
sidebar_position: 3
title: CLI Commands
description: Command-line interface reference
---

# CLI Commands

Reference for `bitcoin-cli` and `bitcoind` command-line usage.

## bitcoind

Start the Bitcoin daemon:

```bash
bitcoind [options]
```

### Common Options

```bash
# Run as daemon
bitcoind -daemon

# Specify data directory
bitcoind -datadir=/path/to/data

# Specify config file
bitcoind -conf=/path/to/bitcoin.conf

# Regtest mode
bitcoind -regtest

# Testnet mode
bitcoind -testnet

# Signet mode
bitcoind -signet
```

## bitcoin-cli

Interact with a running node:

```bash
bitcoin-cli [options] <command> [args]
```

### Connection Options

```bash
# Specify RPC credentials
bitcoin-cli -rpcuser=user -rpcpassword=pass <command>

# Specify RPC port
bitcoin-cli -rpcport=8332 <command>

# Specify wallet
bitcoin-cli -rpcwallet=mywallet <command>

# Use cookie authentication
bitcoin-cli -rpccookiefile=/path/to/.cookie <command>
```

### Useful Commands

```bash
# Quick status
bitcoin-cli -getinfo

# Stop node
bitcoin-cli stop

# Get help
bitcoin-cli help
bitcoin-cli help <command>
```

## bitcoin-qt

GUI application:

```bash
bitcoin-qt [options]
```

### GUI Options

```bash
# Enable dark mode (fusion style)
bitcoin-qt -style=fusion

# Minimize to tray on startup
bitcoin-qt -min

# Reset GUI settings
bitcoin-qt -resetguisettings
```

## bitcoin-tx

Transaction utility:

```bash
bitcoin-tx [options] <hex-tx> [commands]
```

### Examples

```bash
# Decode transaction
bitcoin-tx -json <hex>

# Create transaction
bitcoin-tx -create in=txid:vout out=addr:amount
```

## bitcoin-wallet

Offline wallet tool:

```bash
bitcoin-wallet [options] <command>
```

### Commands

```bash
# Create wallet
bitcoin-wallet -wallet=new create

# Get wallet info
bitcoin-wallet -wallet=existing info

# Dump wallet
bitcoin-wallet -wallet=existing dump
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `BITCOIN_DATADIR` | Data directory |
| `BITCOIN_CLI_ARGS` | Default CLI arguments |

## See Also

- [RPC Reference](/reference/rpc) - RPC commands
- [Configuration Options](/reference/configuration-options) - Config options
