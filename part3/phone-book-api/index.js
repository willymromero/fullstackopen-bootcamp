import express from "express";

const app = express();

const SERVER_PORT = 3001;

// data

const persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "Felix Lozada",
    number: "0997043343",
    id: 5,
  },
  {
    name: "Test 1",
    number: "00000000001",
    id: 6,
  },
  {
    name: "asdasd",
    number: "123",
    id: 7,
  },
  {
    name: "asdasdasd",
    number: "",
    id: 8,
  },
  {
    name: "aaaaaaaaaaaa",
    number: "",
    id: 10,
  },
];

// routes

app.get("/info", (req, res) => {
  const phonebookCount = persons.length;
  const date = new Date();
  res.send(
    `<div>
      <h1>Phonebook Info</h1>
      <p>Phonebook has ifo for ${phonebookCount} people</p>
      <p>Ecuador, Riobamba ${date}</p>
    </div>`
  );
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) {
    res.status(404).end();
  }
  res.json(person);
});

app.listen(SERVER_PORT, () =>
  console.log(`Server listening on ${SERVER_PORT}`)
);
