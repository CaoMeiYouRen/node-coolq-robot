"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cq_robot_1 = require("cq-robot");
const help_1 = require("./utils/help");
const app = require("./app");
const bot = cq_robot_1.CQWebSocketInit(help_1.getCQWebSocketOption(__dirname));
Object.keys(app).forEach((key) => {
    cq_robot_1.printTime(`[应用] ${app[key].APP_ID} 已载入`, cq_robot_1.CQLog.LOG_INFO_SUCCESS);
});
Object.keys(app).forEach((key) => {
});
bot.on('ready', () => {
    cq_robot_1.printTime('[WebSocket] 连接成功！');
    Object.keys(app).forEach((key) => {
        app[key].enable();
        cq_robot_1.printTime(`[应用] ${app[key].APP_ID}已启动`, cq_robot_1.CQLog.LOG_INFO);
    });
    bot.on('message.private', (event, c, tags) => {
        cq_robot_1.printTime(`[接收私聊消息] 类型:${c.sub_type} QQId:${c.user_id} msg:${c.message}`, cq_robot_1.CQLog.LOG_INFO_RECV);
        for (let key in app) {
            let result = app[key].privateMsg(c.sub_type, c.message_id, c.user_id, c.message, c.font);
            if (result) {
                return;
            }
        }
    });
    bot.on('message.group', (event, c, tags) => {
        cq_robot_1.printTime(`[接收群聊消息] 类型:${c.sub_type} GroupId:${c.group_id} QQId:${c.user_id} msg:${c.message}`, cq_robot_1.CQLog.LOG_INFO_RECV);
        let flag = c.anonymous ? c.anonymous.flag : '';
        for (let key in app) {
            let result = app[key].groupMsg(c.sub_type, c.message_id, c.group_id, c.user_id, flag, c.raw_message, c.font);
            if (result) {
                return;
            }
        }
    });
    bot.on('message.discuss', (event, c, tags) => {
    });
    bot.on('notice.group_upload', (context) => {
    });
    bot.on('notice.group_admin', (context) => {
    });
    bot.on('notice.group_decrease', (context) => {
    });
    bot.on('notice.group_increase', (context) => {
    });
    bot.on('notice.friend_add', (context) => {
    });
    bot.on('request.friend', (context) => {
    });
    bot.on('request.group', (context) => {
    });
});
bot.once('socket.closing', (attempts) => {
    Object.keys(app).forEach((key) => {
        if (app[key].isEnable) {
            app[key].disable();
            cq_robot_1.printTime(`[应用] ${app[key].APP_ID}已关闭`, cq_robot_1.CQLog.LOG_INFO);
        }
    });
});
bot.once('socket.close', (socketType, attempts) => {
});
// setTimeout(() => {
//     bot.disconnect()
// }, 10000)
