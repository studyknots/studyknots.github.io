---
sidebar_position: 4
title: Build System
description: Building Bitcoin Knots from source
---

# Build System

Bitcoin Knots uses the same build system as Bitcoin Core: CMake. The build system was migrated from Autotools to CMake in v29, so there is no `./autogen.sh` or `./configure` in current branches.

## Quick Build (Linux)

```bash
# Clone
git clone https://github.com/bitcoinknots/bitcoin.git
cd bitcoin
git checkout 29.x-knots

# Install dependencies (Debian/Ubuntu)
sudo apt-get install build-essential cmake pkgconf python3 \
  libevent-dev libboost-dev libsqlite3-dev

# For Qt GUI, also install:
sudo apt-get install libqt5gui5 libqt5core5a libqt5dbus5 qttools5-dev \
  qttools5-dev-tools libqrencode-dev

# Build
cmake -B build
cmake --build build -j$(nproc)
```

## Build Options

```bash
# List all options
cmake -B build -LH

# Disable wallet
cmake -B build -DENABLE_WALLET=OFF

# Build the GUI
cmake -B build -DBUILD_GUI=ON

# Enable debug
cmake -B build -DCMAKE_BUILD_TYPE=Debug
```

## Dependencies

### Required

| Dependency | Purpose |
|------------|---------|
| Boost | General utilities |
| libevent | Network events |

### Optional

| Dependency | Purpose |
|------------|---------|
| Qt5/Qt6 | GUI |
| libqrencode | QR codes |
| SQLite3 | Descriptor wallets |
| BerkeleyDB | Legacy wallets |
| ZMQ | Notifications |

## Cross-Compilation

Using the depends system:

```bash
# Build dependencies for target
cd depends
make HOST=x86_64-w64-mingw32 -j$(nproc)

# Configure with the depends toolchain
cd ..
cmake -B build --toolchain depends/x86_64-w64-mingw32/toolchain.cmake
cmake --build build -j$(nproc)
```

## Reproducible Builds (Guix)

```bash
./contrib/guix/guix-build
```

Produces deterministic binaries that can be verified by multiple builders.

## Running Tests

```bash
# Unit tests
ctest --test-dir build

# Functional tests
build/test/functional/test_runner.py

# Specific test
build/test/functional/test_runner.py wallet_basic.py
```

## See Also

- [Bitcoin Core Build Docs](https://github.com/bitcoin/bitcoin/blob/master/doc/build-unix.md)
- [Installation Guide](/getting-started/installation) - Pre-built binaries
