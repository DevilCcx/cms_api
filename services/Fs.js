const _path = require('path');
const fs = require('fs');

/**
 * 创建目录
 *
 * @param path
 */
let mkdir = function (path) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, (err) => {
            if (err) {
                console.log('创建路径错误:' + err);
                reject(err);
            } else {
                resolve(err);
            }
        })
    })
};

/**
 * 获取文件stat
 *
 * @param path
 * @param isFile
 * @returns {Promise<any>}
 */
let getStat = function (path, isFile) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                if (isFile) {
                    reject(err);
                } else {
                    resolve(false);
                }
            } else {
                resolve(stats)
            }
        })
    })
};

/**
 * 写入文件
 *
 * @param filename
 * @param options
 * @param content
 */
let write = function (filename, content, options) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, content, options, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        })
    })
};

let getPath = function (tmp1, tmp2) {
    return _path.join(tmp1, tmp2);
};

/**
 * 读取文件
 *
 * @param path
 * @returns {Promise<void>}
 */
let readFile =  function (path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
};

let rename = function (oldPath, newPath) {
    return new Promise((resolve, reject) => {
        fs.rename(oldPath, newPath, err => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(true);
            }
        })
    })
};

/**
 * 创建文件
 *
 * @param path 绝对路径
 * @param filename 文件名
 * @param content 文件内容
 * @constructor
 */
let createFile = async function (path, filename, content) {
    //根据路径判断是编辑还是新增
    let suffix = path.substr(-3);
    let isFile = false;
    if ('.md' === suffix) {
        isFile = true;
    }

    //新增情况下，判断是否需要新建目录
    let stats = await getStat(path, isFile);
    if (!stats) {
        await mkdir(path);
    }

    //编辑并改名
    let options;
    if (isFile) {
        options = {flag: 'w+'};
        await write(path, content, options);
        let newName = await getPath(_path.dirname(path), filename);
        return await rename(path, newName)
        //新建
    } else {
        options = {flag: 'wx'};
        let file = await getPath(path, filename);
        return await write(file, content, options)
    }
};

let moveFile = async function (file, newPath) {
    //新路径
    let newFile = await getPath(newPath, _path.basename(file));
    return await rename(file, newFile)
};


export {
    createFile,
    readFile,
    moveFile
}

