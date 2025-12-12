const DashboardService = require("../services/DashboardServices");

async function getDashboard(req, res) {
    try {
        
        const usuarioId = req.usuario.id || req.usuario.idUsuario;

        if (!usuarioId) {
            return res.status(400).json({ error: "Token inválido: no trae usuario." });
        }

        const data = await DashboardService.obtenerDashboard(usuarioId);
        res.json(data);

    } catch (error) {
        console.error("ERROR en dashboard:", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getDashboard };