import { h } from '../../lib/guide-mini-vue.esm.js';
export const App = {
	render() {
		return h(
			'div',
			{
				id: 'root',
				class: ['bg-blue', 'text-gray'],
			},
			[h('span', {}, 'hello'), h('span', {}, ' world')]
		);
	},
	setup() {
		return {
			msg: '',
		};
	},
};
