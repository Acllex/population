import instance from "./axios";

function queryEstate(data = null){
    return instance.get('/api/estate', {params:data});
}
function saveEstate(data){
    return instance.post('/api/estate',data);
}
export {queryEstate, saveEstate};