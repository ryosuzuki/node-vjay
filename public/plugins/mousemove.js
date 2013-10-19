$.function move_sub() {
  mouseX = event.x;
  mouseY = event.y;

  console.log(mouseX);
  console.log(mouseY);

  if (press1 && pressedShift) {
    if (event.x > 0) maskX1[maskFocus] = event.x;
    if (event.y > 0) maskY1[maskFocus] = event.y;
  }
  //if (press2 && pressedShift) {                                                                                                            
  if (press2 && pressedShift) {
    if (event.x > 0) maskX2[maskFocus] = event.x;
    if (event.y > 0) maskY2[maskFocus] = event.y;
  }
  if (press3 && pressedShift) {
    if (event.x > 0) maskX3[maskFocus] = event.x;
    if (event.y > 0) maskY3[maskFocus] = event.y;
  }
  if (press4 && pressedShift) {
    if (event.x > 0) maskX4[maskFocus] = event.x;
    if (event.y > 0) maskY4[maskFocus] = event.y;
  }
}
