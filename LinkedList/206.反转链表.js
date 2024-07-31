/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
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
 * @return {ListNode}
 */
var reverseList = function(head) {
    let [pre, cur] = [null, head]
    while(cur) {
        const temp = cur.next // 保存链表节点地址
        cur.next = pre // 反转链表
        pre = cur // 移动指针
        cur = temp
    }
    return pre
};
// @lc code=end

