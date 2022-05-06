import { h } from '../../lib/guide-mini-vue.esm.js';

export const foo = {
	render() {
		return h('div', {}, `count:${this.count},foo:${this.obj.foo}`);
	},
	setup(props) {
		props.count++;
		props.obj.foo++;
		console.log('props', props);
	},
};
