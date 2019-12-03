var elem = document.getElementById('micbutton');
var icon = document.getElementById('speakicon');
var outputtext = document.getElementById('outputtext');
var visualizer = document.getElementById('visualizer');
var body = document.getElementById('body');

// Button/Box sizes
var original_size = 200;
var expanded_size = 360;

var expanded = false;

// Initially place button in middle of view
elem.style.left = (window.innerWidth - original_size)/2 + 'px';
//visualizer.style.display = "none";

elem.onmouseup = function() {
    if (!expanded) {
        expanded = true;

        // Gradients, var[0] is inital, var[1] is final
        var expand_gradient = [original_size, expanded_size];
        var border_rad_gradient = [50, 5];
        var top_offset_gradient = [170, 60];
        var left_offset_gradient = [(window.innerWidth - original_size)/2, (window.innerWidth - expanded_size)/2];

        // Variable to keep track of progress in animation
        var pos = 0;
        // Expanding animation
        var id = setInterval(function frame() {
            if (pos > 1) {
                clearInterval(id);
            } else {
                pos = pos + 0.02;
                // Calculate differences
                borderRadSlope = border_rad_gradient[1] - border_rad_gradient[0];
                sizeSlope = expand_gradient[1] - expand_gradient[0];
                topoffsetSlope = top_offset_gradient[1] - top_offset_gradient[0];
                leftoffsetSlope = left_offset_gradient[1] - left_offset_gradient[0];
                
                // Update attributes
                elem.style.borderRadius = (border_rad_gradient[0] + borderRadSlope*pos) + '%';
                elem.style.width = (expand_gradient[0] + sizeSlope*pos) + 'px';
                elem.style.height = (expand_gradient[0] + sizeSlope*pos + 70) + 'px';
                elem.style.marginTop =  (top_offset_gradient[0] + topoffsetSlope*pos) + 'px';
                icon.style.opacity = (0.8 - pos) + '';
                outputtext.style.opacity = pos + '';
                elem.style.left = (left_offset_gradient[0] + pos*leftoffsetSlope) + 'px';
            }
        });
        runNow();
    }
};

// Update div position on window resize
body.onresize = function() {
    if (!expanded) {
        elem.style.left = (window.innerWidth - original_size)/2 + 'px';
    } else {
        elem.style.left = (window.innerWidth - expanded_size)/2 + 'px';
    }
    resizeAudioCanvas();

};
