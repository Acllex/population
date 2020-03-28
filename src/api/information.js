import instance from "./axios";

function queryInformation(data = null){
    return instance.get('/api/information', {params:data});
}
function findInformation(data = null){
    return instance.get('/api/information', {params:data});
}
function saveInformation(data){
    return instance.post('/api/information',data);
}
function upInformation(data){
    return instance.put('/api/information', data);
}
function delInformation(data){
    return instance.delete('/api/information/'+data);
}
export {queryInformation, findInformation, saveInformation, upInformation, delInformation};