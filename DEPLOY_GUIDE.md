# sweet-diagram npm Deployment Guide

This guide explains how to deploy the sweet-diagram package to npm.

## 🚀 Pre-deployment Requirements

### 1. Create npm Account

- Create an account at [npmjs.com](https://www.npmjs.com/)
- Complete email verification

### 2. npm Login

Log in to npm via terminal:

```bash
npm login
```

### 3. Check Package Name Availability

Verify that the package name is available on npm:

```bash
npm search sweet-diagram
```

## 📦 Deployment Process

### Step 1: Build Testing

```bash
# Build library
npm run build:lib

# Verify package configuration
npm pack --dry-run
```

### Step 2: Run Tests

```bash
# Lint check
npm run lint

# Unit tests
npm run test:run

# E2E tests (optional)
npm run test:e2e
```

### Step 3: Version Update

```bash
# Patch version (0.1.0 -> 0.1.1)
npm run version:patch

# Minor version (0.1.0 -> 0.2.0)
npm run version:minor

# Major version (0.1.0 -> 1.0.0)
npm run version:major
```

### Step 4: npm Deployment

```bash
# Execute deployment
npm run publish:npm

# Or direct command
npm publish
```

## 🔧 Automated Deployment Scripts

### One-click Deployment (Patch Version)

```bash
# Test → Build → Version Up → Deploy
npm run version:patch && npm run publish:npm
```

### Manual Step-by-step Deployment

```bash
# 1. Run all tests
npm run test:all

# 2. Build library
npm run build:lib

# 3. Update version
npm version patch

# 4. Publish
npm publish
```

## 📋 Pre-deployment Checklist

- [ ] Verify all tests pass
- [ ] Ensure README.md is updated with latest information
- [ ] Verify package.json version is correct
- [ ] Confirm LICENSE file exists
- [ ] Check .npmignore excludes unnecessary files
- [ ] Verify built dist folder exists

## 🚨 Important Notes

### 1. Package Name Conflicts

- If the package name is already in use on npm, you must use a different name
- Current package name: `sweet-diagram`

### 2. Version Management

- npm does not allow publishing the same version twice
- Always update the version before deployment

### 3. File Size

- Current package size: 1.3 MB (compressed)
- Verify no large files are included

## 🔄 Update Deployment

When updating an existing package:

```bash
# 1. Commit changes
git add .
git commit -m "feat: add new features"

# 2. Update version
npm version patch  # or minor, major

# 3. Deploy
npm publish

# 4. Push tags to Git
git push origin main --tags
```

## 📊 Post-deployment Verification

### 1. Verify on npm Website

Check that the package was deployed successfully at [https://www.npmjs.com/package/sweet-diagram](https://www.npmjs.com/package/sweet-diagram).

### 2. Installation Test

Test installation in a new project:

```bash
mkdir test-sweet-diagram
cd test-sweet-diagram
npm init -y
npm install sweet-diagram
```

### 3. Usage Test

```jsx
// test.js
import { SweetDiagram } from "sweet-diagram";
console.log("sweet-diagram installation successful!");
```

## 📈 Deployment Statistics

After deployment, you can check npm statistics:

- Download count
- Dependency information
- Version history

## 🛠 Troubleshooting

### Permission Error

```bash
npm ERR! code E403
npm ERR! 403 Forbidden
```

→ Check npm login status and re-login if necessary

### Package Name Conflict

```bash
npm ERR! code E409
npm ERR! 409 Conflict
```

→ Change the name in package.json to a different name

### Network Error

```bash
npm ERR! network
```

→ Check internet connection and npm registry status

### Authentication Error

```bash
npm ERR! code ENEEDAUTH
```

→ Run `npm login` and authenticate again

## 🔐 Security Considerations

### 1. Two-Factor Authentication

Enable 2FA on your npm account for security:

```bash
npm profile enable-2fa auth-and-writes
```

### 2. Access Tokens

Use access tokens for CI/CD:

```bash
npm token create --read-only
```

### 3. Package Verification

Always verify the package contents before publishing:

```bash
npm pack
tar -tf *.tgz
```

## 📚 Additional Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [npm CLI Documentation](https://docs.npmjs.com/cli/)

## 🎯 Release Strategy

### Development Releases

Use pre-release versions for development:

```bash
npm version prerelease --preid=beta
npm publish --tag beta
```

### Stable Releases

Follow semantic versioning for stable releases:

- **Patch**: Bug fixes, backward compatible
- **Minor**: New features, backward compatible
- **Major**: Breaking changes

### Release Notes

Always include release notes in your commits:

```bash
git commit -m "feat: add new connector types

- Added curved connector support
- Improved arrow positioning
- Fixed animation performance"
```

---

Happy Publishing! 🚀
