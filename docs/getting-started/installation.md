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

**Always verify both the checksum AND the GPG signature** of your download. This ensures the files haven't been tampered with and actually come from Luke Dashjr.

### Step 1: Download Verification Files

```bash
# Download the checksum and signature files
wget https://bitcoinknots.org/files/29.x/29.2.knots20251110/SHA256SUMS
wget https://bitcoinknots.org/files/29.x/29.2.knots20251110/SHA256SUMS.asc
```

### Step 2: Verify GPG Signature

First, import Luke Dashjr's GPG key:

```bash
# Import Luke's key from a keyserver
gpg --keyserver hkps://keys.openpgp.org --recv-keys 0xE463A93F5F3117EEDE6C7316BD02942421F4889F

# Or from the SKS keyserver pool
gpg --keyserver hkps://keyserver.ubuntu.com --recv-keys 0xE463A93F5F3117EEDE6C7316BD02942421F4889F
```

**Luke Dashjr's key fingerprint:**
```
E463 A93F 5F31 17EE DE6C  7316 BD02 9424 21F4 889F
```

You can also find the key at:
- [keys.openpgp.org](https://keys.openpgp.org/search?q=luke%40dashjr.org)
- Luke's personal website
- Bitcoin Core's [trusted-keys](https://github.com/bitcoin-core/guix.sigs/tree/main/builder-keys) (Luke is a Core contributor)

Verify the signature:

```bash
gpg --verify SHA256SUMS.asc SHA256SUMS
```

**Expected output:**
```
gpg: Signature made [date]
gpg:                using RSA key E463A93F5F3117EEDE6C7316BD02942421F4889F
gpg: Good signature from "Luke Dashjr <luke@dashjr.org>"
```

:::warning Check the key fingerprint
Don't just look for "Good signature" — verify the key fingerprint matches. A malicious key could also produce a "good" signature.
:::

### Step 3: Verify Checksum

```bash
# Verify your download matches the checksum
sha256sum -c SHA256SUMS 2>/dev/null | grep bitcoin-29.2.knots20251110-x86_64-linux-gnu.tar.gz
```

**Expected output:**
```
bitcoin-29.2.knots20251110-x86_64-linux-gnu.tar.gz: OK
```

### Web of Trust

For additional verification, Luke's key is signed by several well-known Bitcoin developers. You can view the key's signatures:

```bash
gpg --list-sigs 0xE463A93F5F3117EEDE6C7316BD02942421F4889F
```

### Quick Verification Script

```bash
#!/bin/bash
# verify-knots.sh - Verify Bitcoin Knots download

VERSION="29.2.knots20251110"
FILE="bitcoin-${VERSION}-x86_64-linux-gnu.tar.gz"
LUKE_KEY="E463A93F5F3117EEDE6C7316BD02942421F4889F"

# Download verification files
wget -q "https://bitcoinknots.org/files/29.x/${VERSION}/SHA256SUMS"
wget -q "https://bitcoinknots.org/files/29.x/${VERSION}/SHA256SUMS.asc"

# Import key if needed
gpg --list-keys "$LUKE_KEY" &>/dev/null || \
  gpg --keyserver hkps://keys.openpgp.org --recv-keys "$LUKE_KEY"

# Verify signature
echo "Verifying GPG signature..."
if gpg --verify SHA256SUMS.asc SHA256SUMS 2>&1 | grep -q "Good signature"; then
  echo "✓ GPG signature valid"
else
  echo "✗ GPG signature INVALID - DO NOT USE"
  exit 1
fi

# Verify checksum
echo "Verifying checksum..."
if sha256sum -c SHA256SUMS 2>/dev/null | grep -q "${FILE}: OK"; then
  echo "✓ Checksum valid"
else
  echo "✗ Checksum INVALID - DO NOT USE"
  exit 1
fi

echo "✓ Verification complete - safe to install"
```

:::danger Never Skip Verification
Bitcoin software controls your money. A compromised binary could steal your funds. Always verify both the GPG signature AND checksum before installing.
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
