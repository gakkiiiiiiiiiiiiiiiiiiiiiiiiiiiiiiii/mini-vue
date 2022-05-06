export const extend = Object.assign;

export const isObject = (val) => {
	return val && typeof val === 'object';
};

export const hasChanged = (value, newValue) => {
	return !Object.is(value, newValue);
};
export const hasOwn = (obj, key) => {
	return Object.prototype.hasOwnProperty.call(obj, key);
};
