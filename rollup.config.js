export default {
    input: ['src/index.js', 'src/client.js'],
    external: ['axios', 'lodash'],
    output: {
        dir: 'lib',
        format: 'cjs'
    }
}
