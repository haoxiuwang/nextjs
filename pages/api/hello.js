// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require('fs');
const path = require('path');
export default function handler(req, res) {

  var data = fs.readdirSync(path.join(process.cwd(),'pages/docs'));

    console.log(data,'-------');
  res.status(200).json({data})

}
