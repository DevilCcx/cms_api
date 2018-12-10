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
 * deploy
 *
 * @param dir 工作目录
 * @param command 命令
 * @returns {*}
 */
const deploy = async function (dir, command) {
    await shell.cd(dir);
    return await execCommand(command);
};

/**
 * git
 *
 * @param dir 工作目录
 * @returns {*}
 */
const git = async function (dir) {
    await shell.cd(dir);
    await execCommand('git add -A');
    await execCommand('git commit -am "auto commit"');
    return await execCommand('git push');
};


export {
    ls,
    deploy,
    git
}