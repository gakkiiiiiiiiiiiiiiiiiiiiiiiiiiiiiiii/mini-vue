import { createComponentInstance, setupComponent } from './component';
import { ShapeFlags } from '../shared/shapeFlags';
export function render(vnode, container) {
	patch(vnode, container);
}

export const Fragment = Symbol('Fragment');
export const Text = Symbol('Text');

function patch(vnode, container) {
	const { shapeFlag, type } = vnode;

	switch (type) {
		case Fragment:
			processFragment(container, vnode);
			break;
		case Text:
			processText(container, vnode);
			break;
		default:
			if (shapeFlag & ShapeFlags.ELEMENT) {
				processElement(vnode, container);
			} else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
				processComponent(vnode, container);
			}
			break;
	}
}

function processElement(vnode, container) {
	mountElement(vnode, container);
}

function mountElement(vnode, container) {
	let { type, props } = vnode;
	const el = (vnode.el = document.createElement(type));
	setProps(el, props);
	mountChildren(el, vnode);

	container.append(el);
}

function setProps(el, props) {
	const isEvent = (key: string) => /^on[A-Z]/.test(key);
	for (const key in props) {
		let val = props[key];
		if (isEvent(key)) {
			const event = key.slice(2).toLowerCase();
			addEventListener(el, event, val);
		} else {
			setAttribute(el, key, val);
		}
	}
}

function addEventListener(el, event, fn) {
	console.log('el', el);

	el.addEventListener(event, fn);
}

function setAttribute(el, key, val) {
	if (Array.isArray(val)) {
		val = val.join(' ');
	}
	el.setAttribute(key, val);
}

function mountChildren(el, vnode) {
	const { shapeFlag, children } = vnode;
	if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
		el.textContent = children;
	} else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
		children.forEach((v) => {
			patch(v, el);
		});
	}
}

function processComponent(vnode: any, container: any) {
	mountComponent(vnode, container);
}

function mountComponent(initialVnode: any, container) {
	const instance = createComponentInstance(initialVnode);

	setupComponent(instance);
	setupRenderEffect(instance, initialVnode, container);
}

function setupRenderEffect(instance: any, initialVnode, container) {
	const { proxy } = instance;
	const subTree = instance.render.call(proxy);
	patch(subTree, container);
	initialVnode.el = subTree.el;
}

function processFragment(container, vnode) {
	mountChildren(container, vnode);
}

function processText(container: any, vnode: any) {
	const { children } = vnode;
	const el = (vnode.el = document.createTextNode(children));
	container.append(el);
}
