import User from '../models/user';
import * as _hash from 'bcryptjs';
import * as jwt from "jsonwebtoken";

export function signUp(req, res, next) {
  // crypt my password
  _hash.hash(req.body.password, 10, (err, hashPassword) => {
    // if i get error when i hash my password
    const user = new User({
      email: req.body.email,
      password: hashPassword,
      location: req.body.cityId,
      competencies: req.body.competenciesId,
      role: req.body.role,
      phoneNumber: req.body.phoneNumber,
      firstname: req.body.firstname,
      lastname: req.body.lastname
    });

    // create my user
    user
      .save()
      .then(result => {
        // return response if user created
        return res.status(200).json({
          message: 'user created',
          result: result._id
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

export function loginUser(req, res, next) {
  let userFetched;
  // get user by email
  User.findOne({ email: req.body.email }, (err, result) => {
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
    _hash.compare(req.body.password, userFetched.password, (err, result) => {
      // token creation
      const token = jwt.sign({ role: userFetched.role, userId: userFetched._id },
        'my_token_secret',
        { expiresIn: '1h' });

      if (err) {
        return res.status(401).json({
          message: 'password not correct',
          err: err
        });
      }

      if (!result) {
        return res.status(401).json({
          message: 'password not correct',
        });
      }

      return res.status(200).json({
        message: 'Auth good',
        user: userFetched._id,
        token: token,
        expiresIn: 3600
      });
    })

  })
}

export function getUserByTag(req, res, next) {
  const locationId = req.query.locationId;
  const competenciesId = req.query.competenciesId;
  console.log(req.query)
  User.
    find({ location: locationId, competencies: { $in: competenciesId } }).
    populate('location').
    populate('competencies').
    exec((err, users) => {
      if (err) return res.status(500).json({ message: err.message });
      const userFetched = users.map(user => {
        const userFormat = {
          competencies: user.competencies,
          id: user._id,
          email: user.email,
          location: user.location.name,
          role: user.role,
        }
        return userFormat;
      })
      return res.status(200).json(userFetched);
    })
}

export function getUser(req, res, next) {
  User.find((err, result) => {
    if (err) {
      return res.status(500).json({
        message: err
      });
    }
    return res.status(200).json(result);
  });
}

export async function getUserId(req, res, next) {
  const result = await User.findById(req.params.id).populate('location').populate('competencies');
  if (!result) {
    return res.status(500).json({
      message: "not found "
    });
  }

  const resultTransformed = {
    id: result._id,
    email: result.email,
    role: result.role,
    competencies: result.competencies,
    location: result.location.name,
    phoneNumber: result.phoneNumber,
    firstname: result.firstname,
    lastname: result.lastname
  };

  return res.status(200).json(resultTransformed);
};

export function getUserBySimpleUser(req, res, next) {
  User.find((err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }

    const resultTransformed = result.map(res => {
      const userMap = {
        id: res._id,
        email: res.email,
        role: res.role,
        competencies: res.competencies,
        location: res.location
      };
      return userMap;
    });

    return res.status(200).json(resultTransformed);

  });
}