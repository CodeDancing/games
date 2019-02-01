function Medusa(){}
var element = [];
Medusa.prototype.create = function(width,height,direction){
    this.width = width || 20;
    this.height = height || 20;
    this.direction = direction || "right";
    this.body = [
        {x:3, y:2, color:"yellow"}, //head
        {x:2, y:2, color:"white"},
        {x:1, y:2, color:"white"} //tail
    ]
}
Medusa.prototype.init = function(map){
    this.remove();
    for(var i = 0; i < this.body.length;i++){
        var obj = this.body[i];
        var div = document.createElement("div");
        map.appendChild(div);
        div.style.width = this.width+"px";
        div.style.height = this.height+"px";
        div.style.backgroundColor = obj.color;
        div.style.position = "absolute";
        div.style.left = obj.x * this.width + "px";
        div.style.top = obj.y * this.height + "px";
        element.push(div);
    }
}
Medusa.prototype.remove = function(){
    var i = element.length - 1;
    for(; i>=0; i--){
        var ele = element[i];
        ele.parentNode.removeChild(ele);
        element.splice(i,1);
    }
}
Medusa.prototype.move = function(){
    var i = this.body.length-1;
    for(; i > 0; i--){
        this.body[i].x = this.body[i-1].x;
        this.body[i].y = this.body[i-1].y;
    }
    switch (this.direction){
        case "right": this.body[0].x += 1; break;
        case "left": this.body[0].x -= 1;break;
        case "top": this.body[0].y -= 1;break;
        case "bottom": this.body[0].y += 1;break;
    }
}
window.Medusa = Medusa;

function Game() {}
Game.prototype.create = function(map){
    this.snake = (new Medusa()).create();
    this.map = map;
    that = this;
}
Game.prototype.init = function(map){
    this.snake.init(this.map);
    this.run(this.map);
    this.bindkey();
}
Game.prototype.run = function(map){
    var timeId=setInterval(function () {
        this.snake.move(map);
        this.snake.init(map);//这两次调用，就能让蛇跑起来了
        //下面判断蛇是否碰到墙
        var MaxX = this.map.offsetWidth / this.snake.width;
        var MaxY = this.map.offsetHeight / this.snake.height;
        var headX = this.snake.body[0].x;
        var headY = this.snake.body[0].y;

        if (headY < 0 || headY >= MaxY){
            clearInterval(timeId);
            alert("游戏结束");
        }
        if(headX < 0||headX >= MaxX){
            clearInterval(timeId);
            alert("游戏结束");
        }
    }.bind(that),150);
}

//添加原型对象---改变蛇运动的方向
Game.prototype.bindkey = function(){
    document.addEventListener("keydown", function (e) {
        switch (e.keyCode){
            case 37:this.snake.direction = "left"; break;
            case 38:this.snake.direction = "top"; break;
            case 39:this.snake.direction = "right"; break;
            case 40:this.snake.direction = "bottom"; break;
        }
    }.bind(that),false);
};

window.Game = Game;

var game = (new Game).create(document.querySelector(".map"));
game.init();
