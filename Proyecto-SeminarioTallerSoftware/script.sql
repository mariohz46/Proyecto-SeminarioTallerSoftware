create database finanzaspersonal;
use finanzaspersonal;

drop table usuarios;
create table Usuarios(
idUsuario int primary key auto_increment,
nombre varchar(50),
email varchar(100),
password varchar(255)
);
drop table categoria;

create table Categorias(
idCategoria int primary key,
nombre varchar(50),
tipo varchar(10) check(tipo in('ingreso','egreso'))
);

drop table transacciones;
create table Transacciones(
idTransaccion int primary key auto_increment,
usuarioId int,
categoriaId int,
bancoId int,
tipo varchar(10) check(tipo in ('ingreso','egreso')),
monto decimal(10,2),
descripcion varchar(255),
fecha date,
creadoEl timestamp default current_timestamp,
foreign key (usuarioId) references Usuarios(idUsuario),
foreign key (categoriaId) references Categorias(idCategoria),
foreign key (bancoId) references Bancos(idBanco)
);
drop table pagos;
create table Pagos(
idPago int primary key auto_increment,
usuarioId int,
bancoId int,
monto decimal(10,2),
destinatario varchar(60),
fechaPago date,
fechaVencimiento date,
descripcion varchar(255),
estado varchar(10) check (estado in('pendiente','realizado')),
foreign key (usuarioId) references Usuarios(idUsuario),
foreign key (bancoId) references Bancos(idBanco)
);
drop table presupuestos;
create table Presupuestos(
idPresupuesto int primary key auto_increment,
usuarioId int,
categoriaId int,
monto decimal(10,2),
periodo varchar(10) check (periodo in('mensual','semanal','anual')),
fechaInicio date,
fechaFin date,
descripcion varchar(255),
foreign key (usuarioId) references Usuarios(idUsuario),
foreign key (categoriaId) references Categorias(idCategoria)
);

create table Bancos(
idBanco int primary key,
nombre varchar(50)
);

select * from usuarios;
select * from transacciones;
select * from bancos
