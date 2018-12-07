const _path = require('path');
const jwt = require('jsonwebtoken');
import ApiResponse from '../../tool/ApiResponse.js';
const db = require(_path.resolve('db.json'));

let getToken = (name, secret, options) => {
    return jwt.sign(
        {
            name: name,
        },
        secret,
        options
    );
};

export default (ctx, next) => {
    //获取参数
    let params = ctx.query;

    let name = params.name;
    let pwd = params.password;

    let res = [];
    if (name !== db.auth.name && pwd !== db.auth.pwd) {
        res = ApiResponse.formatError(-1, '用户名或密码错误')
    } else {
        let options = { expiresIn: '8h' };
        res = ApiResponse.formatBody({
            access_token: getToken(name, db.auth.secret, options)
        })
    }

    ctx.response.body = res;
}