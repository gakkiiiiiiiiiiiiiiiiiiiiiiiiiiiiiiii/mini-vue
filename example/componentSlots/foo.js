import { h, renderSlots } from '../../lib/guide-mini-vue.esm.js';

export const foo = {
	render() {
		const age = 19;
		return h('div', {}, [
			h('span', {}, 'foo'),
			renderSlots(this.$slots, 'header', { age }),
			renderSlots(this.$slots, 'footer'),
		]);
	},
	setup() {},
};
