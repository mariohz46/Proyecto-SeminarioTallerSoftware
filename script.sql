create database finanzaspersonal;
use finanzaspersonal;


create table Usuarios(
idUsuario int primary key,
nombre varchar(50),
email varchar(100),
password varchar(255)
);
create table Categorias(
idCategoria int primary key,
usuarioId int references Usuarios(idUsuario),
nombre varchar(50),
tipo varchar(10) check(tipo in('ingreso','egreso'))
);

create table Transacciones(
idTransaccion int primary key,
usuarioId int references Usuarios(idUsuario),
catgeoriaId int references Categorias(idCategoria),
tipo varchar(10) check(tipo in ('ingreso','egreso')),
monto decimal(10,2),
descripcion varchar(255),
fecha date,
creadoEl timestamp default current_timestamp
);

create table Pagos(
idPago int primary key,
usuarioId int references Usuarios(idUsuario),
monto decimal(10,2),
destinatario varchar(60),
fechaPago date,
fechaVencimiento date,
descripcion varchar(255),
estado varchar(10) check (estado in('pendiente','realizado'))
);

create table Presupuestos(
idPresupuesto int primary key,
usuarioId int references Usuarios(idUsuario),
categoriaId int references Categorias(idCategoria),
monto decimal(10,2),
periodo varchar(10) check (periodo in('mensual','semanal','anual')),
fechaInicio date,
fechaFin date,
descripcion varchar(255)
);