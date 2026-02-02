type PromiseState = 'pending' | 'fulfilled' | 'rejected';

// 定义执行函数类型
type Exector<T> = (
    resolve: (value: T | PromiseLike<T>) => void,
    reject: (reason?: any) => void
) => void

// 定义 onFulfilled 和 onRejected 回调类型
type OnFulfilled<T, TResult> = ((value: T) => TResult | PromiseLike<TResult>) | null | undefined
type OnRejected<TResult> = ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined

class MyPromise<T> {
    // 初始化状态
    private state: PromiseState = 'pending'
    private value: T | undefined
    private reason: any

    // 观察者模式
    // 当 Promise 还处于 pending 时，如果还调用了 then，需要将回调存起来
    private onFulfilledCallbacks: Array<() => void> = []
    private onRejectedCallbacks: Array<() => void> = []

    constructor(executor: Exector<T>) {
        // 处理 resolve 传入的是一个 Promise 情况
        const resolve = (value: T | PromiseLike<T>): void => {
            if (value instanceof MyPromise) {
                value.then(resolve, reject)
                return
            }

            if (this.state === 'pending') {
                this.state = 'fulfilled'
                // 如果 value 是 PromiseLike，需要先解析它
                if (value && typeof (value as any).then === 'function') {
                    (value as PromiseLike<T>).then(
                        (resolvedValue: T) => {
                            this.value = resolvedValue
                            this.onFulfilledCallbacks.forEach(fn => fn())
                        },
                        reject
                    )
                } else {
                    this.value = value as T
                    // 执行所有订阅的成功回调
                    this.onFulfilledCallbacks.forEach(fn => fn())
                }
            }
        }

        const reject = (reason?: any) => {
            if (this.state === 'pending') {
                this.state = 'rejected'
                this.reason = reason
                // 执行所有的失败回调
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }

        // 立即执行 executor 并捕获可能的同步错误
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    /**
     * 核心方法：then
     * 1、接收两个回调
     * 2、返回一个新的 Promise (实现链式回调)
     * 3、异步执行回调 (Microtask)
     */
    public then<TResult1 = T, TResult2 = never>(
        onFulfilled?: OnFulfilled<T, TResult1>,
        onRejected?: OnRejected<TResult2>
    ): MyPromise<TResult1 | TResult2> {
        // 穿透处理，为 onFulfilled 添加默认值
        const onFulfilledFn = typeof onFulfilled === 'function' ? onFulfilled : (v: T) => v as any
        const onRejectedFn = typeof onRejected === 'function' ? onRejected : (e: any) => { throw e }

        const promise2 = new MyPromise<TResult1 | TResult2>((resolve, reject) => {
            // 封装统一的处理逻辑
            const handleCallback = (callback: Function, data: any) => {
                // 加入微任务队列，控制在下一个宏任务之前执行
                queueMicrotask(() => {
                    try {
                        const x = callback(data)
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }

            if (this.state === 'fulfilled') {
                handleCallback(onFulfilledFn, this.value)
            } else if (this.state === 'rejected') {
                handleCallback(onRejectedFn, this.reason)
            } else {
                this.onFulfilledCallbacks.push(() => handleCallback(onFulfilledFn, this.value))
                this.onRejectedCallbacks.push(() => handleCallback(onRejectedFn, this.reason))
            }
        })
        return promise2
    }

    /**
     * 处理 then 方法
     * @param promise2 
     * @param x 
     * @param resolve 
     * @param reject 
     * @returns 
     */
    private resolvePromise(
        promise2: MyPromise<any>,
        x: any,
        resolve: (value: any) => void,
        reject: (reason: any) => void
    ) {
        // 循环引用检测：x 不能是 promise2，阻止陷入死循环
        if (promise2 === x) {
            return reject(new TypeError('Chaining cycle detected for promise'))
        }

        // 如果 x 是一个 Promise 或 Thenable 对象
        if (x && (typeof x === 'object' || typeof x === 'function')) {
            let called = false
            try {
                const then = x.then
                if (typeof then === 'function') {
                    then.call(
                        x,
                        (y: any) => {
                            if (called) return
                            called = true
                            // 递归解析 y 也有可能是个 Promise
                            this.resolvePromise(promise2, y, resolve, reject)
                        },
                        (r: any) => {
                            if (called) return
                            called = true
                            reject(r)
                        }
                    )
                } else {
                    // 普通对象
                    resolve(x)
                }
            } catch (e) {
                if (called) return
                called = true
                reject(e)
            }
        } else {
            // 如果是普通值直接 resolve
            resolve(x)
        }


    }

    // catch 和 finally 都是 then 的语法糖，可以通过 then 实现
    public catch<TResult = never>(
        onRejected?: OnRejected<TResult>
    ): MyPromise<T | TResult> {
        return this.then(null, onRejected)
    }
    public finally(
        onFinally?: () => void
    ): MyPromise<T> {
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

    public static resolve<T>(value: T): MyPromise<T> {
        return new MyPromise((resolve) => resolve(value))
    }

    public static reject(reason: any): MyPromise<never> {
        return new MyPromise((_, reject) => reject(reason))
    }

}

console.log('1. Start');

const p = new MyPromise<string>((resolve, reject) => {
    console.log('2. Inside Executor (Sync)');
    setTimeout(() => {
        resolve('Success Data');
        console.log('4. Resolved');
    }, 1000);
});

p.then((data) => {
    console.log('5. Then 1 received:', data);
    return 'Chain Data'; // 返回普通值
})
    .then((data) => {
        console.log('6. Then 2 received:', data);
        // 返回一个新的 Promise
        return new MyPromise((resolve) => {
            setTimeout(() => resolve('Inner Promise Data'), 500);
        });
    })
    .then((data) => {
        console.log('7. Then 3 received:', data);
    });

console.log('3. End Sync');

// 输出顺序预测：
// 1. Start
// 2. Inside Executor (Sync)
// 3. End Sync
// ... (等待1秒) ...
// 4. Resolved
// 5. Then 1 received: Success Data
// 6. Then 2 received: Chain Data
// ... (等待0.5秒) ...
// 7. Then 3 received: Inner Promise Data