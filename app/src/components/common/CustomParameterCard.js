import React from "react";
import { Card, Container } from "react-bootstrap";
import CustomForm from "./CustomForm";

const CustomParameterCard = ({ onSubmit, schema }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title style={{ color:"#a955c2", fontSize: "26px", textAlign:"center", marginBottom:"1rem"}}>Set Custom Parameters</Card.Title>
        <Container>
        <CustomForm onSubmit={onSubmit} schema={schema} />
        </Container>
      </Card.Body>
    </Card>
  );
};

export default CustomParameterCard;
