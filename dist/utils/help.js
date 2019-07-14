"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const JSON5 = require("json5");
const fs = require("fs");
/**
 * 获取CQWebSocket配置项
 *
 * @author CaoMeiYouRen
 * @date 2019-07-13
 * @export
 * @param {string} dirname
 * @returns {CQWebSocketOption}
 */
function getCQWebSocketOption(dirname) {
    let setting;
    if (fs.existsSync(path.join(dirname, './conf/setting.jsonc'))) {
        setting = fs.readFileSync(path.join(dirname, './conf/setting.jsonc')).toString();
    }
    else if (fs.existsSync(path.join(dirname, './conf/setting.json'))) {
        setting = fs.readFileSync(path.join(dirname, './conf/setting.json')).toString();
    }
    return JSON5.parse(setting);
}
exports.getCQWebSocketOption = getCQWebSocketOption;
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
function sortApp(list, eventFunction) {
    list[0].CQ.appOption.event[0].priority;
    return [];
}
exports.sortApp = sortApp;
//载入app目录下的所有插件
function loadApp() {
}
exports.loadApp = loadApp;
