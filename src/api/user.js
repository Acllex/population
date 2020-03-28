import instance from "./axios";

function seeUser(){
    return instance.get('/index/users');
}

export {seeUser};