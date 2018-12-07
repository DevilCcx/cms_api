import {readFile} from '../services/Fs.js';
import ApiResponse from '../tool/ApiResponse.js';

export default async (ctx, next) => {
    //获取参数
    let params = ctx.query;
    let path = params.path;

    let res = '';
    await readFile(path).then(
        data => {
            res = ApiResponse.formatBody(data);
        },
        err => {
            res = ApiResponse.formatError(-1, err);
        }
    ).catch(err => {
        console.log(err)
    });
    ctx.response.body = res;
}