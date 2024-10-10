import postcssImport from 'postcss-import'
import autoprefixer from 'autoprefixer'

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
