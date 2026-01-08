---
sidebar_position: 5
title: Troubleshooting
description: Common issues and solutions for Bitcoin Knots
---

# Troubleshooting

Solutions to common Bitcoin Knots issues.

## Startup Issues

### Node Won't Start

**Check for existing process:**
```bash
pgrep -a bitcoind
```

**Check logs:**
```bash
tail -100 ~/.bitcoin/debug.log
```

**Common causes:**
- Another instance running
- Corrupted data directory
- Permission issues
- Port already in use

### Data Directory Errors

```bash
# Check permissions
ls -la ~/.bitcoin/

# Fix permissions
chmod -R 700 ~/.bitcoin/
```

### Port Already in Use

```bash
# Find what's using port 8333
lsof -i :8333

# Use different port
bitcoind -port=8334
```

## Sync Issues

### Sync Stalled

1. Check connection:
   ```bash
   bitcoin-cli getconnectioncount
   ```

2. Add nodes manually:
   ```bash
   bitcoin-cli addnode "seed.bitcoin.sipa.be" onetry
   ```

3. Increase dbcache:
   ```ini title="bitcoin.conf"
   dbcache=4000
   ```

### Very Slow Sync

- Use SSD storage
- Increase `dbcache` (50-75% of available RAM)
- Ensure stable network connection
- Disable other disk-intensive processes

## Memory Issues

### High Memory Usage

```ini title="bitcoin.conf"
dbcache=1000
maxmempool=100
maxconnections=20
```

### Out of Memory

Reduce `dbcache` and `maxmempool` values.

## Disk Issues

### Disk Full

1. Enable pruning:
   ```ini title="bitcoin.conf"
   prune=5000
   ```

2. Or move data directory:
   ```bash
   bitcoind -datadir=/new/location
   ```

### Slow Disk I/O

- Use SSD
- Increase dbcache (caches more in RAM)
- Check disk health: `smartctl -a /dev/sda`

## RPC Issues

### Connection Refused

Ensure server mode is enabled:
```ini title="bitcoin.conf"
server=1
```

Check RPC is running:
```bash
bitcoin-cli -getinfo
```

### Authentication Failed

Verify credentials match:
```ini title="bitcoin.conf"
rpcuser=youruser
rpcpassword=yourpassword
```

### Remote RPC Not Working

```ini title="bitcoin.conf"
rpcbind=0.0.0.0
rpcallowip=192.168.1.0/24
```

## Wallet Issues

### Wallet Not Found

List available wallets:
```bash
bitcoin-cli listwalletdir
```

Load wallet:
```bash
bitcoin-cli loadwallet "walletname"
```

### Transaction Not Broadcasting

1. Check mempool acceptance:
   ```bash
   bitcoin-cli testmempoolaccept '["rawtx"]'
   ```

2. Check fee rate is sufficient

3. Check connection count

## Network Issues

### No Incoming Connections

1. Check port forwarding
2. Enable UPnP (Knots):
   ```ini title="bitcoin.conf"
   upnp=1
   ```
3. Configure firewall

### Tor Not Working

```ini title="bitcoin.conf"
# Use Knots embedded Tor
torsubprocess=1

# Or manual Tor
proxy=127.0.0.1:9050
```

## Debug Logging

Enable verbose logging:
```ini title="bitcoin.conf"
debug=net
debug=mempool
debug=rpc
debug=validation
```

View logs in real-time:
```bash
tail -f ~/.bitcoin/debug.log
```

## Getting Help

- GitHub Issues: [github.com/bitcoinknots/bitcoin/issues](https://github.com/bitcoinknots/bitcoin/issues)
- Debug log: `~/.bitcoin/debug.log`
- Configuration: `bitcoin-cli -getinfo`

## See Also

- [Configuration Guide](/guides/configuration) - Configuration options
- [FAQ](/reference/faq) - Frequently asked questions
