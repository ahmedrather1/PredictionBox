import React from "react";
import { Card } from "react-bootstrap";
import CustomForm from "./CustomForm";

const ChooseAlphaCard = ({ onSubmit, schema }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Choose your Alpha Value (Optional) </Card.Title>
        <CustomForm onSubmit={onSubmit} schema={schema} />
      </Card.Body>
    </Card>
  );
};

export default ChooseAlphaCard;
