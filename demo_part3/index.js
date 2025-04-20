const express = require('express')
const app = express()
//https://fullstackopen.com/en/part3/node_js_and_express#fetching-a-single-resource
let notes = [
    {
      id: "1",
      content: "HTML is easy",
      important: true
    },
    {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: "3",
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => Number(n.id))) 
      // What exactly is happening in that line of code? 
      // notes.map(n => n.id) creates a new array that 
      // contains all the ids of the notes in number form. 
      // Math.max returns the maximum value of the numbers that are passed to it. 
      // However, notes.map(n => Number(n.id)) is an array 
      // so it can't directly be given as a parameter to Math.max. 
      // The array can be transformed into individual numbers by 
      // using the "three dot" spread syntax ....
      : 0
    return String(maxId + 1)
}
  
app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({ 
        error: 'content missing' 
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        id: generateId(),
    }

    notes = notes.concat(note)

    response.json(note)
})


app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})