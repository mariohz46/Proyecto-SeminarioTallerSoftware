const controller ={};
controller.insertar = async (req, res) => {
  const { descripcion, fecha, monto, idCategoriaIngreso } = req.body;

  try {
    const nuevoIngreso = await create({
      descripcion,
      fecha,
      monto,
      idCategoriaIngreso
    });

    res.status(201).json(nuevoIngreso);
    console.info('¡El registro fue ingresado exitosamente!');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Error al crear el ingreso' });
  }
};

controller.eliminar = (req,res) =>{
    //codigo para eliminar el registro de un ingreso
}

controller.actualizar = (req,res) =>{
    //codigo para actualizar el registro de un ingreso
}

controller.mostrarProductos =(req, res) =>{
    //codigo para mostrar el registro de un ingreso
    
}


module.exports =controller;