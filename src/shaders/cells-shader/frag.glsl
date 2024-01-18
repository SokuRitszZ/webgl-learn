#ifdef GL_ES
precision highp float;
#endif

varying vec2 vUv;
uniform float uTime;

vec2 random2(vec2 st){
  // dot, 点乘
  st = vec2( 
    dot(st, vec2(127.1,311.7)), 
    dot(st, vec2(269.5,183.3)) 
  );
  
  // fract, 取小数部分
  return fract(sin(st) * 43758.5453123);
}

void main() {
  vec2 st = vUv * 10.0;

  float d = 1.0;

  // i 是方格的序号，f 是点在方格内的相对位置
  vec2 i_st = floor(st);
  vec2 f_st = fract(st);

  // vec2 p = random2(i_st);
  // d = distance(f_st, p);

  // 八个位置的邻居
  for(int i = -1; i <= 1; i++) {
    for(int j = -1; j <= 1; j++) {
      vec2 neighbor = vec2(float(i), float(j));
      // p: 相位，不同的位置的相位不一致
      vec2 p = random2(i_st + neighbor);
      p = 0.5 + 0.5 * sin(uTime + 6.2831 * p);
      d = min(d, distance(f_st, neighbor + p));
    }
  }

  // 半径 0.03 的点，d 为距离
  gl_FragColor.rgb = vec3(d) + step(d, 0.03);
  gl_FragColor.a = 1.0;
}
