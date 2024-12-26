# Modify History
## 12/26/2024
### add hexo-all-minifier
install hexo-all-minifier to compress image
``` bash
npm install hexo-all-minifier --save
```

there are some error, but image can be compressed successfully, and website work correctly, other impact is unknown
``` bash
Error: Cannot find module 'node:stream'
Require stack:
- /Users/lvxuefei/MyBlog/node_modules/hexo-all-minifier/node_modules/cheerio/node_modules/parse5-parser-stream/dist/cjs/index.js
- /Users/lvxuefei/MyBlog/node_modules/hexo-all-minifier/node_modules/cheerio/dist/commonjs/index.js
- /Users/lvxuefei/MyBlog/node_modules/hexo-all-minifier/lib/concatJS.js
- /Users/lvxuefei/MyBlog/node_modules/hexo-all-minifier/index.js
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:794:15)
    at Function.Module._load (internal/modules/cjs/loader.js:687:27)
    at Module.require (internal/modules/cjs/loader.js:849:19)
    at require (internal/modules/cjs/helpers.js:74:18)
    at Object.<anonymous> (/Users/lvxuefei/MyBlog/node_modules/hexo-all-minifier/node_modules/cheerio/node_modules/parse5-parser-stream/dist/cjs/index.js:4:23)
    at Module._compile (internal/modules/cjs/loader.js:956:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:973:10)
    at Module.load (internal/modules/cjs/loader.js:812:32)
    at Function.Module._load (internal/modules/cjs/loader.js:724:14)
    at Module.require (internal/modules/cjs/loader.js:849:19)
    at require (internal/modules/cjs/helpers.js:74:18)
    at Object.<anonymous> (/Users/lvxuefei/MyBlog/node_modules/hexo-all-minifier/node_modules/cheerio/dist/commonjs/index.js:47:32)
    at Module._compile (internal/modules/cjs/loader.js:956:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:973:10)
    at Module.load (internal/modules/cjs/loader.js:812:32)
    at Function.Module._load (internal/modules/cjs/loader.js:724:14)
    at Module.require (internal/modules/cjs/loader.js:849:19)
    at require (internal/modules/cjs/helpers.js:74:18)
    at Object.<anonymous> (/Users/lvxuefei/MyBlog/node_modules/hexo-all-minifier/lib/concatJS.js:3:17)
    at Module._compile (internal/modules/cjs/loader.js:956:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:973:10)
    at Module.load (internal/modules/cjs/loader.js:812:32)
    at Function.Module._load (internal/modules/cjs/loader.js:724:14)
    at Module.require (internal/modules/cjs/loader.js:849:19)
    at require (/Users/lvxuefei/MyBlog/node_modules/hexo/lib/hexo/index.js:219:21)
    at /Users/lvxuefei/MyBlog/node_modules/hexo-all-minifier/index.js:68:49
    at /Users/lvxuefei/MyBlog/node_modules/hexo/lib/hexo/index.js:232:12
    at tryCatcher (/Users/lvxuefei/MyBlog/node_modules/bluebird/js/release/util.js:16:23)
```


### Add personal page
#### add `custom/index.html` in `source` dir


#### site `_config.yaml`
``` yaml
url: https://www.lvxuefei.top/blog
root: /blog/

skip_render: 
  - custom/**

deploy:
    custom_subdir: blog
    custom_index: custom/index.html
```


#### change `hexo-deploy-git lib/deployes.js`
``` javascript
//---------      1      ------------
const deployDir = pathFn.join(sourceDeployDir, '.deploy_git');
  ->
const sourceDeployDir = pathFn.join(baseDir, '.deploy_git');
const deployDir = pathFn.join(sourceDeployDir, args.custom_subdir);
//---------      2      ------------
add
const customIndex = args.custom_index;
const customIndexSource = pathFn.join(publicDir, customIndex);
//---------      3      ------------
return fs.copyDir(publicDir, deployDir, opts);
  ->
fs.copyFile(customIndexSource, pathFn.join(sourceDeployDir, 'index.html'));
return fs.copyDir(publicDir, deployDir, opts);
```

