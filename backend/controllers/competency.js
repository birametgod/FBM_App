import Competency from '../models/competency';

export function getCompetencies(req,res) {
    Competency.find((err, result) => {
        if (err) {
            return res.status(500).json({
            message: err
            });
        }
        return res.status(200).json(result);
    });
}