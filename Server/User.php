<?php
namespace Server;
use Core\Library\Model;
class User extends Model{
    //构造函数
    public function __construct(){
        parent::__construct();
        $this->table = 'User';
        $this->fields = ['name','password','email','phone','family','role'];
    }
    //获取用户列表
    public function list(){
        $this->response($this->_list());
    }
    //添加用户
    public function add(){
        $data = $this->request('data');
        $this->data = $data;
        if($this->_insert()>0){
            $this->response(['state'=>1,'message'=>'账号添加成功！']);
        }
        else{
            $this->response(['state'=>0,'message'=>'账号添加失败！']);
        }
    }
    //更新用户
    public function set(){
        $data = $this->request('data');
        $this->data = $data;
        $this->where = ['id'=>$data['id']];
        if($this->_update()>0){
            $this->response(['state'=>1,'message'=>'账号更新成功！']);
        }
        else{
            $this->response(['state'=>0,'message'=>'账号更新失败！']);
        }
    }
    //删除用户
    public function del(){
        $id = $this->request('id');
        if($id==$_SESSION['user']['id']){
            $this->response(['state'=>0,'message'=>'当前登录账号不可删除！']);
            return false;
        }
        $this->where = ['id'=>$id];
        if($this->_delete()>0){
            $this->response(['state'=>1,'message'=>'账号删除成功！']);
        }
        else{
            $this->response(['state'=>0,'message'=>'账号删除失败！']);

        }
    }
    
}
