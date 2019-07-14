import path = require('path')
import JSON5 = require('json5')
import fs = require('fs')
import { CQWebSocket, CQWebSocketOption } from 'cq-websocket'
import { CQApp } from 'cq-robot'
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
/**
 * 根据优先级对插件进行排序，如果某插件并未定义某事件，该插件将不参与排序，也不会接收到该事件
 *
 * @author CaoMeiYouRen
 * @date 2019-07-14
 * @export
 * @param {Array<CQApp>} list
 * @param {string} eventFunction
 * @returns {Array<CQApp>}
 */
export function sortApp(list: Array<CQApp>, eventFunction: string): Array<CQApp> {
    list[0].CQ.appOption.event[0].priority
    return []
}
//载入app目录下的所有插件

export function loadApp() {

}