import { Canvas } from '@react-three/fiber';
import { Float, Html, Line, RoundedBox } from '@react-three/drei';
const IDCard = () => {
  return (
    <>
      {/* Hanging string */}
      <Line
        points={[
          [0, 3.5, 0],  // top point (fixed)
          [0, 1.6, 0],  // point where card is "attached"
        ]}
        color="#00FF00"
        lineWidth={2}
      />

      {/* Floating ID card */}
      <Float
        speed={1.2}
        rotationIntensity={0.7}
        floatIntensity={1.5}
        floatingRange={[0, 0.2]}
      >
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[2, 3, 0.1]} />
          <meshStandardMaterial color="#0a0a0a" />
          <Html position={[0, 0, 0.06]}>
            <div className="flex flex-col items-center text-white border border-green-500 bg-black rounded-md w-[140px] h-[200px] p-2 text-center">
              <img
                src={profile}
                className="rounded-full w-20 h-20 border border-green-500 object-cover"
                alt="Ayush"
              />
              <h3 className="text-sm mt-2 font-semibold">Ayush Prajapat</h3>
              <p className="text-xs text-green-500">@ayushprajapat</p>
            </div>
          </Html>
        </mesh>
      </Float>
    </>
  );
};

const Card3d = () => {
  return (
     <Canvas shadows>
    <ambientLight intensity={0.5} />
    <directionalLight position={[0, 5, 5]} intensity={1} />
    <Float>
      <RoundedBox args={[3, 4.5, 0.2]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#0a0a0a" />
        <Html center>
          <div className="text-white font-mono w-full p-4 text-center space-y-2">
            <img src={profile} className="w-16 h-16 rounded-full mx-auto border-2 border-green-500" />
            <h2 className="text-lg font-bold">Ayush Prajapat</h2>
            <p className="text-green-500 text-sm">Software & AI Engineer</p>
            <p className="text-gray-400 text-xs">MERN • LLM • Tailwind • Three.js</p>
            <div className="flex justify-center gap-3 text-sm mt-2 text-green-500">
              <a href="https://github.com/ayushcodes">GitHub</a>
              <a href="https://linkedin.com/in/ayush-prajapat">LinkedIn</a>
            </div>
          </div>
        </Html>
      </RoundedBox>
    </Float>
  </Canvas>
  );
};

export default Card3d;
