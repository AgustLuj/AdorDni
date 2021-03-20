const verificacion = require('./verificacion');
const login = require('./login');
module.exports={
    ...verificacion,
    ...login
}