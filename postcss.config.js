import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'

export default {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
    },
    'postcss-import': postcssImport,
    'autoprefixer': autoprefixer,
  },
}
