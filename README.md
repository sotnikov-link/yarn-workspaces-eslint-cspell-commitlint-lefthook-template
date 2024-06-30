# yarn-workspaces-eslint-cspell-commitlint-lefthook-template

## Features

- Yarn [Workspaces](https://yarnpkg.com/features/workspaces)
- Corepack
  - https://yarnpkg.com/corepack
  - https://yarnpkg.com/blog/release/4.0
  - https://nodejs.org/api/corepack.html

### [Flat ESLint](https://eslint.org/docs/latest/extend/plugin-migration-flat-config)

With awesome
[eslint-canonical-config](https://github.com/gajus/eslint-config-canonical).

#### My ESLint Rules

- JS/TS empty lines for formatting
- Auto-fix `type` to `interface` for React Component Props. Interface uses
  overriding with backward compatibility.

  ```ts
  // Bad example
  type BadInputProps = ComponentPropsWithRef<'input'> & {
    type: number; // no error and input gets invalid property :(
  };

  // Good example
  interface GoodInputProps extends ComponentPropsWithRef<'input'> {
    type: number; // typescript error :)
  }
  ```

- Auto-fix React Component Display Name
  [for React Dev Tools](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md)

  ```ts
  // you write only
  YourComp.displayName = '';
  ```

  ```ts
  // after auto-fix
  YourComp.displayName = 'YourComp';
  ```

## How to use

- `corepack enable`
- `git clone` this repository
- use it or something else
  - [tsx](https://www.npmjs.com/package/tsx) — the easiest way to run TypeScript
    in Node.js
  - [pkgroll]() — the zero-config package bundler used by tsx!
  - [vitest](https://www.npmjs.com/package/vite) — Next generation testing
    framework powered by Vite
  - [trpc](https://www.npmjs.com/package/@trpc/server) — End-to-end typesafe
    APIs
  - Front-end
    - [vite](https://www.npmjs.com/package/vite) — Next Generation Frontend
      Tooling
    - [next](https://www.npmjs.com/package/next) — The React Framework for the
      Web
    - [@vanilla-extract/css](https://www.npmjs.com/package/@vanilla-extract/css) —
      Zero-runtime Stylesheets-in-TypeScript
