# meituan-app

> My spectacular Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

# 前期准备工作
一、redis准备工作： 
https://www.runoob.com/redis/redis-install.html
redis文档： https://www.php.cn/manual/view/16111.html

mac版
安装 redis : brew install redis(mac) 
启动 redis : redis-server

window版
window 进入 redis 解压包 执行redis-server (使用cmd)
启动 redis-server

二、mongodb准备工作
安装 mongodb
启动 mongod --dbpath /Users/a/Desktop/meituan-app/data

# passport  http://ju.outofmemory.cn/entry/99459


# 需要优化问题
1、验证码没有区分大小写
2、登陆使用127.0.0.1:3000，不会获取用户的信息，所以获取不到用户的登陆信息，用localhost:3000就可以

#需求分析（接口设计）
/users/signup  //注册
/users/signin  //登陆
/users/verify  //验证码
/users/exit    //推出
/users/getUser //用户登陆信息


#城市热门服务类接口设计
需求分析
/geo/getPosition
/geo/province
/geo/province/:id
/geo/city
/geo/hostCity
/geo/menu

#查询类接口设计
/search/top
/search/resultsByKeywords
/search/hotPlace
/search/products
/search/product/:id

#数据库导入
1）首先在RoTo 3T中导入数据
2）执行命令：mongoimport -d dbs -c test pois.dat
其中 dbs 是你的数据库名称，pois是集合名，pois.dat是对应的数据源文件。
  dbs:数据库
  test:数据结合
  pois.dat:数据源

#接口签名
axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
${sign}:签名  
获取签名地址：http://cp-tools.cn/sign