# sweet-diagram Testing Guide

## Overview

This document describes the testing environment and pre-deployment testing procedures for the sweet-diagram library.

## Test Environment Setup

### Tools Used

- **Vitest**: Fast and modern testing framework
- **@testing-library/react**: React component testing
- **@testing-library/jest-dom**: DOM matcher extensions
- **jsdom**: Browser environment simulation
- **Playwright**: E2E testing and visual testing

### Configuration Files

- `vite.config.js`: Includes Vitest configuration
- `src/test/setup.js`: Test environment initialization
- `playwright.config.js`: E2E test configuration

## Visual Verification on Actual Screen

### 1. Direct Browser Verification

Check directly in browser after starting development server:

```bash
# Start development server
npm run dev

# Access in browser
http://localhost:5173
```

### 2. Component Showcase Page

Dedicated page to view all components at once:

```
http://localhost:5173/showcase
```

What you can verify on this page:

- Visual rendering of all 3D components
- Mouse interactions (rotation, zoom, pan)
- WebGL rendering quality
- Responsive layout
- Individual component tests

### 3. E2E Visual Testing

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run all E2E tests
npm run test:e2e

# Run tests with browser window visible (headed mode)
npm run test:e2e:headed

# Run specific tests only
npm run test:visual        # Visual tests
npm run test:components    # Component tests

# Test UI mode (interactive)
npm run test:e2e:ui
```

### 4. Automatic Screenshot Generation

Screenshots automatically generated during E2E test execution:

- `test-results/main-page.png`: Main page
- `test-results/desktop-view.png`: Desktop view
- `test-results/tablet-view.png`: Tablet view
- `test-results/mobile-view.png`: Mobile view
- `test-results/canvas-render.png`: Canvas rendering
- `test-results/box-component.png`: Box component
- `test-results/arrow-component.png`: Arrow component
- Other component-specific screenshots

## Test Scripts

### Basic Test Commands

```bash
# Run all tests
npm test

# Run tests once (for CI)
npm run test:run

# Test watch mode
npm run test:watch

# Test UI mode
npm run test:ui

# Test with code coverage
npm run test:coverage
```

### E2E Test Commands

```bash
# All E2E tests
npm run test:e2e

# Browser window display mode
npm run test:e2e:headed

# E2E test UI mode
npm run test:e2e:ui

# Visual tests only
npm run test:visual

# Component tests only
npm run test:components

# All tests (unit + E2E)
npm run test:all
```

### Pre-deployment Testing

```bash
# Complete pre-deployment validation (lint + test + build)
npm run prepublishOnly
```

## Test Structure

### 1. Unit Tests (`src/test/`)

- `exports.test.js`: Component export tests
- `SweetDiagram.test.jsx`: Main component tests
- `DiagramComponents.test.jsx`: Diagram component tests
- `build.test.js`: Build file validation

### 2. E2E Tests (`src/test/e2e/`)

- `visual.spec.js`: Visual tests
- `components.spec.js`: Detailed component tests

### 3. Visual Verification (`src/test/`)

- `ComponentShowcase.jsx`: Component showcase page

## Visual Testing Checklist

### Items to verify in web browser:

1. **Page Loading**

   - ✅ Does the page load quickly?
   - ✅ Are there no errors during loading?

2. **3D Rendering**

   - ✅ Is the Canvas element displayed properly?
   - ✅ Is the WebGL context initialized?
   - ✅ Are 3D components rendered correctly?

3. **Mouse Interactions**

   - ✅ Can you rotate with mouse drag?
   - ✅ Can you zoom with mouse wheel?
   - ✅ Can you pan with right-click drag?

4. **Responsive Design**

   - ✅ Does it work properly on various screen sizes?
   - ✅ Do touch gestures work on mobile?

5. **Navigation**

   - ✅ Does page navigation work properly?
   - ✅ Do back/forward buttons work?

6. **Performance**
   - ✅ Is the frame rate smooth? (60fps)
   - ✅ Are there no memory leaks?

## Test Coverage

Current test coverage:

- **Overall**: 18%
- **Main export files**: 100%
- **Component definitions**: 100%

### Coverage Exclusions

- `node_modules/`
- `dist/`
- `coverage/`
- `test-results/`
- `playwright-report/`
- `public/`

## Manual Testing Steps

### 1. Development Server Test

```bash
npm run dev
```

Visit `http://localhost:5173` and verify:

- Page loads without errors
- All components render correctly
- Mouse interactions work smoothly

### 2. Build Test

```bash
npm run build:lib
```

Verify:

- Build completes without errors
- Dist folder is created
- Bundle size is reasonable

### 3. Package Test

```bash
npm pack --dry-run
```

Verify:

- Package includes all necessary files
- No unnecessary files are included
- Package size is appropriate

## Continuous Integration

Tests are automatically run on:

- Pull requests
- Main branch pushes
- Release deployments

CI includes:

- Linting checks
- Unit tests
- E2E tests
- Build verification

## Troubleshooting

### Common Issues

1. **Test Timeouts**

   - Increase timeout in playwright.config.js
   - Check for infinite loops in components

2. **Visual Regression**

   - Update baseline screenshots if intentional
   - Review component changes

3. **Flaky Tests**

   - Add proper wait conditions
   - Use stable selectors

4. **Memory Issues**
   - Check for memory leaks in components
   - Properly clean up event listeners
