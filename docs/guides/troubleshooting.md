---
sidebar_position: 5
title: Troubleshooting
description: Common issues and solutions for Bitcoin Knots
---

# Troubleshooting

This guide covers common Bitcoin Knots issues and their solutions, including Knots-specific scenarios and migration from Bitcoin Core.

## Startup Issues

### Node Won't Start

**Symptom:** `bitcoind` exits immediately or shows no output.

**Step 1: Check for existing process**
```bash
pgrep -a bitcoind
# If running, you'll see the PID
kill <PID>  # Only if you want to stop the existing instance
```

**Step 2: Check debug log**
```bash
# Linux/macOS
tail -100 ~/.bitcoin/debug.log

# Windows
type %APPDATA%\Bitcoin\debug.log | more
```

**Step 3: Run in foreground for verbose output**
```bash
bitcoind -printtoconsole
```

**Common causes and fixes:**

| Cause | Debug Log Message | Fix |
|-------|-------------------|-----|
| Another instance | "Cannot obtain a lock" | Stop the other process |
| Corrupted blocks | "Block failed verification" | Use `-reindex` |
| Bad config | "Error reading configuration" | Check bitcoin.conf syntax |
| Permissions | "Unable to open" | Fix with `chmod -R 700 ~/.bitcoin/` |
| Port conflict | "Unable to bind" | Use `-port=8334` |

### Configuration Parse Errors

**Symptom:** "Error reading configuration file"

```bash
# Validate config file (Knots feature)
bitcoin-cli -testconfig

# Common syntax errors:
# - Missing quotes around paths with spaces
# - Using = for boolean options (use option=1 not option=true)
# - Invalid option names
```

**Known Knots-specific options that Core doesn't recognize:**
```ini
# These are valid in Knots but would error in Core:
rejectparasites=1
rejecttokens=1
torsubprocess=1
corepolicy=1
```

### Data Directory Errors

```bash
# Check permissions
ls -la ~/.bitcoin/

# Fix ownership (Linux)
sudo chown -R $(whoami):$(whoami) ~/.bitcoin/

# Fix permissions
chmod -R 700 ~/.bitcoin/

# macOS Application Support
ls -la ~/Library/Application\ Support/Bitcoin/
```

### Port Already in Use

```bash
# Find what's using port 8333
lsof -i :8333    # Linux/macOS
netstat -ano | findstr :8333  # Windows

# Use different port
bitcoind -port=8334 -rpcport=8335
```

## Sync Issues

### Initial Block Download (IBD) Problems

**Expected IBD times** (rough estimates):
| Hardware | Time |
|----------|------|
| NVMe SSD, 32GB RAM | 4-8 hours |
| SATA SSD, 16GB RAM | 12-24 hours |
| HDD | Days to weeks (not recommended) |

**Optimize sync speed:**
```ini title="bitcoin.conf"
# Allocate more RAM to database cache
# Use 50-75% of available RAM during IBD
dbcache=8000

# Disable wallet during IBD (if not needed)
disablewallet=1

# Use block data from multiple peers
# Already the default, but ensure not disabled
blocksonly=0
```

### Sync Stalled at Specific Height

**Check progress:**
```bash
bitcoin-cli getblockchaininfo
```

Look for `verificationprogress` — should increase steadily.

**If stuck:**

1. **Check connections:**
   ```bash
   bitcoin-cli getconnectioncount
   bitcoin-cli getpeerinfo | grep -E '"addr"|"synced_blocks"'
   ```

2. **Add seed nodes manually:**
   ```bash
   bitcoin-cli addnode "seed.bitcoin.sipa.be" onetry
   bitcoin-cli addnode "seed.btc.petertodd.org" onetry
   bitcoin-cli addnode "seed.bitcoin.jonasschnelli.ch" onetry
   ```

3. **Check for banned peers (may have banned good nodes):**
   ```bash
   bitcoin-cli listbanned
   bitcoin-cli clearbanned  # Reset ban list
   ```

