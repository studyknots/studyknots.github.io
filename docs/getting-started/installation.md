---
sidebar_position: 2
title: Installation
description: How to download and install Bitcoin Knots
---

# Installation

This guide covers downloading and installing Bitcoin Knots on various platforms.

## Download

Official releases are available at:

**[bitcoinknots.org/files/29.x/](https://bitcoinknots.org/files/29.x/29.2.knots20251110/)**

### Available Packages

| Platform | File | Notes |
|----------|------|-------|
| Linux (x86_64) | `bitcoin-29.2.knots20251110-x86_64-linux-gnu.tar.gz` | Most common |
| Linux (ARM64) | `bitcoin-29.2.knots20251110-aarch64-linux-gnu.tar.gz` | Raspberry Pi 4+ |
| macOS (Intel) | `bitcoin-29.2.knots20251110-x86_64-apple-darwin.tar.gz` | Intel Macs |
| macOS (Apple Silicon) | `bitcoin-29.2.knots20251110-arm64-apple-darwin.tar.gz` | M1/M2/M3 Macs |
| Windows | `bitcoin-29.2.knots20251110-win64-setup.exe` | Installer |

## Verify Downloads

Always verify the integrity of your download:

```bash
# Download the SHA256SUMS file
wget https://bitcoinknots.org/files/29.x/29.2.knots20251110/SHA256SUMS

# Verify your download
sha256sum -c SHA256SUMS 2>/dev/null | grep bitcoin-29.2.knots20251110-x86_64-linux-gnu.tar.gz
```

:::warning Security
Only download Bitcoin Knots from the official website. Verify signatures when available.
:::

## Linux Installation

### Extract and Install

```bash
# Extract the archive
tar -xzf bitcoin-29.2.knots20251110-x86_64-linux-gnu.tar.gz

# Move binaries to system path (optional)
sudo install -m 0755 -o root -g root -t /usr/local/bin bitcoin-29.2.knots20251110/bin/*
```

### Or Run from Directory

```bash
cd bitcoin-29.2.knots20251110/bin
./bitcoind --version
```

## macOS Installation

### Using the Archive

```bash
# Extract
tar -xzf bitcoin-29.2.knots20251110-arm64-apple-darwin.tar.gz

# Move to Applications (optional)
mv bitcoin-29.2.knots20251110 /Applications/Bitcoin-Knots
```

### First Run

macOS will require you to approve the application:
1. Open System Preferences → Security & Privacy
2. Click "Open Anyway" for Bitcoin Knots binaries

## Windows Installation

1. Run the installer: `bitcoin-29.2.knots20251110-win64-setup.exe`
2. Follow the installation wizard
3. Choose installation directory (default: `C:\Program Files\Bitcoin`)

## Building from Source

For advanced users who want to compile from source:

```bash
# Clone the repository
git clone https://github.com/bitcoinknots/bitcoin.git
cd bitcoin
git checkout 29.x-knots

# Install dependencies (Debian/Ubuntu)
sudo apt-get install build-essential libtool autotools-dev automake pkg-config \
  bsdmainutils python3 libssl-dev libevent-dev libboost-dev libboost-system-dev \
  libboost-filesystem-dev libboost-test-dev libsqlite3-dev

# Build
./autogen.sh
./configure
make -j$(nproc)
sudo make install
```

See [Building Bitcoin Core](https://github.com/bitcoin/bitcoin/blob/master/doc/build-unix.md) for detailed instructions (applicable to Knots).

## Data Directory

Bitcoin Knots uses the same data directory as Bitcoin Core:

| Platform | Location |
|----------|----------|
| Linux | `~/.bitcoin/` |
| macOS | `~/Library/Application Support/Bitcoin/` |
| Windows | `%APPDATA%\Bitcoin\` |

:::tip Upgrading from Bitcoin Core
Bitcoin Knots can use your existing Bitcoin Core data directory. Simply point it to the same location.
:::

## Next Steps

- [Quick Start Guide](/getting-started/quick-start) - Run your first node
- [Configuration Options](/reference/configuration-options) - Customize your setup
