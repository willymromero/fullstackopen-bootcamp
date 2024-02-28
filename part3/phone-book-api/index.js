import express from "express";

const app = express();

// app settings
const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path: ", req.path);
  console.log("Body: ", req.body);
  console.log("----");
  next();
};

app.use(express.json());
app.use(requestLogger);

const SERVER_PORT = 3001;

// data

let persons = [
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
    personId: generateId(1000),
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
