/*
Function to create the vertex and color information for simple shapes
These can be used in multiple examples.

Gilberto Echeverria
2024-09-15
*/

import * as twgl from 'twgl-base.js';

// Create the data for the vertices of a polygon with the shape of the
// letter F. This is useful to view the transformations on the object.
function shapeF(): twgl.Arrays {
    const arrays = {
        a_position: {
            numComponents: 2,
            data: [
                // Letter F
                0, 0,
                0, 200,
                40, 200,
                40, 0,
                40, 40,
                200, 40,
                200, 0,
                40, 120,
                150, 120,
                150, 80,
                40, 80,
            ]
        },
        indices: {
            numComponents: 3,
            data: [
                // Front face
                0, 1, 2,
                2, 3, 0,
                3, 4, 5,
                5, 6, 3,
                7, 8, 9,
                9, 10, 7,
            ]
        }
    };

    return arrays;
}

function shapeF_centered() : twgl.Arrays {
    let arrays = {
        a_position: {
            numComponents: 2,
            data: [
                // Letter F
                0, 200,
                0, 0,
                40, 0,
                40, 200,
                40, 160,
                200, 160,
                200, 200,
                40, 80,
                150, 80,
                150, 120,
                40, 120,
            ]
        },
        indices: {
            numComponents: 3,
            data: [
                // Front face
                0, 1, 2,
                2, 3, 0,
                3, 4, 5,
                5, 6, 3,
                7, 8, 9,
                9, 10, 7,
            ]
        }
    };

    return arrays;
}

