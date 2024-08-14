const { Pokemon, WildPokemon } = require('../models');

const pokemonController = {

    async getPokedex(req, res) {
        const { name, type, order } = req.query;
    
        const query = {};
        const sortOptions = {};
    
        if (name) {
            query.name = { $regex: name, $options: 'i' }; // Case-insensitive search by name
        }
    
        if (type) {
            query.types = { $in: [type] }; // Search by type
        }
    
        if (order) {
            order.split(',').forEach(criterion => {
                const [field, direction] = criterion.trim().split(' ');
                const sortDirection = direction === 'desc' ? -1 : 1;
                if (['name', 'pid', 'rarity'].includes(field)) {
                    sortOptions[field] = sortDirection;
                }
            });
        }
    
        await Pokemon.find(query)
            .sort(sortOptions)
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err));
    },

    async getPokemonById(req, res) {

        await Pokemon.findOne({ pid: req.params.id })
            .then(data => res.json(data))
            .catch(err => res.json(err))

    },

    async getStarters(req, res) {

        const starter_array = [1, 4, 7, 152, 155, 158, 252, 255, 258, 387, 390, 393];
    
        try {

            const starters = await Promise.all(starter_array.map(async (id) => {

                try {
    
                    const new_pokemon = await WildPokemon.create({ pokemonId: id, level: 5, rarity: "starter" });
                    return new_pokemon;

                } 
                
                catch (err) {
                    console.log(`Error fetching data for pid ${id}:`, err);
                    return null;
                }

            }));
            
            const filteredStarters = starters.filter(starter => starter !== null);
            if (filteredStarters.length === 0) return res.status(404).json({ message: "No starters found" });
    
            res.json(filteredStarters);

        } catch (err) {

            console.log('Error in getStarters:', err);
            res.status(500).json({ error: 'Internal Server Error' });

        }
    }
    
    

}

module.exports = pokemonController;