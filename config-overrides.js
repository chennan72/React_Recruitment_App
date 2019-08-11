const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
    //針對antd實現「按需打包」：import了多少就打包多少(使用babel-plugin-import)
    fixBabelImports(
        'import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true, //自動打包相關的CSS樣式
        }
    ),
    // 使用less-loader對源碼中的less變量進行重新指定
    addLessLoader(
        {
            javascriptEnabled: true,
            modifyVars: {'@primary-color': '#1DA57A'}
        }
    )
);

