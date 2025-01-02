# How to use Turbo Repo

## CLI
### To use it globally you must install the turbo repo globally. You can use one of the commands below:
```sh
  npm install turbo --global 
```
ou
```sh
  yarn global add turbo 
```
----

## Create
### Getting Started

#### To start using turbo repo, using the default configuration, you must execute the following command
```sh
  npx create-turbo@latest 
```
#### When executing this command it will ask some questions. They are:
```sh
  Where would like to create your turborepo? 
  //You must enter the name of the project
```
```sh
  Which package manager do you want to use? (Use arrow keys) 
  > npm 
  > yarn
  //You can choose what suits you best
```
#### After executing this command, you can choose the IDE that best suits you and open the project. You will see that it created the following file tree.
```
├── apps
│   ├── docs (A front-end project with react and next to document your project)
│   ├── web (A front-end project with react and next that will be your front-end)
├── packages
│   ├── eslint-config (File that does not generate build to perform eslint treatment for each project)
│   ├── typescript-config (File that does not generate build to perform typescript processing)
│   ├── ui (File that generates build for User Interface for your front-end project)
```
#### to build all projects and just run the command
```sh
  // if you generated it with yarn
  yarn run build 
  // if you generated it with npm
  npm run build
```
#### To run all projects in development mode
```sh
  // if you generated it with yarn
  yarn run dev 
  // if you generated it with npm
  npm run dev
```
#### To run lint for all projects
```sh
  // if you generated it with yarn
  yarn run lint 
  // if you generated it with npm
  npm run lint
```
#### From here you can customize your project as you see fit, in my case I will change the name of the projects packages/eslint-config and packages/typescript-config to packages/eslint and packages/typescript and I will remove the app/docs project

----

## Workspace
### To create a workspace with turbo you first need to install the turbo repo globally, then you can use the command to generate a blank workspace:
```sh
  turbo gen workspace 
```
### This command will give you a selection of options, where you must choose the location where the workspace will be created, between app or packages.
```
>>> Add an empty workspace to "my-turborepo"
? What type of workspace should be added ?
    app
    packages
```
### Then it will ask you to choose the name of the package, where you will have to enter a name.
```
>>> Add an empty workspace to "my-turborepo"
? What is the name of the package ?
```
### It will then confirm the location where the workspace should be added, if nothing is filled in it will continue with the settings added above, otherwise it will change the location.
```
>>> Add an empty workspace to "my-turborepo"
? Where should "workspace-name" be added ?
```
### Finally, you will be asked if you want to add any dependencies to the workspace.
```
>>> Add an empty workspace to "my-turborepo"
? add workspace dependencies to  "workspace-name" ?
```
#### If you choose option `y`, a new questionnaire will open, asking what type of dependency you want to add based on the existing workspaces.
```
? Select all dependencies types to modify for "tokens" (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
>( ) dependencies
 ( ) devDependencies
 ( ) peerDependencies
 ( ) optionalDependencies
```
#### At the end it will generate a folder in the chosen repository with the chosen name containing the package.json and a README.md file