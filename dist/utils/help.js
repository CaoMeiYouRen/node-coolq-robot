"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const JSON5 = require("json5");
const fs = require("fs");
const cq_robot_1 = require("cq-robot");
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
 * 是否存在某事件的函数名
 *
 * @author CaoMeiYouRen
 * @date 2019-07-14
 * @param {Array<CQEvent>} list
 * @param {string} eventFunction
 * @returns {boolean}
 */
function getEvent(list, eventFunction) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].function === eventFunction) {
            return list[i];
        }
    }
    return null;
}
/**
 * 根据优先级从小到大对插件进行排序，如果某插件并未定义某事件，该插件将不参与排序，也不会接收到该事件
 *
 * @author CaoMeiYouRen
 * @date 2019-07-14
 * @export
 * @param {Array<CQApp>} list
 * @param {string} eventFunction
 * @returns {Array<CQApp>}
 */
function sortApp(list, eventFunction) {
    let appList = [];
    for (let i = 0; i < list.length; i++) {
        if (getEvent(list[i].CQ.appOption.event, eventFunction)) {
            appList.push(list[i]);
        }
    }
    appList.sort((a, b) => {
        return getEvent(a.CQ.appOption.event, eventFunction).priority - getEvent(b.CQ.appOption.event, eventFunction).priority;
    });
    return appList;
}
exports.sortApp = sortApp;
/**
 * 载入app目录下的所有插件
 *
 * @author CaoMeiYouRen
 * @date 2019-07-14
 * @export
 * @param {string} filePath
 * @returns {Array<CQApp>}
 */
function loadApp(filePath) {
    let files = fs.readdirSync(filePath);
    let list = [];
    for (let i = 0; i < files.length; i++) {
        let fileName = files[i];
        var fileDir = path.join(filePath, fileName);
        if (fileName !== 'index.js') {
            ///console.log(fileDir)
            let temp = require(fileDir); // 载入所有插件
            let app = temp['app'];
            if (checkApp(app)) {
                list.push(app);
                cq_robot_1.printTime(`[应用] ${app.APP_ID} 已载入`, cq_robot_1.CQLog.LOG_INFO);
            }
        }
    }
    return list;
}
exports.loadApp = loadApp;
/**
 * 校验app是否合法
 *
 * @author CaoMeiYouRen
 * @date 2019-07-14
 * @param {CQApp} app
 * @returns {boolean}
 */
function checkApp(app) {
    if (!app.appDirectory.includes(app.APP_ID)) {
        cq_robot_1.printTime(`[应用]${app.APP_ID}的AppID与其根文件夹名称不同`, cq_robot_1.CQLog.LOG_ERROR);
        return false;
    }
    if (app.CQ_API_VER !== 9) {
        cq_robot_1.printTime(`[应用]${app.APP_ID}的CQ_API版本不为9`, cq_robot_1.CQLog.LOG_ERROR);
        return false;
    }
    if (app.HTTP_API_VER !== 4) {
        cq_robot_1.printTime(`[应用]${app.APP_ID}的HTTP_API版本不为4`, cq_robot_1.CQLog.LOG_ERROR);
        return false;
    }
    if (!app.isEnable) { //应用未启用
        return false;
    }
    return true;
}
