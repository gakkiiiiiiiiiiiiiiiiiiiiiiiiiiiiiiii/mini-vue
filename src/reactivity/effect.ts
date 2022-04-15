
let activeRefect
class EffectReactive{
  private _fn
  constructor(fn,private scheduler?) {
    this._fn = fn
    activeRefect = this
  }
  run() {
    return this._fn()
    
  }
}
const trackMap = new Map()
export function track(target, key) {
  let depsMap = trackMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    trackMap.set(target,depsMap)
  }

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key,dep)
  }

  dep.add(activeRefect)
}

export function trigger(target, key) {
  let depsMap = trackMap.get(target)
  let dep = depsMap.get(key)
  for (const _effect of dep) {
    if (_effect.scheduler) {
      _effect.scheduler()
    } else {     
      _effect.run()
    }
  }
}

export function effect(fn, options:any = {}) {
  const _effect = new EffectReactive(fn,options.scheduler)
  _effect.run()
  return fn
}