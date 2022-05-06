import { shallowReadonly } from '../reactivity/reactive';

export function initProps(instance) {
	instance.props = shallowReadonly(instance.vnode.props || {});
}
