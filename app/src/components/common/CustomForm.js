import React from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import Button from "@mui/material/Button";

const CustomForm = ({ schema, onSubmit }) => {
  const [data, setData] = React.useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(data);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <JsonForms
          schema={schema}
          data={data}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data }) => setData(data)}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8px",
          }}
        >
          <Button type="submit" className="mt-2 ">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CustomForm;
