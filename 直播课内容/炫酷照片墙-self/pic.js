window.onload = function() {
    var content = $('.content');
    var img = $('.picture');
    var wrapper = $('.wrapper');
    var body = $('body');
    var len = img.length;
    var nowx, nowy, movex, movey, disx = 0,
        disy = 0,
        rolx = 0,
        roly = 0;
    var timer;
    for (var i = 0; i < len; i++) {
        img[i].style.transform = 'rotatey(' + i * 30 + 'deg)  translatez(300px)';
        img[i].style.transition = 'all 0.4s linear ' + (len - i) * 0.08 + 's';
    }
    body.on('mousedown', function(e) {
        nowx = e.clientX;
        nowy = e.clientY;
        console.log(nowx, nowy);
        e.preventDefault();
        body.on('mousemove', function(e) {
            movex = e.clientX;
            movey = e.clientY;
            // console.log(nowx, nowy);
            disx = movex - nowx;
            disy = movey - nowy;
            rolx -= disy * 0.2;
            roly += disx * 0.2;

            // nowx = movex;
            // nowy = movey;
            console.log(disx, disy);
            $('.content').get(0).style.transform = 'rotatex(' + rolx % 360 + 'deg) rotatey(' + roly % 360 + 'deg)'
            lastX = nowX;
            nowx = movex;
            nowy = movey;

        })

    }).on('mouseup', function() {

        body.off('mousemove');
        timer = setInterval(function() {
            $('.content').get(0).style.transform = 'rotatex(' + rolx % 360 + 'deg) rotatey(' + roly % 360 + 'deg)';
            disx *= 0.9;
            disy *= 0.9;
            rolx -= disy * 0.1;
            roly += disx * 0.1;

            if (Math.abs(disx) < 0.01 && Math.abs(disy) < 0.01) {
                clearInterval(timer);
            }
        }, 20)
    })

}