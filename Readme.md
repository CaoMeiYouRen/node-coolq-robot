# node-coolq-robot

### 作者：草梅友仁

本项目基于cq-robot、coolq-http-api、cq-websocket ，按照官方SDK风格重新封装了事件函数和api函数

## 项目特色

1.  仿官方SDK风格，熟悉易语言版的很快就可以上手。

2.  仿酷Q目录设计，可以像原生酷Q插件那样载入插件，也便于插件的开发

3.  可以使用JavaScript和TypeScript进行开发，具有一定的跨平台性

## 项目目录

-   /src 源代码
    -   /app 插件存放的位置
        -   /com.example.demo 应用根目录
            -   /data  应用数据存放目录
            -   index.json/index.jsonc 插件配置项
            -   index.ts/index.ts 插件入口文件
    -   /conf 
        -   setting.json/setting.jsonc  CQWebSocket 连接配置，用于和coolq-http-api建立连接
    -   /utils 一些工具类
    -   index.ts 项目运行入口
-   /dist 最终需要运行的文件

## 快速开始

视频教程：https://www.bilibili.com/video/av59906186

1.  clone本项目

    ```bash
    git clone https://github.com/CaoMeiYouRen/node-coolq-robot.git
    ```

2.  修改src/conf/setting.jsonc中的**accessToken**【重要】，其他参数可以默认（关于该配置，详见[CoolQ HTTP API配置](https://cqhttp.cc/docs/4.10/#/Configuration)）

3.  酷Q安装coolq-http-api，修改 酷Q Pro\data\app\io.github.richardchien.coolqhttpapi\config 下的相关配置，其中access_token与上方accessToken保持一致（关于该配置，详见[CQWebSocketOption](https://github.com/momocow/node-cq-websocket/blob/master/docs/api/CQWebSocket.md)）

4.  酷Q启动coolq-http-api，注意，如果修改access_token时插件已启用，请重载应用或重启酷Q

5.  执行 npm run build 生成dist文件

6.  执行dist/index.js，开发环境下可以使用nodemon，生产环境可以使用pm2等

7.  在控制台查看效果（如果出现 [WebSocket] 连接成功 即为成功）

8.  演示效果

    ![image](https://wx3.sinaimg.cn/mw690/006W7JQLly1g50s3grxlrj314d09pn0r.jpg)

![image](https://wx2.sinaimg.cn/mw690/006W7JQLly1g50s3xkx9tj30kj05lwey.jpg)

## 安装插件

1.  所有插件放在src/app目录下，新建一个由appId命名的文件夹（下称为应用根目录），入口文件必须为index.js/index.ts（编译后均为index.js），配置项为index.json或index.jsonc【关于jsonc需要特别解释下，就是支持注释的json，即VScode中的JSON with Comments格式】

2.  应用所有数据需存放在 [appId]/data/ 目录下，以免给用户造成困扰
3.  考虑到插件可能会有自己的node_modules依赖，将依赖也装在 项目根目录 下即可（注意，如果安装在项目根目录有问题，也可安装在 应用根目录 ，只不过src和dist目录下均需安装）
4.  注意：最终执行的文件为dist目录下的内容，因此如果有除了json/jsonc格式以外的文件需要从src目录下复制，请修改gulpfile.js文件

## 插件开发

对于开发者，本人也提供了demo，建议使用TypeScript进行开发，当然也支持用JavaScript开发

以下是一个空的demo示例，更详细内容请查看本项目的src/app/下面的demo

```typescript
class App extends CQApp {
    constructor() {
        super('com.example.demo', __dirname)
        //每一个CQApp对象身上都挂载着一个属性：CQ，里面封装了所有api相关操作，是核心操作类，更多内容请直接查看注释
        this.CQ.setDebug(false)//为了方便调试，本人提供了CQ.setDebug()方法来设置插件的运行环境，在debug模式下将不会执行具体的api操作，可以在不影响其他插件的情况下进行逻辑调试；同时也提供了CQ.getDebug()来获取当前的运行环境，开发者可以针对此做一些操作
        this.isEnable = true//注意，只有isEnable为true的插件才会载入，可以将isEnable置为false不载入某插件
    }
}
const app = new App()//类名可以随意
export { app }//导出模块的名称必须为app
/**
 *仅在debug模式下执行，若不需要也可注释掉
 *请注意，因为debug的内容在此处就会执行，因此是最先执行的内容！
 */
if (app.CQ.getDebug()) {
    app.debug()
}
```

1.  关于应用加载：符合以下条件之一的应用不会载入
    1.   AppID与其根文件夹名称不同
    2.  CQ_API版本不为9
    3.  HTTP_API版本不为4
    4.  应用未启用(isEnable=false)

2.  api权限：在应用根目录的index.json中配置，对于没有权限的api调用不会执行
3.  插件事件优先级：在应用根目录的index.json中配置，数值越低优先级越高，高优先级的可以截断消息。注意：本项目中并未对插件事件优先级做限制，而且也不限制优先级为10000时就不能截断消息，但为了与官方要求一致，建议不要使用10000、20000、30000、40000、50000以外的优先级，并且不得在优先级为10000时截断消息
4.  ~~日志：日志文件会在同级运行目录生成log文件夹。在log文件夹下有app和debug两个文件夹，分别是生产环境和开发环境的日志，会记录下api的调用和应用接收到的事件信息。当插件处于debug模式时，所有日志都在debug文件夹下；生产环境下，所有日志都在app目录下~~

## 目前已知bug

1.  ~~[待修复]在使用pm2 start index.js --watch 运行时，会出现程序无限重启的问题（已查明是日志的问题，写入日志导致触发pm2重启）~~  日志功能已移除，以后的日志功能可依赖pm2自带的日志功能
    -   ~~解决办法：pm2 start index.js  --watch -i 1 --ignore-watch="\*.log" -n cq-app 配置参数 --ignore-watch="\*.log"忽略日志文件的变化即可~~

## 项目依赖

**node-cq-websocket : https://github.com/momocow/node-cq-websocket**

**coolq-http-api : https://github.com/richardchien/coolq-http-api**

**cq-robot:https://github.com/CaoMeiYouRen/node-cq-robot**

## 项目参考

**JCQ-CoolQ : https://github.com/Meowya/JCQ-CoolQ**

（本项目在开发中很大程度上借鉴了JCQ的思路，在此表示感谢）