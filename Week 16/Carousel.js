import { createElement, Component } from './toy-react';
import { Timeline, Animation, ease } from './Timeline';
import { enableGestrue } from './gesture/index.js';

export default class Carousel extends Component {
  constructor() {
    super();
    this.startIndex = 0;
    this.childrenLen = 0;
    this.wrapper = null;
    this.children = [];
    this.firstCloneNode = null;
    this.lastCloneNode = null;
    this.tl = new Timeline();
    this.tl.start();
  }
  carouselMove() {
    // this.wrapper.style.transition = 'transform ease .5s';
    if (this.startIndex === this.childrenLen - 1) {
      this.wrapper.appendChild(this.firstCloneNode);
      this.tl.add(
        new Animation(
          this.wrapper.style,
          'transform',
          (this.startIndex - 1) * -300,
          this.startIndex * -300,
          500,
          0,
          (v) => `translateX(${v}px)`,
          ease
        )
      );
    } else {
      // console.log(this.startIndex)
      this.tl.add(
        new Animation(
          this.wrapper.style,
          'transform',
          (this.startIndex - 1) * -300,
          this.startIndex * -300,
          500,
          0,
          (v) => `translateX(${v}px)`,
          ease,
          () => {
            if (this.startIndex >= this.childrenLen) {
              this.wrapper.style.transform = 'translateX(0px)';
              this.startIndex = 0;
              this.wrapper.removeChild(this.firstCloneNode);
            }
          }
        )
      );
      if (this.startIndex === -1) {
        setTimeout(() => {
          this.wrapper.style.transition = 'none';
          this.startIndex = this.children.length - 1;
          this.wrapper.style.transform = `translateX(${this.childrenLen * -300}px)`;
          this.wrapper.removeChild(this.lastCloneNode);
        }, 500);
      }
    }
  }
  componentDidMount() {
    let timer = null;
    let t = 0;
    let ax = 0;
    let carouselWrapper = document.getElementsByClassName('carousel__wrapper');
    this.children = Array.prototype.slice.call(carouselWrapper[0].childNodes);
    this.wrapper = carouselWrapper = carouselWrapper[0];
    this.childrenLen = this.children.length;
    this.firstCloneNode = this.children[0].cloneNode();
    this.lastCloneNode = this.children[this.childrenLen - 1].cloneNode();
    

    const clearTimer = () => {
      clearInterval(timer);
    };

    const startTimer = () => {
      timer = setInterval(() => {
        t = Date.now();
        this.startIndex++;
        this.carouselMove(this.startIndex);
      }, 2000);
    };

    enableGestrue(this.wrapper);
    this.wrapper.addEventListener('start', () => {
      console.log('starts')
      const process = (Date.now() - t) / 300;
      ax = ease(process) * 300 - 300;
      this.tl.pause();
      clearTimer();
    });

    this.wrapper.addEventListener('pan', (e) => {
      const x = e.clientX - e.startX;
      carouselWrapper.style.transform = `translateX(${this.startIndex * -300 + x}px)`;
    });
    this.wrapper.addEventListener('flick', e => {
      let x = e.clientX - e.startX;
      if (e.velocity <= 0){
        return;
      }
      if (x > 150) {
        this.startIndex --;
      }
      if (x < -150) {
        this.startIndex ++;
      }
      this.carouselMove(this.startIndex);
    })
    this.wrapper.addEventListener('pan-end', (e) => {
      let x = e.clientX - e.startX;
      if (x > 150) {
        this.startIndex -= Math.ceil(Math.abs(x) / 300);
      }
      if (x < -150) {
        this.startIndex += Math.ceil(Math.abs(x) / 300);
      }
      // console.log(this.startIndex);
      this.tl.start();
      this.tl.add(
        new Animation(
          this.wrapper.style,
          "transfrom",
          (this.startIndex - 1) * -300 + x,
          (this.startIndex) * -300,
          500 - Math.abs(x) / 300 * 500,
          0,
          v => `translateX(${v}px)`,
          ease,
          () => {
            if (this.startIndex >= this.childrenLen) {
              this.wrapper.style.transform = 'translateX(0px)';
              this.startIndex = 0;
              this.wrapper.removeChild(this.firstCloneNode);
            }
          }
        )
      )
    });

    this.wrapper.addEventListener('end', () => {
      this.tl.reset();
      console.log('end')
    });

    startTimer();

  }
  render() {
    return (
      <div className="carousel">
        <div className="carousel__wrapper">
          <div className="red"></div>
          <div className="green"></div>
          <div className="yellow"></div>
          <div className="black"></div>
        </div>
      </div>
    );
  }
}