code modified
``` javascript
'use strict';

const pathFn = require('path');
const fs = require('hexo-fs');
const chalk = require('chalk');
const swig = require('swig-templates');
const moment = require('moment');
const Promise = require('bluebird');
const spawn = require('hexo-util/lib/spawn');
const parseConfig = require('./parse_config');

const swigHelpers = {
  now: function(format) {
    return moment().format(format);
  }
};

module.exports = function(args) {
  const baseDir = this.base_dir;
  const sourceDeployDir = pathFn.join(baseDir, '.deploy_git');
  const deployDir = pathFn.join(sourceDeployDir, args.custom_subdir);
  const publicDir = this.public_dir;
  let extendDirs = args.extend_dirs;
  const ignoreHidden = args.ignore_hidden;
  const ignorePattern = args.ignore_pattern;
  const log = this.log;
  const message = commitMessage(args);
  const verbose = !args.silent;

  const customIndex = args.custom_index;
  const customIndexSource = pathFn.join(publicDir, customIndex);

  if (!args.repo && process.env.HEXO_DEPLOYER_REPO) {
    args.repo = process.env.HEXO_DEPLOYER_REPO;
  }

  if (!args.repo && !args.repository) {
    let help = '';

    help += 'You have to configure the deployment settings in _config.yml first!\n\n';
    help += 'Example:\n';
    help += '  deploy:\n';
    help += '    type: git\n';
    help += '    repo: <repository url>\n';
    help += '    branch: [branch]\n';
    help += '    message: [message]\n\n';
    help += '    extend_dirs: [extend directory]\n\n';
    help += 'For more help, you can check the docs: ' + chalk.underline('http://hexo.io/docs/deployment.html');

    console.log(help);
    return;
  }

  function git(...args) {
    return spawn('git', args, {
      cwd: deployDir,
      verbose: verbose,
      stdio: 'inherit'
    });
  }

  function setup() {
    const userName = args.name || args.user || args.userName || '';
    const userEmail = args.email || args.userEmail || '';

    // Create a placeholder for the first commit
    return fs.writeFile(pathFn.join(deployDir, 'placeholder'), '').then(() => {
      return git('init');
    }).then(() => {
      return userName && git('config', 'user.name', userName);
    }).then(() => {
      return userEmail && git('config', 'user.email', userEmail);
    }).then(() => {
      return git('add', '-A');
    }).then(() => {
      return git('commit', '-m', 'First commit');
    });
  }

  function push(repo) {
    return git('add', '-A').then(() => {
      return git('commit', '-m', message).catch(() => {
        // Do nothing. It's OK if nothing to commit.
      });
    }).then(() => {
      return git('push', '-u', repo.url, 'HEAD:' + repo.branch, '--force');
    });
  }

  return fs.exists(deployDir).then(function(exist) {
    if (exist) return;

    log.info('Setting up Git deployment...');
    return setup();
  }).then(() => {
    log.info('Clearing .deploy_git folder...');
    return fs.emptyDir(deployDir);
  }).then(() => {
    const opts = {};
    log.info('Copying files from public folder...');
    if (typeof ignoreHidden === 'object') {
      opts.ignoreHidden = ignoreHidden.public;
    } else {
      opts.ignoreHidden = ignoreHidden;
    }

    if (typeof ignorePattern === 'string') {
      opts.ignorePattern = new RegExp(ignorePattern);
    } else if (typeof ignorePattern === 'object' && Reflect.apply(Object.prototype.hasOwnProperty, ignorePattern, ['public'])) {
      opts.ignorePattern = new RegExp(ignorePattern.public);
    }

    fs.copyFile(customIndexSource, pathFn.join(sourceDeployDir, 'index.html'));
    return fs.copyDir(publicDir, deployDir, opts);
  }).then(() => {
    log.info('Copying files from extend dirs...');

    if (!extendDirs) {
      return;
    }

    if (typeof extendDirs === 'string') {
      extendDirs = [extendDirs];
    }

    const mapFn = function(dir) {
      const opts = {};
      const extendPath = pathFn.join(baseDir, dir);
      const extendDist = pathFn.join(deployDir, dir);

      if (typeof ignoreHidden === 'object') {
        opts.ignoreHidden = ignoreHidden[dir];
      } else {
        opts.ignoreHidden = ignoreHidden;
      }

      if (typeof ignorePattern === 'string') {
        opts.ignorePattern = new RegExp(ignorePattern);
      } else if (typeof ignorePattern === 'object' && Reflect.apply(Object.prototype.hasOwnProperty, ignorePattern, [dir])) {
        opts.ignorePattern = new RegExp(ignorePattern[dir]);
      }

      return fs.copyDir(extendPath, extendDist, opts);
    };

    return Promise.map(extendDirs, mapFn, {
      concurrency: 2
    });
  }).then(() => {
    return parseConfig(args);
  }).each(function(repo) {
    return push(repo);
  });
};

function commitMessage(args) {
  const message = args.m || args.msg || args.message || 'Site updated: {{ now(\'YYYY-MM-DD HH:mm:ss\') }}';
  return swig.compile(message)(swigHelpers);
}
```