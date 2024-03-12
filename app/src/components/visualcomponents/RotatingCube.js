import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

export const RotatingCube = () => {
    const meshRef = useRef();
    const [rotationSteps, setRotationSteps] = useState([
      { axis: 'y', angle: Math.PI / 2 }, // 90 degrees about Y
      { axis: 'y', angle: Math.PI / 2 }, // Another 90 degrees about Y
      { axis: 'y', angle: Math.PI / 2 }, // Another 90 degrees about Y
      { axis: 'x', angle: Math.PI / 2 }, // 90 degrees about X
      { axis: 'x', angle: Math.PI },     // 180 degrees about X
      { axis: 'x', angle: Math.PI / 2, nextAxis: 'y', nextAngle: Math.PI / 2 }, // Rotate 90 degrees about X then Y
    ]);
    const [currentStep, setCurrentStep] = useState(0);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
  
    useEffect(() => {
      const timer = setTimeout(() => {
        const step = rotationSteps[currentStep];
        if (step) {
          if (step.nextAxis) {
            // Prepare for a combined rotation step
            setRotation((r) => ({
              ...r,
              [step.axis]: r[step.axis] + step.angle,
              [step.nextAxis]: r[step.nextAxis] + step.nextAngle,
            }));
          } else {
            // Regular rotation step
            setRotation((r) => ({
              ...r,
              [step.axis]: r[step.axis] + step.angle,
            }));
          }
          setCurrentStep((currentStep + 1) % rotationSteps.length);
        }
      }, currentStep === 0 ? 4000 : 2000); // Longer pause before resetting
  
      return () => clearTimeout(timer);
    }, [currentStep, rotationSteps]);
  
    useFrame(() => {
      meshRef.current.rotation.x += (rotation.x - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (rotation.y - meshRef.current.rotation.y) * 0.05;
    });


  return (
    <group ref={meshRef}>
      <mesh ref={meshRef}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      {/* Adjusted positions and rotations for the text on each side of the cube */}
      <Text position={[0, 0, 1.51]} rotation={[0, 0, 0]} fontSize={0.4} color="#2596be" anchorX="center" anchorY="middle">
        PredictionBox
      </Text>
      <Text position={[0, 0, -1.51]} rotation={[0, Math.PI, 0]} fontSize={0.5} color="#2596be" anchorX="center" anchorY="middle">
        KNN
      </Text>
      <Text position={[0, -0.5, -1.51]} rotation={[0, Math.PI, 0]} fontSize={0.15} color="#a955c2" anchorX="center" anchorY="middle">
        See More
      </Text>
      <Text position={[1.51, 0, 0]} rotation={[0, Math.PI / 2, 0]} fontSize={0.5} color="#2596be" anchorX="center" anchorY="middle">
        SLR
      </Text>
      <Text position={[1.51, -0.5, 0]} rotation={[0, Math.PI / 2, 0]} fontSize={0.15} color="#a955c2" anchorX="center" anchorY="middle">
        See More
      </Text>
      <Text position={[-1.51, 0, 0]} rotation={[0, -Math.PI / 2, 0]} fontSize={0.5} color="#2596be" anchorX="center" anchorY="middle">
        MLR
      </Text>
      <Text position={[-1.51, -0.5, 0]} rotation={[0, -Math.PI/2, 0]} fontSize={0.15} color="#a955c2" anchorX="center" anchorY="middle">
        See More
      </Text>  
      <Text position={[0, 1.51, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} fontSize={0.5} color="#2596be" anchorX="center" anchorY="middle">
        RIDGE
      </Text>
      <Text position={[0.5, 1.51, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} fontSize={0.15} color="#a955c2" anchorX="center" anchorY="middle">
        See More
      </Text>     
      <Text position={[0, -1.51, 0]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} fontSize={0.5} color="#2596be" anchorX="center" anchorY="middle">
        LASSO
      </Text>
      <Text position={[-0.5, -1.51, 0]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} fontSize={0.15} color="#a955c2" anchorX="center" anchorY="middle">
        See More
      </Text>
    </group>
  );
};

