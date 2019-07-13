import { CQWebSocketInit, printTime, CQLog } from 'cq-robot'
/* eslint-disable guard-for-in */
import fs = require('fs')
import path = require('path')
import JSON5 = require('json5')
import { CQWebSocket } from 'cq-websocket'
import { getCQWebSocketOption } from "./utils/help";
import * as app from './app'
const bot: CQWebSocket = CQWebSocketInit(getCQWebSocketOption(__dirname))
Object.keys(app).forEach((key) => {
    printTime(`[应用] ${app[key].APP_ID} 已载入`, CQLog.LOG_INFO_SUCCESS)
})
Object.keys(app).forEach((key) => {
    if (app[key].isReady) {
        app[key].initialize()
    }
    if (app[key].CQ.getDebug()) {
        app[key].debug()
    }
})
bot.on('ready', () => {
    printTime('[WebSocket] 连接成功！')
    Object.keys(app).forEach((key) => {
        if (app[key].isReady) {
            app[key].enable()
            printTime(`[应用] ${app[key].APP_ID}已启动`, CQLog.LOG_INFO)
        }
    })
    bot.on('message.private', (event, c, tags) => {
        printTime(`[接收私聊消息] 类型:${c.sub_type} QQId:${c.user_id} msg:${c.message}`, CQLog.LOG_INFO_RECV)
        for (let key in app) {
            let result = app[key].privateMsg(c.sub_type, c.message_id, c.user_id, c.message, c.font)
            if (result) {
                return
            }
        }
    })
    bot.on('message.group', (event, c, tags) => {
        printTime(`[接收私聊消息] 类型:${c.sub_type} GroupId:${c.group_id} QQId:${c.user_id} msg:${c.message}`, CQLog.LOG_INFO_RECV)
        let flag = c.anonymous ? c.anonymous.flag : ''
        for (let key in app) {
            let result = app[key].groupMsg(c.sub_type, c.message_id, c.group_id, c.user_id, flag, c.raw_message, c.font)
            if (result) {
                return
            }
        }
    })
    bot.on('message.discuss', (event, c, tags) => {

    })
    bot.on('notice.group_upload', (context) => {
    })
    bot.on('notice.group_admin', (context) => {
    })
    bot.on('notice.group_decrease', (context) => {
    })
    bot.on('notice.group_increase', (context) => {
    })
    bot.on('notice.friend_add', (context) => {
    })
    bot.on('request.friend', (context) => {
    })
    bot.on('request.group', (context) => {
    })
})
bot.once('socket.closing', (attempts) => {
    Object.keys(app).forEach((key) => {
        if (app[key].isEnable) {
            app[key].disable()
            printTime(`[应用] ${app[key].APP_ID}已关闭`, CQLog.LOG_INFO)
        }
    })
})
bot.once('socket.close', (socketType, attempts) => {
    Object.keys(app).forEach((key) => {
        if (app[key].isReady) {
            app[key].exit()
        }
    })
})
// setTimeout(() => {
//     bot.disconnect()
// }, 10000)

