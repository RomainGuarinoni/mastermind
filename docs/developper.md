# Developper documentation

> This documention contains every details of the project architecture, the
> guidlines to contribute and the roadmap of the project

## table of content

- [Project set up](#set-up-project)
  - [Pre requesite](#pre-requesite)
  - [Clone the project](#clone-the-project)
  - [Install npm dependencies](#install-npm-dependencies)
- [Run the project](#run-the-project)
  - [Dev mode](#dev-mode)
  - [Build the project](#build-the-project)
- [Architecture](#architecture)
  - [Webpack](#webpack)
  - [Babel](#babel)
  - [Eslint](#eslint)
  - [Prettier](#prettier)
  - [jest](#jest)
  - [Jsdocs](#jsdocs)
  - [Husky](#husky)
    - [Pre commit](#pre-commit)
    - [Commit msg](#commit-msg)
  - [GitHub actions](#github-actions)
- [Contribute guidelines](#contribute-guidelines)
  - [Contribute to the project](#contribute-to-the-project)
  - [Add a feature](#add-a-feature)
- [Roadmap](#roadmap)

## Project set up

### Pre requesite

This project is based on Node.js and npm as the package manager, so you need to
have node install on your local machine. You can download it
[here](https://nodejs.org/en/download/)

### Clone the project

This project is open source and hosted on GitHub. Fork the repo or clone it as
below:

Https:

` git clone https://github.com/RomainGuarinoni/mastermind.git`

SSH:

`git@github.com:RomainGuarinoni/mastermind.git`

### Install npm dependencies

This project use npm to manage dependencies. To install them, follow theses
commands :

```sh
cd mastermind

npm install
```

## Run the project

This project use [webpack](https://webpack.js.org/) to bundle the code and
generate a dist folder with the bundle files.

### Dev mode

We use `webpack-dev-server` to serve the website with hot module replacement
while developing. Just run the following command :

```sh
npm run start
```

It will automatically lunch your browser and serve the app on the
`http://localhost:8081`. The website will re build with the hot module
replacement when any changes are detected in the src files.

### Build the project

To build the project and create a `/dist` folder with all the app files compiled
and bundled, just run the following command :

```sh
npm run build
```

First, `tsc` will verify that there is no types error in the `.ts` files and, if
not, it will generate the `.d.ts` for each module of the application.

Then, webpack will bundle all the `.ts` files, create source-map for `.ts` and
`.css` files, and will auto inject the `<link>` tag in the `index.html` header.
It will also copy all static files such as `assets` and `manifest.json`. You can
see all the configuration of webpack in the `webpack.config.js` in the root of
the project

## Architecture

> This section describe the global architecture of the project and the different
> tools we use in the developement

### Webpack

We use webpack to bundle all our `.ts` files in one unique `bundle.js` file
containing all the `js` code of the application.

Basically, webpack resolve all the import of an application based on a entry
files, here the `/src/index.ts`.

We need to use webpack because the browsers cannot resolve import itself. That's
why we need to have a single `.js` file.

we use these webpack module :

- `MiniCssExtractPlugin` and `css-loader` to extracts CSS into separate files
  and interprets @import and url() like import/require() and resolve them
- `babel-loader`to transpile the JavaScript files using Babel. See the
  [Babel section](#babel)

We also use these webpack plugins :

- `htmlWebpackPlugin` to simplify the creation of HTML files to serve the js
  bundles. It will automaticcaly add the `link` tag with the src of the bundle
  files.
- `CopyPlugin` to copy static files in the dist folder such as the assets and
  the manifest.json

### Babel

We use babel to transpile our `.ts` files to `.js`. We use the preset
`preset-env` to simplify the configuration of babel. Indeed, it will transpile
our code based on the `browserslist`, `compat-table`, and
`electron-to-chromium`.

### Eslint

We use eslint to analyse our code and identify problematic patterns found in
JavaScript code. You can find the configuration of eslint in the file
`.eslintrc` in the root of the project

Run the following command to run eslint on the project and report problems and
fix them automatically if possible:

```sh
npm run lint
```

### Prettier

We use Prettier to format our code in the src files. You can find the
configuration of prettier in the file `.prettierrc` in the root of the project

Run the following command to format the code of the application:

```sh
npm run format
```

### Jest

We use the test library jest to run unit and integration tests. All the tests
are situated in the `/test` folder.

Run the following command to run the tests and creating a coverage report in the
`/coverage` folder:

```sh
npm run test
```

The coverage report allows us to see the test coverage of the application and
see the lines of codes that are not tested yet.

### Jsdocs

We use jsdocs to generate a documentation based on the comments we write for
each functions. Run these command to generate the documentation in the `jsdocs/`
folder and then open the `index.html` file in your browser:

```sh
npm run docs
```

### Husky

We use husky to run git hooks. husky is module that makes the configuration of
git hooks very easy

If git warn you that git hooks are skipped because they are not as executable,
run these commands in the root of the project :

```sh
chmod ug+x .husky/*
chmod ug+x .git/hooks/*

```

#### Pre commit

The pre commit hook run after you created a new commit. The hook will run these
commands and if one of them throws an error, the commit won't be created:

```sh
npm run format && npm run lint && npm test
```

#### Commit msg

The commit msg hook use ̀`commitlint` to verify the syntax and the commit
message. We use the basic settings and convention that you can find in
[there](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)

### GitHub actions

We use GitHub actions to create a CI (continuous integration) of the website,
and also automate our test and the analysis of our code. Y>ou can find the
configuration file of each workflows in the `.github/workflows` folder.

- **test** : The test workflow will lint the code and report problem, and run
  the tests. If the tests fail, an alert will be display in the commit on
  GitHub. Otherwise, the coverage report will be send to `codecov`, a web
  plateforme to analyse code coverage and send alert in Pull Request and commit.
- **deploy** : The deploy workflow will deploy our website to the `gh-page`
  environment on each commit on the `main` branch.
- **codeql-analysis** : The codeql-analysis workflow will analyse our codebase
  and detect security issue and code pattern problem using the latest codeql
  analysis. Learn more about codeql [here](https://codeql.github.com/)

## Contribute guidelines

### Contribute to the project

We use `typescript` in this project. You can find the config in the
`tsconfig.json` in the root of the project.

All the `.ts` source code is situaded in the `src/` folder in the root of the
project.

The entrypoint of the code is situated in the `index.ts` file. All the other
file are modules containing functions used by the `index.ts` to run the game.
See below the organization of the modules :

- **combination** : All the function related to the game combination. The game
  combination is the color sequence used in the mastermind.
- **dom-manipulation** : All the function that interact with the DOM of the
  application, for example adding a line in the game or display a message in a
  popUp
- **listeners** : All the function that add eventListeners to HTMLElement
- **record** : All the function that manage the record store in the localStorage
  of the user
- **time** : All the function that make Date and time calcul

The goal in these module is to make all the function as pure as possible to test
them easily.

Normally, you should be able to implement your feature and developp your
function using all these files. If you think you should create a new file to
create a new module, use a explicit name that describe what does the function do
in the module.

### Add a feature

You can write an issue
[there](https://github.com/RomainGuarinoni/mastermind/issues) to report a bug or
ask for a new feature. Make sure that the issue doesn't exist already before
writing it.

If you want to write code in this project and participate in its developement,
follow these steps :

1. Create a new branche from the `main` one and give it an explicit name, E.g:

```sh
git checkout -b "feat/myfeature"
```

2. Open a pull request as soon as possible to tell the dev team what you're
   working on

3. When you finished your featuren, rebase your branch on the `main` one :

```sh
git fetch --all
git rebase origin/main
```

4. Add reviewers to your pull request and wait for reviews

## Roadmap

You can see the milestones of the project
[here](https://github.com/RomainGuarinoni/mastermind/pulls).

The next goal is to create a multiplayer mode.
