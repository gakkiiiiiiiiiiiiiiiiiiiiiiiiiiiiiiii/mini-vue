import {reactive,isReactive,readonly,isReadonly} from '../reactive'
describe('readonly', () => {
  it('happy path', () => {
    const origin = { foo: 1 }
    const observed = readonly(origin)
    expect(observed).not.toBe(origin)
    expect(observed.foo).toBe(1)
    observed.foo = 2
    expect(observed.foo).toBe(1)
  })

  it('should call console.warn be set key', () => {
    const origin = { foo: 1 }
    console.warn = jest.fn()
    const observed = readonly(origin)
    observed.foo = 2
    expect(console.warn).toBeCalled()
  });

  it('isReadonly', () => {
    const origin = { foo: 1 }
    const readonlyObj = readonly({ foo: 2 })
    const reactiveObj = reactive({foo:2})
    expect(isReadonly(origin)).toBe(false)
    expect(isReadonly(readonlyObj)).toBe(true)
    expect(isReadonly(reactiveObj)).toBe(false)
  });

  

  it('nested readonly', () => {
    const observed = readonly({ obj: { foo: 1 }, array: [1, 2, 3] })
    expect(isReadonly(observed.obj)).toBe(true)
    expect(isReadonly(observed.array)).toBe(true)
  });
})