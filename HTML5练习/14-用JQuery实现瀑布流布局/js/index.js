//当页面加载完毕
// window.onload = function() {
//     //1.实现瀑布流布局
//     waterFall();

//     // 2.滚动加载
//     $(wid)
// }
$(window).on('load', function() {
    //1.实现瀑布流布局
    waterFall();

    // 2.滚动加载
    $(window).on('scroll', function() {
        //是否加载
        if (checkWillLoad()) {
            //造数据
            var data = {
                    'dataImg': [
                        { 'img': 'cat-image-01.jpg' },
                        { 'img': 'cat-image-02.jpg' },
                        { 'img': 'cat-image-03.jpg' },
                        { 'img': 'cat-image-04.jpg' },
                        { 'img': 'cat-image-05.jpg' },
                        { 'img': 'cat-image-06.jpg' },
                        { 'img': 'cat-image-07.jpg' },
                        { 'img': 'cat-image-08.jpg' },
                        { 'img': 'cat-image-09.jpg' },
                        { 'img': 'cat-image-10.jpg' }
                    ]
                }
                //遍历创建盒子
            $.each(data.dataImg, function(index, value) {
                var newbox = $('<div>').addClass('box').appendTo($('#main'));
                var newPic = $('<div>').addClass('pic').appendTo($(newbox));
                $('<img>').attr('src', 'images/' + $(value).attr('img')).appendTo($(newPic));
            });
            //瀑布流布局
            waterFall();
        }
    })
});

//1.实现瀑布流布局
function waterFall() {
    //拿到所有的盒子
    var allBox = $('#main>.box');
    //取出其中一个盒子的宽度
    var boxWidth = $(allBox).eq(0).outerWidth();
    //取出屏幕的宽度
    var screenWidth = $(window).width();
    //求出列数
    var cols = Math.floor(screenWidth / boxWidth);
    //父标签居中
    $('#main').css({
        'width': cols * boxWidth + 'px',
        'margin': '0 auto'
    });
    //对子盒子定位
    var heightArr = [];
    // 遍历
    $.each(allBox, function(index, value) {
        //取出单独盒子的高度
        var boxHeight = $(value).outerHeight();
        if (index < cols) {
            //第一行 盒子
            heightArr[index] = boxHeight;
        } else {
            //剩余的行的盒子
            //取出高度数组中最矮的高度
            var minBoxHeight = Math.min.apply(null, heightArr);
            //取出最矮高度对应的索引
            var minBoxIndex = $.inArray(minBoxHeight, heightArr);
            // 定位
            $(value).css({
                'position': 'absolute',
                'top': minBoxHeight + 'px',
                'left': minBoxIndex * boxWidth + 'px'
            });
            //更新数组中最矮的高度
            heightArr[minBoxIndex] += boxHeight;
        }
    });
}

// 设置滚动的条件
function checkWillLoad() {
    console.log('checkWillLoad');

    //拿到最后一个盒子
    var lastBox = $('#main>div').last();
    //取出最后一个盒子高度的一半 + 头部偏离位置
    var lastBoxDis = $(lastBox).outerHeight() + $(lastBox).offset().top;
    //求出浏览器的高度
    var clientHeight = $(window).height();
    //求出页面的偏离浏览器的高度
    var scrollTopHeight = $(window).scrollTop();

    //比较返回
    return lastBoxDis <= clientHeight + scrollTopHeight;
}