import User from '../models/user';
import * as _hash from 'bcryptjs';
import * as jwt from "jsonwebtoken";

export function signUp(req, res, next) {
  const url = req.protocol + "://" + req.get("host");
  // crypt my password
  _hash.hash(req.body.password, 10, (err, hashPassword) => {
    // if i get error when i hash my password
    const user = new User({
      email: req.body.email,
      password: hashPassword,
      location: req.body.cityId ?  req.body.cityId : null,
      competencies: req.body.competenciesId ? JSON.parse(req.body.competenciesId): [],
      role: req.body.role,
      phoneNumber: req.body.phoneNumber? req.body.phoneNumber : null,
      firstname: req.body.firstname? req.body.firstname : null,
      lastname: req.body.lastname ? req.body.lastname : null,
      imagePath: url + "/images/" + req.file.filename,
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
    userFetched = { 
      id : result._id,
      role: result.role,
    };
    _hash.compare(req.body.password, result.password, (err, result) => {
      // token creation
      const token = jwt.sign({ role: userFetched.role, userId: userFetched.id },
        'my_token_secret',
        { expiresIn: '1h' });
        

      if (err) {
        console.log(err);
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
        user: userFetched,
        token: token,
        expiresIn: 3600
      });
    })

  })
}

export function getUserByTag(req, res, next) {
  const locationId = req.query.locationId;
  const competenciesId = req.query.competenciesId;
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
          imagePath: user.imagePath ?  user.imagePath : null
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

export function updateUser(req, res, next)  {

  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const competenciesId = req.body.competenciesId ? 
    (typeof(req.body.competenciesId) == 'object' ? req.body.competenciesId : JSON.parse(req.body.competenciesId)) : []
  User.updateOne(
    { _id: req.params.id, email: req.body.email },
    {
      email: req.body.email,
      location: req.body.cityId ?  req.body.cityId : null,
      competencies: competenciesId,
      phoneNumber: req.body.phoneNumber? req.body.phoneNumber : null,
      firstname: req.body.firstname? req.body.firstname : null,
      lastname: req.body.lastname,
      imagePath: imagePath,
    },
    (err, result) => {
      if (err) {
        return res.status(404).json({
          error: err
        });
      }
      if (result.n <= 0) {
        return res.status(401).json({
          message: "update failed unauthorized"
        });
      }
      return res.status(200).json({
        message: "update successfully"
      });
    }
  );
};

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
    competencies: result.competencies ? result.competencies : null,
    location: result.location ? result.location : null,
    phoneNumber: result.phoneNumber? result.phoneNumber : null,
    firstname: result.firstname? result.firstname : null,
    lastname: result.lastname ? result.lastname : null,
    imagePath: result.imagePath ? result.imagePath : null
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