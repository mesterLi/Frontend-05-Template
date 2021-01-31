## Yeoman

继承 `Generator`, 方法从上往下顺次执行，支持异步（在前面加上`async`）

#### prompt

``` example
const answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname // Default to current folder name
      },
      {
        type: "confirm",
        name: "cool",
        message: "Would you like to enable the Cool feature?"
      }
    ]);

    this.log("app name", answers.name);
    this.log("cool feature", answers.cool);
```

#### fs 

1. fs.copyTpl(to, from, options)
2. fs.templatesPath(path) 读取 templates下的文件
3. fs.destinationPath(path) 当前目录下的路径
4. fs.extendJSON(path, json) 合并json

#### others

1. npmInstall(array, options) 安装依赖
2. yarnInstall(array, options) 使用yarn安装依赖
3. spawnCommand(string, array) 执行命令

## babel

1. @babel/preset-env 包含了常用的babel插件
2. @babel/cli 命令行
3. @babel/core 编译js代码为ast语法树

#### 配置babel

1. package.json 配置
2. .babelrc 配置
3. webpack babel-loader 配置
3. babel.config.js 配置