const express = require('express')
const app = express()
var morgan = require('morgan')
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
// Define the custom token before using it
morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const path = require('path')
// Serve static frontend
app.use(express.static('dist'))

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        return response.status(404).json({
            error: 'person not found'
        })
    }
})

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>
    `)
})

const generateRandomId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(person => Number(person.id)))
        : 0
    return String(Math.floor(Math.random() * (100000000 - maxId) + maxId)) 
}
app.post('/api/persons', (request, response) => {
    const body = request.body
    const existingPerson = persons.find(person => person.name === body.name)
    if (!body.name || !body.number) {
        return response.status(400).json(
            {error : 'name or number missing'}
        )
    }
    if (existingPerson){
        return response.status(400).json(
            {error : 'name must be unique'}
        )
    }
    const person = {
        id : generateRandomId(),
        name : body.name,
        number : body.number
    }

    persons = persons.concat(person)
    
    response.json(person)
})

app.delete('/api/persons/delete/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
