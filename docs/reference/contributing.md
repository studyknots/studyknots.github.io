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

Translations follow the upstream Bitcoin Core translation process — see [doc/translation_process.md](https://github.com/bitcoinknots/bitcoin/blob/29.x-knots/doc/translation_process.md) in the repository. (Recent releases note that translation updates are currently disrupted by issues with the shared Bitcoin Transifex repository.)

## Getting Started

### 1. Fork the Repository

Fork [bitcoinknots/bitcoin](https://github.com/bitcoinknots/bitcoin) on GitHub, then clone **your fork** and add the main repository as upstream:

```bash
git clone https://github.com/YOUR_USERNAME/bitcoin.git
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

### 4. Build and Test

Bitcoin Knots uses CMake:

```bash
# Build
cmake -B build
cmake --build build -j$(nproc)

# Run unit tests
ctest --test-dir build

# Run functional tests
build/test/functional/test_runner.py
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
