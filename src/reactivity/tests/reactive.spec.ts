import {reactive,readonly,isReactive,isProxy} from '../reactive'
describe('reactive', () => {
  it('happy path', () => {
    const origin = { foo: 1 }
    const observed = reactive(origin)
    expect(observed).not.toBe(origin)
    expect(observed.foo).toBe(1)
  })

  it('isReactive', () => {
    const origin = { foo: 1 }
    const readonlyObj = readonly({ foo: 2 })
    const reactiveObj = reactive({foo:2})
    expect(isReactive(origin)).toBe(false)
    expect(isReactive(readonlyObj)).toBe(false)
    expect(isReactive(reactiveObj)).toBe(true)
  });

  it('nested reative', () => {
    const observed = reactive({ obj: { foo: 1 }, array: [1, 2, 3] })
    expect(isReactive(observed.obj)).toBe(true)
    expect(isReactive(observed.array)).toBe(true)
  });

  it('isProxy ', () => {
    const readonlyObj = readonly({ foo: 1 })
    const reactiveObj = reactive({ foo: 1 })
    expect(isProxy(readonlyObj)).toBe(true)
    expect(isProxy(reactiveObj)).toBe(true)
  });
})