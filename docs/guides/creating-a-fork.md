---
sidebar_position: 7
title: Creating Your Own Fork
description: How to create a minimal Bitcoin Core fork with custom policy settings
---

# Creating Your Own Bitcoin Core Fork

You don't have to accept every decision made by Bitcoin Core developers. Bitcoin is open source software — you can modify it to match your preferences. This guide shows how to create a minimal fork with a single policy change: restoring the original OP_RETURN data carrier size limit.

## Why Fork?

### The Scenario

Bitcoin Core v30 removed the standardness limit on OP_RETURN outputs. Previously, the default was 80 bytes. Now there's effectively no limit enforced at the policy level.

You might:
- Disagree with this change
- Want the old behavior back
- Not want to switch to a full alternative like Bitcoin Knots
- Prefer to understand exactly what's different in your node

### The Philosophy of Minimal Changes

The safest approach to forking Bitcoin is **minimal divergence**:

1. **Change only what you need** — Every modification is potential risk
2. **Policy, not consensus** — Never touch consensus rules unless you want a new coin
3. **Track upstream** — Stay close to Core for security updates
4. **Document everything** — Future you needs to understand past you

:::tip Policy vs Consensus
**Policy rules** affect what your node relays and mines, but don't affect block validity. You can change these freely.

**Consensus rules** determine what blocks are valid. Changing these creates a new cryptocurrency (intentionally or accidentally).

OP_RETURN limits are **policy only** — safe to modify.
:::

## The Change We're Making

We're going to restore the pre-v30 behavior:

| Setting | Core v29 | Core v30 | Our Fork |
|---------|----------|----------|----------|
| Default `datacarriersize` | 83 | Unlimited | 83 |
| OP_RETURN relay | Limited | Unlimited | Limited |

This is a one-line change that affects default behavior while still allowing users to override it via configuration.

## Prerequisites

You'll need:
- **Git** — Version control
- **Build tools** — Compiler, make, etc.
- **Dependencies** — Libraries Bitcoin Core needs
- **~50GB disk space** — For source, build artifacts, and blockchain
- **2-4 hours** — For first build (faster on subsequent builds)

### Install Build Dependencies

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install -y build-essential libtool autotools-dev automake pkg-config bsdmainutils python3
sudo apt-get install -y libevent-dev libboost-dev libsqlite3-dev
sudo apt-get install -y libminiupnpc-dev libnatpmp-dev libzmq3-dev
# For GUI (optional)
sudo apt-get install -y qtbase5-dev qttools5-dev-tools
```

**macOS:**
```bash
brew install automake libtool boost pkg-config libevent qt@5 miniupnpc libnatpmp zeromq
```

**For other systems**, see [Core's build documentation](https://github.com/bitcoin/bitcoin/tree/master/doc).

## Step 1: Clone Bitcoin Core

```bash
# Create a workspace
mkdir -p ~/bitcoin-dev
cd ~/bitcoin-dev

# Clone the official repository
git clone https://github.com/bitcoin/bitcoin.git
cd bitcoin

# See available release tags
git tag -l 'v3*' | tail -10
```

## Step 2: Create Your Fork Branch

Choose a recent stable release as your base:

```bash
# Check out the latest stable release (example: v30.0)
git checkout v30.0

# Create your fork branch
git checkout -b my-policy-fork

# Verify you're on your new branch
git branch
```

**Naming convention suggestion:** `v30.0-mypolicy` or `v30.0-opreturn-limit`

## Step 3: Find the Code to Change

Let's locate where the OP_RETURN limit is defined:

```bash
# Search for datacarriersize
grep -rn "datacarriersize" src/

# Search for the default value
grep -rn "MAX_OP_RETURN" src/
grep -rn "nMaxDatacarrierBytes" src/
```

In Bitcoin Core v30, the key files are:

- `src/policy/policy.h` — Default constants
- `src/policy/policy.cpp` — Policy implementation
- `src/init.cpp` — Command-line argument handling

Let's examine the relevant code:

```bash
# View the policy header
cat src/policy/policy.h | head -80
```

## Step 4: Make the Change

### Understanding the Current Code

In Core v30, you'll find something like:

```cpp title="src/policy/policy.h (Core v30 - simplified)"
/** Maximum size of OP_RETURN scripts we relay and mine */
static constexpr unsigned int MAX_OP_RETURN_RELAY = MAX_SCRIPT_SIZE;
// Or it may be effectively unlimited
```

In earlier versions (v29 and before):

```cpp title="src/policy/policy.h (Core v29)"
/** Default for -datacarriersize */
static const unsigned int MAX_OP_RETURN_RELAY = 83;
```

### Making the Edit

Open the file in your editor:

```bash
# Use your preferred editor
nano src/policy/policy.h
# or
vim src/policy/policy.h
# or
code src/policy/policy.h
```

Find the `MAX_OP_RETURN_RELAY` constant and change it back to 83:

```cpp title="src/policy/policy.h (your change)"
/**
 * Default for -datacarriersize. 83 bytes allows up to 80 bytes of data
 * after accounting for the OP_RETURN opcode and pushdata opcodes.
 *
 * MODIFIED: Restored pre-v30 default limit.
 */
