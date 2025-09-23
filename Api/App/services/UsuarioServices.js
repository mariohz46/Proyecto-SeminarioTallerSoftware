const Usuario = require('../models/UsuariosModel');
const Banco = require('../models/BancosModel');
const Transacciones=require('../models/TransaccionesModel');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');

const salt_rounds =10;
const jwt_secreto = process.env.JWT_SECRET || 'secreto';

async function registrarUsuario({nombre,email,password,saldoInicial,nombreBanco}){
    const usuarioExistente= await Usuario.findOne({where:{email}});
    if(usuarioExistente){
        throw new Error('El usuario ya se encuentra registrado');
    }

    const passwordHash = await bcrypt.hash(password,salt_rounds);
    const nuevoUsuario=await Usuario.create({
        nombre,
        email,
        password:passwordHash
    });

    let bancos = await Banco.findOne({where:{nombre:nombreBanco}});
    if(!bancos){
        bancos= await Banco.create({nombre:nombreBanco});
    }

    let transaccion = await Transacciones.create({
        usuarioId:nuevoUsuario.idUsuario,
        bancoId:bancos.idBanco,
        monto:saldoInicial,
        tipo:'ingreso',
        descripcion:'Saldo Inicial',
        fecha: new Date()
    })

    return {nuevoUsuario,transaccion,bancos};
}

async function logeoUsuario(email,password){
    const usuario = await Usuario.findOne({where:{email}});
    if (!usuario){
        throw new Error('Usuario no encontrado. Verifique el email.');
    }

    const passwordValida= await bcrypt.compare(password,usuario.password);
    if(!passwordValida){
        throw new Error('Contraseña incorrecta');
    }

    const token= jwt.sign(
        {idUsuario:usuario.idUsuario,email:usuario.email},
        jwt_secreto,
        {expiresIn: '1h'}
    );

    return {
        token,
        usuario:{
            idUsuario:usuario.idUsuario,
            email:usuario.email,
            nombre:usuario.nombre
        }
    };
}

module.exports = {
    registrarUsuario,
    logeoUsuario
};