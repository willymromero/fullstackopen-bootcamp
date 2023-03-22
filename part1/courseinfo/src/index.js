import React from "react";
import { createRoot } from "react-dom/client";

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, index) => (
        <Part key={index} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Total = ({ total }) => <p>Number of the exercises {total}</p>;

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const exercises = course.parts
    .map((part) => part.exercises)
    .reduce((totalExercises, exercises ) => totalExercises + exercises, 0);

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={exercises} />
    </>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
