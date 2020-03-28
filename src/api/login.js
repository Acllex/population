import instance from "./axios";

function loginName(data){
    return instance.get('/api/admin',{params: data});
}

export {loginName};