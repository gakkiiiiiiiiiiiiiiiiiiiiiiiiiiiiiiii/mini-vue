import { h, renderSlots, createTextVNode } from '../../lib/guide-mini-vue.esm.js';

export const foo = {
	render() {
		const age = 19;
		return h('div', {}, [
			h('span', {}, 'foo'),
			renderSlots(this.$slots, 'header', { age }),
			createTextVNode('textNode'),
			renderSlots(this.$slots, 'footer'),
		]);
	},
	setup() {},
};
