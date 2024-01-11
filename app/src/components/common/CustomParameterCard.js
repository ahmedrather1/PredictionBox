import React from "react";
import { Card } from "react-bootstrap"; // Assuming you are using react-bootstrap
import CustomForm from "./CustomForm"; // Adjust the import path as needed

const CustomParameterCard = ({ onSubmit, schema }) => {
  return (
    <Card>
      <Card.Title>Set Custom Parameters</Card.Title>
      <Card.Body>
        <CustomForm onSubmit={onSubmit} schema={schema} />
      </Card.Body>
    </Card>
  );
};

export default CustomParameterCard;
