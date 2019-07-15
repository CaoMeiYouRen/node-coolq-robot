import { CQApp, CQMsg } from 'cq-robot'
class App extends CQApp {
    constructor() {
        super('ltd.cmyr.js.demo', __dirname)
        this.CQ.setDebug(false)
    }
    debug() {
        //本函数里面的内容仅会在debug模式下执行
        this.privateMsg('test', 1, 996881204, '这是一条私聊消息', 1)
        this.groupMsg('test', 1, 947983200, 996881204, '', '这是一条群消息', 1)
        this.discussMsg('test', 1, 580771123, 996881204, '这是一条讨论组消息', 1)
    }
    startup() {
        return 0
    }
    exit() {
        return 0
    }
    enable() {
        this.isEnable = true
        return 0
    }
    disable() {
        this.isEnable = false
        return 0
    }
    async  privateMsg(subType, msgId, fromQQ, msg, font) {
        let res = `这是${this.APP_ID}，你发送了：${msg}`
        this.CQ.sendPrivateMsg(fromQQ, res)
        // 如果要回复消息，请调用 api 发送，则 return CQMsg.MSG_INTERCEPT - 拦截本条消息，不再由其他应用继续处理 //注意：应用优先级设置为"最高"(10000)时，无法使用本返回值
        // 如果不回复消息，交由之后的应用处理，则 return CQMsg.MSG_IGNORE - 忽略本条消息
        return CQMsg.MSG_IGNORE
    }
    async   groupMsg(subType, msgId, fromGroup, fromQQ, fromAnonymous, msg, font) {
        this.CQ.sendGroupMsg(fromGroup, `这是${this.APP_ID}，你发送了：${msg}`)
        return CQMsg.MSG_IGNORE
    }
    async  discussMsg(subType, msgId, fromDiscuss, fromQQ, msg, font) {
        this.CQ.send_discuss_msg(fromDiscuss, `这是${this.APP_ID}，你发送了：${msg}`)
        return CQMsg.MSG_IGNORE
    }
    async  groupUpload(subType, sendTime, fromGroup, fromQQ, file) {
        return CQMsg.MSG_IGNORE
    }
    async groupAdmin(subType, sendTime, fromGroup, beingOperateQQ) {
        return CQMsg.MSG_IGNORE
    }
    async  groupDecrease(subType, sendTime, fromGroup, fromQQ, beingOperateQQ) {
        return CQMsg.MSG_IGNORE
    }
    async  groupIncrease(subType, sendTime, fromGroup, fromQQ, beingOperateQQ) {
        return CQMsg.MSG_IGNORE
    }
    async  friendAdd(subType, sendTime, fromQQ) {
        return CQMsg.MSG_IGNORE
    }
    async requestAddFriend(subType, sendTime, fromQQ, msg, responseFlag) {
        return CQMsg.MSG_IGNORE
    }
    async requestAddGroup(subType, sendTime, fromGroup, fromQQ, msg, responseFlag) {
        return CQMsg.MSG_IGNORE
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
