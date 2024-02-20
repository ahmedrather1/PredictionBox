import React from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { Button } from "react-bootstrap";

const CustomForm = ({ schema, onSubmit }) => {
  const [data, setData] = React.useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <JsonForms
        schema={schema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => setData(data)}
      />
      <Button type="submit" className="mt-2">
        Submit
      </Button>
    </form>
  );
};

export default CustomForm;
