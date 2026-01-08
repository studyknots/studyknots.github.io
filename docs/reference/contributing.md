---
sidebar_position: 5
title: Contributing
description: How to contribute to Bitcoin Knots
---

# Contributing to Bitcoin Knots

Bitcoin Knots welcomes contributions from the community.

## Ways to Contribute

### Code Contributions

- Bug fixes
- New features
- Performance improvements
- Test coverage

### Documentation

- Improve existing docs
- Add new guides
- Fix typos and errors

### Testing

- Test new releases
- Report bugs
- Verify fixes

### Translation

Help translate the interface (when Transifex access is restored).

## Getting Started

### 1. Fork the Repository

```bash
git clone https://github.com/bitcoinknots/bitcoin.git
cd bitcoin
git remote add upstream https://github.com/bitcoinknots/bitcoin.git
```

### 2. Create a Branch

```bash
git checkout 29.x-knots
git checkout -b my-feature
```

### 3. Make Changes

Follow the coding style of the existing codebase.

### 4. Test

```bash
make check
./test/functional/test_runner.py
```

### 5. Commit

```bash
git add .
git commit -m "component: Brief description of change"
```

### 6. Push and Create PR

```bash
git push origin my-feature
```

Then create a pull request on GitHub.

## Coding Standards

- Follow existing code style
- Write tests for new functionality
- Update documentation as needed
- Keep commits focused and atomic

## Commit Messages

Format:
```
component: Brief description

Longer explanation if needed.
```

Examples:
```
wallet: Add sweepprivkeys RPC command
policy: Implement dynamic dust threshold
qt: Add dark mode support
```

## Review Process

1. Maintainer reviews changes
2. Automated tests run
3. Feedback addressed
4. Changes merged or refined

## Issue Reporting

### Before Reporting

- Check existing issues
- Verify with latest version
- Gather debug information

### What to Include

- Bitcoin Knots version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Debug log snippets

### Where to Report

[github.com/bitcoinknots/bitcoin/issues](https://github.com/bitcoinknots/bitcoin/issues)

## Communication

- GitHub Issues for bugs/features
- Pull Requests for code
- Mailing list for announcements

## License

Contributions are licensed under MIT, consistent with the project license.

## See Also

- [Build System](/architecture/build-system) - Building from source
- [Patch Management](/architecture/patch-management) - How patches work
