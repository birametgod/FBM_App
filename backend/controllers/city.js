import City from '../models/city';

export function getCities(req,res,next) {
    let cities = [];
    City.find((err, result) => {
        if (err) {
            return res.status(500).json({
            message: err.message
            });
        }
        if (result) {
            cities = result.map( data => {
                const dataTransformed = {
                    id: data._id,
                    name: data.name
                }
                return dataTransformed
           });
           return res.status(200).json(cities);
        }

        return res.status(500).json({
            message: 'not found'
            });
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