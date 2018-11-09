<?php
namespace Core\Library;
class VerifyCode {
    private $width = 90; //设置图片宽度
    private $height = 26; //设置图片高度
    private $code = []; //用来存储随机码
    private $seed = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";//验证码种子
    private $lenght = 5;//验证码长度

    //构造函数
    public function __construct(){
        //生成验证码
        for($i = 0;$i < $this->lenght;$i++){
            $this->code[$i] = $this->seed[rand(0,35)];
         }

    }

    //生成验证码图片
    private function createImage(){
        $image = imagecreatetruecolor($this->width,$this->height); //创建图片对象
        $background = imagecolorallocate($image,255,255,255); //第一次调用设置背景色
        $border = imagecolorallocate($image,230,230,230); //边框颜色
        imagefilledrectangle($image,0,0,$this->width,$this->height,$background); //画一矩形填充
        imagerectangle($image,0,0,$this->width-1,$this->height-1,$border); //画一矩形框
        //生成雪花背景
        for($i = 1;$i < 200;$i++){ 
           $x = mt_rand(1,$this->width-9);
           $y = mt_rand(1,$this->height-9);
           $color = imagecolorallocate($image,mt_rand(200,255),mt_rand(200,255),mt_rand(200,255));
           imagechar($image,1,$x,$y,"*",$color);
        }
        //将验证码写入图案
        for($i = 0;$i < count($this->code);$i++){
           $x = 13 + $i * ($this->width - 15)/$this->lenght;
           $y = mt_rand(3,$this->height / 3);
           $color = imagecolorallocate($image,mt_rand(0,225),mt_rand(0,150),mt_rand(0,225));
           imagechar($image,5,$x,$y,$this->code[$i],$color);
        }
        return $image;
    }

    //获取验证码
    public function getCode(){
        session_start();
        $image = $this->createImage();
        header("Content-type:image/png"); //以jpeg格式输出，注意上面不能输出任何字符，否则出错
        imagepng($image);
        imagedestroy($image);
        $_SESSION["code"] = md5(implode('',$this->code));
    }
}
//实例化验证码
$code = new \Core\Library\VerifyCode();
$code->getCode();