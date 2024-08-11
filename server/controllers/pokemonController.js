const { Pokemon } = require('../models');

const pokemonController = {

    async getPokedex(req, res) {
        const { name, type, order } = req.body;
    
        const query = {};
        const sortOptions = {};
    
        // If a name is provided, add it to the query
        if (name) {
            query.name = { $regex: name, $options: 'i' }; // Case-insensitive search by name
        }
    
        // If a type is provided, add it to the query
        if (type) {
            query.types = { $in: [type] }; // Search by type
        }
    
        // Handling multiple order options
        if (order) {
            // Split the order criteria and process each one
            order.split(',').forEach(criterion => {
                const [field, direction] = criterion.trim().split(' ');
                const sortDirection = direction === 'desc' ? -1 : 1; // Convert 'desc' to -1 and 'asc' to 1
                if (['name', 'pid', 'rarity'].includes(field)) {
                    sortOptions[field] = sortDirection;
                }
            });
        }
    
        // Fetch Pokémon based on the query and sort options
        await Pokemon.find(query)
            .sort(sortOptions)
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err));
    },


    async getPokemonById(req, res) {

        await Pokemon.findOne({ pid: req.params.id })
            .then(data => res.json(data))
            .catch(err => res.json(err))

    }

}

module.exports = pokemonController;