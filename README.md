# JS Playground

## Deps
```
npm install -g yarn
```

## Env file
```
cp .env.default .env
```

## Commands
```
# Install
yarn

# Start dev on port 8082 (default)
yarn start

# Tests
yarn test

# Build prod
yarn build

# Start prod on port 1337
yarn serve
```

## Tips
- You can fake a GPS location with [Chrome Devtools](https://developers.google.com/web/tools/chrome-devtools/device-mode/device-input-and-sensors)

## PlantUML
- [Website](http://plantuml.com/)
- [VSCode extension](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml)

```
# Install java
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java9-installer

# Install graphviz
sudo apt-get install graphviz
```

## Resources
- https://survivejs.com/webpack/preface/
- https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
- https://codeburst.io/webpack-typescript-react-part-1-dc154e250f23
- https://medium.com/@justin.pathrose/configure-react-project-using-typescript-and-webpack-f69faee3e915
- https://github.com/antonfisher/react-express-webpack
- http://browserl.ist
- https://github.com/rokoroku/react-mobx-typescript-boilerplate
- https://github.com/gothinkster/react-mobx-realworld-example-app

## Missing Webpack4 compatibility
- `awesome-typescript-loader` [Github issue](https://github.com/s-panferov/awesome-typescript-loader/issues/534)
- ~~`favicons-webpack-plugin` [Github issue](https://github.com/jantimon/favicons-webpack-plugin/issues/108)~~
- `google-fonts-webpack-plugin` [Github issue](https://github.com/gabiseabra/google-fonts-webpack-plugin/issues/19)
- ~~Have to use `awesome-typescript-loader` for webpack aliases: https://stackoverflow.com/a/40444084~~

## Issues
- PurifyCSS plugin is purifying too much with Blueprint ([Github issues](https://github.com/webpack-contrib/purifycss-webpack/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc))
- Can't make the `react-hot-loader` working properly ([Doc](https://github.com/gaearon/react-hot-loader#typescript)).
- Tree shaking with Blueprint will be in v3 ([Github issue](https://github.com/palantir/blueprint/issues/2387))
- Can't make code splitting work with lazy loading :(

## Roadmap features
- Map with the locations.
- Slideshow for scheduled movie.

## TODO
- Fix Tests.
- Fix HMR.
- Write tests.
