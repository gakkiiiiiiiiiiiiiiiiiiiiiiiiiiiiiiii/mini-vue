import { h } from '../../lib/guide-mini-vue.esm.js';

window.self = null;
export const App = {
	render() {
		window.self = this;
		return h(
			'div',
			{
				id: 'root',
				class: ['bg-blue', 'text-gray'],
			},
			[h('span', {}, 'hello'), h('span', {}, ' world'), h('p', {}, this.msg)]
		);
	},
	setup() {
		return {
			msg: 'msg',
		};
	},
};
