




const Auth = {
    isAuthenticated: true,

    login(cb) {
        this.isAuthenticated = true;
        cb && cb();
    },

    logout(cb) {
        this.isAuthenticated = false;
        cb && cb();
    }
};
 

export default Auth;