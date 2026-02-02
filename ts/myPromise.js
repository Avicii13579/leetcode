class MyPromiseM {
    // 初始状态值
    state = 'pending'
    value = undefined
    reason = undefined
    
    // fulfilled 和 rejected 待执行队列
    onFulfilledCallbacks = []
    onRejectedCallbacks = []

    constructor(executor) {

        // resolve 修改状态 pending 为 fulfilled
        const resolve = (value) => {
            // instanceof 返回布尔值，判断左侧引用类型是否右侧类的实例 如：const arr = [1, 2, 3]; arr instanceof Array    // true  (它是数组)  【注意：不能用来判断 基本数据类型】
            // 处理递归 让 Promise 继续执行
            if(value instanceof MyPromiseM) {
                value.then(resolve, reject)
                return
            }

            // 开启状态锁 对 pending 状态进行变更 和 执行 fulfill 对列里待执行的函数
            if(this.state === 'pending') {
                this.state = 'fulfilled'

                // typeof 返回数据类型的字符串 实现基础类型检查：number、string、boolean、undefined、function；无法识别：对象、数组、null
                // 有 then 方法的先执行 
                if(value && typeof value.then === 'function') {
                    value.then(
                        // TODO 第一个参数传递有疑问
                        (resolvedValue) => {
                            this.value = resolvedValue
                            this.onFulfilledCallbacks.forEach(fn => fn())
                        } 
                    )
                } else {
                    this.value = value
                    this.onFulfilledCallbacks.forEach(fn => fn())
                }
            }
        }

        // TODO
        // reject 修改状态 pending 为 rejected
    }

    // 为了保证 then 能持续链式调用必须返回 Promise 类型
    then(onFulfilled, onRejected){
        // 为执行参数创建默认值
        const onFulfilledFn = typeof onFulfilled === 'function' ? onFulfilled : (v) => v
        const onRejectedFn = typeof onRejected === 'function' ? onFulfilled : (v) => v

        const promise2 = new MyPromiseM((resolve, reject) => {
            // 实现异步执行，try catch 处理
            const handleCallback = (callback, data) => {
                // 加入微任务队列，控制在下个宏任务之前执行
                queueMicrotask(() => {
                    try {
                        const x = callback(data)
                        // TODO
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch(error) {
                        reject(error)
                    }
                })
                
            }
            // 根据 state 执行 回调函数 或 将函数加入回调队列
            if(this.state === 'fulfilled') {
                handleCallback(onFulfilledFn, this.value)
            } else if(this.state === 'rejected') {
                handleCallback(onRejectedFn, this.reason)
            } else {
                this.onFulfilledCallbacks.push(() => handleCallback(onFulfilledFn, this.value))
                this.onRejectedCallbacks.push(() => handleCallback(onRejectedFn, this.reason))
            }
        }) 

        return promise2
    }

    // TODO 实现 then 里面的异步回调
    resolvePromise(promise2, x, resolve, reject) {
        // 边界处理 
        if(promise2 === x) {
            return reject(new TypeError('Chaining cycle detected for promise'))
        }

        // 如果 x 是个 Promise 或者是 Thenable 对象
        if(x && (typeof x === 'object' || typeof x === 'function'))  {
            // 确保状态只能修改一次
            let called = false
            try {
                const then = x.then
                if(typeof then === 'function') {
                    then.call(
                        x,
                        (y) => {
                            // 阻止反复修改状态
                            if (called) return
                            called = true
                            // TODO 这里的y是如何获取的
                            this.resolvePromise(promise2, y, resolve, reject)
                        },
                        (r) => {
                            if(called) return 
                            called = true
                            reject(r)
                        }
                    )
                } else {
                    // 普通对象
                    resolve(x)
                }
            } catch(e) {
                if(called) return
                called = true
                reject(e)
            }
        
        } else {
            // 直接返回原始值
            resolve(x)
        }
    } 

    catch(onRejected) {
        return this.then(null, onRejected)
    }

    finally(onFinally) {
        return this.then(
            value => {
                onFinally?.()
                return value
            },
            reason => {
                onFinally?.()
                throw reason
            }
        )
    }

}