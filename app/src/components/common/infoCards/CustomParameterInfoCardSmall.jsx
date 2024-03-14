import React from "react";
import { Card, Carousel, Row } from "react-bootstrap";

const CustomParameterInfoCardSmall = ({ title, Text }) => {
  return (
    <Carousel
      data-bs-theme="light"
      interval={null}
      className="carousel-param-info-small"
    >
      {Object.keys(Text).map((key, index) => {
        return (
          <Carousel.Item key={index} className="text-center">
            <Card
              className="param-info-card-small shadow-card-blue"
              style={{ height: "100%" }}
            >
              <Card.Title className="param-info-card-small-title mt-4">
                <strong style={{ color: "#61dafb" }}>{title}</strong>
              </Card.Title>
              <Card.Body className="text-center param-info-card-small-body">
                {Text[key]}
              </Card.Body>
            </Card>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default CustomParameterInfoCardSmall;
