import React from "react";
import { Card } from "react-bootstrap";
import AboutKnnText from "../../common/text/AboutKnnText";

const KnnGeneralInfoCard = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-center">
          <strong> About the K Nearest Neighbors Algorithm</strong>
        </Card.Title>
        <AboutKnnText />
      </Card.Body>
    </Card>
  );
};

export default KnnGeneralInfoCard;
