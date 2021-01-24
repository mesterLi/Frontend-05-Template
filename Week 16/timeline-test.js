import { Timeline, Animation, ease } from './Timeline';

const tl = new Timeline();

const el = document.getElementById("el");
const el2 = document.getElementById("el2");
const pause = document.getElementById("pause");
const resume = document.getElementById("resume");

const an1 = new Animation(
  el.style,
  "transform",
  0,
  300,
  3000,
	2000,
  v => `translateX(${v}px)`,
  ease
)

tl.add(an1);
// el2.style.transform = `translateX(300px)`;
tl.start();
pause.onclick = function () {
	tl.pause();
}

resume.onclick = function () {
	tl.resume();
}

