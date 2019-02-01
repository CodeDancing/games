// window 是全集对象
//自调用函数---小蛇
// (function(){
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
    Snake.prototype.move=function(map){
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
// }());

//自调用函数---游戏
(function () {
    function Game(map){
        this.snake=new Snake();
        this.map=map;
        that=this;
    }
    //初始化游戏，显示小蛇和食物
    Game.prototype.init=function () {
        this.snake.init(this.map);
        this.runSnake(this.map);
        this.bindkey();
    };

    //让蛇跑起来
    Game.prototype.runSnake=function(map){
        var timeId=setInterval(function () {
            this.snake.move(map);
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

var game=new Game(document.querySelector(".map"));
game.init();