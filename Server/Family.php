<?php
namespace Server;
use Core\Library\Model;
class Family extends Model{
    //构造函数
    public function __construct(){
        parent::__construct();
        $this->table = 'Family';
        $this->fields = ['parent','name','sex','age','birthday','country','image','description'];
    }
    //获取家谱成员列表
    public function list(){
        $this->response($this->records());
    }
    //添加家谱成员信息
    public function add(){
        $data = $this->request('data');
        $this->data = $data;
        if($this->append()>0){
            $this->response(['state'=>1,'message'=>'家谱成员信息添加成功']);
        }
        else{
            $this->reponse(['state'=>0,'message'=>'家谱成员信息添加失败']);
        }
    }
    //删除家谱成员信息
    public function del(){
        $id = $this->request('id');
        $this->where = ['id'=>$id];
        if($this->remove()>0){
            $this->response(['state'=>1,'message'=>'家谱成员信息删除成功']);
        }
        else{
            $this->response(['state'=>0,'message'=>'家谱成员信息删除失败']);
        }
    }
    //获取家谱成员信息
    public function get(){
        $id = $this->request('id');
        $this->where = ['id'=>$id];
        $this->response($this->_select());
    }
    //设置家谱成员信息
    public function set(){
        $data = $this->request('data');
        $this->where = ['id'=>$data['id']];
        if($this->update()>0){
            $this->response(['state'=>1,'message'=>'家谱成员更新成功']);
        }
        else{
            $this->response(['state'=>0,'message'=>'家谱成员更新失败']);
        }
    }
}
