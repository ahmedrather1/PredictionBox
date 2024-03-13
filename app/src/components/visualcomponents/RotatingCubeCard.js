import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Canvas } from "@react-three/fiber";
import { FaArrowLeft, FaArrowUp } from "react-icons/fa";
import { RotatingCube } from "./RotatingCube.js";
import { QuickModelInfo } from "./QuickModelInfo.js";
import "animate.css";

const RotatingCubeCard = () => {
  const [isNarrowScreen, setIsNarrowScreen] = useState(
    window.innerWidth < 1200
  );

  const [currentSelection, setCurrentSelection] = useState(
    QuickModelInfo.DEFAULT
  );

  useEffect(() => {
    const handleResize = () => {
      setIsNarrowScreen(window.innerWidth < 1200);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card style={{ width: "80%", height: "60%" }} className="mt-2">
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
            <RotatingCube setCurrentSelection={setCurrentSelection} />
          </Canvas>

          {isNarrowScreen ? (
            <FaArrowUp
              style={{ color: "white", fontSize: "50px", marginBottom: "60px" }}
            />
          ) : (
            <FaArrowLeft
              style={{ color: "white", fontSize: "50px", marginRight: "60px" }}
            />
          )}

          <Card
            key={currentSelection.title}
            style={{ flex: 1, background: "#454545" }}
            className="animate__animated animate__fadeInUp"
          >
            <Card.Body>
              <Card.Title style={{ color: "#2596be" }}>
                {" "}
                <h3>{currentSelection.title}</h3>
              </Card.Title>
              <Card.Text>{currentSelection.info}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RotatingCubeCard;
