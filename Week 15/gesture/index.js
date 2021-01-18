let element = document.documentElement;
let contents = new Map();
let isListeningMouse = false;

class Dispatch {
  constructor(el) {
    this.element = el;
  }
  dispatch(type, properties) {
    let event = new Event(type);
    for (const name in properties) {
      event[name] = properties[name];
    }
    this.element.dispatchEvent(event);
  }
}

class Listener {
  constructor(el, recoginizer) {
    console.log(el)
    el.addEventListener('mousedown', (event) => {
      let content = Object.create(null);
      contents.set('mouse' + (1 << event.button), content);
      recoginizer.start(event, content);

      let mousemove = (event) => {
        let button = 1;

        while (button <= event.buttons) {
          if (button & event.buttons) {
            // order of buttons & button property is not same
            let key = button;
            if (button === 2) {
              key = 4;
            } else if (button === 4) {
              key = 2;
            }
            let content = contents.get('mouse' + key);
            recoginizer.move(event, content);
          }
          button = button << 1;
        }
      };

      let mouseup = (event) => {
        let content = contents.get('mouse' + (1 << event.button));
        recoginizer.end(event, content);
        contents.delete('mouse' + (1 << event.button));
        if (event.buttons === 0) {
          document.removeEventListener('mousemove', mousemove);
          document.removeEventListener('mouseup', mouseup);
          isListeningMouse = false;
        }
      };
      if (!isListeningMouse) {
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
        isListeningMouse = true;
      }
    });

    /*
     ** touch event
     */
    document.addEventListener('touchstart', (event) => {
      for (const touch of event.changedTouches) {
        let content = Object.create(null);
        contents.set(touch.identifier, content);
        recoginizer.start(touch, content);
      }
    });
    document.addEventListener('touchmove', (event) => {
      for (const touch of event.changedTouches) {
        let content = contents.get(touch.identifier);
        recoginizer.move(touch, content);
      }
    });
    document.addEventListener('touchend', (event) => {
      for (const touch of event.changedTouches) {
        let content = contents.get(touch.identifier);
        recoginizer.end(touch, content);
        contents.delete(touch, identifier);
      }
    });
    document.addEventListener('touchcancel', (event) => {
      for (const touch of event.changedTouches) {
        let content = contents.get(touch.identifier);
        recoginizer.cancel(touch, content);
        contents.delete(touch, identifier);
      }
    });
  }
}

class Recoginizer {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  start(point, content) {
    content.isPress = false;
    content.isPan = false;
    content.isTap = true;

    content.startX = point.clientX
    content.startY = point.clientY

    // flick
    content.points = [
      {
        t: Date.now(),
        x: point.clientX,
        y: point.clientY,
      },
    ];

    // 0.5s press
    content.handler = setTimeout(() => {
      this.dispatcher.dispatch('press-start', {});
      content.isPress = true;
      content.isPan = false;
      content.isTap = false;
    }, 500);
  }

  move(point, content) {
    // 10px pan
    let dx = point.clientX - content.startX,
      dy = point.clientY - content.startY;
    content.isVertical = Math.abs(dx) < Math.abs(dy);
    if (!content.isPan && dx ** 2 + dy ** 2 > 100) {
      content.isPan = true;
      content.isPress = false;
      content.isTap = false;
      this.dispatcher.dispatch('pan-start', {
        startX: content.startX,
        startY: content.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: content.isVertical,
      });
      clearTimeout(content.handler);
    }
    if (content.isPan) {
      this.dispatcher.dispatch('pan', {
        startX: content.startX,
        startY: content.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: content.isVertical,
      });
    }

    // 最新的速度段
    content.points = content.points.filter(
      (point) => Date.now() - point.t <= 500
    );
    content.points.push({ t: Date.now(), x: point.clientY, y: point.clientY });
  }

  end(point, content) {
    let v;
    if (!content.points.length) {
      v = 0;
    } else {
      v =
        Math.sqrt(
          (point.clientX - content.points[0].x) ** 2 +
            (point.clientY - content.points[0].y) ** 2
        ) /
        (Date.now() - content.points[0].t);
    }
    if (v >= 1.5) {
      content.isFlick = true;
      this.dispatcher.dispatch('flick', {
        startX: content.startX,
        startY: content.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: content.isVertical,
        isFlick: content.isFlick,
        velocity: v,
      });
    } else content.isFlick = false;

    if (content.isTap) {
      this.dispatcher.dispatch('tap', {});
      clearTimeout(content.handler);
    }
    if (content.isPress) {
      this.dispatcher.dispatch('press-end', {});
    }
    if (content.isPan) {
      this.dispatcher.dispatch('pan-end', {
        startX: content.startX,
        startY: content.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: content.isVertical,
        isFlick: content.isFlick,
      });
    }
  }

  cancel(point, content) {
    clearTimeout(content.handler);
    this.dispatcher.dispatch('cancel', {});
  }
}

function enableGestrue(el) {
  return new Listener(el, new Recoginizer(new Dispatch(el)));
}
