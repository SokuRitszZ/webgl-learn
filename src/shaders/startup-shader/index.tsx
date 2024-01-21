import { Regl } from 'regl';
import VERTEX from './vertex.glsl?raw';
import FRAGMENT from './frag.glsl?raw';
import { Shader } from '@/components';

interface Prop {
  color: [number, number, number, number];
}

export const StartupShader = () => {
  const handleInit = (regl: Regl) => {
    const draw = regl({
      vert: VERTEX,
      frag: FRAGMENT,
      count: 3,
      attributes: {
        position: [
          [1, 1],
          [-1, 0],
          [0, -1],
        ],
      },
      uniforms: {
        color: regl.prop<Prop, keyof Prop>('color'),
      },
    });

    regl.frame(({ time }) => {
      regl.clear({
        color: [0, 0, 0, 0],
      });
      draw({
        color: [
          Math.cos(time * 1),
          Math.sin(time * 2),
          Math.sin(time * 3),
          1,
        ],
      });
    });
  };

  return (
    <Shader 
      onInit={handleInit}
    />
  );
};
