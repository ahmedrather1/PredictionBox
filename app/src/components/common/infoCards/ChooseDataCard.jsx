import React from "react";
import { Card } from "react-bootstrap";

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
