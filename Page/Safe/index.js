const Safe = new Vue({
    el: '#Safe',
    data: {
        setWidth: 0,
        fileData: [],
        fileForm: {
            name: '',
            content: ''
        },
        rules: []
    },
    mounted: function () {
        this.$nextTick(function () {
            this.list();
        });
    },
    methods: {
        //获取备份文件列表
        list: function () {
            axios.get('../Server/', { params: { module: 'Safe', action: 'list' } })
                .then(response => {
                    this.fileData = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        //新增备份文件
        add: function () {
            this.$confirm('确定要备份文件？', '操作提示', { type: 'warning' })
                .then(() => {
                    axios.get('../Server/', { params: { module: 'Safe', action: 'add' } })
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
        },
        //获取备份信息
        get: function (row) {
            this.fileForm = row;
            this.setWidth = 8;
        },
        //还原数据库
        set: function () {
            this.$confirm('确定要还原数据？', '操作提示', { type: 'warning' })
                .then(() => {
                    const params = new FormData();
                    params.append('module', 'Safe');
                    params.append('action', 'set');
                    params.append('file', JSON.stringify(this.fileForm.name));
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
        },
        //删除数据备份
        del: function (id) {
            this.$confirm('确定要删除备份文件？\r'+id, '操作提示', { type: 'warning' })
                .then(() => {
                    axios.get('../Server/', { params: { module: 'Safe', action: 'del', file:JSON.stringify(id)} })
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
        reset: function () {
            this.list();
            this.$refs['fileForm'].resetFields();
            this.setWidth = 0;
        }
    }
});