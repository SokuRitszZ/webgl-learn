import { onCleanup, onMount } from 'solid-js';
import GLRenderer from 'gl-renderer';

import FRAG_GLSL from './frag.glsl?raw';
import VERTEX_GLSL from './vertex.glsl?raw';

export const CellsShaders = () => {
  let canvasRef: HTMLCanvasElement;
  let timer: number;

  onMount(() => {
    const renderer = new GLRenderer(canvasRef);

    const program = renderer.compileSync(FRAG_GLSL, VERTEX_GLSL);
    renderer.useProgram(program);

    renderer.uniforms.uTime = 0.0;

    timer = requestAnimationFrame(function upd(t){
      renderer.uniforms.uTime = 0.001 * t;
      requestAnimationFrame(upd);
    });

    renderer.setMeshData([
      { 
        positions: [
          [-1, -1],
          [-1, 1],
          [1, 1],
          [1, -1],
        ],
        attributes: {
          uv: [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 0],
          ],
        },
        cells: [
          [0, 1, 2],
          [0, 2, 3],
        ],
      },
    ]);
    renderer.render();
  });

  onCleanup(() => cancelAnimationFrame(timer));

  return (
    <canvas width={512} height={512} ref={el => canvasRef = el} />
  );
};