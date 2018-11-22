<?php
namespace Server;
use Core\Library\{Model,Upload};
class Member extends Model{
    //构造函数
    public function __construct(){
        parent::__construct();
        $this->table = 'Member';
        $this->fields = ['parent','name','age','sex','birthday','image','description'];
    }
    //返回成员树形列表
    private function tree(array $list){
        $ids = array_column($list,'id');
        $pids = array_column($list,'parent','id');
        arsort($pids);
        foreach($pids as $id=>$pid){
            if($pid!=0){
                $list[array_search($pid,$ids)]['children'][]=$list[array_search($id,$ids)];
                unset($list[array_search($id,$ids)]);
            }
        }
        return array_values($list);
    }
    //获取成员列表
    public function list(){
        $this->response($this->tree($this->records()));
    }
    //新增成员信息
    public function add(){
        $data = $this->request('data');
        $data['time'] = date('Y-m-d h:i:s');
        $this->data = $data;
        if($this->append()>0){
            $this->response(['state'=>1,'message'=>'成员数据添加成功！']);
        }
        else{
            $this->response(['state'=>0,'message'=>'成员数据添加失败！']);
        }
    }
    //删除成员信息
    public function del(){
        $id = $this->request('id');
        $this->where = ['id'=>$id];
        if($this->remove()>0){
            $this->response(['state'=>1,'message'=>'成员数据删除成功！']);
        }
        else{
            $this->response(['state'=>0,'message'=>'成员数据删除失败！']);
        }
    }
    //获取成员信息
    public function get(){
        $id = $this->request('id');
        $this->where = ['id'=>$id];
        $this->response($this->query());
    }
    //设置成员数据
    public function set(){
        $data = $this->request('data');
        $this->where = ['id'=>$data['id']];
        $this->data = $data;
        if($this->update()){
            $this->response(['state'=>1,'message'=>'成员数据更新成功！']);
        }
        else{
            $this->response(['state'=>0,'message'=>'成员数据更新失败！']);
        }
    }
    //上传成员照片
    public function upload(){
        $upload = new Upload();
        $upload->savePath = ROOT_PATH.'/Data/Upload';
        $this->response($upload->start());
    }
}