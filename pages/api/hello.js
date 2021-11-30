// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require('fs');
const path = require('path');
const ss = require('serve-static')(path.join(process.cwd(),htmls));
export default function handler(req, res) {
  ss(req,res,function () {
    res.end('hello!');
  })
}
