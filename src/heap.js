class Heap {
    constructor(comparator) {
        this.heap = [];
        this.comparator = comparator
    }
    
    _getParentIndex(index) {
        const parentIndex = Math.floor((index-1)/2)
        if(parentIndex < 0) return null
        return parentIndex
    }
    
    _getFirstChildIndex(index) {
        const childIndex = Math.floor(2*index + 1)
        if(childIndex >= this.size()) return null
        return childIndex
    } 
    
    _getSecondChildIndex(index) {
        const childIndex = Math.floor(2*index + 2)
        if(childIndex >= this.size()) return null
        return childIndex
    }
    
    print() {
        console.log(this.heap)
    }
    
    size() {
        return this.heap.length
    }
    
    isEmpty() {
        return this.heap.length === 0
    }
    
    pop() {
        if(this.isEmpty()) return null
        const top = this.heap[0];
        const last = this.heap.pop();
        if(!this.isEmpty()) {
            this.heap[0] = last
            this._heapifyDown()
        }
        return top;
    }
    
    push(element) {
      this.heap.push(element)
      this._heapifyUp();
    }
    
    _heapifyUp() {
        let index = this.heap.length - 1
        while (index > 0) {
            const element = this.heap[index]
            const parentIndex = this._getParentIndex(index)
            if(parentIndex === null) return;
            const parentElement = this.heap[parentIndex];
            if(this.comparator(parentElement, element)) break;
            [this.heap[parentIndex], this.heap[index]] = [element, parentElement]
            index = parentIndex;
        }
        return
    }
    
    _heapifyDown() {
        let index = 0;
        while(true) {
            const leftIndex = this._getFirstChildIndex(index)
            const rightIndex = this._getSecondChildIndex(index)
            let swapIndex = null
            if(leftIndex != null && !this.comparator(this.heap[index], this.heap[leftIndex])) {
                swapIndex = leftIndex
            }
            if(rightIndex != null) {
                if(
                    swapIndex === null && !this.comparator(this.heap[index], this.heap[rightIndex]) ||
                    swapIndex !== null && !this.comparator(this.heap[leftIndex], this.heap[rightIndex])
                ) {
                    swapIndex = rightIndex
                }
            }
            if (swapIndex === null) break;
    
            [this.heap[index], this.heap[swapIndex]] = [this.heap[swapIndex], this.heap[index]];
            index = swapIndex;
        }
    }
}


const heap = new Heap((a, b)=>{
    return b-a > 0
})

const arr = [2, 3, 1, 4, 10, 0]

arr.forEach((e)=>{
    heap.push(e)
})

heap.print()

while(heap.size()) {
    console.log(heap.pop())
}
