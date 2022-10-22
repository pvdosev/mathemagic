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
  drawLines(helper.context);
}

function drawLines(ctx) {
  ctx.beginPath();
  ctx.lineStyle = "black";
  ctx.lineWidth = 1;
  ctx.moveTo(helper.circleX, helper.circleY - helper.radius - 20);
  ctx.lineTo(helper.circleX, helper.circleY + helper.radius + 20);
  ctx.moveTo(helper.circleX - helper.radius - 20, helper.circleY);
  ctx.lineTo(helper.circleX + helper.radius + 20, helper.circleY);
  ctx.stroke();
  ctx.closePath();

  let pointerSine = Math.sin(helper.pointerAngle);
  let pointerCosine = Math.cos(helper.pointerAngle);
  let pointerX = helper.radius * pointerSine;
  let pointerY = helper.radius * pointerCosine;
  ctx.beginPath();
  ctx.lineStyle = "black";
  ctx.fillStyle = "black";
  ctx.moveTo(helper.circleX, helper.circleY);
  ctx.lineTo(helper.circleX + pointerX, helper.circleY + pointerY);
  ctx.stroke();
  drawLabeledLine(ctx, helper.circleX,
                  helper.circleY,
                  helper.circleX + pointerX,
                  helper.circleY,
                  "darkblue",
                  -15,
                  roundUp(pointerCosine, 3)
                  );
   drawLabeledLine(ctx, helper.circleX + pointerX,
                  helper.circleY,
                  helper.circleX + pointerX,
                  helper.circleY + pointerY,
                  "darkred",
                  -15,
                  roundUp(pointerSine, 3)
                  );
}

function drawLabeledLine(ctx, startX, startY, endX, endY, color, textOffset, text) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.closePath();
  ctx.font = "20px Arial";
  ctx.miterLimit = 2;
  ctx.lineJoin = "circle";
  ctx.lineWidth = 1;
  ctx.strokeText(text, endX / 1.5, endY + textOffset);
  //ctx.fillText(text, startX + (endX / 2), startY + (endY / 2) + textOffset);
}

function drawCircle(ctx) {
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.lineStyle = "black";
  ctx.fillStyle = "black";
  ctx.arc(helper.circleX, helper.circleY, helper.radius, 0, 2*Math.PI);
  ctx.stroke();
}

function roundUp(num, precision) {
  precision = Math.pow(10, precision)
  return Math.ceil(num * precision) / precision
}


init()
