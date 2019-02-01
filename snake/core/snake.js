//自调用函数---小蛇
//构造函数，创建小蛇
function Snake(width,height,direction) {
    //小蛇每部分的宽
    this.width=width||20;
    this.height=height||20;
    this.direction=direction||"right";
    this.body=[
        {x:3,y:2,color:"yellow"},//头
        {x:2,y:2,color:"green"},
        {x:1,y:2,color:"green"}//尾部
    ];
    this.element = [];
    this.score = 0;
}
//小蛇的初始化
Snake.prototype.init=function (map) {
    this.remove();
    for(var i=0;i<this.body.length;i++){
        var obj=this.body[i];
        var div=document.createElement("div");
        map.appendChild(div);
        div.style.width=this.width+"px";
        div.style.height=this.height+"px";
        div.style.backgroundColor=obj.color;
        div.style.position="absolute";
        div.style.left=obj.x*this.width+"px";
        div.style.top=obj.y*this.height+"px";
        this.element.push(div);
    }
};
//为原型添加函数---让小蛇动起来
Snake.prototype.move=function(food,map){
    var i=this.body.length-1;  //让蛇的身体动起来
    for(;i>0;i--){
        this.body[i].x=this.body[i-1].x;
        this.body[i].y=this.body[i-1].y;
    }
    switch (this.direction){
        case "right":this.body[0].x+=1;break;
        case "left":this.body[0].x-=1;break;
        case "top":this.body[0].y-=1;break;
        case "bottom":this.body[0].y+=1;break;
    }
    //判断小蛇是否碰到食物
    var headX=this.body[0].x*this.width;
    var headY=this.body[0].y*this.height;
    if (headX==food.x&&headY==food.y){
        var last=this.body[this.body.length-1];
        this.body.push({
            x:last.x,
            y:last.y,
            color:last.color
        });
        this.score++;
        document.getElementById("score").innerText = this.score+"分";
        console.log(this.score);
        food.init(map);//删掉现有的食物，重新产生食物
    }
};

//s删除小蛇函数
Snake.prototype.remove = function () {
    var i = this.element.length-1;
    for(; i >= 0; i--){
        var ele = this.element[i];
        ele.parentNode.removeChild(ele);
        this.element.splice(i,1);
    }
}
window.Snake=Snake;