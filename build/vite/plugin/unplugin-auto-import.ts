import autoImport from 'unplugin-auto-import/vite'

// 全局自动导入插件
function AutoImport() {
  return autoImport({
    // targets to transform
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
    ],
    dts: 'types/auto-imports.d.ts',
    imports: [
      'vue', // 全局自动导入vue
      'vue-router', // 全局自动导入路由插件
      'vue-i18n', // 全局自动导入国际化插件
      'pinia', // 全局自动导入pinia
      '@vueuse/core',
    ],
  })
}

export { AutoImport }
