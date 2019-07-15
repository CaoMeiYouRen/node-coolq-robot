# node-coolq-robot

### 作者：草梅友仁

本项目基于cq-robot、coolq-http-api、cq-websocket ，按照官方SDK风格重新封装了事件函数和api函数

## 项目特色

1.  仿官方SDK风格，熟悉易语言版的很快就可以上手。
3.  仿酷Q目录设计，可以像原生酷Q插件那样载入插件，也便于插件的开发
3.  可以使用JavaScript和TypeScript进行开发，具有一定的跨平台性

## 快速开始

1.  clone本项目

2.  修改src/conf/setting.jsonc中的accessToken等，若不需要修改可以默认
3.  酷Q安装coolq-http-api，修改 酷Q Pro\data\app\io.github.richardchien.coolqhttpapi\config 下的相关配置，其中access_token与上方accessToken保持一致
4.  执行 npm run build 生成dist文件
5.  执行dist/index.js，开发环境下可以使用nodemon，生产环境可以使用pm2
6.  在控制台查看效果

## 安装插件

1.  所有插件放在src/app目录下，新建一个由appId命名的文件夹（下称为应用根目录），入口文件必须为index.js/index.ts（编译后均为index.js），配置项为index.json或index.jsonc【关于jsonc需要特别解释下，就是支持注释的json，在VScode中为JSON with Comments格式】

2.  应用所有数据需存放在 [appId]/data/ 目录下，以免给用户造成困扰
3.  考虑到插件可能会有自己的node_modules依赖，将依赖也装在 项目根目录 下即可（注意，如果安装在项目根目录有问题，也可安装在 应用根目录 ，只不过src和dist目录下均需安装）
4.  注意：最终执行的文件为dist目录下的内容，因此如果有除了json/jsonc格式以外的文件需要从src目录下复制，请修改gulpfile.js文件

## 插件开发

对于开发者，本人也提供了demo，

## 项目依赖

**node-cq-websocket : https://github.com/momocow/node-cq-websocket**

**coolq-http-api : https://github.com/richardchien/coolq-http-api**

