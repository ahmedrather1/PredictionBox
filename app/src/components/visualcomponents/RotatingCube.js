import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { QuickModelInfo } from "./QuickModelInfo";

export const RotatingCube = ({ setCurrentSelection }) => {
  const meshRef = useRef();
  const [rotationSteps, setRotationSteps] = useState([
    { axis: "y", angle: Math.PI / 2 },
    { axis: "y", angle: Math.PI / 2 },
    { axis: "y", angle: Math.PI / 2 },
    { axis: "x", angle: Math.PI / 2 },
    { axis: "x", angle: Math.PI },
    { axis: "x", angle: Math.PI / 2, nextAxis: "y", nextAngle: Math.PI / 2 },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(
      () => {
        const step = rotationSteps[currentStep];
        if (step) {
          if (step.nextAxis) {
            setRotation((r) => ({
              ...r,
              [step.axis]: r[step.axis] + step.angle,
              [step.nextAxis]: r[step.nextAxis] + step.nextAngle,
            }));
          } else {
            setRotation((r) => ({
              ...r,
              [step.axis]: r[step.axis] + step.angle,
            }));
          }
          setCurrentStep((currentStep + 1) % rotationSteps.length);
        }
      },
      // maybe make first step slower?
      currentStep === 0 ? 3000 : 3000
    );

    return () => clearTimeout(timer);
  }, [currentStep, rotationSteps]);

  useFrame(() => {
    meshRef.current.rotation.x +=
      (rotation.x - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y +=
      (rotation.y - meshRef.current.rotation.y) * 0.05;
  });

  return (
    <group ref={meshRef}>
      <mesh ref={meshRef}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      <Text
        position={[0, 0, 1.51]}
        rotation={[0, 0, 0]}
        fontSize={0.4}
        color="#2596be"
        anchorX="center"
        anchorY="middle"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentSelection(QuickModelInfo.DEFAULT);
        }}
      >
        PredictionBox
      </Text>
      <Text
        position={[0, 0, -1.51]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.5}
        color="#2596be"
        anchorX="center"
        anchorY="middle"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentSelection(QuickModelInfo.KNN);
        }}
      >
        KNN
      </Text>
      <Text
        position={[0, -0.5, -1.51]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.15}
        color="#a955c2"
        anchorX="center"
        anchorY="middle"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentSelection(QuickModelInfo.KNN);
        }}
      >
        See More
      </Text>
      <Text
        position={[1.51, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.5}
        color="#2596be"
        anchorX="center"
        anchorY="middle"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentSelection(QuickModelInfo.SLR);
        }}
      >
        SLR
      </Text>
      <Text
        position={[1.51, -0.5, 0]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.15}
        color="#a955c2"
        anchorX="center"
        anchorY="middle"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentSelection(QuickModelInfo.SLR);
        }}
      >
        See More
      </Text>
      <Text
        position={[-1.51, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        fontSize={0.5}
        color="#2596be"
        anchorX="center"
        anchorY="middle"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentSelection(QuickModelInfo.MLR);
        }}
      >
        MLR
      </Text>
      <Text
        position={[-1.51, -0.5, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        fontSize={0.15}
        color="#a955c2"
        anchorX="center"
        anchorY="middle"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentSelection(QuickModelInfo.MLR);
        }}
      >
        See More
      </Text>
      <Text
        position={[0, 1.51, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        fontSize={0.5}
        color="#2596be"
        anchorX="center"
        anchorY="middle"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentSelection(QuickModelInfo.RIDGE);
        }}
      >
        RIDGE
      </Text>
      <Text
        position={[0.5, 1.51, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        fontSize={0.15}
        color="#a955c2"
        anchorX="center"
        anchorY="middle"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentSelection(QuickModelInfo.RIDGE);
        }}
      >
        See More
      </Text>
      <Text
        position={[0, -1.51, 0]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        fontSize={0.5}
        color="#2596be"
        anchorX="center"
        anchorY="middle"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentSelection(QuickModelInfo.LASSO);
        }}
      >
        LASSO
      </Text>
      <Text
        position={[-0.5, -1.51, 0]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        fontSize={0.15}
        color="#a955c2"
        anchorX="center"
        anchorY="middle"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentSelection(QuickModelInfo.LASSO);
        }}
      >
        See More
      </Text>
    </group>
  );
};
