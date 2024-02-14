import React from "react";
import { Card } from "react-bootstrap"; // Assuming you are using react-bootstrap
import CustomForm from "./CustomForm"; // Adjust the import path as needed

const ChoosePredictorsCard = ({ onSubmit, schema }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Choose your Predictors </Card.Title>
        <CustomForm onSubmit={onSubmit} schema={schema} />
      </Card.Body>
    </Card>
  );
};

export default ChoosePredictorsCard;
