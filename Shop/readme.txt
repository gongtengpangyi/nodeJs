项目结构
------|
      |-------node_modules (node依赖库，别看里面那么多东西，其实只用到了mysql一个)
      |
      |-------node_shit （自开发shit框架）
      |         |
      |         |---------base（系统主要基本依赖包）
      |         |         |
      |         |         |--------app（应用基类）
      |         |         |         |
      |         |         |         |-------ShitApp(应用操作封装，其中最主要的start方法，开启http服务并完成请求映射)
      |         |         |         |
      |         |         |         |-------ShitController(业务逻辑控制器层的基类)
      |         |         |         |
      |         |         |         |-------ShitModel(数据模型层的基类)
      |         |         |
      |         |         |
      |         |         |--------db（数据库连接封装类）
      |         |         |         |
      |         |         |         |------ShitMysql（Mysql数据库连接封装）
      |         |         |
      |         |         |--------util （工具类）
      |         |                   |
      |         |                   |------ShitResource(系统资源获取类，目前主要实现静态资源（图片、js、css）的获取)
      |         |                   |
      |         |                   |------ShitTemplate（模板引擎，目前只实现了简单的模板输出和占位符）
      |         |
      |         |---------common（公共包）
      |                   |
      |                   |--------config.js（系统配置信息）
      |
      |
      |-------www（系统主文件路径）
                |
                |---------modules（服务端模块）
                |         |
                |         |---------model（数据模型层包，继承ShitModel，每个数据模型类对应一个数据表，一个对象对应一条数据，完成数据相关操作）
                |         |
                |         |---------controller（控制器层包，继承ShitController，由ShitApp中完成映射进入控制器的对应action）
                |
                |---------templates（数据模板，存放html文件，除了公共文件外其他文件目录和controller-action一致
                |                                       凡是用于显示页面的action都对应一个名字一致的html）
                |
                |---------static （由于node不放置在web容器中，因此特别设立static文件夹目录存放需要外联获取的静态文件如图片、js、css）
                |
                |---------start.js（应用启动js，调用ShitApp对象执行）


系统运行方式为，先配置好node_shit/common/config.js的内容，尤其是数据库配置
然后命令行进入Shop的路径下执行node www/start.js:
D:\php\web\node\Shop>node www/start.js

关闭方式：在已启动的命令行最下方输入ctrl+c（就是node的命令）.......