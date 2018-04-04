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
        ["width", 200],
        ["height", 300],
        ["id", "glCanvas"]
    ];

    canvas.innerHTML = "Hello World!!";
    div.appendChild(canvas);
    mapAttributes(canvas, ...canvasAttributes);


    const GL = canvas.getContext("webgl");
    console.log(guiReference,canvas,GL);
}

window.onload = main;
