export default {
    input: ['src/index.js', 'src/client.js'],
    external: ['axios'],
    output: {
        dir: 'lib',
        format: 'cjs'
    }
}
