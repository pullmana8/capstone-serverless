# Serverless TODO App

## Requirements

Updating the typescript starter generator.

`npx typescript starter`

Use the npm update package.

`ncu -u`

Install the dependencies.

`npm install`

Install Babel and Typescript if it is not in the package.json for some reason.

`npm install --save-dev typescript @babel/core @babel/cli @babel/plugin-proposal-class-properties @babel/preset-env @babel/preset-typescript`

```bash
    "@babel/cli": "^7.8.4",
    "@babel/core": "^7.9.6",
    "@babel/plugin-proposal-class-properties": "^7.8.3",
    "@babel/preset-env": "^7.9.6",
    "@babel/preset-typescript": "^7.9.0",
    "typescript": "^3.9.2"
```

Config the project with tsc

`tsc --init --declaration --allowSyntheticDefaultImports --target esnext --outDir build`

Configure babelrc

`.babelrc`

```bash
{
    "presets": [
        "@babel/env",
        "@babel/typescript"
    ],
    "plugins": [
        "@babel/proposal-class-properties"
    ]
}
```

Set up the scripts, you may need to change to suit your needs.

```bash
"scripts": {
    "type-check": "tsc --noEmit",
    "type-check:watch": "npm run type-check -- --watch",
    "build": "npm run build:types && npm run build:js",
    "build:types": "tsc --emitDeclarationOnly",
    "build:js": "babel src --out-dir lib --extensions \".ts,.tsx\" --source-maps inline"
}
```

TSLint has deprecated, make conversion to ESLint

`npx tslint-to-eslint-config`

`npm install @typescript-eslint/eslint-plugin @typescript-eslint/eslint-plugin-tslint @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-import eslint-plugin-jsdoc eslint-plugin-prefer-arrow --save-dev`

Webpack configuration

`npm install --save-dev webpack webpack-cli babel-loader`

`sls invoke -f CreateTodo --contextPath fixtures/create.json`
