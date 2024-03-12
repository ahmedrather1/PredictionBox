import React from 'react';
import { Card } from 'react-bootstrap'; // or from wherever you import these
import  {RotatingCube}  from './RotatingCube.js'; // adjust the import path as necessary
import { Canvas } from "@react-three/fiber";

const RotatingCubeCard = () => {
  return (
    <Card style={{ width: "80%", height: "60%" }} className="mt-5">
      <Card.Body>
        <div
          className="flex-container"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Canvas
            style={{
              height: "600px",
              width: "600px",
            }}
          >
            <ambientLight intensity={0.1} />
            <RotatingCube />
          </Canvas>
          <Card style={{ flex: 1 }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Card Subtitle
              </Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and
                make up the bulk of the card's content.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RotatingCubeCard;
