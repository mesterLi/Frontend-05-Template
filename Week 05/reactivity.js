let callbacks = new Map(); // 存储callback
let reactivities = new Map(); // 存储触发的reactive
let usedReactivities = []; // 缓存使用过的reactive

function effect(callback) {
  usedReactivities = [];
  callback();
  // console.log(usedReactivities);
  for (let reactivity of usedReactivities) {
    if (!callbacks.has(reactivity[0])) {
      callbacks.set(reactivity[0], new Map());
    }
    if (!callbacks.get(reactivity[0]).has(reactivity[1])) {
      callbacks.get(reactivity[0]).set(reactivity[1], []);
    }
    callbacks.get(reactivity[0]).get(reactivity[1]).push(callback);
  }
}
function reactive(object) {
  // 如果该对象已经被proxy过了，直接返回
  if (reactivities.has(object)) {
    return reactivities.get(object);
  }
  let proxy = new Proxy(object, {
    set(obj, prop, val) {
      obj[prop] = val;
      // 拿到准确的对象下的属性对应的callback，进行更新
      if (callbacks.get(obj)) {
        if (callbacks.get(obj).get(prop)) {
          for (let callback of callbacks.get(obj).get(prop)) {
            callback();
          }
        }
      }
      return obj[prop];
    },
    get(obj, prop) {
      usedReactivities.push([obj, prop]);
      if (typeof obj[prop] === 'object') {
        return reactive(obj[prop]);
      }
      return obj[prop];
    },
  });
  reactivities.set(object, proxy);
  return proxy;
}
