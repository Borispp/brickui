let context = {};

export const setSingletoneContext = global => {
  // eslint-disable-next-line no-underscore-dangle,no-param-reassign
  context = global.__SINGLETONE__ || (global.__SINGLETONE__ = {});
};

export default new Proxy(
  {},
  {
    get(target, key) {
      return context[key];
    },
    set(target, key, value) {
      context[key] = value;

      return true;
    },
    deleteProperty(target, key) {
      delete context[key];
    },
    enumerate() {
      return Object.keys(context);
    },
    iterate() {
      return Object.keys(context);
    },
    ownKeys() {
      return Object.keys(context);
    },
    has(target, key) {
      return key in target;
    },
    hasOwn(target, key) {
      return Object.prototype.hasOwnProperty.call(context, key);
    },
    defineProperty(target, key, desc) {
      if (desc && 'value' in desc) {
        context[key] = desc.value;
      }

      return context;
    },
    getPropertyNames() {
      return Object.getPropertyNames(context).concat(Object.keys(context));
    },
    getOwnPropertyNames() {
      return Object.getOwnPropertyNames(context).concat(Object.keys(context));
    },
    getPropertyDescriptor(target, key) {
      const value = context[key];
      return value
        ? {
            value,
            writable: true,
            enumerable: true,
            configurable: false,
          }
        : undefined;
    },
    getOwnPropertyDescriptor(target, key) {
      const value = context[key];
      return value
        ? {
            value,
            writable: true,
            enumerable: true,
            configurable: false,
          }
        : undefined;
    },
  },
);
