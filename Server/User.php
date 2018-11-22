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
        $this->response($this->records());
    }
    //添加用户
    public function add(){
        $data = $this->request('data');
        $this->data = $data;
        if($this->append()>0){
            $this->response(['state'=>1,'message'=>'账号添加成功！']);
        }
        else{
            $this->response(['state'=>0,'message'=>'账号添加失败！']);
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
        if($this->remove()>0){
            $this->response(['state'=>1,'message'=>'账号删除成功！']);
        }
        else{
            $this->response(['state'=>0,'message'=>'账号删除失败！']);

        }
    }
    //获取用户
    public function get(){
        $id = $this->request('id');
        $this->where = ['id'=>$id];
        $this->response($this->query());
    }
    //更新用户
    public function set(){
        $data = $this->request('data');
        $this->data = $data;
        $this->where = ['id'=>$data['id']];
        if($this->update()>0){
            $this->response(['state'=>1,'message'=>'账号更新成功！']);
        }
        else{
            $this->response(['state'=>0,'message'=>'账号更新失败！']);
        }
    }
    
}
