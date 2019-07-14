// import * as CQ from '../../bin/CQ.old'
import { CQApp, CQFile } from 'cq-robot'
import fs = require('fs')
import path = require('path')
class App extends CQApp {
    constructor() {
        super('ltd.cmyr.demo', __dirname)
        this.CQ.setDebug(true)
    }
    debug(): void {
        // console.log('debug()方法只会在debug模式下执行')
        this.privateMsg('test', 1, 996881204, '这是一条私聊消息', 1)
        this.groupMsg('test', 1, 947983200, 996881204, '', '这是一条群消息', 1)
        this.discussMsg('test', 1, 580771123, 996881204, '这是一条讨论组消息', 1)
        // E:\我的学习\JS项目开发\node.js机器人封装\dist\app\ltd.cmyr.demo\data\
    }
    startup(): 0 {
        // console.log('与服务器的连接即将建立')
        return 0
    }
    exit(): 0 {
        // console.log('与服务器的连接已经断开')
        return 0
    }
    enable(): 0 {
        // console.log(`应用${this.APP_ID}已启动`)
        this.isEnable = true
        return 0
    }
    disable(): 0 {
        // console.log(`应用${this.APP_ID}已关闭`)
        this.isEnable = false
        return 0
    }
    async privateMsg(subType: string, msgId: number, fromQQ: number, msg: string, font: number): Promise<0 | 1> {
        if (fromQQ === 996881204) {
            this.CQ.sendPrivateMsg(fromQQ, `这是${this.APP_ID}，你发送了：${msg}`)
        }
        return 1
    }
    async groupMsg(subType: string, msgId: number, fromGroup: number, fromQQ: number, fromAnonymous: string, msg: string, font: number): Promise<0 | 1> {
        if (fromQQ === 996881204) {
            this.CQ.sendGroupMsg(fromGroup, `这是${this.APP_ID}，你发送了：${msg}`)
        }
        return 0
    }
    async discussMsg(subType: string, msgId: number, fromDiscuss: number, fromQQ: number, msg: string, font: number): Promise<0 | 1> {
        if (fromQQ === 996881204) {
            this.CQ.sendDiscussMsg(fromDiscuss, `这是${this.APP_ID}，你发送了：${msg}`)
        }
        return 0
    }
    async groupUpload(subType: string, sendTime: number, fromGroup: number, fromQQ: number, file: CQFile): Promise<0 | 1> {
        return 0
    }
    async groupAdmin(subType: string, sendTime: number, fromGroup: number, beingOperateQQ: number): Promise<0 | 1> {
        return 0
    }
    async groupDecrease(subType: string, sendTime: number, fromGroup: number, fromQQ: number, beingOperateQQ: number): Promise<0 | 1> {
        return 0
    }
    async groupIncrease(subType: string, sendTime: number, fromGroup: number, fromQQ: number, beingOperateQQ: number): Promise<0 | 1> {
        return 0
    }
    async friendAdd(subType: string, sendTime: number, fromQQ: number): Promise<0 | 1> {
        return 0
    }
    async requestAddFriend(subType: string, sendTime: number, fromQQ: number, msg: string, responseFlag: string): Promise<0 | 1> {
        return 0
    }
    async requestAddGroup(subType: string, sendTime: number, fromGroup: number, fromQQ: number, msg: string, responseFlag: string): Promise<0 | 1> {
        return 0
    }

}
const app = new App()//类名可以随意
export { app }//导出模块的名称必须为app
/**
 *仅在debug模式下执行，若不需要也可注释掉
 *
 */
if (app.CQ.getDebug()) {
    app.debug()
}
