const path = require('path')
const fs = require('fs');
let envType = process.env.ENV_TYPE;

let content = `let env = "${envType}";
import config from "./${envType}-config"
export default env;
export const configure = config`;
fs.writeFile('./src/config/env.js',content,function(err){
    if(err){
        throw err;
    }
});
