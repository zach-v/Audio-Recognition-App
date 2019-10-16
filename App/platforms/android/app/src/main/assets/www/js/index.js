var width = window.innerWidth;
var height = window.innerHeight;

var elem = document.getElementById('micbutton');
var icon = document.getElementById('speakicon');

// Initially place button in middle of view
elem.style.left = (width-200)/2 + 'px';

elem.onmouseup = function() {
    // Button/Box sizes
    var original_size = 200;
    var expanded_size = 360;

    // Gradients, var[0] is inital, var[1] is final
    var expand_gradient = [original_size, expanded_size];
    var opacity_gradient = [1, 0];
    var border_rad_gradient = [50, 5];
    var left_offset_gradient = [(width-original_size)/2, (width-expanded_size)/2];
    var top_offset_gradient = [170, 80];
    var opacity_gradient = [1, 0];

    // Variable to keep track of progress in animation
    var pos = 0

    var id = setInterval(frame);
    function frame() {
        if (pos > 1) {
            clearInterval(id);
        } else {
            // Expanding animation
            pos = pos + 0.02;
            // Calculate differences
            borderRadSlope = border_rad_gradient[1] - border_rad_gradient[0];
            sizeSlope = expand_gradient[1] - expand_gradient[0];
            offsetSlope = left_offset_gradient[1] - left_offset_gradient[0];
            topoffsetSlope = top_offset_gradient[1] - top_offset_gradient[0];
            opacitySlope = opacity_gradient[1] - opacity_gradient[0];
            
            // Update attributes
            elem.style.borderRadius = (border_rad_gradient[0] + borderRadSlope*pos) + '%';
            elem.style.width = (expand_gradient[0] + sizeSlope*pos) + 'px';
            elem.style.height = (expand_gradient[0] + sizeSlope*pos) + 'px';
            elem.style.left = (left_offset_gradient[0] + offsetSlope*pos) + 'px';
            elem.style.marginTop =  (top_offset_gradient[0] + topoffsetSlope*pos) + 'px';
            icon.style.opacity = (opacity_gradient[1] + pos*opacitySlope) + '';
        }
    }
};
