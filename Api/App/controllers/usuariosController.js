const usuarioService = require('../services/UsuarioServices');

async function registrar(req,res){
    try {
        const {nombre,email,password,saldoInicial,nombreBanco}=req.body;
        if(!saldoInicial || !nombreBanco){
            return res.status(400).json({ error:'Debe proporcionar un saldo inicial y el banco en el cual tiene depositado el dinero'});
        }

        const usuario =await usuarioService.registrarUsuario({nombre,email,password,saldoInicial,nombreBanco});
        res.status(201).json('Usuario creado exitosamente',{
            idUsuario:usuario.idUsuario,
            nombre:usuario.nombre,
            email:usuario.email
        })
    } catch (error) {
        console.error(error); 
        res.status(400).json({
            message: error.message,
            stack: error.stack,       
            error: error              
        });
    }
}
async function login(req,res){
    const {email,password} = req.body;
    try {
        const user =await usuarioService.logeoUsuario(email,password);
        res.json({user});
    } catch (error) {
        console.error(error); 
        res.status(400).json({
            message: error.message,
            stack: error.stack,       
            error: error  
        });
    }
}

module.exports={
    registrar,
    login
}