4. **Reindex chain state:**
   ```bash
   bitcoind -reindex-chainstate
   ```

### "Block Failed Context-Free Validation"

This usually means corrupted block data. Solutions:

```bash
# Option 1: Reindex (preserves raw blocks, rebuilds databases)
bitcoind -reindex

# Option 2: Reindex chainstate only (faster)
bitcoind -reindex-chainstate

# Option 3: Start fresh (slowest but most thorough)
rm -rf ~/.bitcoin/blocks ~/.bitcoin/chainstate
bitcoind
```

## Memory Issues

### High Memory Usage

Bitcoin Knots (like Core) can use significant RAM. Control with:

```ini title="bitcoin.conf"
# Database cache (default: 450MB)
# Reduce for low-RAM systems
dbcache=300

# Mempool size (default: 300MB)
maxmempool=100

# Connection count
maxconnections=20

# Signature cache
maxsigcachesize=16
```

**Recommended settings by system RAM:**

| RAM | dbcache | maxmempool |
|-----|---------|------------|
| 2GB | 300 | 50 |
| 4GB | 1000 | 100 |
| 8GB | 2000 | 300 |
| 16GB+ | 4000+ | 300-1000 |

### Out of Memory (OOM) Kills

Check if OOM killer terminated bitcoind:
```bash
dmesg | grep -i "killed process"
journalctl -xe | grep oom
```

**Solutions:**
- Reduce `dbcache` and `maxmempool`
- Add swap space (Linux)
- Use `systemd` with memory limits:
  ```ini title="/etc/systemd/system/bitcoind.service"
  [Service]
  MemoryMax=4G
  ```

## Disk Issues

### Disk Full

**Current blockchain size:** ~600GB+ (unpruned)

**Option 1: Enable pruning (reduces to ~5-10GB)**
```ini title="bitcoin.conf"
# Keep 5GB of block data
prune=5000
```

:::warning Pruning Limitations
Pruned nodes cannot:
- Serve historical blocks to peers
- Rescan wallet from genesis
- Use `-txindex`
:::

**Option 2: Move to larger drive**
```bash
# Stop bitcoind first!
mv ~/.bitcoin /new/location/bitcoin
ln -s /new/location/bitcoin ~/.bitcoin
# Or use -datadir=/new/location
```

**Option 3: Use assumeutxo (Knots/Core v29+)**
```bash
# Fast-sync using a UTXO snapshot
# Downloads and validates in background
bitcoind -loadtxoutset=/path/to/snapshot.dat
```

### Slow Disk I/O

**Diagnosis:**
```bash
# Check I/O wait
iostat -x 1 5

# Check disk health
sudo smartctl -a /dev/sda

# Check if using HDD (bad) vs SSD (good)
lsblk -d -o name,rota  # 1=HDD, 0=SSD
```

**Solutions:**
- Use SSD or NVMe (required for good performance)
- Increase `dbcache` to reduce disk reads
- Disable debug logging in production:
  ```ini title="bitcoin.conf"
  shrinkdebugfile=1
  ```

## RPC Issues

### Connection Refused

```bash
# Check if bitcoind is running
bitcoin-cli -getinfo

# Error: "Could not connect to the server"
```

**Fixes:**

1. Enable RPC server:
   ```ini title="bitcoin.conf"
   server=1
   ```

2. Check RPC port:
   ```bash
   # Default: 8332 (mainnet), 18332 (testnet)
   netstat -tlnp | grep bitcoin
   ```

3. Check bitcoind is fully started:
   ```bash
   # Wait for "init message: Done loading"
   tail -f ~/.bitcoin/debug.log | grep -i "done loading"
   ```

### Authentication Failed

**Check credentials:**
```bash
# See what cookie file contains (if using cookie auth)
cat ~/.bitcoin/.cookie

# Or verify rpcuser/rpcpassword match
grep -E "^rpc(user|password)" ~/.bitcoin/bitcoin.conf
```

**Generate new auth credentials:**
```bash
# Knots/Core includes a script
python3 share/rpcauth/rpcauth.py myuser
# Add output to bitcoin.conf
```

