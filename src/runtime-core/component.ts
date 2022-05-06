import { PublicInstanceProxyHandlers } from './componentPublicInstance';
import { initProps } from './componentProps';
export function createComponentInstance(vnode) {
	const component = {
		vnode,
		type: vnode.type,
		setupState: {},
		props: {},
	};

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
		const setupResult = setup(instance.props);

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
