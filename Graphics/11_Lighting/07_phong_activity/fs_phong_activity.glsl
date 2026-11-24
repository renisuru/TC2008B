#version 300 es
precision highp float;

in vec3 v_normal; // n̂ normal a la superficie
in vec3 v_surfaceToLight; // l̂ luz entrante
in vec3 v_surfaceToView; // v̂ dirección hacia la cámara (cámara - p)

// Scene uniforms (from Light3D)
uniform vec4 u_ambientLight; // Intensidad ambiental Ia
uniform vec4 u_diffuseLight; // Intensidad difusa Id
uniform vec4 u_specularLight; // Intensidad especular Is

// Model uniforms (material of the object)
uniform vec4 u_ambientColor; // Constante ambiental Ka
uniform vec4 u_diffuseColor; // Constante difusa Kd
uniform vec4 u_specularColor; // Constante especular Ks
uniform float u_shininess; // Coeficiente especular

out vec4 outColor;

void main() {
    // v_normal must be normalized because the GPU interpolates the
    // per-vertex value for every fragment.
    vec3 normal = normalize(v_normal);

    // Normalize the direction vectors the same way.
    vec3 surfToLightDirection = normalize(v_surfaceToLight);
    vec3 surfToViewDirection = normalize(v_surfaceToView);

    // ------------------------------------------------------------------
    // TODO 1: Ambient term ✅
    //         The light contribution that reaches the surface no matter
    //         its orientation. Combines the material colors with the
    //         light.
    vec4 ambientColor = u_ambientColor * u_ambientLight;  

    // TODO 2: Diffuse term (Lambert's law) ✅
    //         The light absorbed and re-emitted by the surface, based on
    //         how directly the normal faces the light. A surface facing
    //         away from the light contributes nothing (negative values
    //         are not physical).

    float diffuse_coeficient = max(dot(surfToLightDirection, normal),0.0);
    vec4 diffuseColor = u_diffuseColor * u_diffuseLight * diffuse_coeficient;


    // TODO 3: Reflection vector ✅
    //         The direction in which a ray of light bouncing off this
    //         surface would leave it (see the references in README.md)
    vec3 reflectionVector = 2.0 * dot(surfToLightDirection, normal) * normal - surfToLightDirection;  // PLACEHOLDER: replace me

    // TODO 4: Specular term (Phong reflection) ✅
    //         The light that bounces directly toward the eye: larger
    //         when the view direction is close to the reflection
    //         direction, and sharpened by the material's shininess.
    //         Typically only meaningful when the surface faces the light.

    vec4 specularColor = vec4(0,0,0,0);
    if (diffuse_coeficient > 0.0) {
        specularColor = u_specularColor * u_specularLight * pow(max(dot(reflectionVector, surfToViewDirection), 0.0), u_shininess);  // PLACEHOLDER: replace me
    }
    

    // TODO 5: Final color
    //         The three terms above are independent contributions of the
    //         same light: combine them into the color of the fragment.
    // PLACEHOLDER: replace me (an unlit gray cube is rendered until you do)
    outColor = diffuseColor + specularColor + ambientColor;
    // outColor = vec4(v_surfaceToLight, 1.0);
}
