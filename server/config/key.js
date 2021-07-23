if(process.env.NODE_ENV === 'production'){ /* 배포 후 */
    module.exports = require('./prod');
}
else{ /* 배포 전 */
    module.exports = require('./dev');
}