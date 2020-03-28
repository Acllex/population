import instance from "./axios";

function queryCity(data = null){
    return instance.get('/api/city', {params:data});
}

export {queryCity};