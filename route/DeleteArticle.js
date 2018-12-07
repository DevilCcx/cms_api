import ApiResponse from '../tool/ApiResponse.js';
import {moveFile} from '../services/Fs.js';

export default async (ctx, next) => {
    //获取参数
    let params = ctx.query;
    let filename = params.filename;
    let newPath = params.newPath;
    let res = [];
    await moveFile(filename, newPath).then(
        response => {
            res = ApiResponse.formatBody(response);
        },
        err => {
            res = ApiResponse.formatError(-1, err);
        }
    );
    ctx.response.body = res;
}