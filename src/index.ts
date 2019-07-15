import { CQWebSocketInit, printTime, CQLog } from 'cq-robot'
import fs = require('fs')
import path = require('path')
import JSON5 = require('json5')
import { CQWebSocket } from 'cq-websocket'
import { getCQWebSocketOption, loadApp, sortApp } from './utils/help'
const bot: CQWebSocket = CQWebSocketInit(getCQWebSocketOption(__dirname))
const app = loadApp(path.join(__dirname, 'app'))//载入全体插件
app.forEach((key) => {
    key.startup()
    printTime(`[应用] ${key.APP_ID} 已载入`, CQLog.LOG_INFO_SUCCESS)
})
bot.on('ready', () => {
    printTime('[WebSocket] 连接成功！', CQLog.LOG_INFO)
    app.forEach((key) => {
        key.enable()
        printTime(`[应用] ${key.APP_ID}已启动`, CQLog.LOG_INFO_SUCCESS)
    })
})
bot.on('message.private', (event, c, tags) => {
    printTime(`[接收私聊消息] 类型:${c.sub_type} QQId:${c.user_id} msg:${c.message}`, CQLog.LOG_INFO_RECV)
    ; (async function () {
        let list = sortApp(app, 'privateMsg')
        for (let i = 0; i < list.length; i++) {
            let result = await list[i].privateMsg(c.sub_type, c.message_id, c.user_id, c.message, c.font)
            if (result) {
                break
            }
        }
    }())
})
bot.on('message.group', (event, c, tags) => {
    printTime(`[接收群聊消息] 类型:${c.sub_type} GroupId:${c.group_id} QQId:${c.user_id} msg:${c.message}`, CQLog.LOG_INFO_RECV)
    let flag = c.anonymous ? c.anonymous.flag : ''
        ; (async function () {
        let list = sortApp(app, 'groupMsg')
        for (let i = 0; i < list.length; i++) {
            let result = await list[i].groupMsg(c.sub_type, c.message_id, c.group_id, c.user_id, flag, c.raw_message, c.font)
            if (result) {
                break
            }
        }
    }())
})
bot.on('message.discuss', (event, c, tags) => {
    printTime(`[接收讨论组消息] discussId:${c.discuss_id} QQId:${c.user_id} msg:${c.message}`, CQLog.LOG_INFO_RECV)
    ; (async function () {
        let list = sortApp(app, 'discussMsg')
        for (let i = 0; i < list.length; i++) {
            let result = await list[i].discussMsg('discuss', c.message_id, c.discuss_id, c.user_id, c.raw_message, c.font)
            if (result) {
                break
            }
        }
    }())
})
bot.on('notice.group_upload', (c) => {
    printTime(`[群文件上传] groupId:${c.group_id} QQId:${c.user_id} file:${JSON.stringify(c.file)}`, CQLog.LOG_INFO_RECV)
    ; (async function () {
        let list = sortApp(app, 'groupUpload')
        for (let i = 0; i < list.length; i++) {
            let result = await list[i].groupUpload('group_upload', c.time, c.group_id, c.user_id, c.file)
            if (result) {
                break
            }
        }
    }())
})
bot.on('notice.group_admin', (c) => {
    printTime(`[群管理员变动] 类型:${c.sub_type} GroupId:${c.group_id} QQId:${c.user_id}`, CQLog.LOG_INFO_RECV)
    ; (async function () {
        let list = sortApp(app, 'groupAdmin')
        for (let i = 0; i < list.length; i++) {
            let result = await list[i].groupAdmin(c.sub_type, c.time, c.group_id, c.user_id)
            if (result) {
                break
            }
        }
    }())
})
bot.on('notice.group_decrease', (c) => {
    printTime(`[群成员减少] 类型:${c.sub_type} GroupId:${c.group_id} 操作者QQ:${c.user_id} 被操作QQ:${c.operator_id}`, CQLog.LOG_INFO_RECV)
    ; (async function () {
        let list = sortApp(app, 'groupDecrease')
        for (let i = 0; i < list.length; i++) {
            let result = await list[i].groupDecrease(c.sub_type, c.time, c.group_id, c.user_id, c.operator_id)
            if (result) {
                break
            }
        }
    }())
})
bot.on('notice.group_increase', (c) => {
    printTime(`[群成员增加] 类型:${c.sub_type} GroupId:${c.group_id} 操作者QQ:${c.user_id} 加入者QQ:${c.operator_id}`, CQLog.LOG_INFO_RECV)
    ; (async function () {
        let list = sortApp(app, 'groupIncrease')
        for (let i = 0; i < list.length; i++) {
            let result = await list[i].groupIncrease(c.sub_type, c.time, c.group_id, c.user_id, c.operator_id)
            if (result) {
                break
            }
        }
    }())
})
bot.on('notice.friend_add', (c) => {
    printTime(`[好友添加] QQId:${c.user_id}`, CQLog.LOG_INFO_RECV)
    ; (async function () {
        let list = sortApp(app, 'friendAdd')
        for (let i = 0; i < list.length; i++) {
            let result = await list[i].friendAdd('friend_add', c.time, c.user_id)
            if (result) {
                break
            }
        }
    }())
})
bot.on('request.friend', (c) => {
    printTime(`[加好友请求] QQId:${c.user_id} 验证信息:${c.comment}`, CQLog.LOG_INFO_RECV)
    ; (async function () {
        let list = sortApp(app, 'requestAddFriend')
        for (let i = 0; i < list.length; i++) {
            let result = await list[i].requestAddFriend('request_add_friend', c.time, c.user_id, c.comment, c.flag)
            if (result) {
                break
            }
        }
    }())
})
bot.on('request.group', (c) => {
    printTime(`[加群请求／邀请] 类型:${c.sub_type} GroupId:${c.group_id} QQId:${c.user_id} 验证信息:${c.comment}`, CQLog.LOG_INFO_RECV)
    ; (async function () {
        let list = sortApp(app, 'requestAddGroup')
        for (let i = 0; i < list.length; i++) {
            let result = await list[i].requestAddGroup(c.sub_type, c.time, c.group_id, c.user_id, c.comment, c.flag)
            if (result) {
                break
            }
        }
    }())
})
bot.on('socket.closing', (attempts) => {
    app.forEach((key) => {
        if (key.isEnable) {
            key.disable()
            printTime(`[应用] ${key.APP_ID}已停用`, CQLog.LOG_INFO)
        }
    })
})
bot.on('socket.close', (socketType, attempts) => {
    app.forEach((key) => {
        key.exit()
        printTime(`[应用] ${key.APP_ID}已关闭`, CQLog.LOG_INFO)
    })
})

