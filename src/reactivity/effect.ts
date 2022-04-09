
class EffectReactive {
  private _fn

  constructor(fn) {
    this._fn = fn
  }
  
  run() {
    effectActive = this
    return this._fn()
  }
}

const targetMap = new Map()
export function track(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target,depsMap)
  }

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key,dep)
  }
  dep.add(effectActive)

}

let effectActive
export function effect(fn) {
  const _effect = new EffectReactive(fn)
  _effect.run()
  return _effect.run.bind(_effect)
}

export function trigger(target, key) {
  let depsMap = targetMap.get(target)
  let dep = depsMap.get(key)
  dep.forEach(effect => {
    effect.run()
  })
}