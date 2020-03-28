import instance from "./axios";

function queryArea(data = null){
    return instance.get('/api/area', {params:data});
}

export {queryArea};