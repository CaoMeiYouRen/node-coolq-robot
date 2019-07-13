import path = require('path')
import JSON5 = require('json5')
import fs = require('fs')
import { CQWebSocket, CQWebSocketOption } from 'cq-websocket'
/**
 * 获取CQWebSocket配置项
 *
 * @author CaoMeiYouRen
 * @date 2019-07-13
 * @export
 * @param {string} dirname
 * @returns {CQWebSocketOption}
 */
export function getCQWebSocketOption(dirname: string): CQWebSocketOption {
    let setting: string
    if (fs.existsSync(path.join(dirname, './conf/setting.jsonc'))) {
        setting = fs.readFileSync(path.join(dirname, './conf/setting.jsonc')).toString()
    } else if (fs.existsSync(path.join(dirname, './conf/setting.json'))) {
        setting = fs.readFileSync(path.join(dirname, './conf/setting.json')).toString()
    }
    return JSON5.parse(setting)
}