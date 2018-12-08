import ApiResponse from '../tool/ApiResponse.js';
import {createImage} from '../services/Fs.js';

export default async (ctx, next) => {
    //获取参数
    let params = ctx.request.body;
    let imageName = params.name;
    let content = params.dataBuffer.replace(/^data:image\/\w+;base64,/, "");
    let buffer = Buffer.from(content, 'base64');
    let path = params.path;

    let res = [];
    await createImage(path, imageName, buffer).then(
        response => {
            res = ApiResponse.formatBody(response);
        },
        err => {
            res = ApiResponse.formatError(-1, err);
        }
    );
    ctx.response.body = res;
}