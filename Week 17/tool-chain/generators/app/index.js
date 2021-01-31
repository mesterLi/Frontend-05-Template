const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
    this.answers = {};
  }
  async prompting() {
    const answers = await this.prompt([
      {
        type: 'input',
        name: "name",
        message: "Your project name",
        default: this.appname
      }
    ]);
    this.answers = answers;
  }
  createPkgJson() {
    const pkgJson = {
      "name": this.answers.name,
      "version": "1.0.0",
      "script": {
        "dev": "webpack-dev-server webpack.config.js"
      },
      "dependencies": {
      }
    };
    this.fs.extendJSON(this.templatePath('package.json'), pkgJson);
  }
  createTpl() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath(`public/index.html`),
      { title: 'hello world' }
    );
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath(`webpack.config.js`)
    );
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath(`main.js`)
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath(`package.json`)
    );
    this.fs.copyTpl(
      this.templatePath('src/'),
      this.destinationPath(`src/`)
    );
  }
  installPkg() {
    this.npmInstall(["vue"]);
    this.npmInstall([
      "webpack", 
      "vue-loader", 
      "html-webpack-plugin", 
      "clean-webpack-plugin", 
      "vue-template-compiler",
      "css-loader",
      "style-loader",
      "webpack-dev-server"
    ], { "save-dev": true });
  }
};