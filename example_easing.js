const ease = new p5.Ease();

function draw_one_frame(cur_frac) {
  let going_right = true;
  let amount_across = 0;
  if (cur_frac < 0.5) {
    going_right = true;
    amount_across = cur_frac * 2;
  }
  else {
    going_right = false;
    amount_across = (cur_frac-0.5) * 2;
  }

  let ellipse_radius = int(0.08*height);

  const left_x = int(0.15 * width);
  const right_x = int(0.85 * width);

  line(left_x - ellipse_radius, 0, left_x - ellipse_radius, height);
  line(right_x + ellipse_radius, 0, right_x + ellipse_radius, height);

  const ease_amount_across = ease.circularInOut(amount_across); // OK
  // try these other versions or look up others in the docs
  // const ease_amount_across = ease.doubleCircularOgee(amount_across, 0.5);
  // const ease_amount_across = ease.bounceOut(amount_across, 10);
  // print(amount_across, ease_amount_across);

  if(going_right) {
    cur_x1 = map(amount_across, 0, 1, left_x, right_x);
    cur_x2 = map(ease_amount_across, 0, 1, left_x, right_x);
  }
  else {
    cur_x1 = map(amount_across, 0, 1, right_x, left_x)
    cur_x2 = map(ease_amount_across, 0, 1, right_x, left_x)
  }

  // draw the background circles
  let ellipse_y1 = int(0.25 * height);
  let ellipse_y2 = int(0.75 * height);

  textSize(50);
  fill(0, 0, 255);
  ellipse(cur_x1, ellipse_y1, ellipse_radius * 2);
  fill(255, 0, 255);
  ellipse(cur_x2, ellipse_y2, ellipse_radius * 2);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(30);
  text("A", cur_x1, ellipse_y1);
  text("B", cur_x2, ellipse_y2);
}

