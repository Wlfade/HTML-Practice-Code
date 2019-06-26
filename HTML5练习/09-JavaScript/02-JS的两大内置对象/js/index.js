// js的CRUD

//增
document.write('hello world');

//拿到div
var main = document.getElementById('main');
//1.1创建一个图像标签
var image = document.createElement('img');
image.src = 'image/face-01.png';
//1.2 添加
main.appendChild(image);

//删除
image.remove();

//改
image.src = 'image/face-02.png';

//查
//getElementBy... 四种方式

console.log(main.childNodes);