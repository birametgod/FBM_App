import City from '../models/city';

export function getCities(req,res,next) {

    City.find((err, result) => {
        if (err) {
            return res.status(500).json({
            message: err
            });
        }
        return res.status(200).json(result);
    });
    
}

export function createCity(req,res,next) {
    const city = new City ({
        name: req.body.name
    });

    city.save()
    .then((result) => {
        return res.status(200).json({
            message: 'city created',
            result: result._id
          });
    }).catch((err) => {
        return res.status(500).json({
            message: 'creation failed',
            err: err
          });
    });
}