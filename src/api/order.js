import instance from "./axios";

function queryOrder(data){
    return instance.get('/api/orders',{params:data});
}

export {queryOrder};