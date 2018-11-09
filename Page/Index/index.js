const App = new Vue({
    el: '#App',
    data: {
        isScreen: true,
        sideWidth: '2.1rem',
        isCollapse: false,
        loading: true,
        search: '',
        kind: '',
        nav: {},
        currentMenu: 0,
        page: 'home',
        pages: [{
            name: 'home',
            title: '主页',
            icon: 'icon-home',
            url: 'home'
        }],
        dialogFormVisible: false,
        aboutDialogVisible:false,
        pwdForm: {
            opwd: '',
            npwd: '',
            rpwd: ''
        },
        rules: {
            opwd: [
                { required: true, message: '请输入原始密码', trigger: 'blur' },
                { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
            ],
            npwd: [
                { required: true, message: '请输入新密码', trigger: 'blur' },
                { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'change' }
            ],
            rpwd: [
                { required: true, message: '请再次确认密码', trigger: 'blur' },
                { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'change' }
            ],
        }
    },
    computed: {
        canRepassword: function () {
            if (this.pwdForm.rpwd != this.pwdForm.npwd) {
                this.rules.rpwd[1].message = '两次输入密码不相同';
                return true;
            }
            if (this.pwdForm.npwd.length < 6) {
                return true;
            }
            return false;
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            axios.get('/Js/menu.json').then((res) => {
                this.nav = res.data;
            });
        });
    },
    methods: {
        //菜单命令
        doCommand: function (command) {
            switch (command) {
                case 'repwd':
                    this.dialogFormVisible = true;
                    break;
                case 'logout':
                    this.logout(false);
                    break;
                case 'exit':
                    this.logout(true);
            }
        },
        //全屏操作
        fullScreen: function () {
            const de = document.documentElement;
            if (de.requestFullscreen) {
                de.requestFullscreen();
            } else if (de.mozRequestFullScreen) {
                de.mozRequestFullScreen();
            } else if (de.webkitRequestFullScreen) {
                de.webkitRequestFullScreen();
            }
            this.isScreen = false;
        },
        //退出全屏
        resizeScreen:function(){
            const de = document;
            if (de.exitFullscreen) {
                de.exitFullscreen();
            } else if (de.mozCancelFullScreen) {
                de.mozCancelFullScreen();
            } else if (de.webkitCancelFullScreen) {
                de.webkitCancelFullScreen();
            } 
            this.isScreen = true;      
        },
        //注销登录操作
        logout: function (isexit) {
            this.$confirm('确定要'+(isexit?'退出系统吗？':'注销登录吗？'), '操作提示', {type: 'warning'})
                .then(() => {
                    axios.get('Server/', { params: { module: 'System', action: 'logout' } })
                        .then(response => {
                        if (response.data.state == 0) {
                            this.$message.error(response.data.message);
                            return false;
                        }
                        this.$message.success({
                            message: response.data.message,
                            onClose: function () {
                                if (isexit) {
                                    window.opener = null;
                                    window.open('', '_self');
                                    window.close()
                                    return false;
                                }
                                window.location.reload();
                            }
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }).catch(() => {
                this.$message.info('已取消操作');
            });

        },
        //修改密码
        setPassword: function () {
            this.$confirm('确定要修改账号密码吗?', '操作提示', {type: 'warning'})
            .then(() => {
                const params = new FormData();
                params.append('module', 'System');
                params.append('action', 'setPassword');
                params.append('data', JSON.stringify(this.pwdForm));
                axios.post('Server/', params)
                    .then(response => {
                        if (response.data.state == 0) {
                            this.$message.error(response.data.message);
                            return false;
                        }
                        this.$message.success({
                            message: response.data.message,
                            onClose: function () {
                                window.location.reload();
                            }
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }).catch(() => {
                this.$message.info('已取消操作');
            });
        },
        //获取菜单
        getMenu: function (tab) {
            let index = 0;
            for (let key in this.nav) {
                if (key == tab.name) { break; }
                index++;
            }
            this.currentMenu = index;
        },
        //切换导航样式
        changeNav: function () {
            this.isCollapse = !this.isCollapse;
            this.sideWidth = this.isCollapse ? '0.64rem' : '2.1rem';
        },
        //刷新页面
        refresh: function () {
            window.location.reload();
        },
        //添加页面
        addPage: function (name, title, icon) {
            let newpage = { name: name, title: title, icon: 'icon-' + icon, url: name };
            let oldpage = this.pages;
            let canadd = true;
            oldpage.find((page) => {
                if (page.name == name) { canadd = false }
            })
            if (canadd) { this.pages.push(newpage) }
            this.page = name;
        },
        //移除页面
        removePage: function (targetName) {
            let tabs = this.pages;
            let activeName = this.page;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                        }
                    }
                });
            }
            this.page = activeName;
            this.pages = tabs.filter(tab => tab.name !== targetName);
        },
    }
});