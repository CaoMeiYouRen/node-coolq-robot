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
// LtdCmyrJsDemo
class App extends cq_robot_1.CQApp {
    constructor() {
        super('ltd.cmyr.js.demo', __dirname);
        this.CQ.setDebug(true);
    }
    debug() {
        this.privateMsg('test', 1, 996881204, '这是一条私聊消息', 1);
        this.groupMsg('test', 1, 947983200, 996881204, '', '这是一条群消息', 1);
        this.discussMsg('test', 1, 580771123, 996881204, '这是一条讨论组消息', 1);
    }
    startup() {
        return 0;
    }
    exit() {
        return 0;
    }
    enable() {
        this.isEnable = true;
        return 0;
    }
    disable() {
        this.isEnable = false;
        return 0;
    }
    privateMsg(subType, msgId, fromQQ, msg, font) {
        return __awaiter(this, void 0, void 0, function* () {
            if (fromQQ === 996881204) {
                let res = `这是${this.APP_ID}，你发送了：${msg}`;
                this.CQ.sendPrivateMsg(fromQQ, res);
            }
            return 0;
        });
    }
    groupMsg(subType, msgId, fromGroup, fromQQ, fromAnonymous, msg, font) {
        return __awaiter(this, void 0, void 0, function* () {
            if (fromQQ === 996881204) {
                this.CQ.sendGroupMsg(fromGroup, `这是${this.APP_ID}，你发送了：${msg}`);
            }
            return 1;
        });
    }
    discussMsg(subType, msgId, fromDiscuss, fromQQ, msg, font) {
        return __awaiter(this, void 0, void 0, function* () {
            if (fromQQ === 996881204) {
                this.CQ.send_discuss_msg(fromDiscuss, `这是${this.APP_ID}，你发送了：${msg}`);
            }
            return 0;
        });
    }
    groupUpload(subType, sendTime, fromGroup, fromQQ, file) {
        return __awaiter(this, void 0, void 0, function* () {
            return 0;
        });
    }
    groupAdmin(subType, sendTime, fromGroup, beingOperateQQ) {
        return __awaiter(this, void 0, void 0, function* () {
            return 0;
        });
    }
    groupDecrease(subType, sendTime, fromGroup, fromQQ, beingOperateQQ) {
        return __awaiter(this, void 0, void 0, function* () {
            return 0;
        });
    }
    groupIncrease(subType, sendTime, fromGroup, fromQQ, beingOperateQQ) {
        return __awaiter(this, void 0, void 0, function* () {
            return 0;
        });
    }
    friendAdd(subType, sendTime, fromQQ) {
        return __awaiter(this, void 0, void 0, function* () {
            return 0;
        });
    }
    requestAddFriend(subType, sendTime, fromQQ, msg, responseFlag) {
        return __awaiter(this, void 0, void 0, function* () {
            return 0;
        });
    }
    requestAddGroup(subType, sendTime, fromGroup, fromQQ, msg, responseFlag) {
        return __awaiter(this, void 0, void 0, function* () {
            return 0;
        });
    }
}
const app = new App(); //类名可以随意
exports.app = app;
/**
 *仅在debug模式下执行，若不需要也可注释掉
 *
 */
if (app.CQ.getDebug()) {
    app.debug();
}
