import { h } from '../../lib/guide-mini-vue.esm.js';

export const foo = {
	render() {
		return h(
			'div',
			{
				onClick: this.emitAdd,
			},
			`count:${this.count},foo:${this.obj.foo}`
		);
	},
	setup(props, { emit }) {
		props.count++;
		props.obj.foo++;
		console.log('props', props);
		const emitAdd = () => {
			emit('add-count', 'send for foo');
		};
		return {
			emitAdd,
		};
	},
};
