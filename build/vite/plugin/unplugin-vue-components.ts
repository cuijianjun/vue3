import { VantResolver } from 'unplugin-vue-components/resolvers'
// 导入内置库插件
import components from 'unplugin-vue-components/vite'

// 全局导入组件库

function Components() {
  return components({
    resolvers: [VantResolver()], // 自动导入vant库
    dirs: ['src/components'],
    extensions: ['vue'], // 文件扩展名
    dts: true,
    types: [],
  })
}

export { Components }
