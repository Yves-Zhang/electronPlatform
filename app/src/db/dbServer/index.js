import db from '@/db';
import moment from 'moment';
import v4 from 'uuid/v4';

const getMessageList = (params) => {
    return db.get('messageList').filter({
            ...params
        })
        .value()
}

const deletMessage = (params) => {
    return db.get('messageList')
        .removeById(params)
        .write()
}

const addMessage = (params) => {
    return db.get('messageList').push({ // 对数组进行insert操作
        ...params,
        date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        id: v4(),
        updataTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }).write()
}

const changeStatus = (params) => {
    let row = db.get('messageList').find(params);
    let status = row.value().status == '01' ? '02' : '01';
    return row.assign({
            status: status,
            updataTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        })
        .write()
}

const updataMssage = (params) => {
    let row = db.get('messageList').find({id: params.id});
    return row.assign({
            ...params,
            updataTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        })
        .write()
}


const dbServer = {
    getMessageList,
    deletMessage,
    addMessage,
    changeStatus,
    updataMssage
};

export default dbServer;