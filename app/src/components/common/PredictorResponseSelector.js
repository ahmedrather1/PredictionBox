import React, { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { Button } from "react-bootstrap";

// Replace this component's implementation with CustomForm
const schemaGen = (columns) => ({
  type: "object",
  properties: {
    predictor: {
      type: "string",
      enum: columns,
    },
    response: {
      type: "string",
      enum: columns,
    },
  },
});

const uiSchema = {
  type: "HorizontalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/predictor",
      label: "Predictor",
    },
    {
      type: "Control",
      scope: "#/properties/response",
      label: "Response",
    },
  ],
};

const PredictorResponseSelector = ({ columns, sendDataToParent }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const handleSubmit = () => {
    if (!data.predictor || !data.response) {
      setError("Please make selections in both dropdowns before submitting.");
      return;
    }
    setError("");

    sendDataToParent(data);
  };
  return (
    <>
      <JsonForms
        schema={schemaGen(columns)}
        uischema={uiSchema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => setData(data)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
};

export default PredictorResponseSelector;
