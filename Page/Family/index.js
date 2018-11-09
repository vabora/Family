const Family = new Vue({
    el:'#Family',
    data:{
        setWidth:0,
        bookForm:{},
        rules:[],
        isupdate:false,
        bookData:[]
    },
    methods:{
        getFamily:function(){

        },
        getBook:function(){

        },
        setBook:function(){

        },
        delBook:function(){

        },
        resetForm:function(){
            this.getFamily();
            this.isupdate = false;
            this.$refs['bookForm'].resetFields();
            this.setWidth = 0;
        }
    }
});