static constexpr unsigned int MAX_OP_RETURN_RELAY = 83;
```

:::note Why 83?
- 1 byte for `OP_RETURN` opcode
- 1-2 bytes for pushdata opcode
- 80 bytes of actual data
- Total: ~83 bytes
:::

### Verify Related Code

Check if there are other places that need updating:

```bash
grep -rn "MAX_OP_RETURN_RELAY\|datacarriersize\|nMaxDatacarrier" src/
```

You may need to update `src/init.cpp` if the argument handling changed:

```cpp title="src/init.cpp (if needed)"
// Ensure the default matches your constant
argsman.AddArg("-datacarriersize",
    strprintf("Maximum size of data in OP_RETURN outputs we relay and mine (default: %u)",
              MAX_OP_RETURN_RELAY),
    ArgsManager::ALLOW_ANY, OptionsCategory::NODE_RELAY);
```

## Step 5: Document Your Change

Create a file documenting what you changed:

```bash
cat > doc/my-policy-changes.md << 'EOF'
# My Policy Fork Changes

## Overview

This fork restores the pre-v30 OP_RETURN data carrier size limit.

## Changes from Bitcoin Core v30.0

### 1. OP_RETURN Size Limit (src/policy/policy.h)

- **Before (Core v30):** Effectively unlimited
- **After (this fork):** 83 bytes (80 bytes of data)

This is a **policy-only** change. It affects:
- What transactions this node relays
- What transactions this node includes in block templates

It does NOT affect:
- Block validation (consensus)
- What blocks this node accepts
- Network compatibility

### Rationale

[Your reasoning here - e.g., "Reduce bandwidth for non-financial data"]

### Configuration

Users can still override this default:
```ini
# To allow larger OP_RETURN (not recommended)
datacarriersize=1000000

# To disable OP_RETURN relay entirely
datacarriersize=0
```

## Compatibility

This fork maintains full consensus compatibility with Bitcoin Core.
Nodes running this fork will:
- Accept all valid blocks
- Be indistinguishable on the network (except for relay behavior)
- Work with all Bitcoin wallets and services

## Updating

To update this fork when Core releases a new version:
1. Fetch upstream: `git fetch origin`
2. Rebase: `git rebase v30.1` (or merge)
3. Resolve conflicts in policy.h
4. Rebuild and test

EOF
```

## Step 6: Commit Your Changes

```bash
# Stage your changes
git add src/policy/policy.h
git add doc/my-policy-changes.md

# Commit with a clear message
git commit -m "policy: Restore 83-byte OP_RETURN default limit

Reverts the default datacarriersize to 83 bytes (80 bytes of data),
matching pre-v30 behavior.

This is a policy-only change that does not affect consensus.
Users can still override via -datacarriersize configuration.

Rationale: [Your reason]"
```

## Step 7: Build Your Fork

### Generate Build System

```bash
# Run autogen (creates configure script)
./autogen.sh
```

### Configure

```bash
# Basic build (no GUI)
./configure --disable-gui --disable-tests --disable-bench

# With GUI
./configure --with-gui=qt5

# See all options
./configure --help
```

**Recommended for first build:**
```bash
./configure --disable-tests --disable-bench --with-gui=no
```

### Compile

```bash
# Use all CPU cores
make -j$(nproc)

# Or specify core count
make -j4
```

This takes 30-90 minutes depending on your hardware.

### Verify Build

```bash
# Check the binary exists
ls -la src/bitcoind src/bitcoin-cli

# Check version
./src/bitcoind --version

# Verify your change is present
./src/bitcoind -help | grep datacarriersize
```

## Step 8: Test Your Fork

### Basic Functionality Test

```bash
# Create a test data directory
mkdir -p /tmp/bitcoin-test

# Start in regtest mode (private test network)
./src/bitcoind -regtest -datadir=/tmp/bitcoin-test -daemon

# Wait a moment, then test RPC
./src/bitcoin-cli -regtest -datadir=/tmp/bitcoin-test getblockchaininfo

# Check your policy setting
./src/bitcoin-cli -regtest -datadir=/tmp/bitcoin-test getnetworkinfo

# Stop the node
./src/bitcoin-cli -regtest -datadir=/tmp/bitcoin-test stop
```

### Test the OP_RETURN Limit

```bash
# Start regtest node
./src/bitcoind -regtest -datadir=/tmp/bitcoin-test -daemon
sleep 2

# Create a wallet and generate some coins
./src/bitcoin-cli -regtest -datadir=/tmp/bitcoin-test createwallet "test"
./src/bitcoin-cli -regtest -datadir=/tmp/bitcoin-test -generate 101

# Create an OP_RETURN transaction with 80 bytes of data (should work)
# This requires more complex scripting - see Bitcoin Core's functional tests
# for examples of creating OP_RETURN transactions

