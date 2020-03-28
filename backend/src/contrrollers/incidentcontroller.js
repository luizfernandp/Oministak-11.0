const conection = require('../database/conection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;
        
        const [count] = await conection('casos').count()
        
        const casos = await conection('casos')
            .join('ongs', 'ongs_id', '=', 'casos.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'casos.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ])
        response.header('X-Total-count', count['count(*)'])
        return response.json(casos)
    },
    async create(request, response) {
        const { name, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await conection('casos').insert({
            name,
            description,
            value,
            ong_id,
        });
        return response.json({ id })
    },

    async delete(request, response) {
        const { id } = request.params;
        const ongs_id = request.headers.authorization;

        const casos = await conection('casos')
            .where('id', id)
            .select('ong_id')
            .first();
        
        if (casos.ong_id !== ongs_id){

         return response.status(401).json({ error: 'Operation not permitted.'});
        
        }

        await conection('casos').where('id', id).delete();

        return response.status(204).send();
    }
}