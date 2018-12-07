import ApiResponse from '../tool/ApiResponse.js';
import {createFile} from '../services/Fs.js';

export default async (ctx, next) => {
    //获取参数
    let params = ctx.query;
    let filename = params.title;
    let content = params.content;
    let path = params.path;
    let res = [];

    await createFile(path, filename, content).then(
        response => {
            res = ApiResponse.formatBody(response);
        },
        err => {
            res = ApiResponse.formatError(-1, err);
        }
    );
    ctx.response.body = res;
}