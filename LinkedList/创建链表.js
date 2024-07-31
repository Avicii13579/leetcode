// js 实现链表

// 创建链表节点
class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

// 创建链表 
class LinkedList {
    constructor() {
        this.head = null;
    }

    // 添加节点
    add(val) {
        if (this.head === null) {
            this.head = new ListNode(val);
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = new ListNode(val);
        }
    }

    // 删除节点
    remove(val) {
        if (this.head === null) {
            return;
        }
        if (this.head.val === val) {
            this.head = this.head.next;
        } else {
            let current = this.head;
            while (current.next !== null) {
                if (current.next.val === val) {
                    current.next = current.next.next;
                    return;
                }
                current = current.next;
            }
        }
    }

    // 打印链表
    print() {
        let current = this.head;
        while (current !== null) {
            console.log(current.val);
            current = current.next;
        }
    }
}


// // Create a linked list with values 1, 2, 3
// const head = new ListNode(1);
// let current = head;
// current.next = new ListNode(2);
// current = current.next;
// current.next = new ListNode(3);

// // Print the linked list
// current = head;
// while (current !== null) {
//     console.log(current.val);
//     current = current.next;
// }

let linkedList = new LinkedList()
linkedList.add(1)
linkedList.add(2)
linkedList.add(3)
linkedList.add(4)

linkedList.print()
linkedList.remove(3)
linkedList.print()