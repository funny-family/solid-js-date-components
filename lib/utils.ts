import { $PROXY, $TRACK, getListener } from 'solid-js';
import { $RAW, type StoreNode } from 'solid-js/store';
import {  } from 'solid-js/store/dist/store';
import {
  $HAS,
  $NODE,
  getNode,
  getNodes,
  isWrappable,
  trackSelf,
} from 'solid-js/store/types/store.js';

var proxyTraps: ProxyHandler<StoreNode> = {
  get(target, property, receiver) {
    if (property === $RAW) return target;
    if (property === $PROXY) return receiver;
    if (property === $TRACK) {
      trackSelf(target);
      return receiver;
    }
    const nodes = getNodes(target, $NODE);
    const tracked = nodes[property];
    let value = tracked ? tracked() : target[property];
    if (property === $NODE || property === $HAS || property === '__proto__')
      return value;

    if (!tracked) {
      const desc = Object.getOwnPropertyDescriptor(target, property);
      if (
        getListener() &&
        (typeof value !== 'function' || target.hasOwnProperty(property)) &&
        !(desc && desc.get)
      )
        value = getNode(nodes, property, value)();
    }
    return isWrappable(value) ? wrap(value) : value;
  },
};

export var wrap = <T extends StoreNode>(value: T): T => {
  let p = value[$PROXY];
  if (!p) {
    Object.defineProperty(value, $PROXY, {
      value: (p = new Proxy(value, proxyTraps)),
    });
    if (!Array.isArray(value)) {
      const keys = Object.keys(value),
        desc = Object.getOwnPropertyDescriptors(value);
      for (let i = 0, l = keys.length; i < l; i++) {
        const prop = keys[i];
        if (desc[prop].get) {
          Object.defineProperty(value, prop, {
            enumerable: desc[prop].enumerable,
            get: desc[prop].get!.bind(p),
          });
        }
      }
    }
  }
  return p;
};
