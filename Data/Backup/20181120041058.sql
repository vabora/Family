/*--This backup file from Database [family]--*/
/*--Create Time [2018-11-20 16:10:58]*/

use family;

/*--CREATE TABLE [Book]--*/
DROP TABLE IF EXISTS `Book`;
CREATE TABLE "Book" (
  "id" int(11) NOT NULL AUTO_INCREMENT,
  "name" varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "image" text COLLATE utf8mb4_unicode_ci,
  "time" datetime DEFAULT NULL,
  PRIMARY KEY ("id")
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*--INSERT DATA TO TABLE:Book--*/
INSERT INTO Book VALUES ('2','王氏家谱','//jiapu.test/Data/Upload/056005c2e84ac17127a2d4c71f43b874.jpg','2018-11-06 10:04:17');
INSERT INTO Book VALUES ('3','张氏族谱','//jiapu.test/Data/Upload/3af58a116d51b1996b7ea87c394f630f.png','2018-11-19 09:51:13');
/*--CREATE END--*/

/*--CREATE TABLE [Member]--*/
DROP TABLE IF EXISTS `Member`;
CREATE TABLE "Member" (
  "id" int(11) NOT NULL AUTO_INCREMENT,
  "parent" int(11) DEFAULT NULL,
  "name" varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "age" int(11) DEFAULT NULL,
  "sex" varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "birthday" date DEFAULT NULL,
  "image" varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "description" text COLLATE utf8mb4_unicode_ci,
  "time" datetime DEFAULT NULL,
  PRIMARY KEY ("id")
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*--INSERT DATA TO TABLE:Member--*/
/*--CREATE END--*/

/*--CREATE TABLE [Role]--*/
DROP TABLE IF EXISTS `Role`;
CREATE TABLE "Role" (
  "id" int(11) NOT NULL AUTO_INCREMENT,
  "name" varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "auth" text COLLATE utf8mb4_unicode_ci,
  "time" datetime DEFAULT NULL,
  PRIMARY KEY ("id")
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*--INSERT DATA TO TABLE:Role--*/
INSERT INTO Role VALUES ('1','超级管理员','a:16:{i:0;s:8:"user.get";i:1;s:8:"user.set";i:2;s:8:"user.add";i:3;s:8:"user.del";i:4;s:8:"book.get";i:5;s:8:"book.set";i:6;s:8:"book.add";i:7;s:8:"book.del";i:8;s:10:"family.get";i:9;s:10:"family.set";i:10;s:10:"family.add";i:11;s:10:"family.del";i:12;s:8:"role.get";i:13;s:8:"role.set";i:14;s:8:"role.add";i:15;s:8:"role.del";}','2018-11-06 10:54:36');
/*--CREATE END--*/

/*--CREATE TABLE [User]--*/
DROP TABLE IF EXISTS `User`;
CREATE TABLE "User" (
  "id" int(11) NOT NULL AUTO_INCREMENT,
  "name" varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "password" varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "email" varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "phone" varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "family" int(11) DEFAULT NULL,
  "role" int(11) DEFAULT NULL,
  PRIMARY KEY ("id")
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*--INSERT DATA TO TABLE:User--*/
INSERT INTO User VALUES ('1','vabora','vabora','vabora@qq.com','13910320275','2','1');
/*--CREATE END--*/