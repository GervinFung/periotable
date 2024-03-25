# The Periodic Table

Major credit to [Evrim Ağacı](https://github.com/evrimagaci) as most of the data is scraped from [periodum](https://github.com/evrimagaci/periodum)

# Structure

This project use monorepo with pnpm workspace, the web app and desktop app are in `apps` respectively

# Preview

Home Page

![Home](apps/web/test/snapshot/snapshot-images/pc/home.png 'Home')

Compounds Page

![Compounds](apps/web/test/snapshot/snapshot-images/pc/compounds.png 'Compounds')

Element Page (too long to show full page)

![Element](apps/web/docs/element.png 'Element')

Error Page

![error](apps/web/test/snapshot/snapshot-images/pc/error.png 'Error')

# Tech Used

| Aspect                 | Name           |
| ---------------------- | -------------- |
| Development Language   | TypeScipt      |
| Scripting Language     | TypeScipt      |
| Testing                | Vitest         |
| Styling                | Mui Joy        |
| Framework              | NextJS         |
| Build Automation Tool  | Make           |
| Dependency Management  | Pnpm           |
| Continuous Integration | GitHub Actions |
| Desktop Application    | Tauri          |

# How to build this app?

_*Make sure you have `pnpm` and `make` available in your system*_

You can install pnpm with `npm i -g pnpm`, if you have npm in your pc, otherwise, install npm [here](https://nodejs.org/en/download/current)

For Mac and Linux, make is available, but for Windows, you can install make with `choco install make`

Environment Variables

`apps/web/config/.env.production` does not exists as it's not committed, so any `make` commands related to production will not, including but are not limited to `make build-production`, `make copy-env-production`, `make build-executable-production`

Rest assured that you can still build an optimised & minimised version of this application without production configuration provided

Make Commands

_*Below are the listed commands that you can use to build/develop/test this app*_

2. Web in `apps/web`

| Command                                              | Usage                                             |
| ---------------------------------------------------- | ------------------------------------------------- |
| make start                                           | Start the bundled app                             |
| make generate                                        | Generate the file needed                          |
| make start-(development OR testing OR production)    | Start development                                 |
| make build-(development OR testing OR production)    | Bundle and build the app                          |
| make copy-env-(development OR testing OR production) | Copy environment variables to `.env`              |
| make install                                         | Install all dependencies                          |
| make test                                            | Run all test code                                 |
| make typecheck                                       | Run typechecking for source code                  |
| make lint                                            | Run linter for source and test code               |
| make format-check                                    | Run prettier to check source and test code format |
| make format-write                                    | Run prettier to format source and test code       |

3. Desktop in `apps/desktop`

| Command               | Usage                                             |
| --------------------- | ------------------------------------------------- |
| make build-production | Bundle and build the app                          |
| make format-check     | Run prettier to check source and test code format |
| make format-write     | Run prettier to format source and test code       |

_*You can run the app without setting up the app for demo purpose, the execution (windows/mac/linux) is in `apps/desktop/src-tauri/target/release/periotable(.exe?)`*_

But if you want to properly install the app, you must run the setup file as shown in terminal after building it

# Generated files

The data for periodic tables are not committed, if you need it, you let me know. For now you can just raise an issue if you need it
