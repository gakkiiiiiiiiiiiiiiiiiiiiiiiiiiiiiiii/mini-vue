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
export const addEventPrefix = (event: string) => {
	return event ? `on${capitalize(camelize(event))}` : event;
};
export const capitalize = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};
export const camelize = (str: string) => {
	return str.replace(/-\w/g, (_, index) => {
		return str.charAt(index + 1).toUpperCase();
	});
};
