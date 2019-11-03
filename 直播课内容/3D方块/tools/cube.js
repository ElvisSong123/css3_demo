var iLeftKey = false;
var iRightKey = false;

function check(ele, $ele) {
    ele.on('mouseenter', function(e) {
        console.log(e.target);
        var result = get(e, "in", $(this));
        transPic(result, $ele);
        console.log(result);
    })
    ele.on('mouseleave', function(e) {
        var result = get(e, "out", $(this));
        console.log(result);
        transPic(result, $ele);
    })

}

// var picWar = $('.picWar');
// picWar.each(function(index, ele) {
//     // console.log(index, ele);
//     var ele1 = $(ele).find('.img');
//     check(ele1, $(ele));

// })
var show = $('.show');
show.each(function(index, ele) {
    var picWar = $(ele).find('.picWar');
    check($(ele), picWar);
})

function get(event, start, ele) {
    var d = bindEvent(event, ele);
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
    var result = start + dir;
    return result;
    // console.log(start + dir);
}

function bindEvent(event, ele) {
    var d;
    var x = event.clientX;
    var y = event.clientY;
    var t = ele.offset().top;
    var l = ele.offset().left;
    var h = ele.height();
    var w = ele.width();
    var mouseX = ((event.clientX - l) - w / 2) * (w > h ? (h / w) : 1);
    var mouseY = ((event.clientY - t) - h / 2) * (h > w ? (w / h) : 1);
    d = (Math.round((Math.atan2(mouseY, mouseX) * (180 / Math.PI) + 180) / 90) + 3) % 4;
    return d;


}

function transPic(result, ele) {

    switch (result) {
        case 'in-top':
            ele.find('.img1').css({
                transform: 'rotatey(0deg) translatez(75px)',
            })
            ele.find('.img2').css({
                transform: 'rotatex(90deg) translatez(75px)',
            })
            ele.css({
                transform: 'rotatex(-90deg)',
            })

            break;
        case 'out-top':
            ele.css({
                transform: 'rotatex(0deg)',
            })
            break;
        case 'in-right':
            ele.find('.img1').css({
                transform: 'rotatey(0deg) translatez(75px)',
            })
            ele.find('.img2').css({
                transform: 'rotatey(-270deg) translatez(75px)',
            })
            ele.css({
                transform: 'rotatey(-90deg)',
            })


            break;
        case 'out-right':

            ele.css({
                transform: 'rotatey(0deg)',
            })

            break;
        case 'in-bottom':
            ele.find('.img1').css({
                transform: 'rotatey(0deg) translatez(75px)',
            })
            ele.find('.img2').css({
                transform: 'rotatex(270deg) translatez(75px)',
            })
            ele.css({
                transform: 'rotatex(90deg)',
            })
            break;
        case 'out-bottom':
            ele.css({
                transform: 'rotatex(0deg)',
            })
            break;
        case 'in-left':

            ele.css({
                transform: 'rotatey(90deg)',
            })
            ele.find('.img1').css({
                transform: 'rotatey(0deg) translatez(75px)',
            })
            ele.find('.img2').css({
                transform: 'rotatey(-90deg) translatez(75px)',
            })


            break;
        case 'out-left':

            ele.css({
                transform: 'rotatey(0deg)',
            })

            break;

    }
}