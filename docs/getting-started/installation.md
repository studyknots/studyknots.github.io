---
sidebar_position: 2
title: Installation
description: How to download and install Bitcoin Knots
---

# Installation

This guide covers downloading and installing Bitcoin Knots on various platforms.

## Current Release

**Version:** 29.2.knots20251110
**Release Date:** November 10, 2025
**Based on:** Bitcoin Core 29.2

## Download

Official releases are available at:

**[bitcoinknots.org/files/29.x/29.2.knots20251110/](https://bitcoinknots.org/files/29.x/29.2.knots20251110/)**

### Available Packages

| Platform | File | Notes |
|----------|------|-------|
| Linux (x86_64) | `bitcoin-29.2.knots20251110-x86_64-linux-gnu.tar.gz` | Most common |
| Linux (ARM64) | `bitcoin-29.2.knots20251110-aarch64-linux-gnu.tar.gz` | Raspberry Pi 4+ |
| macOS (Intel) | `bitcoin-29.2.knots20251110-x86_64-apple-darwin.tar.gz` | Intel Macs |
| macOS (Apple Silicon) | `bitcoin-29.2.knots20251110-arm64-apple-darwin.tar.gz` | M1/M2/M3/M4 Macs |
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
Only download Bitcoin Knots from the official website (bitcoinknots.org). Verify checksums before running.
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

Expected output:
```
Bitcoin Knots version v29.2.knots20251110
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
git checkout v29.2.knots20251110

# Install dependencies (Debian/Ubuntu)
sudo apt-get install build-essential cmake pkg-config bsdmainutils \
  python3 libssl-dev libevent-dev libboost-dev libsqlite3-dev

# Build with CMake (v29+)
mkdir build && cd build
cmake ..
make -j$(nproc)
sudo make install
```

:::tip Build System Change
Bitcoin Knots v29+ uses CMake instead of Autotools. Minimum CMake version: 3.22.
:::

## Data Directory

Bitcoin Knots uses the same data directory as Bitcoin Core:

| Platform | Location |
|----------|----------|
| Linux | `~/.bitcoin/` |
| macOS | `~/Library/Application Support/Bitcoin/` |
| Windows | `%APPDATA%\Bitcoin\` |

:::tip Upgrading from Bitcoin Core
Bitcoin Knots can use your existing Bitcoin Core data directory. Simply point it to the same location — no migration needed.
:::

## Compatibility

**Supported Operating Systems:**
- Linux kernel-based systems
- macOS 13+ (Ventura and later)
- Windows 10+

Running on unsupported systems is not recommended.

## Recent Version History

| Version | Date | Notes |
|---------|------|-------|
| v29.2.knots20251110 | Nov 10, 2025 | CVE-2025-46598 fix, datacarriersize default increased |
| v29.1.knots20250903 | Sep 3, 2025 | Ephemeral anchors, CMake migration, NAT-PMP default |
| v28.1.knots20250305 | Mar 5, 2025 | Previous stable |
| v27.1.knots20240801 | Aug 1, 2024 | Long-term support |

## Next Steps

- [Quick Start Guide](/getting-started/quick-start) — Run your first node
- [Configuration Options](/reference/configuration-options) — Customize your setup
