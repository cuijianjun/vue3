// eslint.config.js
import antfu from '@antfu/eslint-config'
// import typeScriptEslint from '@typescript-eslint/eslint-plugin'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default antfu({
  // ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
  root: true,
  // // 继承下面的规则
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  // // 使用使用最新版的 ECMAScript 进行语法解析
  // parserOptions: {
  //   ecmaVersion: 'latest',
  // },
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },
  yaml: false,
  // 使用外部格式化程序来格式化 ESLint 无法处理的文件（ .css 、 .html 等）
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
  // https://alloyteam.github.io/eslint-config-alloy/?language=zh-CN&rule=base
  // https://eslint.vuejs.org/rules/
  plugins: {
    'simple-import-sort': simpleImportSort,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },

  rules: {
    // '@typescript-eslint/ban-types':'error',
    'no-console': 'off',
    // 强制组件顶级元素的顺序
    'vue/block-order': [
      'error',
      {
        order: ['template', 'script', 'style'],
      },
    ],
    'max-params': ['error', 4],
    // 代码块嵌套的深度禁止超过 4 层
    'max-depth': ['error', 4],
    // 回调函数嵌套禁止超过 3 层，多了请用 async await 替代
    'max-nested-callbacks': ['error', 4],
    // 禁止使用 Array 构造函数时传入的参数超过一个
    // 参数为多个时表示创建一个指定内容的数组，此时可以用数组字面量实现，不必使用构造函数
    'no-array-constructor': 'error',
    // 禁止 if else 的条件判断中出现重复的条件
    'no-dupe-else-if': 'error',
    // 禁止出现空代码块，允许 catch 为空代码块
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],
    // 禁止出现没必要的字符串连接
    'no-useless-concat': 'error',
    // 禁止使用 var
    'no-var': 'error',
    // 禁止变量申明时用逗号一次申明多个
    'one-var': ['error', 'never'],
    // 必须使用 ... 而不是 Object.assign，除非 Object.assign 的第一个参数是一个变量
    'prefer-object-spread': 'error',
    // 回调函数必须使用箭头函数
    'prefer-arrow-callback': 'error',
    // "stroustrup"：强制一致的大括号风格，左括号必须与控制语句在同一行开始，右括号必须独占一行。
    'brace-style': ['error', 'stroustrup'],
    // 强制使用 node 全局变量 process 而不是 require("process") 。
    'node/prefer-global/process': 'off',
    // 对所有控制语句强制执行一致的大括号样式，（只有一行的时候eslint默认是不需要大括号的，这样会降低代码清晰度）
    'curly': ['error', 'all'],
    'ts/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    'regexp/no-unused-capturing-group': ['error', {
      fixable: true,
      allowNamed: true,
    }],
    'perfectionist/sort-imports': 'off',
    'perfectionist/sort-exports': 'off',
    'perfectionist/sort-named-exports': 'off',
    // 'sort-imports': [0, {
    //   ignoreCase: false,
    //   ignoreDeclarationSort: false,
    //   ignoreMemberSort: false,
    //   memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
    // }],
    'import/order': 'off',
    'sort-imports': 'off',
    'sort-exports': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    // '@typescript-eslint/ban-types': 0,
    // "@typescript-eslint/ban-types": ["error",
    //   {
    //     "types": {
    //       "String": false,
    //       "Boolean": false,
    //       "Number": false,
    //       "Symbol": false,
    //       "{}": false,
    //       "Object": false,
    //       "object": false,
    //       "Function": false,
    //     },
    //     "extendDefaults": true
    //   }
    // ]

  },
})
