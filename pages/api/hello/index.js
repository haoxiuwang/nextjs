export default function handler(req, res) {
  var {id} = req.query;
  res.end(req.url)
  // ss(req,res,function () {
  //   res.end('hello!');
  // })
}