### Remote RPC Access

```ini title="bitcoin.conf"
# Bind to all interfaces
rpcbind=0.0.0.0

# Allow specific IPs/subnets
rpcallowip=192.168.1.0/24
rpcallowip=10.0.0.5/32

# IMPORTANT: Never expose RPC to internet without SSL!
```

**For remote access, use SSH tunnel instead:**
```bash
ssh -L 8332:localhost:8332 user@node-server
bitcoin-cli -rpcconnect=127.0.0.1 getinfo
```

## Wallet Issues

### Legacy Wallet Not Loading (Core v30+)

Bitcoin Core v30 removed legacy wallet support. **This is a key reason to use Knots.**

```bash
# Core v30 error:
# "BDB: Legacy wallets are no longer supported"

# Knots solution: Legacy wallets just work
bitcoin-cli loadwallet "mylegacywallet"
```

### Wallet Database Corruption

**Symptoms:**
- "Wallet database is corrupted"
- Transactions missing
- Balance incorrect

**Recovery steps:**

1. **Try loading with salvage:**
   ```bash
   bitcoin-cli loadwallet "walletname" false true  # load_on_startup=false, salvage=true
   ```

2. **Use wallet tool (legacy wallets):**
   ```bash
   bitcoin-wallet -wallet=~/.bitcoin/wallets/mylegacy salvage
   ```

3. **Restore from backup:**
   ```bash
   cp /backup/wallet.dat ~/.bitcoin/wallets/mylegacy/
   bitcoin-cli loadwallet "mylegacy"
   ```

### Transaction Not Broadcasting

**Debug with testmempoolaccept:**
```bash
bitcoin-cli testmempoolaccept '["0200000001..."]'
```

**Common rejection reasons:**

| Reason | Cause | Fix |
|--------|-------|-----|
| "min relay fee not met" | Fee too low | Bump fee or wait |
| "insufficient fee" | Below mempool minimum | Increase fee rate |
| "non-final" | Timelock not reached | Wait for block height/time |
| "mempool full" | Low-fee during congestion | Increase fee |
| "txn-mempool-conflict" | Double spend in mempool | One version already there |

**Knots filtering considerations:**
```bash
# If you're running Knots with filtering, check if that's the issue:
bitcoin-cli getmempoolinfo | grep -E "rejectparasites|rejecttokens"

# Test without filtering
bitcoin-cli -corepolicy=1 testmempoolaccept '["rawtx"]'
```

### Stuck Unconfirmed Transaction

```bash
# Option 1: RBF (Replace-By-Fee) if enabled
bitcoin-cli bumpfee "txid"

# Option 2: CPFP (Child-Pays-For-Parent)
# Spend an output from the stuck tx with high fee

# Option 3: Wait for mempool to clear
# Transactions expire after 2 weeks (default)
```

## Network Issues

### No Incoming Connections

**Check current connections:**
```bash
bitcoin-cli getnetworkinfo | grep -E '"connections|localaddresses"'
```

**Enable incoming connections:**

1. **Use UPnP (Knots feature, restored):**
   ```ini title="bitcoin.conf"
   upnp=1
   ```

2. **Manual port forwarding:**
   - Forward port 8333 (TCP) on your router
   - Point to your node's local IP

3. **Check firewall:**
   ```bash
   # Linux (ufw)
   sudo ufw allow 8333/tcp

   # Linux (firewalld)
   sudo firewall-cmd --add-port=8333/tcp --permanent
   ```

### Tor Connection Issues

**Using Knots embedded Tor (recommended):**
```ini title="bitcoin.conf"
torsubprocess=1
# Knots manages Tor automatically
```

**Manual Tor configuration:**
```ini title="bitcoin.conf"
# Proxy all connections through Tor
proxy=127.0.0.1:9050

# Create hidden service
listenonion=1

# Only connect to .onion addresses
onlynet=onion
```

