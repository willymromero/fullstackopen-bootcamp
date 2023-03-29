import React from "react";

const PersonForm = (props) => {
    const {
        handleSubmit,
        personName,
        handlePersonName,
        personNumber,
        handlePersonNumber
    } = props;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input value={personName} onChange={handlePersonName} />
            </div>
            <div>
                number: <input value={personNumber} onChange={handlePersonNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
}

export default PersonForm;