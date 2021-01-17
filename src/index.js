const pluginName = require("./../package.json").name;
import { createClient, get} from './client';


class ShopwareSource {
    static defaultOptions () {
        return {
            debug: false,
            storeUrl: '',
            apiAccessToken: '',
            types: [],
            apiVersion: 'v3',
            perPage: 100,
            timeout: 60000
        }
    }

    constructor (api, options) {
        this.api = api;
        this.options = options;

        // merge options
        this.options = Object.assign(ShopwareSource.defaultOptions(), options);

        api.loadSource(this.loadSource.bind(this));
    }

    async loadSource(actions) {
        const client = createClient(this.options.apiAccessToken);


        for (const typeName of this.options.types) {
            let url = `${this.options.storeUrl}/store-api/${this.options.apiVersion}/${typeName.toLowerCase()}`;

            const result = await client.get(url);
            let data = result.data;

            this.collectionData(data.elements, actions, typeName);
        }
    }

    collectionData(data, actions, typeName) {
        const collection = actions.addCollection(typeName);

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
