import React from "react";
import { Card } from "react-bootstrap";
import KnnOptionsText from "../../common/text/KnnOptionsText";

const KnnCustomParameterInfoCard = () => {
  return (
    <Card className="mt-3 mb-4">
      <Card.Body>
        <Card.Title>Understanding the KNN Custom Parameters</Card.Title>
        <KnnOptionsText />
      </Card.Body>
    </Card>
  );
};

export default KnnCustomParameterInfoCard;
