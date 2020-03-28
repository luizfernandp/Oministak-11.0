const conection = require('../database/conection')

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;

        const incidentes = await conection('casos')
            .where('ong_id', ong_id)
            .select('*');

        return response.json(incidentes);
    }
}