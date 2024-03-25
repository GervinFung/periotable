# The Periodic Table

Credit to [Evrim Ağacı](https://github.com/evrimagaci) as most of the data is scraped from it

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

You can install `pnpm` with `npm i -g pnpm`, if you have npm in your pc, otherwise, install `npm` [here](https://nodejs.org/en/download/current)

For Mac and Linux, `make` is available, but for Windows, you can install `make` with `choco install make`

Environment Variables

1. Development and Testing

Run the following command

`make copy-env-[development/testing]`

2. Make Commands

_*Below are the listed commands that you can use to build/develop/test this app*_

1. Web in `apps/web`

| Command                                           | Usage                                             |
| ------------------------------------------------- | ------------------------------------------------- |
| make start                                        | Start the bundled app                             |
| make generate                                     | Generate the file needed                          |
| make start-(development OR testing OR production) | Start development                                 |
| make build-(development OR testing OR production) | Bundle and build the app                          |
| make deploy-production                            | Bundle, build and deploy the app                  |
| make install                                      | Install all dependencies                          |
| make test                                         | Run all test code                                 |
| make typecheck                                    | Run typechecking for source code                  |
| make lint                                         | Run linter for source and test code               |
| make format-check                                 | Run prettier to check source and test code format |
| make format-write                                 | Run prettier to format source and test code       |

2. Desktop in `apps/desktop`

| Command                                | Usage                                             |
| -------------------------------------- | ------------------------------------------------- |
| make build-(development OR production) | Bundle and build the app                          |
| make format-check                      | Run prettier to check source and test code format |
| make format-write                      | Run prettier to format source and test code       |

_*You can run the app without setting up the app for demo purpose, the execution (windows/mac/linux) is in `apps/desktop/src-tauri/target/release/periotable(.exe?)`*_

But if you want to properly install the app, you must run the setup file as shown in terminal after building it

# Generated files

The data for periodic tables are not committed, if you need it, you let me know
