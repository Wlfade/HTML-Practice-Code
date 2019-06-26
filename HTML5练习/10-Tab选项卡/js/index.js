function $(id) {
    //类型的比较
    return typeof id === 'string' ? document.getElementById(id) : id;
};

//网网页加载完毕时调用
window.onload = function() {
    //拿到所有的li标签和对应的内容
    var lis = $('tab-header').getElementsByTagName('li');
    var contents = $('tab-content').getElementsByClassName('dom');
    // console.log(lis, contents);


    //验证
    if (lis.length !== contents.length) return;

    //遍历 header 的li
    for (var i = 0; i < lis.length; i++) {
        //取出每一个li标签
        var li = lis[i];
        // console.log(li);
        li.id = i;
        console.log(li);

        //监听鼠标在li上面的移动
        li.onmousemove = function() {

            for (var j = 0; j < lis.length; j++) {
                //让所有的li标签都不被选中
                lis[j].className = '';
                contents[j].style.display = 'none';

            }
            //设置当前对象的className
            this.className = 'selected';
            contents[this.id].style.display = 'block';
        }
    }

}