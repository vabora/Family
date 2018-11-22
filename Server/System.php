<?php
namespace Server;
use Core\Library\Model;
class System extends Model{
    //构造函数
    public function __construct(){
        parent::__construct();
        $this->table = 'User';
    }
    //用户登录验证
    public function login(){
        $data = $this->request('data');
        if(md5(strtoupper($data['code']))!=$_SESSION['code']){
            $this->response(['state'=>0,'message'=>'验证码错误，请重试！']);
            return false;
        }
        $this->where = ['name'=>$data['uid'],'password'=>$data['pwd']];
        $user = $this->query();
        if(count($user)>0){
            $_SESSION['user'] = $user[0];
            $this->response(['state'=>1,'message'=>'登录成功，正在进入系统...']);
        }
        else{
            $_SESSION['user'] = null;
            $this->response(['state'=>0,'message'=>'账号密码有误，登录失败！']);
        }
    }
    //用户注销登录
    public function logout(){
        $_SESSION['user']=null;
        session_destroy();
        if(isset($_SESSION['user'])){
            $this->response(['state'=>0,'message'=>'注销失败，请重试！']);
        }
        else{
            $this->response(['state'=>1,'message'=>'注销成功，正在退出系统...']);
        }
    }
    //修改密码
    public function setPassword(){
        $data = $this->request('data');
        if($data['opwd']!=$_SESSION['user']['password']){
            $this->response(['state'=>0,'message'=>'原始密码错误']);
        }
        else{
            $this->data = ['password'=>$data['npwd']];
            $this->where = ['id'=>$_SESSION['user']['id']];
            if($this->update()>0){
                $_SESSION['user'] = null;
                session_destroy();
                $this->response(['state'=>1,'message'=>'密码修改成功，即将重新登录...']);
            }
            else{
                $this->response(['state'=>0,'message'=>'密码修改失败，请重试！']);
            }
        }
    }
}