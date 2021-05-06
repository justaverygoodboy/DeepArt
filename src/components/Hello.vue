<template>
    <div id="welcome">
        <canvas id="myCanvas" style="background: linear-gradient(40deg,#e66465, #5000BE)"></canvas>
    </div>
</template>
<script>
export default {
    name: 'Hello',
mounted(){
	let context = this.getCanvas();
	document.getElementById('welcome').style.backgroundImage = 'url("' + context.canvas.toDataURL() + '")';
},
methods:{
      getCanvas(){
        var canvas = document.getElementById("myCanvas")
        canvas.width = document.documentElement.clientWidth/1.7
        canvas.height = document.documentElement.clientHeight*1.9
        var ctx = canvas.getContext("2d")
        var colors = ['#e66465','#5000BE','#d97642']
        function Ball() {
          this.x = randomNum(3, canvas.width - 3)
          this.y = randomNum(3, canvas.height - 3)
          this.r = randomNum(1, 10)
          this.color = colors[Math.round(Math.random()*3)]     
          this.speedX = randomNum(-3, 3) * 0.2
          this.speedY = randomNum(-3, 3) * 0.2
        }
        Ball.prototype = {
          draw: function () {
            ctx.beginPath()
            ctx.globalAlpha = 1;
            ctx.fillStyle = this.color
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
            ctx.fill()
          },
          move: function () {
            this.x += this.speedX
            this.y += this.speedY
            if (this.x <= 3 || this.x > canvas.width - 3) {
              this.speedX *= -1
            }
            if (this.y <= 3 || this.y >= canvas.height - 3) {
              this.speedY *= -1
            }
          }
        };
        var balls = []
        for (var i = 0; i < 150; i++) {
          var ball = new Ball()
          balls.push(ball)
        }
        main();
        function main() {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          mouseLine();
          drawLine();
          window.requestAnimationFrame(main)
        }
        var mouseX;
        var mouseY;
        canvas.onmousemove = function (e) {
          var ev = event || e;
          mouseX = ev.offsetX;
          mouseY = ev.offsetY;
        }
        function drawLine() {
          for (var i = 0; i < balls.length; i++) {
            balls[i].draw();
            balls[i].move();
            for (var j = 0; j < balls.length; j++) {
              if (i != j) {
                if (Math.sqrt(Math.pow((balls[i].x - balls[j].x), 2) + Math.pow((balls[i].y - balls[j].y), 2)) < 80) {
                  ctx.beginPath();
                  ctx.moveTo(balls[i].x, balls[i].y);
                  ctx.lineTo(balls[j].x, balls[j].y);
                  ctx.strokeStyle = "white";
                  ctx.globalAlpha = 0.2;
                  ctx.stroke();
                }
              }
            }
          }
        }
        function mouseLine() {
          for (var i = 0; i < balls.length; i++) {
            if (Math.sqrt(Math.pow((balls[i].x - mouseX), 2) + Math.pow((balls[i].y - mouseY), 2)) < 80) {
              ctx.beginPath()
              ctx.moveTo(balls[i].x, balls[i].y)
              ctx.lineTo(mouseX, mouseY)
              ctx.strokeStyle = "white"
              ctx.globalAlpha = 0.8
              ctx.stroke();
            }
          }
        }
        function randomNum(m, n) {
          return Math.floor(Math.random() * (n - m + 1) + m)
        }
      }
}
}
</script>
