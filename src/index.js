const pluginName = require("./../package.json").name;
import {createClient} from './client';

const {camelCase} = require('lodash');


class ShopwareSource {
    static defaultOptions() {
        return {
            debug: false,
            storeUrl: '',
            apiAccessToken: '',
            types: ['product', 'currency', 'shipping-method', 'category'],
            apiVersion: 'v3',
            timeout: 60000
        }
    }

    constructor(api, options) {
        this.api = api;
        this.options = options;

        if (!options.storeUrl ) throw new Error('Missing store url.')
        if (!options.apiAccessToken) throw new Error('Missing API access token.')
        if (!options.apiVersion) throw new Error('Missing API Version. E.g. v3')


        // merge options
        this.options = Object.assign(ShopwareSource.defaultOptions(), options);

        api.loadSource(this.loadSource.bind(this));
    }

    async loadSource(actions) {
        const client = createClient(this.options.apiAccessToken, this.options.timeout);


        for (const typeName of this.options.types) {
            let url = `${this.options.storeUrl}/store-api/${this.options.apiVersion}/${typeName.toLowerCase()}`;

            const result = await client.post(url);

            if (result.statusText !== 'OK') {
                this.log(result);
                continue;
            }

            let data = [];

            if (!result) {
                this.log(result);
                continue;
            } else if (result.data && result.data.elements) {
                data = result.data.elements;
            } else {
                data = result.data;
            }

            this.collectionData(data, actions, camelCase(typeName));
        }
    }

    collectionData(data, actions, typeName) {
        const collection = actions.addCollection(typeName.replace('-', ''));

        try {
            for (let item of data) {
                collection.addNode(item);
            }
        } catch (e) {
            console.error(e)
            console.error("Have you set the right types ['product', ...]?")
        }
    }

    log(a) {
        if (this.options.debug) console.log(`${pluginName}: `, a);
    }
}

module.exports = ShopwareSource
