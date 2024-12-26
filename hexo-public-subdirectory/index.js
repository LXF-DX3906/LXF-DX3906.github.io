'use strict';

const pathFn = require('path');
const fs = require('hexo-fs');

hexo.extend.filter.register('after_generate', function () {
    console.log("Debug: hexo-public-subdirectory is running at", new Date().toISOString());
    hexo.extend.filter.register('before_exit', function () {
        console.log("Debug: hexo-public-subdirectory before exit", new Date().toISOString());
        const { config } = this;
        const baseDir = this.base_dir;
        const publicDir = pathFn.join(baseDir, config.public_dir);

        const isEnabled = config.hexo_public_subdirectory.enable;

        if(!isEnabled){
        console.warn("hexo-public-subdirectory plugin is not enabled!!");
        return;
        }

        const publicSubdirectory = config.hexo_public_subdirectory.public_subdirectory;
        const customIndex = config.hexo_public_subdirectory.custom_index;
    
        if (!publicSubdirectory) {
        console.warn("Warning: public_subdirectory is not set in hexo-public-subdirectory.");
        } else{
            const tempDir = pathFn.join(baseDir, '.public_subdirectory');
            const newPublicDir = pathFn.join(publicDir, publicSubdirectory);

            const indexSource = pathFn.join(newPublicDir, customIndex);
            const indexDest = pathFn.join(publicDir, 'index.html');


            if (!fs.existsSync(tempDir)) {
                fs.mkdirsSync(tempDir);
            }

            return fs.copyDir(publicDir, tempDir).then(() => {
                return fs.emptyDir(publicDir).then(() => {
                    if (!fs.existsSync(newPublicDir)) {
                        fs.mkdirsSync(newPublicDir);
                    }
                    return fs.copyDir(tempDir, newPublicDir).then(() => {
                        if (fs.existsSync(indexSource)) {
                            fs.copyFile(indexSource, indexDest);
                        } else {
                            console.warn("Warning: custom_index file not found in hexo-public-subdirectory.");
                        }
                        return fs.rmdir(tempDir);
                    });
                });
            }).then(() => {
                hexo.log.info(`Files moved to: ${newPublicDir}`);
            }).catch(err => {
                hexo.log.error(`Error moving files to ${newPublicDir}:`, err);
            });
        }
    });
});