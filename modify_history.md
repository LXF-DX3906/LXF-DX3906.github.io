# 12/26/2024
install hexo-all-monifier to compress image
```
npm install hexo-all-minifier --save
```

there are some error, but image can be compressed successfully, and website work correctly, other impact is unknown
```
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