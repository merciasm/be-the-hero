const generateId = require('../utils/generateUniqueId')
const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*')
        return response.json(ongs)
    },
    
    async create(request, response) {
        const {name, email, whats, city, state} = request.body

        const id = generateId()
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whats,
            city,
            state,
        })
    
        return response.json({id})  
    }
}