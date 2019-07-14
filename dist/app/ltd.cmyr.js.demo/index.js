"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as CQ from '../../bin/CQ.old'
const cq_robot_1 = require("cq-robot");
// LtdCmyrJsDemo
class LtdCmyrJsDemo extends cq_robot_1.CQApp {
    constructor() {
        super('ltd.cmyr.js.demo', __dirname);
        this.CQ.setDebug(true);
    }
    debug() {
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
        if (fromQQ === 996881204) {
            let res = '你发送了：' + msg;
            this.CQ.sendPrivateMsg(fromQQ, res);
        }
        return 0;
    }
    groupMsg(subType, msgId, fromGroup, fromQQ, fromAnonymous, msg, font) {
        if (fromQQ === 996881204) {
            this.CQ.sendGroupMsg(fromGroup, this.CQ.CQCode.at(fromQQ) + '你发送了：' + msg);
        }
        return 0;
    }
    discussMsg(subType, msgId, fromDiscuss, fromQQ, msg, font) {
        if (fromQQ === 996881204) {
            this.CQ.send_discuss_msg(fromDiscuss, this.CQ.CQCode.at(fromQQ) + '你发送了：' + msg);
        }
        return 0;
    }
    groupUpload(subType, sendTime, fromGroup, fromQQ, file) {
        return 0;
    }
    groupAdmin(subType, sendTime, fromGroup, beingOperateQQ) {
        return 0;
    }
    groupDecrease(subType, sendTime, fromGroup, fromQQ, beingOperateQQ) {
        return 0;
    }
    groupIncrease(subType, sendTime, fromGroup, fromQQ, beingOperateQQ) {
        return 0;
    }
    friendAdd(subType, sendTime, fromQQ) {
        return 0;
    }
    requestAddFriend(subType, sendTime, fromQQ, msg, responseFlag) {
        return 0;
    }
    requestAddGroup(subType, sendTime, fromGroup, fromQQ, msg, responseFlag) {
        return 0;
    }
}
const ltdCmyrJsDemo = new LtdCmyrJsDemo();
exports.ltdCmyrJsDemo = ltdCmyrJsDemo;
/**
 *仅在debug模式下执行，若不需要也可注释掉
 *
 */
if (ltdCmyrJsDemo.CQ.getDebug()) {
    ltdCmyrJsDemo.debug();
}
