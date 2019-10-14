var width = window.innerWidth;
var height = window.innerHeight;

var elem = document.getElementById('micbutton');
var icon = document.getElementById('speakicon');

icon.style.opacity = 0.9;
//Initially place button in middle of view
elem.style.left = (width-200)/2 + 'px';


elem.onclick = function() {
    var buttonsize = 200;
    var boxsize = 400;

    var pos = 0
    var borderRad = [50, 5];
    var size = [buttonsize, boxsize];
    var offset = [(width-buttonsize)/2, (width-boxsize)/2];

    var id = setInterval(frame, 0.1);
    function frame() {
        if (pos > 1) {
            clearInterval(id);
        } else {
            pos = pos + 0.01;
            borderRadSlope = borderRad[1] - borderRad[0];
            sizeSlope = size[1] - size[0];
            offsetSlope = offset[1] - offset[0]

            elem.style.borderRadius = (borderRad[0] + borderRadSlope*pos) + '%';
            elem.style.width = (size[0] + sizeSlope*pos) + 'px';
            elem.style.height = (size[0] + sizeSlope*pos) + 'px';
            elem.style.left = (offset[0] + offsetSlope*pos) + 'px';
        }
    }
};
