import { h, getCurrentInstance } from '../../lib/guide-mini-vue.esm.js';
import { foo } from './foo.js';
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
			[
				h(
					foo,
					{},
					{
						header: ({ age }) => h('div', {}, 'header' + age),
						footer: () => h('div', {}, 'footer'),
					}
				),
			]
		);
	},
	setup() {
		const instance = getCurrentInstance();
		console.log({ instance });
		return {
			msg: 'msg',
			name: 'app',
			clickMsg: 'click',
		};
	},
};