# Cleanup
./src/bitcoin-cli -regtest -datadir=/tmp/bitcoin-test stop
rm -rf /tmp/bitcoin-test
```

### Run Automated Tests (Optional but Recommended)

```bash
# Rebuild with tests enabled
./configure --enable-tests
make -j$(nproc)

# Run unit tests
make check

# Run specific policy tests
./test/functional/mempool_datacarrier.py
```

## Step 9: Install Your Fork

### Option A: Install System-Wide

```bash
sudo make install
```

This installs to `/usr/local/bin/`. Your system's `bitcoind` is now your fork.

### Option B: Run from Build Directory

```bash
# Add to your PATH
export PATH="$HOME/bitcoin-dev/bitcoin/src:$PATH"

# Or create aliases
alias bitcoind-custom="$HOME/bitcoin-dev/bitcoin/src/bitcoind"
alias bitcoin-cli-custom="$HOME/bitcoin-dev/bitcoin/src/bitcoin-cli"
```

### Option C: Parallel Installation

```bash
# Install with a different prefix
./configure --prefix=$HOME/bitcoin-custom
make -j$(nproc)
make install

# Run with explicit path
~/bitcoin-custom/bin/bitcoind
```

## Step 10: Maintaining Your Fork

### Staying Updated

When Bitcoin Core releases security updates, you need to update your fork:

```bash
cd ~/bitcoin-dev/bitcoin

# Fetch upstream changes
git fetch origin

# See new tags
git tag -l 'v3*' | tail -5

# Option A: Rebase onto new version (cleaner history)
git checkout my-policy-fork
git rebase v30.1

# Option B: Merge new version (preserves history)
git checkout my-policy-fork
git merge v30.1

# Resolve any conflicts in policy.h
# The conflict will likely be straightforward - just keep your value

# Rebuild
make clean
./autogen.sh
./configure [your options]
make -j$(nproc)
```

### Tracking Changes

Keep a simple changelog:

```bash
cat >> doc/my-policy-changes.md << 'EOF'

## Changelog

### v30.1-mypolicy (2025-XX-XX)
- Rebased onto Bitcoin Core v30.1
- No additional changes

### v30.0-mypolicy (2025-XX-XX)
- Initial fork from Bitcoin Core v30.0
- Restored 83-byte OP_RETURN default

EOF
```

## Advanced: Multiple Policy Changes

If you want to make additional changes, follow the same pattern:

### Example: Also Restore Dust Limit

```cpp title="src/policy/policy.h"
// Restore stricter dust limit
static constexpr CAmount DUST_RELAY_TX_FEE = 3000; // sat/kvB
```

### Example: Disable OP_RETURN by Default

```cpp title="src/policy/policy.h"
// Disable OP_RETURN relay by default
static constexpr unsigned int MAX_OP_RETURN_RELAY = 0;
```

### Keep Changes Isolated

Make separate commits for each policy change:

```bash
git commit -m "policy: Restore OP_RETURN limit"
git commit -m "policy: Increase dust threshold"
git commit -m "policy: Disable bare multisig"
```

This makes it easier to:
- Understand what changed
- Cherry-pick specific changes
- Resolve conflicts during updates

## Publishing Your Fork (Optional)

If you want others to use your fork:

### Create a GitHub Repository

```bash
# Create repo on GitHub first, then:
git remote add myfork https://github.com/yourusername/bitcoin-mypolicy.git
git push -u myfork my-policy-fork
```

### Document for Users

Create a clear README:

```markdown
# Bitcoin Core + Policy Tweaks

This is a minimal fork of Bitcoin Core with the following changes:
- Restored 83-byte OP_RETURN limit (pre-v30 default)

## Compatibility
100% consensus compatible with Bitcoin Core. Same blocks, same chain.

## Building
Same as Bitcoin Core. See doc/build-*.md

## Differences from Core
See doc/my-policy-changes.md
```

## Why Knots Instead?

After going through this process, you might appreciate why Bitcoin Knots exists:

| DIY Fork | Bitcoin Knots |
|----------|---------------|
| You maintain it | Luke Dashjr maintains it |
| You handle security updates | Tracks Core security fixes |
| Single policy change | Many useful options |
| Your testing only | Community tested |
| No GUI improvements | Dark mode, mempool stats, etc. |

**Knots already includes the OP_RETURN limit** (and makes it configurable):

```ini title="bitcoin.conf (Knots)"
# Knots: Set OP_RETURN limit (default respects traditional limit)
datacarriersize=83

# Or use Core-compatible unlimited policy
corepolicy=1
```

## See Also

- [OP_RETURN Controversy](/guides/op-return-controversy) — Why this matters
- [Differences from Core](/getting-started/differences-from-core) — What Knots changes
- [Configuration Options](/reference/configuration-options) — All Knots options
- [Bitcoin Core Build Docs](https://github.com/bitcoin/bitcoin/tree/master/doc) — Official build instructions
