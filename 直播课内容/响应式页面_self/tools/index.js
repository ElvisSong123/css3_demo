var btn = $('.btn');
var btnWrapper = $('.btn-wrapper');
var contain = $('.contain');
btn.on('mouseenter', function() {
    btnWrapper.css('display', 'block');
})
btnWrapper.on('mouseleave', function() {
    btnWrapper.css('display', 'none');
})
contain.slider({
    img: ['./img/1.jpg', './img/2.jpg', './img/3.jpg'],
    speed: 3000,
})