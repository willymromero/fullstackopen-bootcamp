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

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.listen(SERVER_PORT, () =>
  console.log(`Server listening on ${SERVER_PORT}`)
);
