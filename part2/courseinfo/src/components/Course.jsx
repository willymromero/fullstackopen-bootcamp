import React from "react";

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ name, exercises }) => <p> {name} {exercises}</p>;

const Content = ({ parts }) => (
    <>
        {parts.map((part) => (
            <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
    </>
);

const Total = ({ total }) => <p>Number of the exercises {total}</p>;

const Course = ({ course }) => (
    <div>
        <Header course={course.name} />
        <Content name={course.parts} parts={course.parts} />
    </div>
);

export default Course;