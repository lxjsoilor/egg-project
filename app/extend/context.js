module.exports = {
    SUCCESS_CODE: 200,
    NO_LOGIN_CODE: 400,
    UNIQUE_CODE: 200,
    ERROR_CODE: 500,

    // 设置token
    setToken(data = {}) {
        console.log(data)
        const { app } = this;
        let { name, uuid, userName, userType, orgUuid } = data;
        const token = app.jwt.sign({ name, uuid, userName, userType, orgUuid }, app.config.jwt.secret);
        console.log(token)
        const cookieConfig = {
            maxAge: 1000 * 3600,
            httpOnly: false,
            overwrite: true,
            signed: false,
            
        };
        this.cookies.set('token', token, cookieConfig);
        this.cookies.set('name', name, cookieConfig);
        this.cookies.set('userName', userName, { ...cookieConfig, encrypt: true});
        this.cookies.set('userType', userType, cookieConfig);
    },
    // 获取token
    async getToken() {
        console.log(9090)
        const token = this.cookies.get('token', { signed: false });
        let payload = await this.app.jwt.verify(token, this.app.config.jwt.secret);
        console.log(payload)
    },
    
}