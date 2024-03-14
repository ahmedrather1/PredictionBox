import React from "react";
import { Card, Carousel, Row } from "react-bootstrap";

const CustomParameterInfoCard = ({ title, Text }) => {
  return (
    <Carousel
      data-bs-theme="light"
      interval={null}
      className="carousel-param-info"
    >
      {Object.keys(Text).map((key, index) => {
        return (
          <Carousel.Item key={index} className="text-center">
            <Card
              className="param-info-card shadow-card-blue"
              style={{ height: "100%" }}
            >
              <Card.Title className="param-info-card-title mt-4">
                <strong style={{ color: "#61dafb" }}>{title}</strong>
              </Card.Title>
              <Card.Body className="text-center param-info-card-body">
                {Text[key]}
              </Card.Body>
            </Card>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default CustomParameterInfoCard;
