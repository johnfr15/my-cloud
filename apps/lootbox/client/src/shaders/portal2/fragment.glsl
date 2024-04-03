// SNOISE function from: https://www.shadertoy.com/view/lsf3RH
float snoise(vec3 uv, float res)
{
	const vec3 s = vec3(1e0, 1e2, 1e3);
	
	uv *= res;
	
	vec3 uv0 = floor(mod(uv, res))*s;
	vec3 uv1 = floor(mod(uv+vec3(1.), res))*s;
	
	vec3 f = fract(uv); f = f*f*(3.0-2.0*f);

	vec4 v = vec4(uv0.x+uv0.y+uv0.z, uv1.x+uv0.y+uv0.z,
		      	  uv0.x+uv1.y+uv0.z, uv1.x+uv1.y+uv0.z);

	vec4 r = fract(sin(v*1e-1)*1e3);
	float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);
	
	r = fract(sin((v + uv1.z - uv0.z)*1e-1)*1e3);
	float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);
	
	return mix(r0, r1, f.z)*2.-1.;
}

float noise(vec2 uv, float baseres)
{
    float n = 0.0;
    for (int i = 0; i < 4; i++)
    {
        float v = pow(2.0, float(i));
        n += (1.5 / v) * snoise(vec3(uv + vec2(1.,1.) * (float(i) / 17.), 1), v * baseres);
    }
    
    
    return clamp((1.0 - n) * .5, 0., 1.) * 2.0;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float aspectRatio = iResolution.y/iResolution.x;
    vec2 uv = (fragCoord/iResolution.xy);
    uv.y *= aspectRatio;
    
    // Tweaking vars
    vec4 color = vec4(0.125, 0.291, 0.923, 1.0);
    vec4 leaving = vec4(0.925, 0.791, 0.323, 1.0);
    float noise_sz = 7.0f;
    float speed = 0.4;
    vec2 center = vec2(0.5, 0.5 * aspectRatio);
    
    float dc = 1. - (distance(uv, center) * 2.75);
    float pdc = pow(dc, 3.5);
    
    vec2 dir = -normalize(uv - center) * speed;
    
    float phase0 = fract(iTime * 0.3 + 0.5);
    float phase1 = fract(iTime * 0.3 + 0.0);
    
    vec2 uv0 = uv + phase0 * dir;
    vec2 uv1 = uv + phase1 * dir;
    
    // Rotation
    float as = pdc * sin(iTime * 0.9) * 1.2;
	float ca = cos(as);
	float sa = sin(as);					
    
    mat2 rot;
    rot[0] = vec2(ca, -sa);
    rot[1] = vec2(sa, ca);
    
    uv0 = center + ((uv0 - center) * rot);
    uv1 = center + ((uv1 - center) * rot);

    // Samplings
    float tex0 = max(noise(uv0, noise_sz), noise(uv0 * 1.2, noise_sz));
    float tex1 = max(noise(uv1, noise_sz), noise(uv1 * 1.4, noise_sz));
    
    float lerp = abs((0.5 - phase0) / 0.5);
    float samplings = mix(tex0, tex1, lerp);
    
    vec4 c = vec4(samplings, samplings, samplings, 1.0) * mix(color, leaving, pdc) * pdc;
  	c += pow(dc, 16.0) * mix(color, leaving, pow(dc, 16.0)) * 2.3;
    
    float cl = clamp(max(c.r, max(c.g, c.b)), 0.0, 1.0);
    
    c.rgb += texture(iChannel0, (fragCoord/iResolution.xy)).rgb * cl;
    
    // Output to screen
    fragColor = c;
    fragColor.a = cl;
}
