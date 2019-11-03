(function() {
    //拓展一个轮播图插件
    $.fn.extend({
            slider: function(options) {
                options.wrap = this;
                new oslider(options);
            }
        })
        //轮播图构造函数
    function oslider(options) {
        this.wrap = options.wrap;
        this.img = options.img;
        this.imgLength = this.img.length;
        this.width = options.width || parseInt(this.wrap.css('width'));
        this.height = options.height || $(this.wrap).height();
        this.imgwidth = options.imgwidth || this.width;
        this.isAuto = options.isAuto || true;
        this.direction = options.direction || 'left';
        this.speed = options.speed || 2000;
        this.type = options.type || 'animate';
        this.createDom();
        this.initStyle();
        this.bindEvent();
        this.autoMove();
        this.pic = 0;
        this.flag = false;
        //以上是轮播图必备的一些属性个方法，每次构造都生成一个独一无二的对象

    }
    //生成结构用与存放图片
    oslider.prototype.createDom = function() {
            var oul = $('<ul class = "ulWrapper"></ul>');
            var ospot = $('<div class = "spot"></div>');
            var imgNum = Math.floor(this.width / this.imgwidth); //imgNum指的是一个li标签可以展示的图片数
            var liNum = this.imgLength / imgNum; //liNum指的是一共可以有多少个li
            if (imgNum > 1) { //imgNum > 0说明是一个li里面有多张图片一起轮播
                for (var i = 0; i < liNum; i++) {
                    var ospan = $('<span class = "innerSpot"></span>'); //生成小圆点
                    ospan.appendTo(ospot);
                }
                var oa = ''; //oa用于存放a标签
                this.img.forEach(function(ele, index) {
                    oa += '<a href = "#"><img src = "' + ele + '"></a>';
                    if ((index + 1) % imgNum == 0) { //判断当前oa中的img数量是否等于可以存放的img数量，如果等于则把他插入到li中；
                        var oli = $('<li class = "liWrapper"></li>');
                        $(oa).appendTo(oli);
                        oli.appendTo(oul);
                        oa = '';
                    }
                })

                if (this.type == 'animate') {
                    this.img.forEach(function(ele, index) { //如果运动类型为animate则要多加一个li;
                        oa += '<a href = "#"><img src = "' + ele + '"></a>';
                        if (index + 1 == imgNum) { //将所有图片中靠前的imgNum张图片取出来插入到li中；
                            var newli = $('<li class = "liWrapper"></li>');
                            $(oa).appendTo(newli);
                            newli.appendTo(oul);
                            return true;
                        }
                    })


                }

            } else { //如果不是一页多张图片一起轮播的话就正常生成ul li结构
                this.img.forEach(function(ele, index) {
                    var oli = $('<li class = "liWrapper"><a href = "#"><img src = "' + ele + '"></a></li>');
                    var ospan = $('<span class = "innerSpot"></span>');
                    oli.appendTo(oul);
                    ospan.appendTo(ospot);
                })
                if (this.type == 'animate') {
                    var newli = $('<li class = "liWrapper"><a href = "#"><img src = "' + this.img[0] + '"></a></li>');
                    newli.appendTo(oul);
                }

            }

            oul.appendTo($(this.wrap));
            ospot.appendTo($(this.wrap));
            $('.spot .innerSpot', this.wrap).eq(0).css({ backgroundColor: 'red' });
            var leftArrow = $('<div class = "leftArrow">&lt</div>');
            var rightArrow = $('<div class = "rightArrow">&gt</div>');
            leftArrow.appendTo($(this.wrap));
            rightArrow.appendTo($(this.wrap));


        }
        //样式函数
    oslider.prototype.initStyle = function() {
        $(this.wrap).css({
            // overflow:'hidden',
            position: 'relative'
        })
        $('.ulWrapper', this.wrap)
            .css({
                listStyle: 'none',
                width: this.type == 'animate' ? $('.liWrapper', this.wrap).length * this.width : this.width,
                height: this.height,
                position: 'absolute',
                left: 0
            })
        $('.ulWrapper .liWrapper', this.wrap)
            .css({
                float: 'left',
                width: this.width,
                height: this.height

            })
        $('.ulWrapper .liWrapper a,.ulWrapper .liWrapper a img', this.wrap)
            .css({
                display: 'inline-block',
                width: this.imgwidth,
                height: this.height,
                borderRight: this.imgwidth == this.width ? 'null' : '1px solid #c1b4b4'

            })



        if (this.type == 'fade') {

            $('.ulWrapper li', this.wrap).css({
                // float: "auto",
                position: "absolute",
                display: 'none',
            }).eq(0).css({
                display: 'block',
            });
        }
        $('.spot', this.wrap).css({
            position: 'absolute',
            left: '50%',
            marginLeft: (-16 * this.imgLength) / 2 + 'px',
            bottom: 0
        })
        $('.spot .innerSpot', this.wrap).css({
            display: 'inline-block',
            width: 10,
            height: 10,
            margin: '3px',
            borderRadius: '50%',
            // border: '1px solid black',
            cursor: 'pointer',
            backgroundColor: '#fff',
        })
        $('.spot .innerSpot', this.wrap).eq(0).css({
            backgroundColor: 'red',
        })
        $('.leftArrow ,.rightArrow', this.wrap).css({
            position: 'absolute',
            background: '#d2c9c9',
            top: '50%',
            marginTop: -15,
            width: 40,
            height: 30,
            textAlign: 'center',
            opacity: 0.5,
            lineHeight: '30px',
            cursor: 'pointer'
        })
        $('.rightArrow', this.wrap).css({
            right: 0
        })



    }

    oslider.prototype.bindEvent = function() {
        var self = this;
        var conWidth = parseInt(self.wrap.css('width'));
        //监测窗口变化函数;用于适应响应式布局。
        $(window).resize(function() {
            // console.log(111)
            self.width = parseInt(self.wrap.css('width'));
            self.height = parseInt(self.wrap.css('height'));
            // console.log(self.width, self.height);
            $('.ulWrapper', self.wrap)
                .css({
                    listStyle: 'none',
                    width: self.type == 'animate' ? $('.liWrapper', self.wrap).length * self.width : self.width,
                    height: self.height,
                    position: 'absolute',
                    left: -self.width * self.pic
                })
            $('.ulWrapper .liWrapper', self.wrap)
                .css({
                    float: 'left',
                    width: self.width,
                    height: self.height

                })
            $('.ulWrapper .liWrapper a,.ulWrapper .liWrapper a img', self.wrap)
                .css({
                    display: 'inline-block',
                    width: self.width,
                    height: self.height,
                    borderRight: self.imgwidth == self.width ? 'null' : '1px solid #c1b4b4'

                })
                //当窗口停止变化时，让轮播图继续运动。
            var conTimer = setInterval(function() {
                clearInterval(self.timer);
                if (self.width == conWidth) {
                    self.autoMove();
                    clearInterval(conTimer);
                } else {
                    conWidth = self.width;
                }
            }, 100)

        })

        $('.leftArrow', this.wrap).on('click', function() {
            self.move('prev');
        });
        $('.rightArrow', this.wrap).on('click', function() {
            self.move('next');
        });
        $('.spot .innerSpot', this.wrap).on('click', function() {
            self.move($(this).index())
        });
        $(this.wrap).on('mouseenter', function() {
            clearInterval(self.timer);
        }).on('mouseleave', function() {
            self.autoMove();
        });

    }

    oslider.prototype.move = function(dir) {
        var self = this;

        if (this.flag) {
            return false;
        }
        this.flag = true;
        switch (dir) {
            case 'prev':
                if (this.type == 'animate') {
                    if (self.pic == 0) {
                        $('.ulWrapper', this.wrap).css({ left: -($('.liWrapper', self.wrap).length - 1) * self.width });
                        self.pic = $('.liWrapper', this.wrap).length - 2;

                    } else {
                        self.pic--;
                    }
                } else if (this.type == 'fade') {
                    if (self.pic == 0) {
                        self.pic = $('.liWrapper', this.wrap).length - 1;

                    } else {
                        self.pic--;

                    }
                }
                break;
            case 'next':
                if (this.type == 'animate') {
                    if (self.pic == $('.liWrapper', this.wrap).length - 1) {
                        $('.ulWrapper', this.wrap).css({ left: 0 });
                        self.pic = 1;
                    } else {
                        self.pic++;
                    }
                } else if (this.type == 'fade') {
                    if (self.pic == $('.liWrapper', this.wrap).length - 1) {
                        self.pic = 0;

                    } else {
                        self.pic++;

                    }
                }
                break;
            default:
                this.pic = dir;
                break;


        }
        if (this.type == 'animate') {
            $('.ulWrapper', this.wrap).animate({
                left: -self.pic * self.width
            }, 'swing', function() {
                self.flag = false;
            })
        } else if (this.type == 'fade') {
            $('.ulWrapper li', this.wrap).fadeOut().eq(self.pic).fadeIn(1000, function() {
                self.flag = false;
            })
        }
        $('.spot .innerSpot', this.wrap).css({ backgroundColor: '#fff' }).eq(this.type == 'animate' ? self.pic % ($('.liWrapper', this.wrap).length - 1) : self.pic % ($('.liWrapper', this.wrap).length)).css({
            backgroundColor: 'red'
        })
    }

    oslider.prototype.autoMove = function() {
        var self = this;
        if (this.isAuto) {
            this.timer = setInterval(function() {
                $('.rightArrow', self.wrap).trigger('click')
            }, self.speed)

        }
    }

}())