function smiley(radius: number, sides: number = 30) : twgl.Arrays {
    // The arrays are initially empty
    const positionData: number[] = [];
    const colorData: number[] = [];
    const indexData: number[] = [];

    const yellow = [1, 0.9725490196, 0.18039215686, 1];
    const black = [0.1, 0.1, 0.1, 1];

    // TODO: Create you own shape for a smiley face ✅
    //  - Add coordinates as pairs of elements into the positionData array (x, y)
    //  - Add color values as 3 values (RBG) into the colorData array (r, g, b, a)
    //  - Add index for the order in which vertices are connected, 3 values for each triangle
    // HINT: You can use polar coordinates to define the positions of vertices,
    // using the radius and an angle. Then convert them to polar coordinates.

    // Initialize the center vertex, at the origin and with yellow color
    positionData.push(0,0); // center
    colorData.push(...yellow); // ... -> spread operator, allows to unpack/expand elements from an array in this case

    // cuanto girar entre cada vertice, vuelta completa = 2 pi radianes
    const angleStep = 2 * Math.PI / sides; // el circulo entre los lados

    for ( let s = 0; s < sides; s++) {
        const angle = angleStep * s; // calculamos angulo para el punto a crear
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        positionData.push(x);
        positionData.push(y);
        colorData.push(...yellow);

        // triangulo de esta vuelta: (centro, vertice actual, vertice siguiente)
        indexData.push(0); // centro (vertice 0)
        indexData.push(s + 1); // el vertice que se acaba de crear en la vuelta

        // el siguiente vertice del borde es s + 2
        // en la ultima vuelta, s + 2 ya no existe, asi que regresamos al vertice 1 para cerrar el circulo
        indexData.push(((s + 2) <= sides) ? (s + 2) : 1); // sintaxis: s + 2 <= sides?, si es verdad usa s + 2, si es falso usa 1 (condicion ? valor si es verdad : valor si es falso)
    }

/*  // OJO IZQUIERDO SIN FOR
    positionData.push(-50 + 18, 50); // derecha, v31
    positionData.push(-50, 50 + 18); // arriba, v32
    positionData.push(-50 - 18, 50); // izq, v33
    positionData.push(-50, 50 - 18); // abajo v34
    colorData.push(...black);
    colorData.push(...black);
    colorData.push(...black);
    colorData.push(...black);
    indexData.push(31, 32, 33);
    indexData.push(33, 34, 31); */

    // ---- OJOS ----

    // cada ojo tiene 21 vertices ( 1 centro + lados de vertices)
    // ojo derecho va del vertice 31 al 51
    // ojo izquierdo va del 52 al 72

    const eyeRadius = 18;
    const eyeSides = 20;
    const eyeAngleStep = 2 * Math.PI / eyeSides; // calculamos angleStep del propio ojo para no usar el de la cara
    const leftEyeStart = sides + 1; // 31
    const rightEyeStart = leftEyeStart + eyeSides + 1; // 52

    // OJO IZQUIERDO
    positionData.push(-50,50);
    colorData.push(...black);

    for (let s = 0; s < eyeSides; s++) {
        const angle = eyeAngleStep * s;
        const x = -50 + Math.cos(angle) * eyeRadius;
        const y = 50 + Math.sin(angle) * eyeRadius;
        positionData.push(x);
        positionData.push(y);
        colorData.push(...black);

        // triangulo de esta vuelta: (centro, vertice actual, vertice siguiente)
        indexData.push(31); // centro (vertice 0)
        indexData.push(31 + s + 1); // el vertice que se acaba de crear en la vuelta

        // el siguiente vertice del borde es s + 2
        // en la ultima vuelta, s + 2 ya no existe, asi que regresamos al vertice 1 para cerrar el circulo
        indexData.push(((s + 2) <= eyeSides) ? (31 + s + 2) : (31 + 1)); // sintaxis: s + 2 <= sides?, si es verdad usa s + 2, si es falso usa 1 (condicion ? valor si es verdad : valor si es falso)
    }

    // OJO DERECHO

    positionData.push(50,50);
    colorData.push(...black);

    for (let s = 0; s < eyeSides; s++) {
        const angle = eyeAngleStep * s;
        const x = 50 + Math.cos(angle) * eyeRadius;
        const y = 50 + Math.sin(angle) * eyeRadius;
        positionData.push(x);
        positionData.push(y);
        colorData.push(...black);
        indexData.push(rightEyeStart);
        indexData.push(rightEyeStart + s + 1); 
        indexData.push(((s + 2) <= eyeSides) ? (rightEyeStart + s + 2) : (rightEyeStart + 1));
    }

    // ---- BOCA ----

    const pink = [ 255/255, 135/255, 178/255, 1];
    const mouthRadius = 70;
    const mouthSides = 20;
    const mouthAngleStep = Math.PI / mouthSides; // media vuelta para 20 , pi / lados
    const mouthStart = rightEyeStart + eyeSides + 1;

    positionData.push(0,-20);
    colorData.push(...pink);

    for (let s = 0; s <= mouthSides; s++) { // pi = 180, entonces el punto de salida es a la mitad del circulo en direccion hacia abajo
        const angle = Math.PI + mouthAngleStep * s; // agregamos Math.PI para que empieze hacia abajo 
        const x = 0 + Math.cos(angle) * mouthRadius;
        const y = -20 + Math.sin(angle) * mouthRadius;
        positionData.push(x);
        positionData.push(y);
        colorData.push(...pink);
        //indexData.push(((s + 2) <= mouthSides) ? (mouthStart + s + 2) : (mouthStart + 1));
        if ( s < mouthSides) { // cuando s no sea < a los lados, ya no se hace un nuevo triangulo
            indexData.push(mouthStart); // centro de la boca
            indexData.push(mouthStart + s + 1); // vertice de la vuelta actual
            indexData.push(mouthStart + s + 2); // el siguiente vertice
        }
    }



    // Build the final object with the arrays for positions, colors, and indices
    const arrays: twgl.Arrays = {
        a_position: { numComponents: 2, data: positionData },
        a_color:    { numComponents: 4, data: colorData },
        indices:    { numComponents: 3, data: indexData },
    };

    console.log(arrays);

    return arrays;
}

function diamond(size: number) : twgl.Arrays {
    let arrays = {
        a_position: {
            numComponents: 2,
            data: [
                // A diamond shape
                size, 0,
                0, size,
                -size, 0,
                0, -size,
            ]
        },
        a_color: {
            numComponents: 4,
            data: [
                0.5, 0.5, 0.5, 1,
                0.5, 0.5, 0.5, 1,
                0.5, 0.5, 0.5, 1,
                0.5, 0.5, 0.5, 1,
            ]
        },
        indices: {
            numComponents: 3,
            data: [
                // Front face
                0, 1, 2,
                2, 3, 0,
            ]
        }
    };

    return arrays;
}

function car2D() : twgl.Arrays {
    let arrays = {
        a_position: {
            numComponents: 2,
            data: [
                -100,  -40,
                 -40,  -40,
                  40,  -40,
                 100,  -40,
                 100,  -20,
                  40,   10,
                 -40,   10,
                -100,   20,
                 -30,   40,
                  24,   30,
            ]
        },
        indices: {
            numComponents: 3,
            data: [
                0, 1, 6,      0, 6, 7,    // Car back
                1, 2, 5,      1, 5, 6,    // Car middle
                2, 3, 4,      2, 4, 5,    // Car front
                6, 5, 9,      6, 9, 8     // Car top
            ]
        }
    }

    return arrays;
}


