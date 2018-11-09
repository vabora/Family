<?php
namespace Server;
use Core\Library\Model;
use Core\Library\Upload;
class Book extends Model{
    //构造函数
    public function __construct(){
        parent::__construct();
        $this->table = "Book";
        $this->fields = ['name','image','time'];
    }
    //获取家谱列表
    public function list(){
        $this->response($this->_list());
    }
    //添加家谱信息
    public function add(){
        $data = $this->request('data');
        $data['time'] = date('Y-m-d h:i:s');
        $this->data = $data;
        if($this->_insert()>0){
            $this->response(['state'=>1,'message'=>'家谱添加成功']);
        }
        else{
            $this->response(['state'=>0,'message'=>'家谱添加失败']);
        }
    }
    //删除家谱信息
    public function del(){
        $id = $this->request('id');
        $this->where = ['id'=>$id];
        if($this->_delete()>0){
            $this->response(['state'=>1,'message'=>'家谱删除成功']);
        }
        else{
            $this->response(['state'=>0,'message'=>'家谱删除失败']);
        }
    }
    //获取家谱信息
    public function get(){
        $id = $this->request('id');
        $this->where = ['id'=>$id];
        $this->response($this->_query());
    }
    //设置家谱信息
    public function set(){
        $data = $this->request('data');
        $this->where = ['id'=>$data['id']];
        $this->data = $data;
        if($this->_update()){
            $this->response(['state'=>1,'message'=>'家谱修改成功']);
        }
        else{
            $this->response(['state'=>0,'message'=>'家谱修改失败']);
        }
    }
    //上传家谱封面图片
    public function upload(){
        $upload = new Upload();
        $upload->savePath = ROOT_PATH.'/Data/Upload';
        $this->response($upload->start());
    }
}