import legacy from '@vitejs/plugin-legacy'

// 兼容低版本浏览器插件
function legacyPlugin() {
  return legacy()
}

export { legacyPlugin }
