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
const cq_robot_1 = require("cq-robot");
const path = require("path");
const help_1 = require("./utils/help");
const bot = cq_robot_1.CQWebSocketInit(help_1.getCQWebSocketOption(__dirname));
const app = help_1.loadApp(path.join(__dirname, 'app')); //载入全体插件
app.forEach((key) => {
    key.startup();
    cq_robot_1.printTime(`[应用] ${key.APP_ID}已载入`, cq_robot_1.CQLog.LOG_INFO_SUCCESS);
});
bot.on('ready', () => {
    cq_robot_1.printTime('[WebSocket] 连接成功！', cq_robot_1.CQLog.LOG_INFO);
    app.forEach((key) => {
        key.enable();
        cq_robot_1.printTime(`[应用] ${key.APP_ID}已启动`, cq_robot_1.CQLog.LOG_INFO_SUCCESS);
    });
});
bot.on('message.private', (event, c, tags) => {
    cq_robot_1.printTime(`[接收私聊消息] 类型:${c.sub_type} QQId:${c.user_id} msg:${c.message}`, cq_robot_1.CQLog.LOG_INFO_RECV);
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            let list = help_1.sortApp(app, 'privateMsg');
            for (let i = 0; i < list.length; i++) {
                let result = yield list[i].privateMsg(c.sub_type, c.message_id, c.user_id, c.message, c.font);
                if (result) {
                    break;
                }
            }
        });
    }());
});
bot.on('message.group', (event, c, tags) => {
    cq_robot_1.printTime(`[接收群聊消息] 类型:${c.sub_type} GroupId:${c.group_id} QQId:${c.user_id} msg:${c.message}`, cq_robot_1.CQLog.LOG_INFO_RECV);
    let flag = c.anonymous ? c.anonymous.flag : '';
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            let list = help_1.sortApp(app, 'groupMsg');
            for (let i = 0; i < list.length; i++) {
                let result = yield list[i].groupMsg(c.sub_type, c.message_id, c.group_id, c.user_id, flag, c.raw_message, c.font);
                if (result) {
                    break;
                }
            }
        });
    }());
});
bot.on('message.discuss', (event, c, tags) => {
    cq_robot_1.printTime(`[接收讨论组消息] discussId:${c.discuss_id} QQId:${c.user_id} msg:${c.message}`, cq_robot_1.CQLog.LOG_INFO_RECV);
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            let list = help_1.sortApp(app, 'discussMsg');
            for (let i = 0; i < list.length; i++) {
                let result = yield list[i].discussMsg('discuss', c.message_id, c.discuss_id, c.user_id, c.raw_message, c.font);
                if (result) {
                    break;
                }
            }
        });
    }());
});
bot.on('notice.group_upload', (c) => {
    cq_robot_1.printTime(`[群文件上传] groupId:${c.group_id} QQId:${c.user_id} file:${JSON.stringify(c.file)}`, cq_robot_1.CQLog.LOG_INFO_RECV);
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            let list = help_1.sortApp(app, 'groupUpload');
            for (let i = 0; i < list.length; i++) {
                let result = yield list[i].groupUpload('group_upload', c.time, c.group_id, c.user_id, c.file);
                if (result) {
                    break;
                }
            }
        });
    }());
});
bot.on('notice.group_admin', (c) => {
    cq_robot_1.printTime(`[群管理员变动] 类型:${c.sub_type} GroupId:${c.group_id} QQId:${c.user_id}`, cq_robot_1.CQLog.LOG_INFO_RECV);
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            let list = help_1.sortApp(app, 'groupAdmin');
            for (let i = 0; i < list.length; i++) {
                let result = yield list[i].groupAdmin(c.sub_type, c.time, c.group_id, c.user_id);
                if (result) {
                    break;
                }
            }
        });
    }());
});
bot.on('notice.group_decrease', (c) => {
    cq_robot_1.printTime(`[群成员减少] 类型:${c.sub_type} GroupId:${c.group_id} 操作者QQ:${c.user_id} 被操作QQ:${c.operator_id}`, cq_robot_1.CQLog.LOG_INFO_RECV);
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            let list = help_1.sortApp(app, 'groupDecrease');
            for (let i = 0; i < list.length; i++) {
                let result = yield list[i].groupDecrease(c.sub_type, c.time, c.group_id, c.user_id, c.operator_id);
                if (result) {
                    break;
                }
            }
        });
    }());
});
bot.on('notice.group_increase', (c) => {
    cq_robot_1.printTime(`[群成员增加] 类型:${c.sub_type} GroupId:${c.group_id} 操作者QQ:${c.user_id} 加入者QQ:${c.operator_id}`, cq_robot_1.CQLog.LOG_INFO_RECV);
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            let list = help_1.sortApp(app, 'groupIncrease');
            for (let i = 0; i < list.length; i++) {
                let result = yield list[i].groupIncrease(c.sub_type, c.time, c.group_id, c.user_id, c.operator_id);
                if (result) {
                    break;
                }
            }
        });
    }());
});
bot.on('notice.friend_add', (c) => {
    cq_robot_1.printTime(`[好友添加] QQId:${c.user_id}`, cq_robot_1.CQLog.LOG_INFO_RECV);
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            let list = help_1.sortApp(app, 'friendAdd');
            for (let i = 0; i < list.length; i++) {
                let result = yield list[i].friendAdd('friend_add', c.time, c.user_id);
                if (result) {
                    break;
                }
            }
        });
    }());
});
bot.on('request.friend', (c) => {
    cq_robot_1.printTime(`[加好友请求] QQId:${c.user_id} 验证信息:${c.comment}`, cq_robot_1.CQLog.LOG_INFO_RECV);
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            let list = help_1.sortApp(app, 'requestAddFriend');
            for (let i = 0; i < list.length; i++) {
                let result = yield list[i].requestAddFriend('request_add_friend', c.time, c.user_id, c.comment, c.flag);
                if (result) {
                    break;
                }
            }
        });
    }());
});
bot.on('request.group', (c) => {
    cq_robot_1.printTime(`[加群请求／邀请] 类型:${c.sub_type} GroupId:${c.group_id} QQId:${c.user_id} 验证信息:${c.comment}`, cq_robot_1.CQLog.LOG_INFO_RECV);
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            let list = help_1.sortApp(app, 'requestAddGroup');
            for (let i = 0; i < list.length; i++) {
                let result = yield list[i].requestAddGroup(c.sub_type, c.time, c.group_id, c.user_id, c.comment, c.flag);
                if (result) {
                    break;
                }
            }
        });
    }());
});
bot.on('socket.closing', (attempts) => {
    app.forEach((key) => {
        if (key.isEnable) {
            key.disable();
            cq_robot_1.printTime(`[应用] ${key.APP_ID}已停用`, cq_robot_1.CQLog.LOG_INFO);
        }
    });
});
bot.on('socket.close', (socketType, attempts) => {
    app.forEach((key) => {
        key.exit();
        cq_robot_1.printTime(`[应用] ${key.APP_ID}已关闭`, cq_robot_1.CQLog.LOG_INFO);
    });
});
