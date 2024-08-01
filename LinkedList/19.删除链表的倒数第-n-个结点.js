/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第 N 个结点
 * 思路：
 *  1、使用双指针法 + 虚拟头节点方法，slow 指针和 fast 指针之间相距 N 个节点
 *  2、 fast 和 slow 同时移动，当 fast.next 指针到达链表尾部为 null 时，slow 指针指向倒数第 N 个节点的前一个节点，便于对倒数第 N 个节点进行删除
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
   this.next = (next===undefined ? null : next)
 }
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let dummy = new ListNode(0, head)
    let fast = dummy, slow = dummy
    while(n--) fast = fast.next // 将 fast 指针移动 n 步
    while(fast.next !== null) { // 当 fast 指针到达链表尾部为 null 时，slow 指针指向倒数第 N 个节点的前一个节点
        fast = fast.next
        slow = slow.next
    }
    // 当 fast.next 为 null 时，slow 指针指向倒数第 N+1 个节点
    slow.next = slow.next.next
    return dummy.next

};
// @lc code=end

