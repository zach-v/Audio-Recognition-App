var width = window.innerWidth;
var height = window.innerHeight;

var elem = document.getElementById('micbutton');
var icon = document.getElementById('speakicon');
var outputtext = document.getElementById('outputtext');

// Initially place button in middle of view
elem.style.left = (width-200)/2 + 'px';

var expanded = false;

elem.onmouseup = function() {
    if (!expanded) {
        expanded = true;
        // Button/Box sizes
        var original_size = 200;
        var expanded_size = 360;

        // Gradients, var[0] is inital, var[1] is final
        var expand_gradient = [original_size, expanded_size];
        var opacity_gradient = [1, 0];
        var border_rad_gradient = [50, 5];
        var left_offset_gradient = [(width-original_size)/2, (width-expanded_size)/2];
        var top_offset_gradient = [170, 60];
        var opacity_gradient = [1, 0];
        var text_opacity_gradient = [0, 1];

        // Variable to keep track of progress in animation
        var pos = 0;

        var id = setInterval(frame);
        function frame() {
            if (pos > 1) {
                clearInterval(id);
            } else {
                // Expanding animation

                // Base progress off of sine
                pos = pos + 0.02;
                cospos = 0.5 * (Math.cos((pos * Math.PI) + Math.PI) + 1)

                // Calculate differences
                borderRadSlope = border_rad_gradient[1] - border_rad_gradient[0];
                sizeSlope = expand_gradient[1] - expand_gradient[0];
                offsetSlope = left_offset_gradient[1] - left_offset_gradient[0];
                topoffsetSlope = top_offset_gradient[1] - top_offset_gradient[0];
                opacitySlope = opacity_gradient[1] - opacity_gradient[0];
                textOpacitySlope = text_opacity_gradient[1] - text_opacity_gradient[0];
                
                // Update attributes
                elem.style.borderRadius = (border_rad_gradient[0] + borderRadSlope*cospos) + '%';
                elem.style.width = (expand_gradient[0] + sizeSlope*cospos) + 'px';
                elem.style.height = (expand_gradient[0] + sizeSlope*cospos + 70) + 'px';
                elem.style.left = (left_offset_gradient[0] + offsetSlope*cospos) + 'px';
                elem.style.marginTop =  (top_offset_gradient[0] + topoffsetSlope*cospos) + 'px';
                icon.style.opacity = (opacity_gradient[1] + cospos*opacitySlope) + '';
                outputtext.style.opacity = (text_opacity_gradient[1] + cospos*textOpacitySlope) + '';
            }
        }


    }
};
