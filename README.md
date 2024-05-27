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

Relevant environment variables will be generate when certain commands are ran, such as `make build-development` and `make start-development` will product `.env` with development variables. The same goes for other environment

Rest assured that you can still build an optimised & minimised version of this application without production configuration provided

Make Commands

_*Below are the listed commands that you can use to build/develop/test this app*_

2. Web in `apps/web`

| Command                                              | Usage                                                   |
| ---------------------------------------------------- | ------------------------------------------------------- |
| make start                                           | Start the bundled app                                   |
| make generate                                        | Generate the file needed                                |
| make start-(development OR testing OR production)    | Start development with said environment                 |
| make build-(development OR testing OR production)    | Bundle and build the app with said environment          |
| make copy-env-(development OR testing OR production) | Copy environment variables to `.env`                    |
| make test                                            | Run all test code                                       |
| make typecheck                                       | Run typechecking for source code                        |
| make lint                                            | Run linter for source and test code                     |
| make format-check                                    | Run prettier to check source and test code format       |
| make format-write                                    | Run prettier to format source and test code             |
| make generate-(web OR desktop)-stuffs                | To generate web/desktop specific stuffs before building |
| make generate-images                                 | Generate assets before building/development             |

3. Desktop in `apps/desktop`

| Command                                | Usage                                             |
| -------------------------------------- | ------------------------------------------------- |
| make build-(production OR development) | Bundle and build the app with said environment    |
| make format-check                      | Run prettier to check source and test code format |
| make format-write                      | Run prettier to format source and test code       |

_You can run the app without setting up the app for demo purpose, the execution (windows/mac/linux) is in `apps/desktop/src-tauri/target/release/periotable(.exe?)`_

_Note: For mac arm user, the following command must be executed_

```sh
xattr -d com.apple.quarantine <path-to-app>
```

But if you want to properly install the app, you must run the setup file as shown in terminal after building it

4. Mobile in `apps/mobile`

| Command                                        | Usage                                                      |
| ---------------------------------------------- | ---------------------------------------------------------- |
| make build-(production OR development)-android | Bundle and build the app with said environment for android |
| make format-check                              | Run prettier to check source and test code format          |
| make format-write                              | Run prettier to format source and test code                |

_*`I have not try ios yet, but android should work and be able to compile apk file. Java v17.0.9 is needed to compile it, along with Gradle v8.0.2`*_

# Generated files

The data for periodic tables are not committed, if you need it, you let me know, a lot of commands would not work without it. For now you can just raise an issue if you need it
