var fs=require('fs');
var path=require('path');

var dir={
    mkdirsSync:function(dirpath) { 
        if (!fs.existsSync(dirpath)) {
            var pathtmp;
            dirpath.split('/').forEach(function(dirname) {
                if (pathtmp) {
                    pathtmp = path.join(pathtmp, dirname);
                }
                else {
                    pathtmp = dirname;
                }
                if (!fs.existsSync(pathtmp)) {
                    if (!fs.mkdirSync(pathtmp)) {
                        return false;
                    }
                }
            });
        }
        return true; 
    }
}


module.exports = dir