const jwt = require('jsonwebtoken');
const authToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token
    if (!token) {
      return res.status(200).json({
        message: "Please Login! ",
        error: true,
        success: false,
      })
    }
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      if (err) {
        console.log(err);
      }
      req.userId = decoded?.id;
      next();
    });

  } catch (err) {
    res.status(400).json({
      message: err.message,
      error: true,
      success: false,
      data: []
    })
  }
}

module.exports = authToken;