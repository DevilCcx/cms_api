const formatBody = (res) => {
    return {
        code: 0,
        msg: 'ok',
        data: res
    }
};

const formatError = (code, msg) => {
    return {
        code: code,
        msg: msg
    }
};

module.exports = {
    formatBody,
    formatError
};