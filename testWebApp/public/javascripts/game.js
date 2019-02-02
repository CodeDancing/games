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