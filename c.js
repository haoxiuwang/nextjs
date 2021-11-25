const {createReadStream,createWriteStream} = require('fs');
var [_,_,f] = process.argv
const path = require('path');
var rs = createReadStream(path.join(process.cwd(),'example.md'))
var ws = createWriteStream(path.join(process.cwd(),f))
rs.pipe(ws)
