import { onCleanup, onMount } from 'solid-js';
import GLRenderer from 'gl-renderer';
import VERTEX from './vertex.glsl?raw';
import FRAG from './frag.glsl?raw';

export const CircleShader = () => {
  let canvasRef: HTMLCanvasElement;
  let timer: number;

  onMount(() => {
    const renderer = new GLRenderer(canvasRef);

    const program = renderer.createProgram(FRAG, VERTEX);
    renderer.useProgram(program);

    renderer.uniforms.uTime = .0;

    timer = requestAnimationFrame(function animate(t) {
      renderer.uniforms.uTime = .001 * t;
      requestAnimationFrame(animate);
    });

    renderer.setMeshData([
      {
        // 顶点裁剪坐标（在 DOM 层面上 0, 0 为中心点）
        positions: [
          [-1, -1],
          [-1, 0],
          [1, 1],
          [1, -1],
        ],
        attributes: {
          // 纹理坐标
          uv: [
            [0, 0],
            [0, .5],
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

  return <canvas ref={el => canvasRef = el} width={512} height={512} />;
};