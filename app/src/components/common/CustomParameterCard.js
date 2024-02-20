import React from "react";
import { Card } from "react-bootstrap";
import CustomForm from "./CustomForm";

const CustomParameterCard = ({ onSubmit, schema }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Set Custom Parameters</Card.Title>
        <CustomForm onSubmit={onSubmit} schema={schema} />
      </Card.Body>
    </Card>
  );
};

export default CustomParameterCard;
