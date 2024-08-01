/*
 * @lc app=leetcode.cn id=24 lang=javascript
 *
 * [24] 两两交换链表中的节点
 * 思路：
 *  1、创建一个虚拟头节点，next 指向原链表的头节点；创建一个指针 temp 指向新的头节点
 *  2、遍历链表，若当前节点的 next 和 next.next 都存在，则修改节点指向
 *  3、移动指针，加当前节点在内的三个节点为一个周期，进行转向
 *      3.1 创建指针 mid 指向 temp.next，创建指针 cur 指向 temp.next.next
 *      3.2 将 mid.next 指向 cur.next
 *      3.3 将 cur.next 指向 mid 
 *      3.4 将 temp.next 指向 cur （注意：此处的 mid 已经通过上方的指向变更到三个节点中的最后一个节点位置）
 *      3.5 移动指针 temp 指向 mid
 *  4、返回新的头节点的 next 节点
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
        temp = mid // 注意：此处的 mid 已经通过上方的指向变更到三个节点中的最后一个节点位置
    }
    return ret.next;
};
// @lc code=end

