/*
 * @lc app=leetcode.cn id=203 lang=javascript
 *
 * [203] 移除链表元素
 * 思路：
 *  1、创建一个虚拟头节点，next 指向原链表的头节点；创建一个指针 current 指向新的头节点
 *  2、当指针 current 指向的节点的 next 存在，判断 current.next.val 是否等于 val，若相等，则将 current.next 指向 current.next.next，否则，将 current 指向 current.next
 *  3、返回新的头节点的 next 节点
 *  4、时间复杂度：O(n) 空间复杂度：O(1)
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    // 生成一个头节点 并将 head 转化为链表形式
    const dummy = new ListNode(0,head)
    // current 只是一个指针 他的修改不会引起 dummy 的修改
    let current = dummy
    while(current.next) {
        if(current.next.val === val) {
            current.next = current.next.next
        } else {
            // 如果不相等 则继续遍历
            current = current.next
        }
    }
    return dummy.next

}
// @lc code=end

