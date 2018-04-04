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
    GL.bindBuffer(GL.ARRAY_BUFFER, verterBuffer);

    //Convert shape coordinates to a vertex buffer
    const shapeBuffer = new Float32Array(shapeCoordinates);

    //Pass Vertex data to the buffer
    GL.bufferData(GL.ARRAY_BUFFER, shapeBuffer, GL.STATIC_DRAW)

    //Unbind the buffer
    GL.bindBuffer(GL.ARRAY_BUFFER, null);



}

window.onload = main;
