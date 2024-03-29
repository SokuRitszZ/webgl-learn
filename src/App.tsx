import { createSignal } from 'solid-js';
import { CellsShaders, CircleShader, StartupShader } from './shaders';

function App() {
  const MAX_COUNT = 3;
  const [step, setStep] = createSignal(0);

  const handlePrev = () => {
    setStep((step() + MAX_COUNT - 1) % MAX_COUNT);
  };
  const handleNext = () => {
    setStep((step() + 1) % MAX_COUNT);
  };

  return (
    <div class={'w-screen h-screen flex justify-center items-center gap-3'}>
      {/* <StartupShader /> */}
      <button onClick={handlePrev}>L</button>
      {step() === 0 && 
        <CellsShaders />
      }
      {step() === 1 && 
        <CircleShader />
      }
      {step() === 2 && 
        <StartupShader />
      }
      <button onClick={handleNext}>R</button>
    </div>
  );
}

export default App;
