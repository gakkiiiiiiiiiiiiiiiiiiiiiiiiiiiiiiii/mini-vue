import {readonly} from '../reactive'
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
})