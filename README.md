# Esper Orbits

## Developement
 The source code contains the API server and the frontend. 
 To launch the api run `npm run dev-api`. Keep in mind this server will look for a `MONGODB_URI` or `MONGODB_URI_TEST` environment variable.
 To launch the dev server with hot reload `npm start dev`
 
 
## Testing
  To test the api provide a MONGODB_URI_TEST environment variable and run `npm run test-api`
  
  To test the frontend `npm run test`
  To only run unit tests `npm run unit-test`
## Production 
  
  Step 1 Build the webapp
  `npm build`
  
  Step 2 Provide environment variable
  ```
  NODE_ENV=production
  MONGODB_URI=url
  ```
  Step 3 Run Express server
  `npm run prod`
  
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


