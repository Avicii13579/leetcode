/*
 * @lc app=leetcode.cn id=142 lang=javascript
 *
 * [142] 环形链表 II
 * 思路：
 *  1、判断是否为环型链表：判断快慢指针是否出现相等，若相等则出现环，得到相交点
 *  2、找到环入口：慢指针从头节点开始，快指针从相交点开始每次移动一个，两个指针再次相遇时就是环入口
 *  3、https://programmercarl.com/0142.%E7%8E%AF%E5%BD%A2%E9%93%BE%E8%A1%A8II.html#%E6%80%9D%E8%B7%AF
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    if(!head || !head.next) return null
    let slow = head.next, fast = head.next.next
    
    // 判断环、获取环内相遇节点
    while(fast && fast.next && fast !== slow) {
        fast = fast.next .next
        slow = slow.next
    }
    if(!fast || !fast.next) return null

    // 现在 slow 和 fast 均在相遇点处
    slow = head // 此时 slow 从头开始，和 fast 从相遇点开始，每次只走一步，再次相遇的位置就是环入口节点
    while(fast !== slow) {
        slow = slow.next
        fast = fast.next
    }
    return slow
};
// @lc code=end

