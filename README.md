# gridsome-source-shopware6

> Shopware 6 source plugin for Gridsome

This plugin supports the Store API's.

1. [Install](#install)
2. [Usage](#usage)
3. [Routes & Templates](#templates)
4. [Page Query](#page-query)


## Install
yarn:
```bash
yarn add gridsome-source-shopware6
```

npm:
```bash
npm install gridsome-source-shopware6
```

## Usage

`gridsome.config.js`
```js
module.exports = {
  plugins: [
    {
      use: 'gridsome-source-shopware6',
      options: {
          debug: false,
          storeUrl: '<https://my-store.com>',
          apiAccessToken: '<api-token>',
          types: ['product', 'currency', 'shipping-method', 'category'], // Optional, default is all types
          apiVersion: 'v3',
          timeout: 60000
      }
    }
  ]
}
```


## Templates

Now you can create a template called `ShopwareProduct.vue`, and specify the route for it - Gridsome will automatically generate pages for all products.

`gridsome.config.js`
```js
module.exports = {
  templates: {
      product: '/product/:handle'
  }
}
```


## Page Query

Once you have specified the route for a type, you can query it by ID.

```vue
<page-query>
query Product ($id: ID!) {
  product (id: $id) {
    id
    translated {
      name
      description
    }
  }
}
</page-query>
```

Now this product will be available at `this.$page.product`:
```vue
<template>
  <Layout>
    <h2>{{ $page.product.translated.name }}</h2>
    <div v-html="$page.product.translated.description" />
  </Layout>
</template>
```
