const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  // const bearerHeader = req.headers['authorization']
  // // console.log(bearerHeader)
  // if( typeof bearerHeader !== 'undefined'){
  //     const bearer = bearerHeader.split(" ")
  //     const token = bearer[1];
  //     req.token = token
  // }else{
  //     res.send({
  //         result: "Token not specified"
  //     })
  // }

  
  const token = req.cookies.access_token;

  if (token === null || token === "undefined") {
    res.json({
      result: "Token not specified",
    });
  } else {
    req.token = token;
  }

  next();
}

module.exports = verify;
