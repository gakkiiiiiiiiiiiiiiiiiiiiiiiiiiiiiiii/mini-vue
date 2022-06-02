import { reactive } from '../reactive';
import { effect, stop } from '../effect';
describe('effect', () => {
	it('happy path ', () => {
		const user = reactive({
			age: 8,
		});
		let nextAge;
		effect(() => {
			nextAge = user.age + 3;
		});

		expect(nextAge).toBe(11);
		user.age++;
		expect(nextAge).toBe(12);
		user.age = user.age + 5;
		expect(nextAge).toBe(17);

		const arr = [1, 2, 3];
		const arrOb = reactive(arr);
		let num;
		effect(() => {
			num = arrOb[0];
		});
		arrOb[0] = 4;
		expect(num).toBe(4);
	});

	it('should return runner when call effect', () => {
		let foo = 1;
		let runner = effect(() => {
			foo++;
			return 'foo';
		});
		expect(foo).toBe(2);
		let res = runner();
		expect(foo).toBe(3);
		expect(res).toBe('foo');
	});

	it('scheduler', () => {
		let run;
		let dummy;
		const obj = reactive({
			foo: 1,
		});
		const scheduler = jest.fn(() => {
			run = runner;
		});
		const runner = effect(
			() => {
				dummy = obj.foo;
			},
			{ scheduler }
		);
		expect(dummy).toBe(1);
		expect(scheduler).not.toBeCalled();
		obj.foo++;
		expect(scheduler).toBeCalledTimes(1);
	});

	it('stop and continue', () => {
		const user = reactive({
			age: 8,
		});
		let nextAge;
		const runner = effect(() => {
			nextAge = user.age + 3;
		});

		expect(nextAge).toBe(11);
		stop(runner);
		user.age = 9;
		expect(nextAge).toBe(11);
		runner.effect.continue();
		user.age++;
		expect(nextAge).toBe(13);
	});

	it('onStop', () => {
		const user = reactive({
			age: 8,
		});
		const onStop = jest.fn();
		let nextAge;
		const runner = effect(
			() => {
				nextAge = user.age + 3;
			},
			{ onStop }
		);
		stop(runner);
		expect(onStop).toHaveBeenCalledTimes(1);
	});
});
