import React from "react";
import { Card } from "react-bootstrap";

const CustomParameterInfoCard = ({ title, Text }) => {
  return (
    <Card className="mt-3 mb-4">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Text />
      </Card.Body>
    </Card>
  );
};

export default CustomParameterInfoCard;
