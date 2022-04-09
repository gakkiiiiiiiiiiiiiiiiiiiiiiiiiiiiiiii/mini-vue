import { reactive } from '../reactive'
import { effect } from '../effect'
describe('effect', () => {
  it('happy path ', () => {
    const user = reactive({
      age:8
    })
    let nextAge;
    effect(() => {
      nextAge = user.age + 3
    })

    expect(nextAge).toBe(11)
    user.age++
    expect(nextAge).toBe(12)
    user.age = user.age+5
    expect(nextAge).toBe(17)
    
  });

  it('should return runner when call effect', () => {
    let foo = 1
    let runner = effect(() => {
      foo++
      return 'foo'
    })
    expect(foo).toBe(2)
    let res = runner()
    expect(foo).toBe(3)
    expect(res).toBe('foo')
  });
})