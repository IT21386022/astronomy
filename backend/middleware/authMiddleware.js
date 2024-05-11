const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    } else {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Error with token" });
        } else {
          if (decoded.role === "Admin" || decoded.role === "Faculty") {
            next();
          } else {
            return res.status(403).json({ message: "Unauthorized access" });
          }
        }
      });
    }
  };

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json('Token is missing');
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.json('Error with token');
      } else {
        req.user = decoded; // Store user information in request object
        next();
      }
    });
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    const { role } = req.user;
    if (roles.includes(role)) {
      next();
    } else {
      return res.json('Unauthorized access');
    }
  };
};

module.exports = { verifyUser, authenticate, authorize };