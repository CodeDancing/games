// 自调用函数---食物
//定义一个数组，存储产生的div
//自定义构造函数，创建食物对象
function Food(width,height,color,x,y,) {
    this.width=width||20;
    this.height=height||20;
    this.color=color||"red";
    this.x=x||0;
    this.y=y||0;
    this.element=[]
}
//初始化食物,因为需要在地图上生成，故需传入参数map
Food.prototype.init=function (map) {
    this.remove();
    var div=document.createElement("div");
    map.appendChild(div);
    div.style.width=this.width+"px";
    div.style.height=this.height+"px";
    div.style.backgroundColor=this.color;
    div.style.position="absolute";
    //产生随机坐标
    this.x=parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
    this.y=parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
    div.style.left=this.x+"px";
    div.style.top=this.y+"px";
    this.element.push(div);
};
//删除食物函数
Food.prototype.remove=function(){
    for(var i=0;i<this.element.length;i++){
        var ele=this.element[i];
        ele.parentNode.removeChild(ele);//通过食物找到其父元素，再将食物删除
        //在数组中将其删除
        this.element.splice(i,1);
    }
}
//将Food暴露给window
window.Food=Food;
