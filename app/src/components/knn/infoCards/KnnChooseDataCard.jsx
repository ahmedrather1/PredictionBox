import React from "react";
import { Card } from "react-bootstrap";
import ChooseDataText from "../../common/text/ChooseDataText";

const KnnChooseDataCard = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-center">
          <strong>Choose your Data!</strong>
        </Card.Title>
        <ChooseDataText />
      </Card.Body>
    </Card>
  );
};

export default KnnChooseDataCard;
