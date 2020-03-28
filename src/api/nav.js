import instance from "./axios";

function queryNav(){
    return instance.get('/index/nav');
}

export {queryNav};