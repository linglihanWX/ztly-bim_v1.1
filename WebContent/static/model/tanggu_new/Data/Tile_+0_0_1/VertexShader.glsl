precision highp float;
attribute vec3 a_position;
attribute vec3 a_normal;
attribute vec4 a_color;
attribute float a_batchId;
varying vec3 v_normal;
varying float v_batchId;
varying vec4 v_color;
uniform mat3 u_normalMatrix;
uniform mat4 u_modelViewMatrix;
uniform mat4 u_projectionMatrix;
attribute vec2 a_texcoord0;
varying vec2 v_texcoord0;
void main(void)
{
    vec4 pos = u_modelViewMatrix * vec4(a_position,1.0);
    v_normal = u_normalMatrix * a_normal;
    v_texcoord0 = a_texcoord0;
    v_color = a_color;
    v_batchId = a_batchId;
    gl_Position = u_projectionMatrix * pos;
}
