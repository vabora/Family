const Role = new Vue({
    el: '#Role',
    data: {
        setWidth: 0,
        roleData: [],
        roleForm: {
            name: '',
            auth: ''
        },
        rules: {
            name: [
                { required: true, message: '请输入角色名称', trigger: 'blur' },
            ],
            auth: [
                { required: true, message: '请选择角色权限', trigger: 'blur' },
            ]
        },
        isupdate: false,
        auths: {
            'user.get': '查看账户',
            'user.set': '修改账户',
            'user.add': '添加账户',
            'user.del': '删除账户',
            'book.get': '查看家谱',
            'book.set': '修改家谱',
            'book.add': '添加家谱',
            'book.del': '删除家谱',
            'family.get': '查看成员',
            'family.set': '修改成员',
            'family.add': '添加成员',
            'family.del': '删除成员',
            'role.get': '查看角色',
            'role.set': '修改角色',
            'role.add': '添加角色',
            'role.del': '删除角色',
        },
    },
    mounted: function () {
        this.$nextTick(function () {
            this.list();
        });
    },
    methods: {
        //获取角色列表
        list: function () {
            axios.get('../Server/', { params: { module: 'Role', action: 'list' } })
                .then(response => {
                    this.roleData = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        //获取角色信息
        get: function (row) {
            this.roleForm = row;
            this.isupdate = true;
            this.setWidth = 8;
        },
        //修改角色信息
        set: function () {
            this.$refs['roleForm'].validate((valid) => {
                if (valid) {
                    this.$confirm('确定要修改角色？', '修改提示', { type: 'warning' })
                        .then(() => {
                            const params = new FormData();
                            params.append('module', 'Role');
                            params.append('action', 'set');
                            params.append('data', JSON.stringify(this.roleForm));
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
                        })
                        .catch(() => {
                            this.$message.info('当前操作已取消！');
                        });
                }
                else {
                    this.$message.error('数据填写不完整');
                }
            });

        },
        //添加角色信息
        add: function () {
            this.$refs['roleForm'].validate((valid) => {
                if (valid) {
                    this.$confirm('确定要添加角色？', '添加提示', { type: 'warning' })
                        .then(() => {
                            const params = new FormData();
                            params.append('module', 'Role');
                            params.append('action', 'add');
                            params.append('data', JSON.stringify(this.roleForm));
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
                        })
                        .catch(() => {
                            this.$message.info('当前操作已取消！');
                        });
                }
                else {
                    this.$message.error('数据填写不完整');
                }
            });

        },
        //删除角色信息
        del: function (row) {
            this.$confirm('确定要删除角色:' + row.name, '删除提示', { type: 'warning' })
                .then(() => {
                    axios.get('../Server/', { params: { module: 'Role', action: 'del', id: row.id } })
                        .then(response => {
                            if (response.data.state == 1) {
                                this.$message.success(response.data.message);
                                this.reset();
                            }
                            else {
                                console.log(response.data);
                                this.$message.error(response.data.message);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
                })
                .catch(() => {
                    this.$message.info('当前操作已取消！');
                });
        },
        //重置表单
        reset: function () {
            this.list();
            this.isupdate = false;
            this.$refs['roleForm'].resetFields();
            this.setWidth = 0;
        }
    }
});