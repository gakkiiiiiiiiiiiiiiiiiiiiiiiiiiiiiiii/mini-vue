import { PublicInstanceProxyHandlers } from './componentPublicInstance';
import { initProps } from './componentProps';
import { emit } from './componentEmit';
export function createComponentInstance(vnode) {
	const component = {
		vnode,
		type: vnode.type,
		setupState: {},
		props: {},
		emit: () => {},
	};
	component.emit = emit.bind(null, component) as any;
	return component;
}

export function setupComponent(instance) {
	// TODO
	initProps(instance);
	// initSlots()
	setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
	const Component = instance.type;
	instance.proxy = new Proxy(instance, PublicInstanceProxyHandlers);
	const { setup } = Component;

	if (setup) {
		// let emit_ =
		const setupResult = setup(instance.props, { emit: instance.emit });

		handleSetupResult(instance, setupResult);
	}
}

function handleSetupResult(instance, setupResult: any) {
	// function Object
	// TODO function
	if (typeof setupResult === 'object') {
		instance.setupState = setupResult;
	}

	finishComponentSetup(instance);
}

function finishComponentSetup(instance: any) {
	const Component = instance.type;

	if (Component.render) {
		instance.render = Component.render;
	}
}
