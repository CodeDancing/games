// 自调用函数---食物
(function(){
    //定义一个数组，存储产生的div
    var element=[];
    //自定义构造函数，创建食物对象
    function Food(width,height,color,x,y,) {
        this.width=width||20;
        this.height=height||20;
        this.color=color||"red";
        this.x=x||0;
        this.y=y||0;
    }
    //初始化食物,因为需要在地图上生成，故需传入参数map
    Food.prototype.init=function (map) {
        remove();
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
        element.push(div);
    };
    //删除食物函数
    function remove(){
        for(var i=0;i<element.length;i++){
            var ele=element[i];
            ele.parentNode.removeChild(ele);//通过食物找到其父元素，再将食物删除
            //在数组中将其删除
            element.splice(i,1);
        }
    }
    //将Food暴露给window
    window.Food=Food;
}());

//自调用函数---小蛇
(function(){
    //构造函数，创建小蛇
    var scroe=0;  //统计分数
    var element=[];//创建数组，存放小蛇
    function Snake(width,height,direction) {
        //小蛇每部分的宽
        this.width=width||20;
        this.height=height||20;
        this.direction=direction||"right";
        this.body=[
            {x:3,y:2,color:"yellow"},//头
            {x:2,y:2,color:"green"},
            {x:1,y:2,color:"green"}//尾部
        ]
    }
    //小蛇的初始化
    Snake.prototype.init=function (map) {
        remove();
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
            element.push(div);
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
            scroe++;
            document.getElementById("score").innerText=scroe+"分";
            console.log(scroe);
            food.init(map);//删掉现有的食物，重新产生食物
        }
    };

    //s删除小蛇函数
    function remove(){
        var i=element.length-1;
        for(;i>=0;i--){
            var ele=element[i];
            ele.parentNode.removeChild(ele);
            element.splice(i,1);
        }
    }
    window.Snake=Snake;
}());
// //自调用函数--计分器
// (function(){
//
// }())
//自调用函数---游戏
(function () {
    function Game(map){
        this.food=new Food();
        this.snake=new Snake();
        this.map=map;
        that=this;
    }
    //初始化游戏，显示小蛇和食物
    Game.prototype.init=function () {
        this.food.init(this.map);
        this.snake.init(this.map);
        this.runSnake(this.food,this.map);
        this.bindkey();
    };

    //让蛇跑起来
    Game.prototype.runSnake=function(food,map){
        var timeId=setInterval(function () {
            this.snake.move(food,map);
            this.snake.init(map);//这两次调用，就能让蛇跑起来了

            //下面判断蛇是否碰到墙
            var MaxX=this.map.offsetWidth/this.snake.width;
            var MaxY=this.map.offsetHeight/this.snake.height;

            var headX=this.snake.body[0].x;
            var headY=this.snake.body[0].y;

            if (headY<0||headY>=MaxY){
                clearInterval(timeId);
                alert("游戏结束");
            }
            if(headX<0||headX>=MaxX){
                clearInterval(timeId);
                alert("游戏结束");
            }
        }.bind(that),150);
    };

    //添加原型对象---改变蛇运动的方向
    Game.prototype.bindkey=function(){
        document.addEventListener("keydown",function (e) {
            switch (e.keyCode){
                case 37:this.snake.direction="left";break;
                case 38:this.snake.direction="top";break;
                case 39:this.snake.direction="right";break;
                case 40:this.snake.direction="bottom";break;
            }
        }.bind(that),false);
    };
    window.Game=Game;
}());
//测试
var game=new Game(document.querySelector(".map"));
game.init();
