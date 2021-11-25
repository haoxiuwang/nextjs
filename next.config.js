
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})
var conf = withMDX({
pageExtensions: ['js', 'jsx', 'md', 'mdx'],
})
module.exports = {
  ...conf,
reactStrictMode: true
}
