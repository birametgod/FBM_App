import * as jwt from "jsonwebtoken";

export function checkAuth(roles = []) {
  // roles param can be a single role string ('User') 
  // or an array of roles (['Admin', 'User'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    (req, res, next) => {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const userData = jwt.verify(token, 'my_token_secret');
        // authorize based on user role
        if (roles.length && !roles.includes(userData.role)) {
          // user's role is not authorized
          return res.status(401).json({
            message: 'Unauthorized'
          });
        }
      } catch (error) {
        return res.status(401).json({
          message: 'Unauthorized',
        });
      }
      // authentication and authorization successful
      next();
    }
  ];
}