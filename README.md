[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![codecov](https://codecov.io/gh/RomainGuarinoni/mastermind/branch/main/graph/badge.svg?token=LZUKNQGFTZ)](https://codecov.io/gh/RomainGuarinoni/mastermind)

# Mastermind

> A mastermind game built with web technologies

## Built with

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Typescript](https://www.typescriptlang.org/)
- [Webpack](https://webpack.js.org/)
- [Babeljs](https://babeljs.io/)

## Developement

1. Clone the project

_Using hhtps_

```sh
git clone https://github.com/RomainGuarinoni/mastermind.git
```

_Using ssh_

```sh
git clone git@github.com:RomainGuarinoni/mastermind.git
```

2. Install npm dependencies

```sh
npm install
```

3. Run the project in developement mode

_This command will start the project and open a page in your web browser
automatically with live reloading enabled_

```sh
npm start
```

## Build the project

The project is built using webpack and babel.

Run this command to build the project under the `dist` folder :

```sh
npm run build
```

### Babel

Babel transposes typescript files into javascript supported by the major
browsers. This allows us to use the latest typescript and javascript features
without worrying about browser support.

### Webpack

Webpack is a module bundler, it builds the code by taking all the files and
generate a single compiled file. It allows us to use `import/export` statements
in our code. Moreover, it allows us to build our css and auto inject `<link>`
tag in our html file.

## How to contribute

### Writing issue

If you want to request a feature or report a bug, just write a
[new issue](https://github.com/RomainGuarinoni/mastermind/issues/new/choose) and
choose the best template to describe your request.

### Contribute as a developper

If you want to write code in this project and make participate in its
developement, follow these steps :

1. Create a new branche from the `main` one and give it an explicit name, E.g:

```sh
git checkout -b "feat/myfeature"
```

2. Open a pull request as soon as possible to tell the dev team what you're
   working on

3. When you finished you finished your featuren, rebase your branch on the
   `main` one :

```sh
git fetch --all
git rebase origin/main
```

4. Add reviewers to your pull request and wait for reviews

#### Git hooks

We are using husky to run pre-commit and commit-msg hooks (to run test, linter,
formatter etc...).

If GitHub warn you that git hooks are skipper, run these command in the root of
the project :

```sh
chmod ug+x .husky/*
chmod ug+x .git/hooks/*

```

## Authors

- [Romain Guarinoni](https://github.com/RomainGuarinoni)
- [Guillaume Faure](https://github.com/Guillaume-FAURE)
