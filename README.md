# Shopbox Product Creation

A modern Angular 19 application for creating and managing products with variants, modifiers, and inventory tracking. Built with standalone components, signals for state management, and Tailwind CSS for styling.

## Features

### Product Creation Form
A comprehensive product creation interface with multiple sections:

- **General Section** - Product name, description, category, filters, and tags
- **Inventory Section** - Stock management, SKU codes, and barcode generation
- **Variant Groups** - Create product variants with unique pricing and inventory
- **Modifiers** - Add mandatory, add-on, and opt-out modifiers to products
- **Sidebar** - Product visibility, pricing, and tax configuration

### Key Functionality

#### Variant Groups
- Start with an empty state showing a call-to-action
- Add predefined variant groups with sample data on click
- Each variant supports:
  - Enable/disable toggle
  - Unique pricing (variant price, purchase price, take-away price)
  - SKU and barcode generation
  - Expandable/collapsible details
- Visual feedback when a new group is added (auto-dismisses after 3 seconds)

#### Modifiers
- Three modifier categories: Mandatory, Add-on, and Opt-out
- Empty state with call-to-action when no modifiers exist
- Add predefined modifier categories sequentially
- Modifier groups with selectable options and pricing
- Standalone modifiers support
- Visual feedback on addition (auto-dismisses after 3 seconds)
- **Cypress E2E tests** cover real user product creation flows (minimal, full-featured, validation, and reset scenarios)

### Shared Components
Reusable UI components in `shared/components/`:
- `TextInputComponent` - Text input with label and validation
- `TextareaComponent` - Multi-line text input
- `SelectComponent` - Dropdown select
- `SelectWithToggleComponent` - Select with toggle switch
- `CheckboxComponent` - Checkbox input
- `RadioGroupComponent` - Radio button group
- `InputWithButtonComponent` - Input with action button (e.g., generate SKU)

## Tech Stack

- **Angular 19** - Latest Angular with standalone components
- **TypeScript** - Strict type checking enabled
- **Tailwind CSS 4** - Utility-first CSS framework
- **Signals** - Angular's reactive primitive for state management
- **Karma/Jasmine** - Unit testing framework

## Project Structure

```
src/app/
├── core/                    # Core services and models
├── features/
│   └── product-create/      # Product creation feature
│       ├── sections/
│       │   ├── general/     # General product info
│       │   ├── inventory/   # Inventory management
│       │   ├── modifiers/   # Product modifiers
│       │   ├── sidebar/     # Product settings sidebar
│       │   └── variant-groups/  # Product variants
│       └── services/
├── layout/
│   └── header/              # App header component
└── shared/
    ├── components/          # Reusable UI components
    ├── directives/
    └── pipes/
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Development Server

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The app auto-reloads on file changes.

### Running Tests

```bash
npm test
# or
ng test
```

### E2E Tests (Cypress)

End-to-end (E2E) tests verify complete product creation workflows in a real browser environment.

#### Running E2E tests:

```
npx cypress open  # Interactive mode
npx cypress run   # Headless/CI mode
```

By default, E2E tests are located in `cypress/e2e/`.

#### Key scenarios covered:
- Minimal product creation (required fields only)
- Complete product with variants and modifiers
- Form validation (required fields, price constraints)
- Creating multiple products (form resets and usability)

## Unit Tests

Comprehensive unit tests are included for all major components:

### Variant Groups (`variant-groups.component.spec.ts`)
- Component creation and initial state
- Section expand/collapse functionality
- Adding predefined variant groups sequentially
- Toggling variant group expansion
- Toggling variant enable/disable
- Toggling unique price and custom price options
- Removing variants from groups

### Modifiers (`modifiers.component.spec.ts`)
- Component creation and initial state
- Section expand/collapse functionality
- Adding predefined modifier categories (Mandatory, Add-on, Opt-out)
- Toggling category expansion
- Toggling modifier option selection
- Removing modifier groups and standalone modifiers
- Price formatting validation

### Inventory (`inventory.component.spec.ts`)
- Component creation and initial state
- Section expand/collapse functionality
- Stock tracking toggle
- Inventory management options

### General Section (`general.component.spec.ts`)
- Component creation
- Product filters functionality
- Product tags management

### Building for Production

```bash
npm run build
# or
ng build
```

Build artifacts are stored in the `dist/` directory.

## Angular Best Practices Used

- ✅ Standalone components (no NgModules)
- ✅ Signals for reactive state management
- ✅ `ChangeDetectionStrategy.OnPush` for performance
- ✅ `input()` and `output()` functions instead of decorators
- ✅ Native control flow (`@if`, `@for`, `@switch`)
- ✅ `inject()` function instead of constructor injection
- ✅ Reactive forms
- ✅ Lazy loading ready architecture

## License

Private project - All rights reserved.
