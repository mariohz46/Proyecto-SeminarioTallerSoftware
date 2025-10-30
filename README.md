# 💼 Proyecto Seminario Taller de Software

> Sistema desarrollado como parte del seminario de taller de software.  
> Permite la gestión de usuarios, transacciones, presupuestos y pagos mediante una API desarrollada en **Node.js** con conexión a **MySQL**.

---

## 🚀 Tecnologías utilizadas

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 🧩 Descripción general

El proyecto implementa una **API RESTful** que gestiona la información relacionada con:
- 👥 **Usuarios**: registro, autenticación y administración.  
- 💰 **Transacciones**: ingresos y egresos con categorías.  
- 🏦 **Bancos y presupuestos**: organización financiera del usuario.  
- 📅 **Pagos y vencimientos**: alertas y control de pagos programados.  

Incluye además un **modelo entidad-relación (ER)** y un script SQL para la creación de la base de datos.

---

## 📂 Estructura del proyecto

│
├── Model ER.mwb # Modelo entidad-relación (MySQL Workbench)
├── script.sql # Script de creación de base de datos
└── Api/
├── index.js # Punto de entrada del servidor
├── App/
│ ├── app.js # Configuración principal de Express
│ ├── config/db.js # Conexión a la base de datos
│ ├── controllers/ # Controladores de lógica de negocio
│ ├── models/ # Modelos de datos (ORM o consultas SQL)
│ ├── routes/ # Definición de rutas de la API
│ └── services/ # Servicios auxiliares (tokens, validaciones, etc.)
├── package.json # Dependencias del proyecto
└── .env # Variables de entorno (no incluir en el repositorio público)



---

## ⚙️ Instalación y ejecución

### 🔧 Requisitos previos
- Tener instalado **Node.js** y **MySQL Server**
- Crear una base de datos usando el archivo `script.sql`

### 💻 Pasos

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/mariohz46/Proyecto-SeminarioTallerSoftware.git
   cd Proyecto-SeminarioTallerSoftware/Api

