precision highp float;
varying vec3 v_normal;
varying float v_batchId;
varying vec2 v_texcoord0;
varying vec4 v_color;
uniform vec4 u_diffuse;
uniform vec4 u_ambient;
uniform sampler2D u_diffuseTex;
uniform bool u_hasDiffuse;
uniform bool u_hasTex;
uniform bool u_hasColor;
uniform bool u_hasNormal;
uniform bool u_isLightOn;
uniform vec4 u_specular;
uniform float u_shininess;
void main(void)
{
    vec4 diffuse = vec4(1., 1., 1., 1.);
    //使用纹理颜色
    if(u_hasTex)
    {
         diffuse = texture2D(u_diffuseTex, v_texcoord0);
    }
    //使用逐顶点color
    if(u_hasColor)
    {
       diffuse = diffuse * v_color;
    }
    //使用osg::Material的diffuse
    if(u_hasDiffuse)
    {
       diffuse = diffuse * u_diffuse;
    }
    //开启光照
    if(u_hasNormal && u_isLightOn)
    {
       vec3 normal = normalize(v_normal);
       //diffuse.rgb *= max(dot(normal,vec3(0.,0.,1.)), 0.); 
		diffuse.rgb *= max(dot(normal,vec3(0.,0.,1.)), 0.) * 0.5 + 0.5; 
    }
   gl_FragColor = diffuse;
}
