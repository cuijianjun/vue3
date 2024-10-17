import fs from 'node:fs'
import { join, resolve } from 'node:path'

import JSZip from 'jszip'

function readDir(zip: JSZip, dirPath: string) {
  const files = fs.readdirSync(dirPath)
  files.forEach((item) => {
    const filePath = join(dirPath, './', item)
    const file = fs.statSync(filePath)
    if (file.isDirectory()) {
      const dirZip: any = zip.folder(item)
      readDir(dirZip, filePath)
    }
    else {
      zip.file(item, fs.readFileSync(filePath))
    }
  })
}

async function mkZip(root: string, viteEnv: { fileName?: any, output?: any }, option) {
  let { fileName = 'dist', output = '' } = viteEnv
  if (!output) {
    output = resolve(root, './dist')
  }
  fileName += '.zip'
  const distPath = resolve(output)
  const zip = new JSZip()
  readDir(zip, distPath)
  zip.generateAsync(option).then((res) => {
    const dist = join(distPath, `../${fileName}`)
    fs.writeFileSync(dist, res as any)
  })
}

let viteConfig: any = null

function vitePluginZip(viteEnv = {}) {
  const option = {
    type: 'nodebuffer', // 压缩类型
    compression: 'DEFLATE', // 压缩算法
    compressionOptions: {
      level: 9, // 压缩等级
    },
  }
  return {
    name: 'vite-plugin-zip',
    apply: 'build',
    configResolved(resolvedConfig: any) {
      viteConfig = resolvedConfig
    },
    async closeBundle() {
      const root = viteConfig.root
      await mkZip(root, viteEnv, option)
    },
  }
}
export { vitePluginZip }