// Create the data for a cube where each face has a different color
function cubeFaceColors(size: number) : twgl.Arrays {
    let arrays = {
        a_position: {
            numComponents: 3,
            data: [
                // Front Face
                -1.0, -1.0,  1.0,
                 1.0, -1.0,  1.0,
                 1.0,  1.0,  1.0,
                -1.0,  1.0,  1.0,

                // Back face
                -1.0, -1.0, -1.0,
                -1.0,  1.0, -1.0,
                 1.0,  1.0, -1.0,
                 1.0, -1.0, -1.0,

                // Top face
                -1.0,  1.0, -1.0,
                -1.0,  1.0,  1.0,
                 1.0,  1.0,  1.0,
                 1.0,  1.0, -1.0,

                // Bottom face
                -1.0, -1.0, -1.0,
                 1.0, -1.0, -1.0,
                 1.0, -1.0,  1.0,
                -1.0, -1.0,  1.0,

                // Right face
                 1.0, -1.0, -1.0,
                 1.0,  1.0, -1.0,
                 1.0,  1.0,  1.0,
                 1.0, -1.0,  1.0,

                // Left face
                -1.0, -1.0, -1.0,
                -1.0, -1.0,  1.0,
                -1.0,  1.0,  1.0,
                -1.0,  1.0, -1.0
            ].map(e => size * e)
        },
        a_normal: {
            numComponents: 3,
            data: [
                // Front Face
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,

                // Back face
                0, 0, -1,
                0, 0, -1,
                0, 0, -1,
                0, 0, -1,

                // Top face
                0, 1, 0,
                0, 1, 0,
                0, 1, 0,
                0, 1, 0,

                // Bottom face
                0, -1, 0,
                0, -1, 0,
                0, -1, 0,
                0, -1, 0,

                // Right face
                1, 0, 0,
                1, 0, 0,
                1, 0, 0,
                1, 0, 0,

                // Left face
                -1, 0, 0,
                -1, 0, 0,
                -1, 0, 0,
                -1, 0, 0,
            ]
        },
        a_color: {
            numComponents: 4,
            data: [
                // Front face
                1, 0, 0, 1, // v_1
                1, 0, 0, 1, // v_1
                1, 0, 0, 1, // v_1
                1, 0, 0, 1, // v_1
                // Back Face
                0, 1, 0, 1, // v_2
                0, 1, 0, 1, // v_2
                0, 1, 0, 1, // v_2
                0, 1, 0, 1, // v_2
                // Top Face
                0, 0, 1, 1, // v_3
                0, 0, 1, 1, // v_3
                0, 0, 1, 1, // v_3
                0, 0, 1, 1, // v_3
                // Bottom Face
                1, 1, 0, 1, // v_4
                1, 1, 0, 1, // v_4
                1, 1, 0, 1, // v_4
                1, 1, 0, 1, // v_4
                // Right Face
                0, 1, 1, 1, // v_5
                0, 1, 1, 1, // v_5
                0, 1, 1, 1, // v_5
                0, 1, 1, 1, // v_5
                // Left Face
                1, 0, 1, 1, // v_6
                1, 0, 1, 1, // v_6
                1, 0, 1, 1, // v_6
                1, 0, 1, 1, // v_6
            ]
        },
        indices: {
            numComponents: 3,
            data: [
                0, 1, 2,      0, 2, 3,    // Front face
                4, 5, 6,      4, 6, 7,    // Back face
                8, 9, 10,     8, 10, 11,  // Top face
                12, 13, 14,   12, 14, 15, // Bottom face
                16, 17, 18,   16, 18, 19, // Right face
                20, 21, 22,   20, 22, 23  // Left face
            ]
        }
    };

    return arrays;
}

// Create the data for a cube with each vertex in a different color
function cubeVertexColors(size: number) : twgl.Arrays {
    let arrays = {
        a_position: {
            numComponents: 3,
            data: [
                 1,  1,  1, // v_0
                 1, -1,  1, // v_1
                -1, -1,  1, // v_2
                -1,  1,  1, // v_3
                 1,  1, -1, // v_4
                 1, -1, -1, // v_5
                -1, -1, -1, // v_6
                -1,  1, -1, // v_7
            ].map(e => size * e)
        },
        a_color: {
            numComponents: 4,
            data: [
                1, 1, 1, 1, // v_0
                1, 0, 0, 1, // v_1
                0, 1, 0, 1, // v_2
                0, 0, 1, 1, // v_3
                0, 0, 0, 1, // v_4
                1, 1, 0, 1, // v_5
                0, 1, 1, 1, // v_6
                1, 0, 1, 1, // v_7
            ]
        },
        indices: {
            numComponents: 3,
            data: [
                // Front face
                0, 2, 1,
                2, 0, 3,
                // Top face
                0, 5, 4,
                5, 0, 1,
                // Left face
                1, 6, 5,
                6, 1, 2,
                // Right face
                0, 7, 3,
                7, 0, 4,
                // Bottom face
                2, 7, 6,
                7, 2, 3,
                // Back face
                4, 6, 7,
                6, 4, 5,
            ]
        }
    };

    return arrays;
}

