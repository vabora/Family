<?php
namespace Server;
use Core\Library\Model;
class Role extends Model{
    //构造函数
    public function __construct(){
        parent::__construct();
        $this->table = 'role';
        $this->fields = ['name','auth','time'];
    }
    //获取角色数据列表
    public function list(){
        $list = [];
        foreach($this->records() as $data){
            $data['auth'] = unserialize($data['auth']);
            $list[] = $data;
        }
        //var_dump($list);
        $this->response($list);
    }
    //添加角色数据
    public function add(){
        $data = $this->request('data');
        $data['auth'] = serialize($data['auth']);
        $data['time'] = date('Y-m-d h:i:s');
        $this->data = $data;
        if($this->append()>0){
            $this->response(['state'=>1,'message'=>'角色添加成功']);
        }
        else{
            $this->response(['state'=>0,'message'=>'角色添加失败']);
        }
    }
    //删除角色数据
    public function del(){
        $id = $this->request('id');
        $this->where = ['id'=>$id];
        if($this->remove()>0){
            $this->response(['state'=>1,'message'=>'角色删除成功']);
        }
        else{
            $this->response(['state'=>0,'message'=>'角色删除失败']);
        }
    }
    //获取角色数据
    public function get(){
        $id = $this->request('id');
        $this->where = ['id'=>$id];
        $this->response($this->_select());
    }
    //修改角色数据
    public function set(){
        $data = $this->request('data');
        $data['time'] = date('Y-m-d h:i:s');
        $this->where = ['id'=>$data['id']];
        $this->data = $data;
        if($this->update()){
            $this->response(['state'=>1,'message'=>'角色修改成功']);
        }
        else{
            $this->response(['state'=>0,'message'=>'角色修改失败']);
        }
    }
}
