import { onMount } from 'solid-js';
import GLRenderer from 'gl-renderer';

interface Props {
  vertexShader: string;
  fragmentShader: string;
  // 类型治理
  onInit?: (renderer: any) => void;
}

export const Shader = ({ vertexShader, fragmentShader, onInit }: Props) => {
  let canvasRef: HTMLCanvasElement;
  
  onMount(() => {
    const renderer = new GLRenderer(canvasRef);
    const program = renderer.compileSync(vertexShader, fragmentShader);
    renderer.useProgram(program);
    onInit?.(renderer);
  });

  return (
    <canvas ref={el => canvasRef = el} class={'w-500px h-500px'} />
  );
};