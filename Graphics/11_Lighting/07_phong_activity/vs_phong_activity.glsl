#version 300 es
in vec4 a_position; // posicion del vertice
in vec3 a_normal;

// Scene uniforms
uniform vec3 u_lightWorldPosition; // posicion luz
uniform vec3 u_viewWorldPosition;

// Model uniforms
uniform mat4 u_world; // matriz de transformacion solo del objeto
uniform mat4 u_worldInverseTransform; // la inversa de la transpuesta de esa matriz, necesaria pq cuando transformo objeto el efecto sobre el vector normal es perpendicular rjdnf necesito otra matriz para el vector normal
uniform mat4 u_worldViewProjection; // transofmacion del objeto de la camara y la perspectica

// vectores que se van a pasar, son el resultado
out vec3 v_normal; // n̂
out vec3 v_surfaceToLight; // l̂
out vec3 v_surfaceToView; // v̂

void main() {
    // Transform the position of the vertices
    gl_Position = u_worldViewProjection * a_position; // matriz * punto -> mueve el punto, lo escala y lo rota y traslada segun la matriz, muestra como voy a ver el obj desde la camara

    // TODO 1: Send the normal transformed by the object's own ✅
    //         transformations (rotation, scale, ...). The untransformed
    //         normal below is only a placeholder so the page still renders.
    v_normal = mat3(u_worldInverseTransform) * a_normal; // si transformo el objeto hay q transformar su normal, multiplicamos a normal x world inverse transform

    // TODO 2: Send the direction pointing from this point of the ✅
    //         surface toward the light.
    vec3 surfaceWorldPosition = (u_world * a_position).xyz; // el vector necesitamos primero transformar mi punto a_position*u_world para un punto en la superficie ya transformado, una vez obtenido el punto se puede restar lightworld position - surfaceworld position
    v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition; //B - A (B -> u_lightWorldPosition, A -> surfaceWorldPosition)

    // TODO 3: Send the direction pointing from this point of the ✅
    //         surface toward the view (camera).

    v_surfaceToView = u_viewWorldPosition - surfaceWorldPosition;  // camara - p
    
}

// vertex shader
/*
objetivo -> 
fs necesita coords y vectores actualizados despues de q hubo transformaciones vs hace transformaciones para q fs tenga no se q correcta
*/
