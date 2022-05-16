import { h } from '../../lib/guide-mini-vue.esm.js';
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
				h('span', {}, 'hello'),
				h('span', {}, ' world'),
				h('p', {}, this.msg),
				h(
					'button',
					{
						onClick: () => {
							console.log(this.msg);
						},
					},
					'click'
				),
				h(
					foo,
					{
						count: 1,
						obj: {
							foo: 1,
						},
						onAddCount: (msg) => {
							console.log('on-add', msg);
						},
					},
					[h('div', { slot: 'default' }, '123')]
				),
			]
		);
	},
	setup() {
		return {
			msg: 'msg',
			clickMsg: 'click',
		};
	},
};
