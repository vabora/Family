const Family = new Vue({
    el:'#Book',
    data:{
        setWidth:0,
        bookForm:{
            name:'',
            image:''
        },
        rules:{
            name: [
                { required: true, message: '请输入家谱名称', trigger: 'blur' },
            ],
            image: [
                { required: true, message: '请上传家谱封面', trigger: 'blur' },
            ]
        },
        isupdate:false,
        bookData:[]
    },
    mounted: function () {
        this.$nextTick(function () {
            this.list();
        });
    },
    methods:{
        //家谱封面图片上传
        uploading:function(file){
            if(file.response){
                if(file.response['error'].length>0){
                    this.$message.error(file.response['error'][0].message);
                }
                this.bookForm.image=file.response['success'][0].url;
            }
        },
        //家谱列表显示
        list:function(){
            axios.get('../Server/', { params: { module: 'Book', action: 'list' } })
            .then(response => {
                this.bookData = response.data;
            })
            .catch(error => {
                console.log(error);
            })
        },
        //获取家谱信息
        get: function (row) {
            this.bookForm = row;
            this.isupdate = true;
            this.setWidth = 8;
        },
        //修改家谱信息
        set: function () {
            this.$refs['bookForm'].validate((valid) => {
                if (valid) {
                    this.$confirm('确定要修改家谱？', '修改提示', { type: 'warning' })
                        .then(() => {
                            const params = new FormData();
                            params.append('module', 'Book');
                            params.append('action', 'set');
                            params.append('data', JSON.stringify(this.bookForm));
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
        //添加家谱信息
        add: function () {
            this.$refs['bookForm'].validate((valid) => {
                if (valid) {
                    this.$confirm('确定要添加家谱？', '添加提示', { type: 'warning' })
                        .then(() => {
                            const params = new FormData();
                            params.append('module', 'Book');
                            params.append('action', 'add');
                            params.append('data', JSON.stringify(this.bookForm));
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
        //删除家谱信息
        del: function (row) {
            this.$confirm('确定要删除家谱:' + row.name, '删除提示', { type: 'warning' })
                .then(() => {
                    axios.get('../Server/', { params: { module: 'Book', action: 'del', id: row.id } })
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
            this.$refs['bookForm'].resetFields();
            this.setWidth = 0;
        }
    }
});