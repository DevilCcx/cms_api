let shell = require('shelljs');

const ls = function (option, dir) {
    return shell.ls(option, dir);
};

const execCommand = function (command) {
    return new Promise((resolve, reject) => {
        shell.exec(command, {async: true}, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve(true)
            }
        })
    })
};

/**
 * exec
 *
 * @param dir 工作目录
 * @param command 命令
 * @returns {*}
 */
const deploy = async function (dir, command) {
    await shell.cd(dir);
    return await execCommand(command)
    // await shell.exec(command, {async: true}, (err, stdout, stderr) => {
    //     if ( '');
    // });
};

export {
    ls,
    deploy
}