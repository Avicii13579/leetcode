/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
 * 思路：
 *  1、创建两个指针 pre，cur 别指向 null 和 head 节点
 *  2、遍历列表，如果 cur 存在，先保存 cur.next 节点为 temp
 *  3、指针转向，将 cur.next 指向前一个节点 pre，后移移动 pre 指向 cur，后移 cur 指向 temp
 *  4、返回 pre
 *  5、时间复杂度：O(n) 空间复杂度：O(1)
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

