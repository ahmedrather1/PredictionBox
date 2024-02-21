import React from "react";
import { Card } from "react-bootstrap";
import CustomForm from "./CustomForm";

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
