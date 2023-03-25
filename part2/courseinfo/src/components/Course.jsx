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

const Total = ({ total }) => <p><strong>Total of {total} exercises</strong></p>;

const Course = ({ course, total }) => (
    <div>
        <Header course={course.name} />
        <Content name={course.parts} parts={course.parts} />
        {console.log(total)}
        <Total total={total} />
    </div>
);

export default Course;