// Create the data for a cube with vertex coordinates
function cubeTextured(size: number) : twgl.Arrays {
    let arrays = {
        a_position: {
            numComponents: 3,
            data: [
                // Front Face
                -1.0, -1.0,  1.0,
                 1.0, -1.0,  1.0,
                 1.0,  1.0,  1.0,
                -1.0,  1.0,  1.0,

                // Back face
                -1.0, -1.0, -1.0,
                -1.0,  1.0, -1.0,
                 1.0,  1.0, -1.0,
                 1.0, -1.0, -1.0,

                // Top face
                -1.0,  1.0, -1.0,
                -1.0,  1.0,  1.0,
                 1.0,  1.0,  1.0,
                 1.0,  1.0, -1.0,

                // Bottom face
                -1.0, -1.0, -1.0,
                 1.0, -1.0, -1.0,
                 1.0, -1.0,  1.0,
                -1.0, -1.0,  1.0,

                // Right face
                 1.0, -1.0, -1.0,
                 1.0,  1.0, -1.0,
                 1.0,  1.0,  1.0,
                 1.0, -1.0,  1.0,

                // Left face
                -1.0, -1.0, -1.0,
                -1.0, -1.0,  1.0,
                -1.0,  1.0,  1.0,
                -1.0,  1.0, -1.0
            ].map(e => size * e)
        },
        a_normal: {
            numComponents: 3,
            data: [
                // Front Face
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,

                // Back face
                0, 0, -1,
                0, 0, -1,
                0, 0, -1,
                0, 0, -1,

                // Top face
                0, 1, 0,
                0, 1, 0,
                0, 1, 0,
                0, 1, 0,

                // Bottom face
                0, -1, 0,
                0, -1, 0,
                0, -1, 0,
                0, -1, 0,

                // Right face
                1, 0, 0,
                1, 0, 0,
                1, 0, 0,
                1, 0, 0,

                // Left face
                -1, 0, 0,
                -1, 0, 0,
                -1, 0, 0,
                -1, 0, 0,
            ]
        },
        a_color: {
            numComponents: 4,
            data: [
                // Front face
                1, 0, 0, 1, // v_1
                1, 0, 0, 1, // v_1
                1, 0, 0, 1, // v_1
                1, 0, 0, 1, // v_1
                // Back Face
                0, 1, 0, 1, // v_2
                0, 1, 0, 1, // v_2
                0, 1, 0, 1, // v_2
                0, 1, 0, 1, // v_2
                // Top Face
                0, 0, 1, 1, // v_3
                0, 0, 1, 1, // v_3
                0, 0, 1, 1, // v_3
                0, 0, 1, 1, // v_3
                // Bottom Face
                1, 1, 0, 1, // v_4
                1, 1, 0, 1, // v_4
                1, 1, 0, 1, // v_4
                1, 1, 0, 1, // v_4
                // Right Face
                0, 1, 1, 1, // v_5
                0, 1, 1, 1, // v_5
                0, 1, 1, 1, // v_5
                0, 1, 1, 1, // v_5
                // Left Face
                1, 0, 1, 1, // v_6
                1, 0, 1, 1, // v_6
                1, 0, 1, 1, // v_6
                1, 0, 1, 1, // v_6
            ]
        },
        a_texCoord: {
            numComponents: 2,
            data: [
                // Front Face
                0.0, 0.0,
                1.0, 0.0,
                1.0,  1.0,
                0.0, 1.0,

                // Back face
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,
                0.0, 0.0,

                // Top face
                0.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,

                // Bottom face
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,

                // Right face
                0.0, 1.0,
                1.0, 1.0,
                1.0, 0.0,
                0.0, 0.0,

                // Left face
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,
            ]
        },
        indices: {
            numComponents: 3,
            data: [
                0, 1, 2,      0, 2, 3,    // Front face
                4, 5, 6,      4, 6, 7,    // Back face
                8, 9, 10,     8, 10, 11,  // Top face
                12, 13, 14,   12, 14, 15, // Bottom face
                16, 17, 18,   16, 18, 19, // Right face
                20, 21, 22,   20, 22, 23  // Left face
            ]
        }
    };

    return arrays;
}

export { shapeF, diamond, cubeFaceColors, cubeVertexColors, cubeTextured,
         car2D, smiley, shapeF_centered };
