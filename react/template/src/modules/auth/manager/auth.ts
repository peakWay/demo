




const Auth = {
    isAuthenticated: false,

    login(cb?: ()=> void) {
        this.isAuthenticated = true;
        cb && cb();
    },

    logout(cb?: () => void) {
        this.isAuthenticated = false;
        cb && cb();
    }
};
 

export default Auth;