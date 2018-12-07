const JWT = {
    /**
     * 未认证
     *
     * @param ctx
     * @param next
     * @returns {Promise<T>}
     * @constructor
     */
    UnAuthorizationHandle: (ctx, next) => {
        return next().catch((err) => {
            if (401 === err.status || '401' === err.status) {
                ctx.status = 401;
                ctx.body = "Protected resource, use Authorization header to get access\\n";
            } else {
                throw err;
            }
        });
    }
};

export default JWT;

