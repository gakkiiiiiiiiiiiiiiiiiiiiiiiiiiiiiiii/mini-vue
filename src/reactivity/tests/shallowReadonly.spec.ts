import {shallowReadonly,isReadonly} from '../reactive'
describe('shallowReadonly', () => {
  test('should not make non-reative properties reative', () => {
    const props = shallowReadonly({ obj: { foo: 1 } })
    expect(isReadonly(props)).toBe(true)
    expect(isReadonly(props.obj)).toBe(false)
  });

  it('should call console.warn be set key', () => {
    const origin = { foo: 1 }
    console.warn = jest.fn()
    const observed = shallowReadonly(origin)
    observed.foo = 2
    expect(console.warn).toBeCalled()
  });
})