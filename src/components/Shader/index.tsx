import { onMount } from 'solid-js';
import createRegl, { Regl } from 'regl';

interface Props {
  onInit?: (regl: Regl) => void;
}


export const Shader = ({ onInit }: Props) => {
  let canvasRef: HTMLCanvasElement;
  
  onMount(() => {
    const regl = createRegl(canvasRef);
    regl.clear({
      color: [0, 0, 0, 0],
      depth: 1,
    });

    // regl({
    //   vert: vertexShader,
    //   frag: fragmentShader,
    // });

    onInit?.(regl);
  });

  return (
    <canvas ref={el => canvasRef = el} width={512} height={512} />
  );
};