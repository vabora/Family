const Login = new Vue({
    el: '#Login',
    data: {
        userLogo: 'Image/logo.svg',
        verifyCode: 'Core/Library/Code.php',
        loginForm: {
            uid: '',
            pwd: '',
            code: ''
        },
        rules: {
            uid: [
                { required: true, message: '请输入登录账号', trigger: 'blur' },
            ],
            pwd: [
                { required: true, message: '请输入登录密码', trigger: 'blur' },
            ],
            code: [
                { required: true, message: '请输入验证码', trigger: 'blur' },
            ],
        }
    },
    methods: {
        //刷新验证码
        refreshCode: function () {
            this.verifyCode = 'Core/Library/Code.php?' + new Date().getTime();
        },
        //登录验证
        login: function () {
            this.$refs['loginForm'].validate((valid) => {
                if (valid) {
                    const params = new FormData();
                    params.append('module', 'System');
                    params.append('action', 'login'); 
                    params.append('data', JSON.stringify(this.loginForm)); 
                    axios.post('Server/',params)
                        .then(response => {
                            if(response.data.state==0){
                                this.$message.error(response.data.message);
                                return false;
                            }
                            this.$message.success({
                                message:response.data.message,
                                onClose:function(){
                                    window.location.reload();
                                }
                            });
                        })
                        .catch(error => {
                            this.$message.error('系统运行错误');
                            console.log(error);
                        });

                } else {
                    this.$message.error('登录信息未填写完整');
                    return false;
                }
            });
        }
    }
});