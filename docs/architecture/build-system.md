---
sidebar_position: 4
title: Build System
description: Building Bitcoin Knots from source
---

# Build System

Bitcoin Knots uses the same build system as Bitcoin Core. Since v29, the build system is **CMake only** (minimum CMake 3.22) — the old Autotools system (`autogen.sh` / `configure`) has been removed.

## Quick Build (Linux)

```bash
# Clone
git clone https://github.com/bitcoinknots/bitcoin.git
cd bitcoin
git checkout 29.x-knots

# Install build requirements (Debian/Ubuntu)
sudo apt-get install build-essential cmake pkgconf python3

# Install required dependencies
sudo apt-get install libevent-dev libboost-dev

# SQLite is required for descriptor wallets
sudo apt install libsqlite3-dev

# For the Qt GUI, also install:
sudo apt-get install qtbase5-dev qttools5-dev qttools5-dev-tools \
  librsvg2-bin imagemagick libqrencode-dev

# Build
cmake -B build
cmake --build build -j$(nproc)
```

Binaries are produced in `build/bin/` (e.g. `build/bin/bitcoind`).

## Building with CMake (v29+, the only supported system)

```bash
cmake -B build            # Configure (add -D options here)
cmake --build build -j$(nproc)
```

### CMake Options

```bash
# Disable wallet
cmake -B build -DENABLE_WALLET=OFF

# Build the GUI (bitcoin-qt) — OFF by default
cmake -B build -DBUILD_GUI=ON

# Debug build
cmake -B build -DCMAKE_BUILD_TYPE=Debug

# Enable ZMQ notifications
cmake -B build -DWITH_ZMQ=ON
```

Note that the GUI defaults to **off** (`BUILD_GUI=OFF`), so `-DBUILD_GUI=ON` is needed to build `bitcoin-qt`. The GUI uses Qt 5 by default; Qt 6 can be selected with `-DWITH_QT_VERSION=6`.

To list all available options with help text:

```bash
cmake -B build -LH
```

## Dependencies

### Required

| Dependency | Purpose |
|------------|---------|
| Boost | General utilities (headers only) |
| libevent | Networking, RPC/HTTP server |

OpenSSL is **not** a dependency (it was removed upstream around Core 0.20).

### Optional

| Dependency | Purpose |
|------------|---------|
| SQLite3 | Descriptor wallets (required if wallet is enabled) |
| Berkeley DB 4.8 | Legacy wallets (off by default, `-DWITH_BDB=ON`) |
| Qt 5 (≥5.11.3) | GUI (Qt 6 ≥6.2 optional via `-DWITH_QT_VERSION=6`) |
| libqrencode | QR codes in the GUI |
| ZeroMQ | Notifications (`-DWITH_ZMQ=ON`) |
| libminiupnpc | UPnP port mapping (`-DWITH_MINIUPNPC=ON`) |
| systemtap-sdt | USDT tracepoints (`-DWITH_USDT=ON`) |

## Cross-Compilation

Using the depends system:

```bash
# Build dependencies for the target platform
cd depends
make HOST=x86_64-w64-mingw32 -j$(nproc)
cd ..

# Configure with the generated toolchain file
cmake -B build --toolchain depends/x86_64-w64-mingw32/toolchain.cmake
cmake --build build -j$(nproc)
```

See `depends/README.md` for the list of supported host platform triplets.

## Reproducible Builds (Guix)

```bash
./contrib/guix/guix-build
```

Produces deterministic binaries that can be verified by multiple builders.

## Running Tests

```bash
# Unit tests
ctest --test-dir build

# Or run the unit test binary directly
build/bin/test_bitcoin

# Functional tests
build/test/functional/test_runner.py

# Specific test
build/test/functional/test_runner.py wallet_basic.py
```

## See Also

- [Bitcoin Core Build Docs](https://github.com/bitcoin/bitcoin/blob/master/doc/build-unix.md)
- [Installation Guide](/getting-started/installation) - Pre-built binaries
