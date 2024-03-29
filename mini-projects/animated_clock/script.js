// console.log('welcome to animated clock')

const canvas = document.getElementById("canvas");
const faceColor = document.getElementById('face-color')
const borderColor = document.getElementById('border-color')
const lineColor = document.getElementById('line-color')
const largeHandColor = document.getElementById('large-hands-color')
const secondHandColor = document.getElementById('second-hand-color')

function clock() {
  const now = new Date();
  // To get context from canvas
  const ctx = canvas.getContext("2d");

  // setup canvas
  ctx.save(); // save the default state

  ctx.clearRect(0, 0, 500, 500); // clear the whole rectangle ---(to start... x, y axis, width and height... to span)

  // we want the clock in the middle of the canvas
  ctx.translate(250, 250); // puts the 0, 0 in the middle

  // rotate the clock by -90 degrees
  ctx.rotate(-(Math.PI / 2));

  // set def styles
  ctx.strokeStyle = "#000000"; //---> Line Colors
  ctx.fillStyle = "#f4f4f4"; //--->
  ctx.lineWidth = 5;
  ctx.lineCap = "round"; //--->makes the end of the line rounded

  // draw clock face/border
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = borderColor.value;
  ctx.fillStyle = faceColor.value
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke(); // Draws the circle
  ctx.fill();

  ctx.restore();

  // draw hour lines
  ctx.save();
  ctx.strokeStyle = lineColor.value
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();

  // draw minute lines
  ctx.save();
  ctx.strokeStyle = lineColor.value
  ctx.lineWidth = 4;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(117, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  // get the current time
  const hr = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();

  console.log(`${hr}:${min}:${sec}`)

  // draw hour hand
  ctx.save()
  ctx.rotate((Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec)
  ctx.strokeStyle = largeHandColor.value
  ctx.lineWidth = 14;
  ctx.beginPath()
  ctx.moveTo(-20, 0)
  ctx.lineTo(80, 0)
  ctx.stroke()

  ctx.restore()

  // draw minute hand
  ctx.save()
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec)
  ctx.strokeStyle = largeHandColor.value
  ctx.lineWidth = 10;
  ctx.beginPath()
  ctx.moveTo(-28, 0)
  ctx.lineTo(112, 0)
  ctx.stroke()

  ctx.restore()

  // draw minute hand
  ctx.save()
  ctx.rotate(sec * (Math.PI / 30) )
  ctx.strokeStyle = secondHandColor.value
  ctx.fillStyle = '#ff7f50'
  ctx.lineWidth = 6;
  ctx.beginPath()
  ctx.moveTo(-30, 0)
  ctx.lineTo(100, 0)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true)
  ctx.fill()

  ctx.restore()

  ctx.restore(); // restore the default state

  requestAnimationFrame(clock)
}
requestAnimationFrame(clock);

document.getElementById('save-btn').addEventListener('click', ()=>{
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a')
  link.download = 'clock.png'
  link.href = dataURL;
  link.click()
})