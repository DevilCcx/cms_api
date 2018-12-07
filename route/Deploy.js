import ApiResponse from '../tool/ApiResponse.js';
import {deploy} from '../tool/ShellJs.js';

export default async (ctx, next) => {
    //获取参数
    let params = ctx.query;
    //工作目录
    let path = params.workDir;

    let res;
    await deploy(path, 'hexo g').then(
        response => {
            res = ApiResponse.formatBody(response)
        },
        err => {
            res = ApiResponse.formatError(-1, err)
        }
    );
    ctx.response.body = res;

}