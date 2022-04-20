import { EffectReactive } from './effect';
class computedImpl {
	private _effect: any;
	private dirty = true;
	private _value;
	constructor(getter) {
		this._effect = new EffectReactive(getter, {
			scheduler: () => {
				this.dirty = true;
			},
		});
	}
	get value() {
		if (this.dirty) {
			this._value = this._effect.run();
			this.dirty = false;
		}
		return this._value;
	}
}

export function computed(getter) {
	return new computedImpl(getter);
}
