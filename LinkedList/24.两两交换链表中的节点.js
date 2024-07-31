/*
 * @lc app=leetcode.cn id=24 lang=javascript
 *
 * [24] 两两交换链表中的节点
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
var swapPairs = function(head) {
    // 创建头节点 创建指针
    let ret = new ListNode(0, head), temp = ret;
    while(temp.next && temp.next.next){
        let mid = temp.next, cur = temp.next.next;
        // 修改指向
        mid.next = cur.next;
        cur.next= mid
        temp.next = cur;

        // 移动指针
        temp = mid // 注意：此处的 mid 已经通过上方的指向变更为 temp.next.next
    }
    return ret.next;
};
// @lc code=end

