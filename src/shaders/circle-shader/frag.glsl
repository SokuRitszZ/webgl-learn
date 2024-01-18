#ifdef GL_ES
precision highp float;
#endif

varying vec2 vUv;
uniform float uTime;

float circle(float mul, float r, float x) {
  vec2 st = vUv * mul;
  
  vec2 iSt = floor(st);
  vec2 fSt = fract(st);

  vec2 ori = iSt + .5;
  float t1 = uTime + 23424.;
  ori = ori + x * vec2(cos(t1), sin(t1));

  vec2 sub = ori - st;

  float distSq = dot(sub, sub);
  float rSq = dot(r, r);
  
  float isIn = smoothstep(rSq, rSq - .01, distSq); 
  return isIn;
}

void main() {
  float isIn1 = circle(5., .3, .1);
  float isIn2 = circle(7., .2, .05);
  float isIn3 = circle(5., .2, .1);

  gl_FragColor.rgb = vec3(.6, .8, 1.);
  gl_FragColor.rgb = isIn2 * vec3(.6, .9, .7) + (1. - isIn2) * gl_FragColor.rgb;
  gl_FragColor.rgb = isIn1 * vec3(.5, .5, .7) + (1. - isIn1) * gl_FragColor.rgb;
  gl_FragColor.rgb = isIn3 * vec3(.5, .9, .7) + (1. - isIn3) * gl_FragColor.rgb;
  gl_FragColor.a = 1.;
}