const User = new Vue({
    el: '#User',
    data: {
        setWidth: 0,
        userData: [],
        userForm: {
            name: '',
            password: '',
            email: '',
            phone: '',
            family: '',
            role: ''
        },
        rules: {
            name: [
                { required: true, message: '请输入账户名称', trigger: 'blur' },
            ],
            password: [
                { required: true, message: '请输入账户密码', trigger: 'blur' },
            ],
            email: [
                { required: true, type: 'email', message: '请输入账户邮箱', trigger: 'blur' },
            ],
            phone: [
                { required: true, message: '请输入手机号', trigger: 'blur' },
            ],
            family: [
                { required: true, message: '请选择管理家谱', trigger: 'blur' },
            ],
            role: [
                { required: true, message: '请选择管理角色', trigger: 'blur' },
            ]
        },
        isupdate: false,
        familys: [],
        roles: [],
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getFamily();
            this.getRole();
            this.list();
        });
    },
    methods: {
        //获取家谱
        getFamily: function () {
            axios.get('../Server/', { params: { module: 'Book', action: 'list' } })
                .then(response => {
                    this.familys = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },//获取角色
        getRole: function () {
            axios.get('../Server/', { params: { module: 'Role', action: 'list' } })
                .then(response => {
                    this.roles = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        //会员账户列表
        list: function () {
            axios.get('../Server/', { params: { module: 'User', action: 'list' } })
                .then(response => {
                    this.userData = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        //获取账户信息
        get: function (row) {
            this.userForm = row;
            this.isupdate = true;
            this.setWidth = 8;
        },
        //修改账户信息
        set: function () {
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    this.$confirm('确定修改账户吗?', '操作提示', { type: 'warning' })
                        .then(() => {
                            const params = new FormData();
                            params.append('module', 'User');
                            params.append('action', 'set');
                            params.append('data', JSON.stringify(this.userForm));
                            axios.post('../Server/', params)
                                .then(response => {
                                    if (response.data.state == 1) {
                                        this.$message.success(response.data.message);
                                        this.reset();
                                    }
                                    else {
                                        this.$message.error(response.data.message);
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                })
                        }).catch(() => {
                            this.$message.info('已取消操作');
                        });
                }
                else {
                    this.$message.error('数据填写不完整');
                }
            });
        },
        //添加账户信息
        add: function () {
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    this.$confirm('确定添加账户吗?', '操作提示', { type: 'warning' })
                        .then(() => {
                            const params = new FormData();
                            params.append('module', 'User');
                            params.append('action', 'add');
                            params.append('data', JSON.stringify(this.userForm));
                            axios.post('../Server/', params)
                                .then(response => {
                                    if (response.data.state == 1) {
                                        this.$message.success(response.data.message);
                                        this.reset();
                                    }
                                    else {
                                        this.$message.error(response.data.message);
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                })
                        }).catch(() => {
                            this.$message.info('已取消操作');
                        });
                }
                else {
                    this.$message.error('数据填写不完整');
                }
            });
        },
        //删除账户数据
        del: function (row) {
            this.$confirm('确定要删除账户：' + row.name, '删除提示', { type: 'warning' })
                .then(() => {
                    axios.get('../Server/', { params: { module: 'User', action: 'del', id: row.id } })
                        .then(response => {
                            if (response.data.state == 1) {
                                this.$message.success(response.data.message);
                                this.reset();
                            }
                            else {
                                this.$message.error(response.data.message);
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        });
                }).catch(() => {
                    this.$message.info('已取消删除');
                });
        },
        //重置表单数据
        reset: function () {
            this.list();
            this.isupdate = false;
            this.$refs['userForm'].resetFields();
            this.setWidth = 0;
        }
    }
});