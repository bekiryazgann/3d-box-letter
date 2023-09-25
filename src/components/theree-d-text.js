import React, {useEffect, useRef, useState} from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import Neonderthaw_Regular from '@/styles/fonts/Neonderthaw_Regular.json';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { extend, useFrame } from '@react-three/fiber';
import {Effects} from "@react-three/drei";
import * as THREE from 'three'
import {OutputPass} from "three/examples/jsm/postprocessing/OutputPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

extend({ TextGeometry, Effects, OutputPass, UnrealBloomPass}); // Extend TextGeometry

const CameraController = ({len}) => {
    const { camera, gl } = useThree();
    useEffect(() => {
        const controls = new OrbitControls(camera, gl.domElement);
        camera.position.z = len * 2.2
        controls.minDistance = 3;
        controls.maxDistance = 2000;
        controls.rotateSpeed = 0.8
        controls.zoomSpeed = 0.5
        controls.panSpeed = 200
        controls.enableZoom = true
        return () => {
            controls.dispose();
        };
    }, [camera, gl, len]);
    return null;
};

function Text3d({text, len, setLen, color}) {
    const font = new FontLoader().parse(Neonderthaw_Regular);
    const textOptions = {
        font,
        size: 5,
        height: 1,
    };
    useEffect(() => {
        setLen(text.length * 1.9)
    }, [text, len]);
    return (
        <mesh position={[-len, -3, 0]}>
            <textGeometry args={[text, textOptions]} />
            <meshPhysicalMaterial attach="material" color="white" />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} toneMapped={false} />
        </mesh>
    );
}

const ThreeDText = ({ text, color }) => {
    const [len, setLen] = useState(text.length * 1.9)

    return (
        <Canvas>
            <Effects disableGamma>
                <unrealBloomPass threshold={1} strength={0.33} radius={0} />
                <outputPass args={[THREE.ACESFilmicToneMapping]} />
            </Effects>
            <color attach="background" args={['#111']} />
            <CameraController len={len}/>
            <ambientLight color={color} />
            <pointLight position={[-len, -3, 0]} intensity={100} color={color}/>
            <Text3d text={text} len={len} setLen={setLen} color={color}/>
        </Canvas>
    );
};

export default ThreeDText;
