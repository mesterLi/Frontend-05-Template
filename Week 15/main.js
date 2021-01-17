import { createElement, Component, render } from './toy-react';

class Carousel extends Component {
  constructor() {
    super()
    this.startIndex = 0;
    this.childrenLen = 0;
    this.wrapper = null;
    this.children = [];
    this.firstCloneNode = null;
    this.lastCloneNode = null;
  }
  carouselMove() {
    this.wrapper.style.transition = 'transform ease .5s';
    if (this.startIndex === this.childrenLen - 1) {
      this.wrapper.appendChild(this.firstCloneNode);
      this.wrapper.style.transform = `translateX(${this.startIndex * -300}px)`;
    } else {
      this.wrapper.style.transform = `translateX(${this.startIndex * -300}px)`;
      if (this.startIndex === this.childrenLen) {
        setTimeout(() => {
          this.wrapper.style.transition = 'none';
          this.wrapper.style.transform = 'translateX(0px)';
          this.startIndex = 0;
          this.wrapper.removeChild(this.firstCloneNode);
        }, 500);
      }
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
    let carouselWrapper = document.getElementsByClassName('carousel__wrapper');
    this.children = Array.prototype.slice.call(carouselWrapper[0].childNodes);
    this.wrapper = carouselWrapper = carouselWrapper[0];
    this.childrenLen = this.children.length;
    this.firstCloneNode = this.children[0].cloneNode();
    this.lastCloneNode = this.children[this.childrenLen - 1].cloneNode();
    // this.wrapper.insertBefore(this.lastCloneNode, this.children[0]);
    // this.wrapper.style.transform = `translateX(${this.startIndex * -300}px)`;
    const clearTimer = () => {
      clearInterval(timer);
    }
    const startTimer = () => {
      timer = setInterval(() => {
        this.startIndex++;
        this.carouselMove(this.startIndex);
      }, 2000);
    }
    startTimer();

    carouselWrapper.addEventListener('mouseover', clearTimer);
    carouselWrapper.addEventListener('mouseout', startTimer);

    carouselWrapper.addEventListener('mousedown', e => {
      carouselWrapper.style.transition = 'none';
      let startX = e.clientX;
      let move = (e) => {
        let x = e.clientX - startX;
        carouselWrapper.style.transform = `translateX(${this.startIndex * -300 + x}px)`;
      }
      let up = (e) => {
        let x = e.clientX - startX;
        if (x > 150) {
          this.startIndex--;
        }
        if (x < -150) {
          this.startIndex++;
        }
        this.carouselMove(this.startIndex);
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
      }
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    });
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
    )
  }
}

render(<Carousel/>, document.getElementById("root"));