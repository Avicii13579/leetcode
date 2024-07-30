/*
 * @lc app=leetcode.cn id=707 lang=javascript
 *
 * [707] 设计链表
 */

// @lc code=start

class LinkNode {
    constructor(val, next) {
        this.val = val;
        this.next = next;
    }
}

/**
 *  初始化链表 存储头尾节点 和 节点数量
 */
var MyLinkedList = function() {
    this.head = null
    this.tail = null
    this.size = 0
};

/** 
 * 获取链表内指定下标节点 如果下标不存在 返回 null
 * @param {number} index
 * @return {Node}
 */
MyLinkedList.prototype.getNode = function(index) {
    if(index < 0 || index >= this.size) return null;
    // 创建虚拟头节点
    let cur = new LinkNode(0, this.head);
    // 0 -> head
    while(index-- >= 0) {
        cur = cur.next;
    }
    return cur;
};

/** 
 * 链表基本功能一：获取链表指定位置的值
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
    if(index < 0 || index >= this.size) return -1
    if(!this.getNode(index)) {
        console.log('111：', index);
    }
    return this.getNode(index).val
};

/** 
 * 链表基本功能二：在链表头部添加元素
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
    // this._head 为 MyLinkedList 实例的头节点
    const node = new LinkNode(val, this.head)
    this.head = node
    this.size++
    if(!this.tail) { // 一直保持指向尾节点
        this.tail = node
    }
};

/** 
 * 链表基本功能三：在链表末尾添加元素
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
    const node = new LinkNode(val, null) // 尾节点的 next 为 null
    this.size ++
    if(this.tail) { 
        // 链表非空 存在尾元素
        this.tail.next = node
        this.tail = node // 尾指针指向新的尾节点
        return
    }
    this.head = node // 链表为空，头指针指向新节点
    this.tail = node // 链表为空，尾指针指向新节点
};

/** 
 * 链表基本功能四：在链表指定位置添加元素
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
    // 思路；获取传入下标的上一个节点，让新节点的 next 指向上一个节点的 next
    // 下标超出最大范围
    if(index > this.size) return
    // 在链表头部添加元素
    if(index <= 0) {
        this.addAtHead(val)
        return 
    }
    if(index === this.size) {
        this.addAtTail(val);
        return;
    }
    // 中间处理
    // // 获取上个链表节点
    // const prev = this.getNode(index - 1)
    // // 创建新节点 指向上一个节点的 next
    // const node = new LinkNode(val, prev.next)
    // // 让上一个节点的 next 指向新节点
    // prev.next = node
    // this.size++
        // 获取目标节点的上一个的节点
        const node = this.getNode(index - 1);
        node.next = new LinkNode(val, node.next);
        this.size++;
};

/**
 * 链表基本功能五：删除链表指定位置的元素 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
    if(index < 0 || index >= this.size) return
    // 删除链表头部元素
    if(index === 0) {
        this.head = this.head.next
        // 如果这个节点同时是 尾节点
        if(index === this.size - 1) {
            this.tail = this.head
        }
        this.size--
        return
    }
    // 删除链表中间元素 直接让 pre.next 指向 pre.next.next
    const prev = this.getNode(index - 1)
    prev.next = prev.next.next
    // 删除链表尾部元素
    if(index === this.size - 1) {
        this.tail = prev
    }
    this.size--
};


// var obj = new MyLinkedList()
// obj.addAtHead(7)
// obj.addAtHead(2)
// obj.addAtHead(1)

// obj.addAtIndex(3,0)
// obj.deleteAtIndex(2)

// obj.addAtHead(6)
// obj.addAtTail(4)
// console.log(obj.get(4));
// obj.addAtHead(4)
// obj.addAtIndex(5,0)
// obj.addAtHead(6)


// @lc code=end

