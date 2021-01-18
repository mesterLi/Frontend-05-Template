import { cubicBezier, liner, ease, easeIn, easeOut, easeInOut } from './cubic.js';

const TICK = Symbol("tick");
const ANIMATIONS = Symbol("animations");
const START_TIME = Symbol("start_time");
const TICK_HANDLER = Symbol("tick_handler");
const PAUSE_START_TIME = Symbol("pause_start_time");
const PAUSE_TIME = Symbol("pause_time");

export class Timeline {
  constructor() {
    this[ANIMATIONS] = new Set();
    this[START_TIME] = new Map();
  }

  start() {
    const startTime = Date.now();
    this[PAUSE_TIME] = 0;
    this[TICK] = () => {
    	const now = Date.now();
      for (const animation of this[ANIMATIONS]) {
	      let t;
	      // 如果设置的开始时间小于真正的开始时间，那么我们就认为已经开始了
	      if (this[START_TIME].get(animation) < startTime) {
	      	t = now - startTime - this[PAUSE_TIME] - animation.delay;
	      } else {
	      	t = now - this[START_TIME].get(animation) - this[PAUSE_TIME] - animation.delay;
	      }
        // 动画终止条件
        if (t > animation.duration) {
          // console.log('animation.duration: number', animation.duration)
          this[ANIMATIONS].delete(animation);
          // 动画终止，传给animation的时间为动画时间，避免属性值超出
          t = animation.duration;
        }
        if (t > 0) {
	        animation.receive(t);
        }
      }
      this[TICK_HANDLER] = window.requestAnimationFrame(this[TICK])
    }
    this[TICK]();
  }
  pause() {
  	// console.log("暂停")
	  this[PAUSE_START_TIME] = Date.now();
  	window.cancelAnimationFrame(this[TICK_HANDLER]);
  }
  resume() {
  	// 获取暂停了多少时间
  	this[PAUSE_TIME] += Date.now() - this[PAUSE_START_TIME];
		this[TICK]();
  }
  reset() {

  }
  /*
  * @animation 动画实例
  * @startTime 设置的动画开始时间
  * */
  add(animation, startTime) {
  	if (!startTime) {
		  startTime = Date.now();
	  }
    this[ANIMATIONS].add(animation);
    this[START_TIME].set(animation, startTime);
  }
}

export class Animation {
  constructor (object, property, startValue, endValue, duration, delay, template, timeingFunction) {
    this.object = object;
    this.property = property;
    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration || 2000;
    this.delay = delay || 0;
    this.template = template || (v => v);
    this.timeingFunction = timeingFunction;
    // console.log(this.timeingFunction)
  }

  receive(time) {
    const range = this.endValue - this.startValue;
    const process = this.timeingFunction(time / this.duration);
    // 改变要做出动画的属性值
    // 开始值 + (差值 * 过去的时间 / 总动画时长)
    this.object[this.property] = this.template(this.startValue + range * process);
    console.log(this.object[this.property])
  }
}

export {
  cubicBezier,
  liner,
  ease,
  easeIn,
  easeInOut,
  easeOut
}