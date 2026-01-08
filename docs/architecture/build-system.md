---
sidebar_position: 4
title: Build System
description: Building Bitcoin Knots from source
---

# Build System

Bitcoin Knots uses the same build system as Bitcoin Core, supporting both CMake and Autotools.

## Quick Build (Linux)

```bash
# Clone
git clone https://github.com/bitcoinknots/bitcoin.git
cd bitcoin
git checkout 29.x-knots

# Install dependencies (Debian/Ubuntu)
sudo apt-get install build-essential libtool autotools-dev automake \
  pkg-config bsdmainutils python3 libssl-dev libevent-dev \
  libboost-dev libsqlite3-dev

# For Qt GUI, also install:
sudo apt-get install libqt5gui5 libqt5core5a libqt5dbus5 qttools5-dev \
  qttools5-dev-tools libqrencode-dev

# Build
./autogen.sh
./configure
make -j$(nproc)
```

## CMake Build (Preferred for v28+)

```bash
mkdir build && cd build
cmake ..
make -j$(nproc)
```

## Build Options

### Configure Options

```bash
# Disable wallet
./configure --disable-wallet

# Disable GUI
./configure --without-gui

# Enable debug
./configure --enable-debug

# Static linking
./configure --enable-static
```

### CMake Options

```bash
cmake -DBUILD_WALLET=OFF ..
cmake -DBUILD_GUI=OFF ..
cmake -DCMAKE_BUILD_TYPE=Debug ..
```

## Dependencies

### Required

| Dependency | Purpose |
|------------|---------|
| Boost | General utilities |
| libevent | Network events |
| OpenSSL/LibreSSL | Cryptography |

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

# Configure with depends
cd ..
./configure --prefix=$PWD/depends/x86_64-w64-mingw32
make -j$(nproc)
```

## Reproducible Builds (Guix)

```bash
./contrib/guix/guix-build
```

Produces deterministic binaries that can be verified by multiple builders.

## Running Tests

```bash
# Unit tests
make check

# Functional tests
./test/functional/test_runner.py

# Specific test
./test/functional/test_runner.py wallet_basic.py
```

## See Also

- [Bitcoin Core Build Docs](https://github.com/bitcoin/bitcoin/blob/master/doc/build-unix.md)
- [Installation Guide](/getting-started/installation) - Pre-built binaries
