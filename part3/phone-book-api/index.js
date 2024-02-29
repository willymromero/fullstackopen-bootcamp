import express from "express";
import cors from "cors";
import { logger } from "./Logger.js";

const app = express();

// app settings
// const requestLogger = (req, res, next) => {
//   console.log("Method:", req.method);
//   console.log("Path: ", req.path);
//   console.log("Body: ", req.body);
//   console.log("----");
//   next();
// };

app.use(express.json());
// app.use(requestLogger);
app.use(cors());
app.use(logger);

const SERVER_PORT = 3001;

// data

let persons = [
  {
    name: "Alice Johnson",
    number: "555-1234",
    id: 1,
  },
  {
    name: "Bob Smith",
    number: "555-5678",
    id: 2,
  },
  {
    name: "Charlie Davis",
    number: "555-9876",
    id: 3,
  },
  {
    name: "Diana Martinez",
    number: "555-4321",
    id: 4,
  },
  {
    name: "Evan White",
    number: "555-8765",
    id: 5,
  },
  {
    name: "Fiona Brown",
    number: "555-3456",
    id: 6,
  },
  {
    name: "George Taylor",
    number: "555-6543",
    id: 7,
  },
  {
    name: "Holly Wilson",
    number: "555-7890",
    id: 8,
  },
  {
    name: "Ian Miller",
    number: "555-2109",
    id: 9,
  },
  {
    name: "Julia Davis",
    number: "555-1092",
    id: 10,
  },
];


// methods

const generateId = (max) => Math.floor(Math.random() * max);

const isUniqueName = (name) => {
  return persons.find((person) => person.name === name) !== undefined;
};

const isUniqueNumber = (number) => {
  return persons.find((person) => person.number === number) !== undefined;
};
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

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (body.content !== undefined) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const { name, number } = body;

  if (!name || !number) {
    return res.status(400).json({
      error: "not enough information",
    });
  }

  if (isUniqueName(name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  if (isUniqueNumber(number)) {
    return res.status(400).json({
      error: "number must be unique",
    });
  }

  const person = {
    id: generateId(1000),
    name: name,
    number: number,
  };

  persons = persons.concat(person);
  res.json(person);
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

app.put("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) {
    res.status(404).end();
  }
  
  const body = req.body;
  const { name, number } = body;
  if (isUniqueNumber(number)) {
    return res.status(400).json({
      error: "number must be unique",
    });
  }

  const updatedPerson = { ...person, name, number };
  persons = persons.map((person) => (person.id !== id ? person : updatedPerson));
  res.status(200).json(updatedPerson);
})

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(200).end();
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

app.listen(SERVER_PORT, () =>
  console.log(`Server listening on ${SERVER_PORT}`)
);
