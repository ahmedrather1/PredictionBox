import React from "react";
import { Card } from "react-bootstrap";

// duplicated component with generalInfoCard, TODO fix this
const GeneralInfoCard = ({ title, Text }) => {
  return (
    <Card className="custom-card-shadow">
      <Card.Body>
        <Card.Title className="text-center">
          <strong> {title}</strong>
        </Card.Title>
        <Text />
      </Card.Body>
    </Card>
  );
};

export default GeneralInfoCard;
