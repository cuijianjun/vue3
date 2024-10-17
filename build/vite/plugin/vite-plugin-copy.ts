import fs from 'node:fs'
import { basename, resolve } from 'node:path'

import type { ResolvedConfig } from 'vite'

function isDir(dir: fs.PathLike) {
  try {
    return fs.statSync(dir).isDirectory()
  }
  catch (error) {
    console.log(error)
  }
}

function isFile(dir: fs.PathLike) {
  try {
    return fs.statSync(dir).isFile()
  }
  catch (error) {
    console.log(error)
  }
}

function copyFile(filePath: fs.PathLike, dist: string, file: string) {
  const readStream = fs.createReadStream(filePath)
  const writeStrem = fs.createWriteStream(resolve(dist, file))
  readStream.pipe(writeStrem)
}

function copyFun(from: any, dist: any, fileName = '') {
  if (!isDir(from) && !isFile(from)) {
    return
  }
  if (!isDir(dist)) {
    fs.mkdirSync(dist)
  }

  if (isDir(from)) {
    const dir = fs.readdirSync(from)
    dir.forEach((file) => {
      const filePath = resolve(from, file)
      fs.stat(filePath, (_, stat) => {
        if (stat.isFile()) {
          copyFile(filePath, dist, file)
        }
        else if (stat.isDirectory()) {
          copyFun(filePath, resolve(dist, file))
        }
      })
    })
  }

  if (isFile(from)) {
    const file = fileName || basename(from)
    copyFile(from, dist, file)
  }
}

function isObject(obj: {
  from: string // 写要复制的目录或者文件
  to: string // 目标目录
  fileName: string
}[]) {
  return ['[object Object]'].includes(Object.prototype.toString.call(obj))
}

function isArray(obj: {
  from: string // 写要复制的目录或者文件
  to: string // 目标目录
  fileName: string
}[]) {
  return typeof Array.isArray === 'function'
    ? Array.isArray(obj)
    : ['[object Array]'].includes(Object.prototype.toString.call(obj))
}

function handleFile(root: string, option: {
  from: string // 写要复制的目录或者文件
  to: string // 目标目录
  fileName: string
}[]) {
  const [{ from = '', to = '', fileName }] = option
  if (!from || !to) {
    return
  }
  try {
    const fromDir = resolve(root, from)
    const toDir = resolve(root, to)
    copyFun(fromDir, toDir, fileName)
  }
  catch (error) {
    console.log(error)
  }
}

let viteConfig: ResolvedConfig

function vitePluginCopy() {
  const modeIndex = process.argv.indexOf('--mode')
  const mode = modeIndex !== -1 ? process.argv[modeIndex + 1] : ''
  const option = [
    {
      from: `vite-env/.env${mode ? `.${mode}` : ''}`, // 写要复制的目录或者文件
      to: 'dist', // 目标目录
      fileName: '', // 复制文件时重命名文件名
    },
  ]
  return {
    name: 'vite-plugin-copy',
    apply: 'build',
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig
    },
    closeBundle: async () => {
      const root = viteConfig.root
      if (isObject(option)) {
        await handleFile(root, option)
      }

      if (isArray(option)) {
        option.forEach(async (item: any) => {
          await handleFile(root, item)
        })
      }
    },
  }
}

export { vitePluginCopy }
