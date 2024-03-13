import React from "react";
import { Card, Carousel, Row } from "react-bootstrap";

const GeneralInfoCard = ({ title, Text }) => {
  return (
      <Carousel
        data-bs-theme="light"
        interval={null}
        style={{ minWidth: "80%", minHeight: "80%" }}
      >
        {Object.keys(Text).map((key, index) => {
          return (
            <Carousel.Item
              key={index}
              className="text-center"
            >
              <Card
                className="info-card"
              > 
                
                <Card.Title className="info-card-title">
                  <strong style={{color:"#61dafb"}}>{title}</strong>
                </Card.Title>
                <Card.Body className="info-card-body">
                  {Text[key]}
                </Card.Body>
              </Card>
            </Carousel.Item>
          );
        })}
      </Carousel>
  );
};

export default GeneralInfoCard;
