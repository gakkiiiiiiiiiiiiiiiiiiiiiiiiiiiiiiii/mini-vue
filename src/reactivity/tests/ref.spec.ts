import { effect } from "../effect";
import { reactive } from "../reactive";
import { ref,isRef,unRef,proxyRefs } from "../ref";
describe("ref", () => {
  it("happy path", () => {
    const a = ref(1);
    expect(a.value).toBe(1);
  });

  it("should be reactive", () => {
    const a = ref(1);
    let dummy;
    let calls = 0;
    effect(() => {
      calls++;
      dummy = a.value;
    });
    expect(calls).toBe(1);
    expect(dummy).toBe(1);
    a.value = 2;
    expect(calls).toBe(2);
    expect(dummy).toBe(2);
    // same value should not trigger
    a.value = 2;
    expect(calls).toBe(2);
    expect(dummy).toBe(2);
  });

  it("should make nested properties reactive", () => {
    const a = ref({
      count: 1,
    });
    let dummy;
    effect(() => {
      dummy = a.value.count;
    });
    expect(dummy).toBe(1);
    a.value.count = 2;
    expect(dummy).toBe(2);
  });

  it("same value should not trigger for ref Object", () => {
    const countObj = {count:1}
    const a = ref(countObj);
    let dummy;
    let calls = 0;
    effect(() => {
      calls++;
      dummy = a.value;
    });
    expect(calls).toBe(1);
    a.value = countObj;
    expect(calls).toBe(1);
  });

  it('isRef', () => {
    const countObj = {count:1}
    const a = ref(countObj);
    const b = reactive(countObj)
    expect(isRef(a)).toBe(true)
    expect(isRef(b)).toBe(false)
    expect(isRef(countObj)).toBe(false)
  });

  it('unRef', () => {
    const obj = {value:1}
    const a = ref(obj);
    const reactiveObj = reactive(obj)
    expect(unRef(a)).toStrictEqual(obj)
    expect(unRef(obj)).toBe(obj)
    expect(unRef(reactiveObj)).toBe(reactiveObj)
  });

  it('proxyRefs', () => {
    const user = {
      age: ref(18),
      name:'allen'
    }
    const userProxy = proxyRefs(user)
    expect(userProxy.age).toBe(18)
    expect(userProxy.name).toBe('allen')

    userProxy.age = 20
    expect(userProxy.age).toBe(20)
    expect(user.age).toBe(20)

    userProxy.age = ref(30)
    expect(userProxy.age).toBe(30)
    expect(user.age.value).toBe(30)
  });
});