**Debug Tor issues:**
```bash
# Check if Tor is running
systemctl status tor
# Or
pgrep -a tor

# Check onion address
bitcoin-cli getnetworkinfo | grep onion
```

### Banned by Many Peers

```bash
# Check ban list
bitcoin-cli listbanned

# If suspiciously many bans, might be network issue
# Clear and restart
bitcoin-cli clearbanned
```

## Knots-Specific Issues

### Filtering Blocks Transactions

If transactions you expect aren't appearing:

```bash
# Check if filtering is active
bitcoin-cli getmempoolinfo
```

**Temporarily disable filtering for testing:**
```ini title="bitcoin.conf"
corepolicy=1  # Use Core-compatible policy
```

### Migration from Core to Knots

**Generally seamless — same data directory works:**

1. Stop Bitcoin Core
2. Install Bitcoin Knots
3. Start Knots — uses existing data

**Potential issues:**

| Issue | Cause | Fix |
|-------|-------|-----|
| "Unknown config option" | Core-only option | Remove or update option |
| Wallet won't load | N/A — Knots supports both | Should work |
| Different behavior | Knots defaults | Review [configuration](/guides/configuration) |

### Downgrading from Knots to Core

:::warning Data Compatibility
Core v30+ cannot read legacy wallets. If you have legacy wallets in Knots, export/migrate them first.
:::

```bash
# Before downgrading, migrate wallets if needed:
bitcoin-cli -rpcwallet=mylegacy migratewallet

# Export important data:
bitcoin-cli -rpcwallet=mylegacy dumpwallet "/backup/wallet.txt"
```

## Debug Logging

### Enable Detailed Logs

```ini title="bitcoin.conf"
# Enable specific debug categories
debug=net        # Network activity
debug=mempool    # Transaction acceptance
debug=rpc        # RPC calls
debug=validation # Block validation
debug=tor        # Tor-related (if using)
debug=walletdb   # Wallet database

# Or enable everything (very verbose!)
debug=1
```

### Log File Management

```bash
# View logs in real-time
tail -f ~/.bitcoin/debug.log

# Search for errors
grep -i "error\|warning" ~/.bitcoin/debug.log

# Limit log file size
# Add to bitcoin.conf:
shrinkdebugfile=1
```

### Knots Logging Additions

Knots adds additional logging for:
- Transaction filtering (`debug=mempool`)
- Embedded Tor (`debug=tor`)
- Enhanced GUI events

## Performance Diagnostics

### Check Node Status

```bash
# Comprehensive status
bitcoin-cli -getinfo

# Detailed blockchain info
bitcoin-cli getblockchaininfo

# Network health
bitcoin-cli getnetworkinfo

# Memory pool status
bitcoin-cli getmempoolinfo

# Peer connections
bitcoin-cli getpeerinfo | grep -E '"addr"|"version"|"subver"'
```

### Benchmark Verification Speed

```bash
# Check verification progress
bitcoin-cli getblockchaininfo | grep verificationprogress

# Calculate blocks per second
# Watch the "height" increase over time
watch -n 10 'bitcoin-cli getblockcount'
```

## Getting Help

### Before Asking for Help

Gather this information:
```bash
# Version info
bitcoin-cli --version
bitcoind --version

# Node status
bitcoin-cli -getinfo

# Recent errors
tail -50 ~/.bitcoin/debug.log | grep -i error

# System info
uname -a
free -h
df -h
```

### Resources

- **GitHub Issues:** [github.com/bitcoinknots/bitcoin/issues](https://github.com/bitcoinknots/bitcoin/issues)
- **Bitcoin StackExchange:** [bitcoin.stackexchange.com](https://bitcoin.stackexchange.com)
- **Debug log:** `~/.bitcoin/debug.log`
- **Knots mailing list:** Check bitcoinknots.org

## See Also

- [Configuration Guide](/guides/configuration) — All configuration options
- [FAQ](/reference/faq) — Frequently asked questions
- [Installation](/getting-started/installation) — Installation instructions
- [Mining Guide](/guides/mining) — Mining-specific troubleshooting
