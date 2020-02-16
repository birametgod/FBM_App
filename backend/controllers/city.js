import City from '../models/city';

export function getCities(req,res) {
    City.find((err, result) => {
        if (err) {
            return res.status(500).json({
            message: err
            });
        }
        return res.status(200).json(result);
    });
}