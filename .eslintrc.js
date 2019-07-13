module.exports = {
    env: {// 运行环境
        node: true,
        es6: true,
        commonjs: true,
        browser: true,
        mocha: true
    },
    extends: [
        // 'airbnb-base'
        // "eslint:recommended",
        'eslint-config-alloy'
    ],
    globals: {// 处理全局变量
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: 'typescript-eslint-parser',
    parserOptions: {// JS标准
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            modules: true
        }
    },
    plugins: [// 插件
        'vue',
        'html'
    ],
    rules: {
        'complexity': 0,
        'max-nested-callbacks': 0,
        // 类和接口的命名必须遵守帕斯卡命名法，比如 PersianCat
        // 'typescript/class-name-casing': 'error',
        indent: [// 强制使用一致的缩进
            'error',
            4, {
                SwitchCase: 1, // case 子句将相对于 switch 语句缩进 4 个空格，即一个tab
            },
        ],
        'linebreak-style': [// 强制使用一致的换行风格
            'error',
            'windows'
        ],
        quotes: [// 强制使用一致的反勾号、双引号或单引号double
            'error',
            'single',
        ],
        semi: [// 要求或禁止使用分号代替 ASI
            'error',
            'never',
        ],
        'prefer-arrow-callback': [// 要求回调函数使用箭头函数
            'error'
        ],
        // "no-param-reassign": [
        //     "error", { "props": false }//禁止对 function 的参数进行重新赋值
        // ],
        'no-shadow': 'error', // 禁止变量声明与外层作用域的变量同名
        'no-unused-vars': 0, // 禁止出现未使用过的变量
        'no-console': 0, // 禁止console
        'object-shorthand': 2, // 要求或禁止对象字面量中方法和属性使用简写语法  ''always
        'quote-props': [2, 'as-needed', { keywords: false, numbers: true }], // 要求对象字面量属性名称使用引号。
        'prefer-template': 2, //建议使用模板字面量而非字符串连接 (prefer-template)
    }
}