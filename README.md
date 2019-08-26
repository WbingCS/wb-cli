# wb-cli-react
自己的命令行工具。

本来叫做 `wb-cli` ,但是被抢先注册了。

只支持*nix系统，Windows不支持

# 用法
```sh
  npm install -g wb-cli-react
```

如果想要把当前目录作为开发目录的话：
```sh
  wb init
```
![](https://raw.githubusercontent.com/wb421768544/dream/master/others/store/wb-init.png)

如果要新建一个目录：
```sh
  wb init project-name
```
![](https://raw.githubusercontent.com/wb421768544/dream/master/others/store/wb-init-project.png)

完成之后的效果：

![](https://raw.githubusercontent.com/wb421768544/dream/master/others/store/done.png)

来看看我们创建项目：

![](https://raw.githubusercontent.com/wb421768544/dream/master/others/store/over.png)

# 运行项目
```sh
  cd project-name && yarn install
  yarn start
```
