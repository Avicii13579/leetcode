/*
 * @lc app=leetcode.cn id=160 lang=javascript
 *
 * [160] 相交链表
 * 思路：
 *  1、判断链表相交，所以两个链表尾部一定是对齐且合并的
 *  2、当两个链表长度不相等时，长链表的指针需要后移 长链表和短链表长度差个节点长度
 *  3、当两个链表指针指向的值一致时，即为相交点，直接返回，若无相交点返回 null
 *  时间复杂度：O(N + M) 空间复杂度：O(1)
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

//  获取链表长度
var getListLen = function (head) {
    let cur = head
    let len = 0
    while(cur) {
        len ++
        cur = cur.next
    }
    return len
}

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    let curA = headA, curB = headB, lenA = getListLen(headA), lenB = getListLen(headB);
    if(lenA < lenB) { // 确保 lenA 大于等于 lenB，进行值交换
        // 交换变量注意加 “分号” ，两个数组交换变量在同一个作用域下时
        // 如果不加分号，下面两条代码等同于一条代码: [curA, curB] = [lenB, lenA]
        [curA, curB] = [curB, curA];
        [lenA, lenB] = [lenB, lenA];
    }

    let index = lenA - lenB // 求差值
    while(index--) {
        curA = curA.next // 长链表指针后移
    }

    while(curA && curA !== curB) { // 当 curA 存在且 curA 和 curB 不相等时，两指针同时后移
        curA = curA.next
        curB = curB.next
    }

    return curA
};
// @lc code=end

