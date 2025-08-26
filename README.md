# ESLint + cSpell + Commitlint + Lefthook Template

A template for quick project startup with configured code quality tools and
automated testing.

## 📦 Installation and Usage

### 🧩 Customization

- Remove anything you don't need (packages, rules, scripts, docs)
- Use AI to speed up onboarding and edits:
  - **Cursor AI / Continue.dev** — code understanding, refactors, quick edits
  - **MCP Context7 + BrowserMCP** — fetch up-to-date docs and examples

### Quick Start

```bash
# Enable Corepack
corepack enable

# Clone repository
git clone <repository-url>
cd eslint-cspell-commitlint-lefthook-template

# Install dependencies
yarn install

# Install Git hooks
yarn lefthook install
```

### Testing Template Projects

#### Automated Testing via Lefthook

```bash
# Full CI testing (including builds)
yarn lefthook run ci
```

#### Manual Testing

```bash
# Code quality checks
yarn check-eslint-all
yarn check-prettier-all
yarn check-cspell-all
yarn test

# Build projects
yarn workspace @some-name/trpc-service build
yarn workspace @some-name/vite-mantine-vanilla-extract build

# Run in development mode
yarn workspace @some-name/trpc-service start
yarn workspace @some-name/vite-mantine-vanilla-extract dev
```

## 🚀 Features

### Code Quality Tools

- **ESLint** — JavaScript/TypeScript linting with custom rules
- **Prettier** — automatic code formatting
- **cSpell** — spell checking in comments
- **Commitlint** — commit message validation
- **Lefthook** — Git hooks management and automation

### Flat ESLint Config

- Uses the modern
  [Flat ESLint](https://eslint.org/docs/latest/extend/plugin-migration-flat-config)
  configuration format
- Based on
  [eslint-canonical-config](https://github.com/gajus/eslint-config-canonical)

### Project Structure

- **Yarn Workspaces** — monorepo with multiple packages
- **Corepack** — package manager version management
  - https://yarnpkg.com/corepack
  - https://yarnpkg.com/blog/release/4.0
  - https://nodejs.org/api/corepack.html
- **TypeScript** — strict typing across all packages

### Template Projects

- **`@some-name/trpc-service`** — tRPC backend service
- **`@some-name/vite-mantine-vanilla-extract`** — React frontend with Vite +
  Mantine
- **`@some-name/tsconfig`** — shared TypeScript configuration

## 🛠️ Custom ESLint Rules

### Empty Lines Formatting

Automatic empty lines management for better code readability.

### React Components

#### Props Interfaces

Automatic replacement of `type` with `interface` for React Props.

```ts
// Bad example
type BadInputProps = ComponentPropsWithRef<'input'> & {
  type: number; // no error and <input /> gets an invalid property :(
};

// Good example
interface GoodInputProps extends ComponentPropsWithRef<'input'> {
  type: number; // TypeScript error :)
}
```

#### Display Name

Automatic addition of `displayName` for React DevTools
([docs](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md)).

```ts
// you write only
YourComponent.displayName = '';
```

```ts
// after auto-fix
YourComponent.displayName = 'YourComponent';
```

### JSDoc Rules

Rules for correct JSDoc comment formatting.

## 🔧 Recommended Tools

### Backend

- **[tsx](https://www.npmjs.com/package/tsx)** — easiest way to run TypeScript
  in Node.js
- **[pkgroll](https://www.npmjs.com/package/pkgroll)** — the zero-config package
  bundler used by tsx!
- **[tRPC](https://www.npmjs.com/package/@trpc/server)** — end-to-end typesafe
  APIs

### Frontend

- **[Vite](https://www.npmjs.com/package/vite)** — next generation frontend
  tooling
- **[Next.js](https://www.npmjs.com/package/next)** — The React Framework for
  the Web
- **[Mantine](https://mantine.dev/)** — React UI library
- **[Vanilla Extract](https://www.npmjs.com/package/@vanilla-extract/css)** —
  CSS-in-TypeScript

### Testing

- **[Vitest](https://www.npmjs.com/package/vitest)** — fast testing framework

## 📁 Project Structure

```
├── eslint/                 # Custom ESLint rules
│   ├── empty-lines/       # Empty lines rules
│   ├── jsdoc/            # JSDoc rules
│   └── react/            # React-specific rules
├── packages/              # Template projects
│   ├── trpc-service/     # tRPC backend
│   ├── vite-mantine-ve/  # React frontend
│   └── tsconfig/         # Shared TS config
├── tests/                # ESLint rule tests
├── lefthook.yml          # Git hooks configuration
├── eslint.config.js      # ESLint configuration
└── commitlint.config.ts  # Commitlint configuration
```

## 🤝 Development

### Adding New ESLint Rules

1. Create rule in `eslint/`
2. Add tests in `tests/`
3. Update `eslint.config.js`

### Adding New Packages

1. Create folder in `packages/`
2. Add `package.json` with correct name
3. Update tests in lefthook

### Git Hooks

Project uses Lefthook for automation:

- **pre-commit** — linting and formatting
- **commit-msg** — commit message validation
- **ci** — full testing for CI/CD
