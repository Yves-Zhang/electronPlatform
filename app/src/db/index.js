import Datastore from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import { app } from 'electron'

import LodashId from 'lodash-id'


// const STORE_PATH = app.getPath('userData') // 获取electron应用的用户目录

// const adapter = new FileSync(path.join(STORE_PATH, '/data.json')) // 初始化lowdb读写的json文件名以及存储路径


const adapter = new FileSync('./data.json') // 初始化lowdb读写的json文件名以及存储路径
const db = Datastore(adapter) // lowdb接管该文件
db._.mixin(LodashId) // 通过._mixin()引入

export default db // 暴露出去