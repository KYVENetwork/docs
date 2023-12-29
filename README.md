# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Installation

```sh
yarn
```

### Local Development

```sh
yarn dev
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```sh
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```sh
USE_SSH=true yarn deploy
```

Not using SSH:

```sh
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

# How to contribute

Generally, you can contribute via Pull Requests. The following branch conventions are required:

- **feat/\***: for a new feature
- **fix/\***: for fixing a bug
- **refactor/\***: for improving code maintainability without changing any logic

For committing new changes [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) have
to be used.

When your Pull Request is ready, it can be opened against the `main` branch. Once the owners have approved
your Pull Request, your changes get merged.