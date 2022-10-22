let helper = {}

function init() {
  helper.circleX = 400;
  helper.circleY = 400;
  helper.radius = 200;
  helper.element = document.getElementById("mainCanvas");
  helper.context = helper.element.getContext("2d");
  helper.element.addEventListener('pointermove', (event) => {
    bbox = helper.element.getBoundingClientRect();
    centerX = event.x - bbox.left - helper.circleX;
    centerY = event.y - bbox.top - helper.circleY;
    helper.pointerAngle = Math.atan2(-centerY, centerX) + (Math.PI / 2);
    draw();
  });
  draw();
}

function draw() {
  helper.context.clearRect(0, 0, helper.element.width, helper.element.height);
  drawCircle(helper.context);
  drawLine(helper.context);
}

function drawLine(ctx) {
  let pointerX = helper.radius * Math.sin(helper.pointerAngle);
  let pointerY = helper.radius * Math.cos(helper.pointerAngle);
  ctx.beginPath();
  ctx.moveTo(helper.circleX, helper.circleY);
  ctx.lineTo(helper.circleX + pointerX, helper.circleY + pointerY);
  ctx.stroke();
}

function drawCircle(ctx) {
  ctx.lineStyle = "black";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(helper.circleX, helper.circleY, helper.radius, 0, 2*Math.PI);
  ctx.stroke();
}

function update(event) {
  event.x;
  event.y;
}

init()
