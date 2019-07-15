"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as CQ from '../../bin/CQ.old'
const cq_robot_1 = require("cq-robot");
class App extends cq_robot_1.CQApp {
    constructor() {
        super('ltd.cmyr.demo', __dirname);
        this.CQ.setDebug(false);
    }
    debug() {
        // console.log('debug()方法只会在debug模式下执行')
        this.privateMsg('test', 1, 996881204, '这是一条私聊消息', 1);
        this.groupMsg('test', 1, 947983200, 996881204, '', '这是一条群消息', 1);
        this.discussMsg('test', 1, 580771123, 996881204, '这是一条讨论组消息', 1);
        // E:\我的学习\JS项目开发\node.js机器人封装\dist\app\ltd.cmyr.demo\data\
    }
    startup() {
        // console.log('与服务器的连接即将建立')
        return 0;
    }
    exit() {
        // console.log('与服务器的连接已经断开')
        return 0;
    }
    enable() {
        // console.log(`应用${this.APP_ID}已启动`)
        this.isEnable = true;
        return 0;
    }
    disable() {
        // console.log(`应用${this.APP_ID}已关闭`)
        this.isEnable = false;
        return 0;
    }
    privateMsg(subType, msgId, fromQQ, msg, font) {
        return __awaiter(this, void 0, void 0, function* () {
            if (fromQQ === 996881204) {
                this.CQ.sendPrivateMsg(fromQQ, `这是${this.APP_ID}，你发送了：${msg}`);
            }
            // 如果要回复消息，请调用 api 发送，则 return CQMsg.MSG_INTERCEPT - 拦截本条消息，不再由其他应用继续处理 //注意：应用优先级设置为"最高"(10000)时，无法使用本返回值
            // 如果不回复消息，交由之后的应用处理，则 return CQMsg.MSG_IGNORE- 忽略本条消息
            return cq_robot_1.CQMsg.MSG_INTERCEPT;
        });
    }
    groupMsg(subType, msgId, fromGroup, fromQQ, fromAnonymous, msg, font) {
        return __awaiter(this, void 0, void 0, function* () {
            if (fromQQ === 996881204) {
                this.CQ.sendGroupMsg(fromGroup, `这是${this.APP_ID}，你发送了：${msg}`);
            }
            return cq_robot_1.CQMsg.MSG_IGNORE;
        });
    }
    discussMsg(subType, msgId, fromDiscuss, fromQQ, msg, font) {
        return __awaiter(this, void 0, void 0, function* () {
            if (fromQQ === 996881204) {
                this.CQ.sendDiscussMsg(fromDiscuss, `这是${this.APP_ID}，你发送了：${msg}`);
            }
            return cq_robot_1.CQMsg.MSG_IGNORE;
        });
    }
    groupUpload(subType, sendTime, fromGroup, fromQQ, file) {
        return __awaiter(this, void 0, void 0, function* () {
            return cq_robot_1.CQMsg.MSG_IGNORE;
        });
    }
    groupAdmin(subType, sendTime, fromGroup, beingOperateQQ) {
        return __awaiter(this, void 0, void 0, function* () {
            return cq_robot_1.CQMsg.MSG_IGNORE;
        });
    }
    groupDecrease(subType, sendTime, fromGroup, fromQQ, beingOperateQQ) {
        return __awaiter(this, void 0, void 0, function* () {
            return cq_robot_1.CQMsg.MSG_IGNORE;
        });
    }
    groupIncrease(subType, sendTime, fromGroup, fromQQ, beingOperateQQ) {
        return __awaiter(this, void 0, void 0, function* () {
            return cq_robot_1.CQMsg.MSG_IGNORE;
        });
    }
    friendAdd(subType, sendTime, fromQQ) {
        return __awaiter(this, void 0, void 0, function* () {
            return cq_robot_1.CQMsg.MSG_IGNORE;
        });
    }
    requestAddFriend(subType, sendTime, fromQQ, msg, responseFlag) {
        return __awaiter(this, void 0, void 0, function* () {
            return cq_robot_1.CQMsg.MSG_IGNORE;
        });
    }
    requestAddGroup(subType, sendTime, fromGroup, fromQQ, msg, responseFlag) {
        return __awaiter(this, void 0, void 0, function* () {
            return cq_robot_1.CQMsg.MSG_IGNORE;
        });
    }
}
const app = new App(); //类名可以随意
exports.app = app;
/**
 *仅在debug模式下执行，若不需要也可注释掉
 *请注意，因为debug的内容在此处就会执行，因此是最先执行的内容！
 */
if (app.CQ.getDebug()) {
    app.debug();
}
