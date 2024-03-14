import React from "react";
import { Card } from "react-bootstrap";
import CustomForm from "./CustomForm";

const ChooseAlphaCard = ({ onSubmit, schema }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title
          style={{
            color: "#a955c2",
            fontSize: "26px",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          Custom Model: Choose your Alpha Value
        </Card.Title>
        <CustomForm onSubmit={onSubmit} schema={schema} />
      </Card.Body>
    </Card>
  );
};

export default ChooseAlphaCard;
