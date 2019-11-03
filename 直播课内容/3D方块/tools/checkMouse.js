function check(ele) {
    ele.onmouseenter = function(e) {
        get(e, "in");
    }
    ele.onmouseleave = function(e) {
        get(e, "out");
    }
}

function get(event, start) {
    var d = bindEvent(event);
    var dir = "";
    switch (d) {
        case 0:
            dir = "-top";
            break;

        case 1:
            dir = "-right";
            break;

        case 2:
            dir = "-bottom";
            break;

        case 3:
            dir = "-left";
            break;
    }
    console.log(start + dir);
}

function bindEvent(event) {
    var d;
    var x = event.clientX;
    var y = event.clientY;
    var t = box.offsetTop;
    var l = box.offsetLeft;
    var h = box.offsetHeight;
    var w = box.offsetWidth;
    var mouseX = ((event.clientX - l) - w / 2) * (w > h ? (h / w) : 1);
    var mouseY = ((event.clientY - t) - h / 2) * (h > w ? (w / h) : 1);
    d = (Math.round((Math.atan2(mouseY, mouseX) * (180 / Math.PI) + 180) / 90) + 3) % 4;
    return d;


}