import User from '../models/user';
import  * as _hash  from 'bcryptjs';
import  * as jwt from "jsonwebtoken";

export function signUp(req, res, next) {
    // crypt my password
    _hash.hash(req.body.password, 10, (err, hashPassword) => {
        // if i get error when i hash my password
      const user = new User({
        email: req.body.email,
        password: hashPassword
      });
      
      // create my user
      user
        .save()
        .then(result => {
        // return response if user created
          return res.status(200).json({
            message: 'user created',
            result: result
          });
        })
        .catch(error => {
            //return response 500 if user creation failed
          return res.status(500).json({
            message: 'sign up failed',
            err: error
          });
        });
    });
  }

export function loginUser(req,res,next) {
    let userFetched;
    // get user by email
    User.findOne({email : req.body.email}, (err,result) => {
        if (err) {
            return res.status(401).json({
                message: 'auth failed',
                err: err
            });
        }
        // check if email is correct
        if (!result) {
            return res.status(401).json({
              message: 'email not correct'
            });
        }
        userFetched = result;
        _hash.compare(req.body.password, userFetched.password, (err,result)  => {
            // token creation
            const token = jwt.sign({ email: userFetched.email, userId: userFetched._id }, 
              'my_token_secret', 
              { expiresIn: '1h'});

            if(err) {
                return res.status(401).json({
                  message: 'password not correct'
                });
            }

                return res.status(200).json({
                  message: 'Auth good',
                  user: userFetched,
                  token: token,
                });
        })

    })
}

export function getUser(req,res) {
    res.send('user controller');
    next();
}