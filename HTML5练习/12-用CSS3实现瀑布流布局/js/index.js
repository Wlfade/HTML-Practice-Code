function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : id;
}

// 当网页加载完毕
window.onload = function() {
    //瀑布流布局
    waterFall('main', 'box');
    // 滚动加载盒子
    window.onscroll = function() {
        // 条件
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
                //加载数据
            for (var i = 0; i < data.dataImg.length; i++) {
                //创建最外面的盒子
                var newbox = document.createElement('div');
                newbox.className = 'box';

                $('main').appendChild(newbox);
                // 创建里面的盒子
                var newPic = document.createElement('div');
                newPic.className = 'pic';
                newbox.appendChild(newPic);

                //创建img
                var img = document.createElement('img');
                img.src = 'images/' + data.dataImg[i].img;
                img.alt = '猫猫';
                newPic.appendChild(img);
            }
            //瀑布流布局
            waterFall('main', 'box');
        }
    }
}

// 实现瀑布流布局
function waterFall(parent, box) {
    //---父盒子居中
    //1.1 拿到所有的子盒子
    var allBox = $(parent).getElementsByClassName(box);

    //1.2 求出盒子的宽度
    var boxWidth = allBox[0].offsetWidth;

    //1.3浏览器的宽度
    var screenWidth = document.body.offsetWidth;

    //1.4求出列数 math floor 向下取整
    var cols = Math.floor(screenWidth / boxWidth);

    //1.5父标签居中
    $(parent).style.width = boxWidth * cols + 'px';
    $(parent).style.margin = '0 auto';


    // ---子盒子定位
    //1.1高度数组
    var heightArr = [];
    //1.2 遍历所有的盒子
    for (var i = 0; i < allBox.length; i++) {
        // 1.2.1 求出单独的盒子的高度
        var boxHeight = allBox[i].offsetHeight;
        if (i < cols) {
            heightArr.push(boxHeight);
        } else { //需要定位的盒子
            //1.2.1 求出最矮盒子的高度
            var minBoxHeight = Math.min.apply(this, heightArr);

            //1.2.2 求出最矮盒子对应的索引
            var minBoxIndex = getMinBoxIndex(minBoxHeight, heightArr);

            //1.2.3 盒子定位
            allBox[i].style.position = 'absolute';
            allBox[i].style.top = minBoxHeight + 'px';
            allBox[i].style.left = minBoxIndex * boxWidth + 'px';

            //1.2.4 更新数组中最矮盒子的高度
            heightArr[minBoxIndex] += boxHeight;
        }
    }
    console.log(heightArr);
}

// 取出数组中最矮盒子对应的索引
function getMinBoxIndex(val, arr) {
    for (var i in arr) {
        if (val == arr[i]) return i;
    }
}

//判断是否符合条件
function checkWillLoad() {
    // 取出所有的盒子
    var allBox = $('main').getElementsByClassName('box');

    // 取出最后一个盒子
    var lastBox = allBox[allBox.length - 1];

    //求出最后一个盒子高度的一半 + 头部偏离位置
    var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;

    //求出浏览器高度 标准模式 和 混杂模式
    var screenHeight = document.body.clientHeight || document.documentElement.clientHeight;

    //求出页面偏离屏幕的高度 解答:https://blog.csdn.net/sleepwalker_1992/article/details/80677845
    var scrollTopHeight = document.body.scrollTop || document.documentElement.scrollTop;

    console.log(lastBoxDis, screenHeight, scrollTopHeight);
    //判断
    return lastBoxDis <= screenHeight + scrollTopHeight;
}