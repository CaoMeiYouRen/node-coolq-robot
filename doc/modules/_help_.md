> **[cq-robot](../README.md)**

[Globals](../globals.md) / ["help"](_help_.md) /

# External module: "help"

## Index

### Functions

* [checkApp](_help_.md#checkapp)
* [getCQWebSocketOption](_help_.md#getcqwebsocketoption)
* [getEvent](_help_.md#getevent)
* [loadApp](_help_.md#loadapp)
* [sortApp](_help_.md#sortapp)

## Functions

###  checkApp

▸ **checkApp**(`app`: `CQApp`): *boolean*

*Defined in [help.ts:97](https://github.com/CaoMeiYouRen/node-coolq-robot/blob/7b8086d/src/utils/help.ts#L97)*

校验app是否合法

**`author`** CaoMeiYouRen

**`date`** 2019-07-14

**Parameters:**

Name | Type |
------ | ------ |
`app` | `CQApp` |

**Returns:** *boolean*

___

###  getCQWebSocketOption

▸ **getCQWebSocketOption**(`dirname`: string): *`CQWebSocketOption`*

*Defined in [help.ts:15](https://github.com/CaoMeiYouRen/node-coolq-robot/blob/7b8086d/src/utils/help.ts#L15)*

获取CQWebSocket配置项

**`author`** CaoMeiYouRen

**`date`** 2019-07-13

**`export`** 

**Parameters:**

Name | Type |
------ | ------ |
`dirname` | string |

**Returns:** *`CQWebSocketOption`*

___

###  getEvent

▸ **getEvent**(`list`: `Array<CQEvent>`, `eventFunction`: string): *`CQEvent`*

*Defined in [help.ts:33](https://github.com/CaoMeiYouRen/node-coolq-robot/blob/7b8086d/src/utils/help.ts#L33)*

是否存在某事件的函数名

**`author`** CaoMeiYouRen

**`date`** 2019-07-14

**Parameters:**

Name | Type |
------ | ------ |
`list` | `Array<CQEvent>` |
`eventFunction` | string |

**Returns:** *`CQEvent`*

___

###  loadApp

▸ **loadApp**(`filePath`: string): *`Array<CQApp>`*

*Defined in [help.ts:73](https://github.com/CaoMeiYouRen/node-coolq-robot/blob/7b8086d/src/utils/help.ts#L73)*

载入app目录下的所有插件

**`author`** CaoMeiYouRen

**`date`** 2019-07-14

**`export`** 

**Parameters:**

Name | Type |
------ | ------ |
`filePath` | string |

**Returns:** *`Array<CQApp>`*

___

###  sortApp

▸ **sortApp**(`list`: `Array<CQApp>`, `eventFunction`: string): *`Array<CQApp>`*

*Defined in [help.ts:51](https://github.com/CaoMeiYouRen/node-coolq-robot/blob/7b8086d/src/utils/help.ts#L51)*

根据优先级从小到大对插件进行排序，如果某插件并未定义某事件，该插件将不参与排序，也不会接收到该事件

**`author`** CaoMeiYouRen

**`date`** 2019-07-14

**`export`** 

**Parameters:**

Name | Type |
------ | ------ |
`list` | `Array<CQApp>` |
`eventFunction` | string |

**Returns:** *`Array<CQApp>`*