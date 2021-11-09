import { Canvas } from '@react-three/fiber';
import './App.css';

function App() {
	return (
		<div id='canvas-container'>
			<Canvas>
				<ambientLight intensity={0.1} />
				<directionalLight color='red' position={[0, 0, 5]} />
				<mesh>
					<boxGeometry />
					<meshStandardMaterial />
				</mesh>
			</Canvas>
		</div>
	);
}

export default App;

0x889Bd0Fc0a0345A413E0bcEDFeab4b2478Cc9f08
