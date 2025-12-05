const jwt= require('jsonwebtoken');
const jwt_secreto =process.env.JWT_SECRET || 'secreto';

function autenticarToken(req,res,next){
    const authHeader=req.headers['authorization'];
    const token= authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({message:'No se brindo el token'});
    }

    jwt.verify(token,jwt_secreto, (err,usuario)=>{
        if(err){
            return res.status(403).json({message:'El token es invalido'});
        }
        req.usuario = usuario;
        next();
    });
}

module.exports ={autenticarToken};

