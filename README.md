# vue-esper

> A Vue.js project


## Developement
 The default webpack dev server is replaced by the express server, run npm dev :P

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Notes

Previously had each node be a component because the expected complexity of them moving forward. However passing in nodes as props made them lose reactivity so I chose to therefore have them directly access the vuex store to preserve reactivity.


