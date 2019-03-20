import axios from 'axios'

let base = '/vasms-web';

const get = params => {
    return axios.get(`${base}/api/v1/SMSPromote/messageGroup`, {
        params
    })
}

const getMessage = params => {
    return axios.get(`${base}/api/v1/SMSPromote/messageGroupPush`, {
        params
    })
}

const getModuleOptions = params => {
    return axios.get(`${base}/api/v1/SMSPromote/messageGroupTemplate`, {
        params
    })
}

const save = params => {
    return axios.post(`${base}/api/v1/SMSPromote/messageGroupPush/save`, params)
}

const send = params => {
    return axios.post(`${base}/api/v1/SMSPromote/phoneSendDetail/smsSend`, params)
}

const handleRefresh = params => {
    return axios.post(`${base}/api/v1/SMSPromote/phoneSendDetail/refreshSMSList`, params)
}

const getInfo = id => {
    return axios.get(`${base}/api/v1/SMSPromote/messageGroupPush/${id}`)
}

const getNumber = params => {
    return axios.get(`${base}/api/v1/SMSPromote/phoneSendDetail`, {
        params
    })
}

export {
    get,
    getMessage,
    getModuleOptions,
    save,
    send,
    handleRefresh,
    getInfo,
    getNumber
}