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