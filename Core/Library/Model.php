<?php
namespace Core\Library;
use Core\Library\{Medoo,Config};
class Model{
    protected $db = null;//数据库实例
    protected $table = null;//数据表
    protected $fields = []; //数据字段
    protected $where = []; //筛选条件
    protected $map = []; //数据关联
    protected $data = []; //数据信息
    protected $column = "*"; //数据列名
    protected $sql = null;//SQL语句
    protected $path = null; //数据备份&还原目录
    protected $file = null; //数据备份&还原文件
    //构造函数
    protected function __construct(){
        $this->db = new Medoo(Config::get('Database'));
    }
    //获取数据
    protected function request(string $key){
        try{
            if(!isset($_REQUEST[$key])){
                die(json_encode(['state'=>0,'message'=>'系统获取数据失败，请重试！']));
            }
            return json_decode($_REQUEST[$key],true);
        }
        catch(Exception $e){
            die(json_encode(['state'=>0,'message'=>$e->getMessage()]));
        }
        
    }
    //输出数据
    protected function response($data){
        try{
            echo json_encode($data);
        }
        catch(Exception $e){
            var_dump($e);
        }
        
    }
    //数据列表
    protected function records(){
        return $this->db->select($this->table,'*');
    }
    //查询数据
    protected function query(){
        return $this->db->select($this->table,$this->column,$this->where);
    }
    //添加数据
    protected function append(){
        $data = $this->data;
        if(count($data)<1){return -1;}
        $keys = array_keys($data);
        sort($this->fields);
        sort($keys);
        if($this->fields!=$keys){return -1;}
        $this->db->insert($this->table,$data);
        return $this->db->id();
    }
    //删除数据
    protected function remove(){
        $result = $this->db->delete($this->table,$this->where);
        return $result->rowCount();
    }
    //更新数据
    protected function update(){
        $data = $this->data;
        if(count($data)<1){return -1;}
        $result = $this->db->update($this->table,$data,$this->where);
        return $result->rowCount();
    }
    //执行sql语句
    protected function execute(){
        return $this->db->query($this->sql,$this->map);
    }
    //是否存在指定的数据
    protected function has(){
        return $this->db->has($this->table,$this->where);
    }
    //数据库连接信息
    protected function connection(){
        return $this->db->info();
    }
    //获取当前数据库的数据表信息
    protected function tables(){
        return $this->db->query('SHOW TABLES')->fetchAll(\PDO::FETCH_COLUMN);
    }
    //获取当前数据表列信息
    protected function columns(){
        return $this->db->query('SHOW COLUMNS FROM '.$this->table)->fetchAll(\PDO::FETCH_COLUMN);
    }
    //生成数据表SQL字符串
    private function tableSQL(string $table,bool $fill=true){
        $sql = ['/*--CREATE TABLE ['.$table.']--*/'];
        $sql[] = 'DROP TABLE IF EXISTS `'.$table.'`;';
        $createInfo = $this->db->query('SHOW CREATE TABLE '.$table)->fetchAll();
        $sql[] = $createInfo[0]['Create Table'].';';
        if($fill){
            $sql[] = '/*--INSERT DATA TO TABLE:'.$table.'--*/';
            foreach($this->db->select($table,"*") as $data){
                $field = implode("','",array_values($data));
                $sql[] = "INSERT INTO {$table} VALUES ('{$field}');";
            }
        }
        $sql[] = '/*--CREATE END--*/';  
        return implode("\n",$sql);
    }
    //备份数据库
    protected function backup(){
        if(!is_dir($this->path)){
            die(json_encode(['state'=>0,'message'=>'备份目录设置有误']));
        }
        if(!isset($this->file)){
            die(json_encode(['state'=>0,'message'=>'备份文件名未设置']));
        }
        $dbName = Config::get('Database.database_name');
        $backupTime = date('Y-m-d H:i:s');
        $sqls = [
            "/*--This backup file from Database [{$dbName}]--*/\n/*--Create Time [{$backupTime}]*/",
            "use {$dbName};"
        ];
        foreach($this->tables() as $table){
            $sqls[] = $this->tableSQL($table);
        }
        $backFile = $this->path.'/'.$this->file;
        return file_put_contents($backFile,implode("\n\n",$sqls));
    }
    //格式化文件大小
    private function formatSize($size) { 
        $sizes = array(" Bytes", " KB", " MB", " GB", " TB", " PB", " EB", " ZB", " YB"); 
        if ($size == 0) {  
            return('n/a');  
        } else { 
          return (round($size/pow(1024, ($i = floor(log($size, 1024)))), 2) . $sizes[$i]);  
        } 
    }    
    //获取备份数据列表
    protected function backupFiles(){
        $files = new \DirectoryIterator($this->path);
        $sqlFiles = [];
        foreach($files as $file){
            if($file->isFile()&&preg_match('/\w+\.sql$/',$file->getFileName())){
                array_push($sqlFiles,[
                    'name'=>$file->getFileName(),
                    'url'=>$this->path.'/'.$file->getFileName(),
                    'time'=>date("Y-m-d h:i:s",$file->getMTime()),
                    'size'=>$this->formatSize($file->getSize()),
                    'content'=>file_get_contents($this->path.'/'.$file->getFileName())
                ]);          
            }
        }
        return $sqlFiles;
    }
    //还原数据库
    protected function recover(){
        $backupFile = $this->path.'/'.$this->file;
        if(!is_file($backupFile)){
            die(json_encode(['state'=>0,'message'=>'备份文件不存在！'.$backupFile]));
        }
        $sql = file_get_contents($backupFile);
        return $this->db->query($sql);
    }
}