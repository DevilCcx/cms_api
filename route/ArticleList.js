const _path = require('path');
const moment = require('moment');
import {ls} from '../tool/ShellJs.js';
import ApiResponse from '../tool/ApiResponse.js'

export default (ctx, next) => {
    //获取参数
    let params = ctx.query;

    //博客文章路径
    let path = params.path+'/*.md';

    //文章信息
    let files = ls('-l', path);

    //格式化
    let res = [];
    files.forEach(val => {
        res.push({
            ctime: moment(val.ctime).format('YYYY-MM-DD'),
            atime: moment(val.atime).format('YYYY-MM-DD'),
            mtime: moment(val.mtime).format('YYYY-MM-DD'),
            fullname: val.name,
            name: _path.basename(val.name, '.md')
        })
    });
    ctx.response.body = ApiResponse.formatBody(res)
}