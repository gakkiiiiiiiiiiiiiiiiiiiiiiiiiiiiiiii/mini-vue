import { isObject } from '../shared';
import { createComponentInstance, setupComponent } from './component';

export function render(vnode, container) {
	patch(vnode, container);
}

function patch(vnode, container) {
	if (typeof vnode.type === 'string') {
		processElement(vnode, container);
	} else if (isObject(vnode.type)) {
		processComponent(vnode, container);
	}
}

function processElement(vnode, container) {
	mountElement(vnode, container);
}

function mountElement(vnode, container) {
	let { type, children, props } = vnode;
	const el = document.createElement(type);
	setProps(el, props);
	mountChildren(el, children);

	container.append(el);
}

function setProps(el, props) {
	for (const key in props) {
		let val = props[key];
		if (Array.isArray(val)) {
			val = val.join(' ');
		}
		el.setAttribute(key, val);
	}
}

function mountChildren(el, children) {
	if (typeof children === 'string') {
		el.textContent = children;
	} else if (Array.isArray(children)) {
		children.forEach((v) => {
			patch(v, el);
		});
	}
}

function processComponent(vnode: any, container: any) {
	mountComponent(vnode, container);
}

function mountComponent(vnode: any, container) {
	const instance = createComponentInstance(vnode);

	setupComponent(instance);
	setupRenderEffect(instance, container);
}

function setupRenderEffect(instance: any, container) {
	const subTree = instance.render();

	patch(subTree, container);
}
