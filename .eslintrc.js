module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:prettier/recommended' // 添加 prettier 插件
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    'import/no-unresolved':'off',
    'import/extensions': 'off',
    'no-console':'warn',
    "no-param-reassign":'off',
    "import/prefer-default-export":'off',
    "vue/multi-word-component-names":'off',
    "no-plusplus":'off',
  },

};
