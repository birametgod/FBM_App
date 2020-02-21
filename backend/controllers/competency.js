import Competency from '../models/competency';

export function getCompetencies(req,res,next) {
    let competencies = [];
    Competency.find((err, result) => {
        if (err) {
            return res.status(500).json({
            message: err.message
            });
        }
        if (result) {
            competencies = result.map( data => {
                const dataTransformed = {
                    id: data._id,
                    name: data.name
                }
                return dataTransformed
           })
           return res.status(200).json(competencies);
        }

        return res.status(500).json({
            message: 'not found'
            });
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