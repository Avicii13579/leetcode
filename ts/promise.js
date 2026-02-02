class MyPromiseT {
    // 初始化状态
    state = 'pending'
    value = undefined
    reason = undefined

    // 观察者模式
    // 当 Promise 还处于 pending 时，如果还调用了 then，需要将回调存起来
    onFulfilledCallbacks = []
    onRejectedCallbacks = []

    constructor(executor) {
        // 处理 resolve 传入的是一个 Promise 情况
        const resolve = (value) => {
            if (value instanceof MyPromiseT) {
                value.then(resolve, reject)
                return
            }

            if (this.state === 'pending') {
                this.state = 'fulfilled'
                // 如果 value 是 PromiseLike，需要先解析它
                if (value && typeof value.then === 'function') {
                    value.then(
                        (resolvedValue) => {
                            this.value = resolvedValue
                            this.onFulfilledCallbacks.forEach(fn => fn())
                        },
                        reject
                    )
                } else {
                    this.value = value
                    // 执行所有订阅的成功回调
                    this.onFulfilledCallbacks.forEach(fn => fn())
                }
            }
        }

        const reject = (reason) => {
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
    then(onFulfilled, onRejected) {
        // 穿透处理，为 onFulfilled 添加默认值
        const onFulfilledFn = typeof onFulfilled === 'function' ? onFulfilled : (v) => v
        const onRejectedFn = typeof onRejected === 'function' ? onRejected : (e) => { throw e }

        const promise2 = new MyPromiseT((resolve, reject) => {
            // 封装统一的处理逻辑
            const handleCallback = (callback, data) => {
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
    resolvePromise(promise2, x, resolve, reject) {
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
                        (y) => {
                            if (called) return
                            called = true
                            // 递归解析 y 也有可能是个 Promise
                            this.resolvePromise(promise2, y, resolve, reject)
                        },
                        (r) => {
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

    static resolve(value) {
        return new MyPromiseT((resolve) => resolve(value))
    }

    static reject(reason) {
        return new MyPromiseT((_, reject) => reject(reason))
    }

    /**
     * Promise.all 实现
     * 接收一个 Promise 数组，当所有 Promise 都成功时返回结果数组
     * 只要有一个失败就立即 reject
     * @param {Array} promises - Promise 数组
     * @returns {MyPromiseT} 返回新的 Promise
     */
    static all(promises) {
        return new MyPromiseT((resolve, reject) => {
            // 处理空数组
            if (!Array.isArray(promises)) {
                return reject(new TypeError('Argument must be an array'))
            }

            if (promises.length === 0) {
                return resolve([])
            }

            const results = []
            let completedCount = 0
            const total = promises.length

            promises.forEach((promise, index) => {
                // 将每个元素都包装成 Promise（处理非 Promise 值）
                MyPromiseT.resolve(promise)
                    .then(value => {
                        results[index] = value
                        completedCount++

                        // 所有 Promise 都完成时才 resolve
                        if (completedCount === total) {
                            resolve(results)
                        }
                    })
                    .catch(error => {
                        // 任何一个失败就立即 reject
                        reject(error)
                    })
            })
        })
    }

    /**
     * Promise.race 实现
     * 返回最先完成的 Promise 结果（无论成功或失败）
     * @param {Array} promises - Promise 数组
     * @returns {MyPromiseT} 返回新的 Promise
     */
    static race(promises) {
        return new MyPromiseT((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject(new TypeError('Argument must be an array'))
            }

            if (promises.length === 0) {
                return
            }

            promises.forEach(promise => {
                // 第一个完成的 Promise 决定结果
                MyPromiseT.resolve(promise)
                    .then(resolve, reject)
            })
        })
    }

    /**
     * Promise.allSettled 实现
     * 等待所有 Promise 完成（无论成功或失败）
     * 返回每个 Promise 的状态和结果
     * @param {Array} promises - Promise 数组
     * @returns {MyPromiseT} 返回新的 Promise
     */
    static allSettled(promises) {
        return new MyPromiseT((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject(new TypeError('Argument must be an array'))
            }

            if (promises.length === 0) {
                return resolve([])
            }

            const results = []
            let completedCount = 0
            const total = promises.length

            promises.forEach((promise, index) => {
                MyPromiseT.resolve(promise)
                    .then(
                        value => {
                            results[index] = { status: 'fulfilled', value }
                            completedCount++
                            if (completedCount === total) {
                                resolve(results)
                            }
                        },
                        reason => {
                            results[index] = { status: 'rejected', reason }
                            completedCount++
                            if (completedCount === total) {
                                resolve(results)
                            }
                        }
                    )
            })
        })
    }

    /**
     * Promise.any 实现
     * 只要有一个 Promise 成功就返回
     * 所有都失败才 reject（返回 AggregateError）
     * @param {Array} promises - Promise 数组
     * @returns {MyPromiseT} 返回新的 Promise
     */
    static any(promises) {
        return new MyPromiseT((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject(new TypeError('Argument must be an array'))
            }

            if (promises.length === 0) {
                return reject(new AggregateError([], 'All promises were rejected'))
            }

            const errors = []
            let rejectedCount = 0
            const total = promises.length

            promises.forEach((promise, index) => {
                MyPromiseT.resolve(promise)
                    .then(
                        value => {
                            // 第一个成功就 resolve
                            resolve(value)
                        },
                        reason => {
                            errors[index] = reason
                            rejectedCount++
                            // 所有都失败才 reject
                            if (rejectedCount === total) {
                                reject(new AggregateError(errors, 'All promises were rejected'))
                            }
                        }
                    )
            })
        })
    }
}

console.log('1. Start');

const chainTest = new MyPromiseT((resolve, reject) => {
    console.log('2. Inside Executor (Sync)');
    setTimeout(() => {
        resolve('Success Data');
        console.log('4. Resolved');
    }, 1000);
});

chainTest.then((data) => {
    console.log('5. Then 1 received:', data);
    return 'Chain Data'; // 返回普通值
})
    .then((data) => {
        console.log('6. Then 2 received:', data);
        // 返回一个新的 Promise
        return new MyPromiseT((resolve) => {
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

// ==================== Promise.all 测试 ====================
console.log('\n========== Promise.all 测试 ==========');

// 测试1：所有 Promise 都成功
const promise1 = MyPromiseT.resolve(1);
const promise2 = new MyPromiseT((resolve) => setTimeout(() => resolve(2), 100));
const promise3 = MyPromiseT.resolve(3);

MyPromiseT.all([promise1, promise2, promise3])
    .then(results => {
        console.log('All 成功:', results); // [1, 2, 3]
    })
    .catch(error => {
        console.log('All 失败:', error);
    });

// 测试2：有一个 Promise 失败
const promise4 = MyPromiseT.resolve(4);
const promise5 = MyPromiseT.reject('Error 5');
const promise6 = MyPromiseT.resolve(6);

MyPromiseT.all([promise4, promise5, promise6])
    .then(results => {
        console.log('All 成功:', results);
    })
    .catch(error => {
        console.log('All 失败（预期）:', error); // Error 5
    });

// ==================== Promise.race 测试 ====================
console.log('\n========== Promise.race 测试 ==========');

const fast = new MyPromiseT((resolve) => setTimeout(() => resolve('快的'), 100));
const slow = new MyPromiseT((resolve) => setTimeout(() => resolve('慢的'), 500));

MyPromiseT.race([fast, slow])
    .then(result => {
        console.log('Race 结果:', result); // '快的'
    });

// ==================== Promise.allSettled 测试 ====================
console.log('\n========== Promise.allSettled 测试 ==========');

const settledP1 = MyPromiseT.resolve(100);
const settledP2 = MyPromiseT.reject('失败了');
const settledP3 = new MyPromiseT((resolve) => setTimeout(() => resolve(300), 200));

MyPromiseT.allSettled([settledP1, settledP2, settledP3])
    .then(results => {
        console.log('AllSettled 结果:', results);
        // [
        //   { status: 'fulfilled', value: 100 },
        //   { status: 'rejected', reason: '失败了' },
        //   { status: 'fulfilled', value: 300 }
        // ]
    });

// ==================== Promise.any 测试 ====================
console.log('\n========== Promise.any 测试 ==========');

const rejectP1 = MyPromiseT.reject('错误1');
const successP2 = new MyPromiseT((resolve) => setTimeout(() => resolve('成功2'), 150));
const rejectP3 = MyPromiseT.reject('错误3');

MyPromiseT.any([rejectP1, successP2, rejectP3])
    .then(result => {
        console.log('Any 成功（预期）:', result); // '成功2'
    })
    .catch(error => {
        console.log('Any 失败:', error);
    });

// 测试：所有都失败
const allReject1 = MyPromiseT.reject('错误A');
const allReject2 = MyPromiseT.reject('错误B');

MyPromiseT.any([allReject1, allReject2])
    .then(result => {
        console.log('Any 成功:', result);
    })
    .catch(error => {
        console.log('Any 全部失败（预期）:', error.message); // All promises were rejected
    });

