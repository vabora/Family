const Family = new Vue({
  el: '#Member',
  data: {
    setWidth: 0,
    memberForm: {
      path:[],
      parent: 0,
      name: null,
      age: null,
      sex:null,
      birthday:null,
      image:null,
      description:null
    },
    props: {
      value: 'id',
      label:'name'
    },
    rules: [],
    isupdate: false,
    memberData: []
  },
  mounted: function () {
    this.$nextTick(function () {
        this.list();
    });
},
  methods: {
    //成员图片上传
    uploading: function (file) {
      if (file.response) {
        if (file.response['error'].length > 0) {
          this.$message.error(file.response['error'][0].message);
        }
        this.memberForm.image = file.response['success'][0].url;
        //console.log(file.response['success'][0].url);
      }
    },
    //设置父级信息
    setParent:function(value){
      this.memberForm.parent = value[value.length-1];
    },
    //处理命令信息
    cmdHandle:function(command){
      command.cmd.apply(this,[command.data]);
    },
    //添加子级操作
    child:function(data){
      this.setWidth = 10;
      this.isupdate = false;
      this.$refs['memberForm'].resetFields();
      this.memberForm.parent = data.id;
      this.memberForm.path = data.path.concat(data.id);
    },
    //添加配偶
    spouse:function(data){
      console.log(data);
    },
    //成员列表显示
    list: function () {
      axios.get('../Server/', { params: { module: 'Member', action: 'list' } })
        .then(response => {
          this.memberData = response.data;
        })
        .catch(error => {
          console.log(error);
        })
    },
    //获取成员信息
    get: function (data) {
      this.memberForm = data;
      this.isupdate = true;
      this.setWidth = 10;
    },
    //修改成员信息
    set: function () {
      this.$refs['memberForm'].validate((valid) => {
        if (valid) {
          this.$confirm('确定要修改成员？', '修改提示', { type: 'warning' })
            .then(() => {
              const params = new FormData();
              params.append('module', 'Member');
              params.append('action', 'set');
              params.append('data', JSON.stringify(this.memberForm));
              axios.post('../Server/', params)
                .then(response => {
                  console.log(response.data);
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
    //添加成员信息
    add: function () {
      this.$refs['memberForm'].validate((valid) => {
        if (valid) {
          this.$confirm('确定要添加成员？', '添加提示', { type: 'warning' })
            .then(() => {
              const params = new FormData();
              params.append('module', 'Member');
              params.append('action', 'add');
              params.append('data', JSON.stringify(this.memberForm));
              axios.post('../Server/', params)
                .then(response => {
                  //console.log(response.data);
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
    //删除成员信息
    del: function (data) {
      this.$confirm('确定要删除成员:' + data.name, '删除提示', { type: 'warning' })
        .then(() => {
          axios.get('../Server/', { params: { module: 'Member', action: 'del', id: data.id } })
            .then(response => {
              if (response.data.state == 1) {
                this.$message.success(response.data.message);
                this.reset();
              }
              else {
                //console.log(response.data);
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
      this.$refs['memberForm'].resetFields();
      this.setWidth = 0;
    }
  }
});