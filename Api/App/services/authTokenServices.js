const jwt = require("jsonwebtoken");
const jwt_secreto = process.env.JWT_SECRET || "secreto";

function autenticarToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];

    if (!bearerHeader) {
        return res.status(403).json({ message: "No se envió el token" });
    }

    const token = bearerHeader.split(" ")[1];
    console.log("Token recibido:", token);

    jwt.verify(token, jwt_secreto, (err, decodedPayload) => {
        if (err) {
            console.log("ERROR AL DECODIFICAR TOKEN:", err);
            return res.status(403).json({ message: "El token es invalido" });
        }

        // AQUÍ SÍ EXISTE decodedPayload
        console.log("Usuario decodificado:", decodedPayload);

        req.usuario = decodedPayload; 
        next();
    });
}

module.exports = { autenticarToken };

