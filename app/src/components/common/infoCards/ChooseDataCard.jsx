import React from "react";
import { Card } from "react-bootstrap";

// duplicated component with generalInfoCard, TODO fix this
const ChooseDataCard = ({ title, Text }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-center">
          <strong>{title}</strong>
        </Card.Title>
        <Text />
      </Card.Body>
    </Card>
  );
};

export default ChooseDataCard;
