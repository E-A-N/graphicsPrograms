const main = function() {

    const guiReference = "graphicsDisposition";
    const div = document.getElementById(guiReference);
    const mapAttributes = (element, ...args) => {
        args.forEach((A) => {
            element.setAttribute(A[0], A[1]);
        });
    }

    const canvas = document.createElement("canvas");
    const canvasAttributes = [
        ["width", 640],
        ["height", 480],
        ["id", "glCanvas"]
    ];

    canvas.innerHTML = "Hello World!!";
    div.appendChild(canvas);
    mapAttributes(canvas, ...canvasAttributes);

    const GL = canvas.getContext("webgl");

    //Define geometry
    const shapeCoordinates = [
        -0.5,
         0.5,
        -0.5,
        -0.5,
         0.0,
        -0.5
    ]

    //create buffer object
    const vertexBuffer = GL.createBuffer();

    //Bind an empty array to vertex buffer
    GL.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer);

    //Convert shape coordinates to a vertex buffer
    const shapeBuffer = new Float32Array(shapeCoordinates);

    //Pass Vertex data to the buffer
    GL.bufferData(GL.ARRAY_BUFFER, shapeBuffer, GL.STATIC_DRAW)

    //Unbind the buffer
    GL.bindBuffer(GL.ARRAY_BUFFER, null);

    //Create Shaders!!!
    const vertexShaderProgram = `
        attribute vec2 coordinates;
        void main(void) {
            gl_Position = vec4(coordinates, 0.0, 1.0);
        }
    `;

    const fragmentShaderProgram = `
        void main(void) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);
        }
    `;

    //create shader object, attach source code then compile it
    const vertexShader = GL.createShader(GL.VERTEX_SHADER);
    GL.shaderSource(vertexShader, vertexShaderProgram);
    GL.compileShader(vertexShader);

    //create shader object, attach source code then compile it
    const fragmentShader = GL.createShader(GL.FRAGMENT_SHADER);
    GL.shaderSource(fragmentShader, fragmentShaderProgram);
    GL.compileShader(fragmentShader);

    const shaderProgram = GL.createProgram();
    GL.attachShader(shaderProgram, vertexShader);
    GL.attachShader(shaderProgram, fragmentShader);
    GL.linkProgram(shaderProgram);
    GL.useProgram(shaderProgram);

    //Associate shader programs to buffer objects

    //Bind vertex buffer object
    GL.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer);

    //Get attribute location
    const coord = GL.getAttribLocation(shaderProgram, "coordinates");

    //point coordinates to vertex buffer object
    GL.vertexAttribPointer(coord, 2, GL.FLOAT, false, 0, 0);

    //Enable the attribute
    GL.enableVertexAttribArray(coord);

    // Draw the required triangle
    GL.clearColor( 0.5, 0.5, 0.5, 0.9); //this clears the canvas

    //Enable depth test NOTE: research more on this
    GL.enable(GL.DEPTH_TEST);

    //Clear the color buffer bit
    GL.clear(GL.COLOR_BUFFER_BIT);

    //Set the view port
    GL.viewport(0,0, canvas.width, canvas.height);

    //Draw the triangle
    GL.drawArrays(GL.TRIANGLES, 0 , 3);

    //const debugCtx = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl"));
    //console.log(debugCtx);
}

window.onload = main;
