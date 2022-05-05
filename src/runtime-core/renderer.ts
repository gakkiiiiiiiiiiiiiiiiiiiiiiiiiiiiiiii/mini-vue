import { createComponentInstance, setupComponent } from './component';
import { ShapeFlags } from '../shared/shapeFlags';
export function render(vnode, container) {
	patch(vnode, container);
}

function patch(vnode, container) {
	const { shapeFlag } = vnode;
	if (shapeFlag & ShapeFlags.ELEMENT) {
		processElement(vnode, container);
	} else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
		processComponent(vnode, container);
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
	for (const key in props) {
		let val = props[key];
		if (Array.isArray(val)) {
			val = val.join(' ');
		}
		el.setAttribute(key, val);
	}
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
