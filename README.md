# TARDIS Webtool

## Project Description

The goal of this project is giving easier access to cobald/tardis resources through a webinterface.
The app is a single page application with a [REST backend](https://github.com/haasal/tardis/tree/master/tardis/rest) written in python/fastapi.

## Tooling

As the main framework we use *vue* + *vite*.
For styling *tailwindcss* is used as a css framework.
Routing: *vue router*
Testing: See [below](#testing)
Api calls: *axios*
The whole project is written almost exclusively in *typescript* (Don't use anything else for src files).
State Management: *pinia* with persistent stores plugin

## Development environment

Almost everything you need for development *should* be included in the project.
VSCode is highly recommended as the dev environment. When opening the project in vscode you should be prompted by vscode to install all recommended extensions.

## Running the project

As of now the app is still in development. Thus it is run with the vite dev server:

```sh
npm run dev
```

The vite proxy settings are configured to a REST API running on `http://localhost:4321`. Make this setting lines up with the REST API config.

## Testing

There are multiple frameworks in use for testing:

**vitest** for simple unit tests
**vue testing library** for isolated component testing
**cypress** for E2E testing

To run tests there are multiple possibilities:

```sh
npm run test
```

for simple continuous cli testing.

```sh
npm run test:cov
```

for continuous cli testing with coverage results (cov results are also saved in a separate directore and can be viewed in the browser).

```sh
npm run test:ui
```
for an additional ui webinterface.
To open cypress:

```sh
npm run cypress:open
```

[These](https://vuejs.org/guide/scaling-up/testing.html#component-testing) recommendations for testing will be used in this project.
That means:

- unit testing for logic only *.ts* files like util
- semi-isolated component testing with minimal mocking with the vue testing library.
  - These tests should be used to test general behaviour of components and not specific implementation details.
- E2E testing with working backend and fully rendered page.
  - This should test the whole UX including properly rendered DOM elements etc.

## Linting and formatting

Disclaimer: Linting currently doesn't work as I was unable to find a proper configuration that works with Tailwind, Vue and Prettier.

Prettier is used for formatting. Simply enable `formatOnSave` in your vscode settings JSON.
There is a linter script for ESLint but I still have to figure out some issues before it's ready to use.

```sh
npm run lint:[fix]
```

Use the fix variant to also automatically try to fix all fixable linting issues. Some linting error defaults were disabled as they are really hard to follow and slow down development too much. See [the config](./.eslintrc.json) for further details.

## Contributing

This project uses conventional commits as its commit standard.
Simply use the recommended vscode extension to make the use of conventional commits easier.
At this point the scopes aren't strictly defined anywhere as there it's not yet possible to add a description to the scopes in `settings.json`.
In the future a new text document will be commited into the repo that defines all scopes correctly.

## The Result Type

When possible e.g. in very low level functions like api calls, never throw errors but instead use the custom `Result<T>` type defined in [util](./src/util.ts).
Only try/catch or handle the error with the Result api (`unwrap()`, `expect()`, ...) the error when the situation is fitting or the actual value is needed.
Make sure functions don't throw in unexpected places.

