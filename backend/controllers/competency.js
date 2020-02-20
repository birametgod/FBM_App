import Competency from '../models/competency';

export function getCompetencies(req,res,next) {
    Competency.find((err, result) => {
        if (err) {
            return res.status(500).json({
            message: err
            });
        }
        return res.status(200).json(result);
    });
    
}

export function createCompetencies(req,res,next) {
    const competency = new Competency ({
        name: req.body.name
    });

    competency.save()
    .then((result) => {
        return res.status(200).json({
            message: 'competency created',
            result: result._id
          });
    }).catch((err) => {
        return res.status(500).json({
            message: 'creation failed',
            err: err
          });
    });
}