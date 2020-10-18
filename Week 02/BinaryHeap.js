// 最大堆 当前索引值大于等于左右侧子节点
// 最小堆 当前索引值小于等于左右侧子节点
// 获取当前索引的左侧节点 index * 2 + 1
// 获取当前节点右侧节点 index * 2 + 2
// 获取某个节点父节点 Math.floor((index - 1) / 2)
// 实现最小二叉堆
void function (win) {
	const swap = (arr, i, j) => {
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	const sleep1 = function () {
		return new Promise((resolve) => {
			setTimeout(resolve, 100);
		})
	}
	class BinaryHeap {
		constructor(data, compareFn = (a, b) => a - b) {
			this.heap = data;
			this.compareFn = compareFn;
			this.init();
		}
		leftIndex(index) {
			return 2 * index + 1;
		}
		rightIndex(index) {
			return 2 * index + 2;
		}
		parentIndex(index) {
			return Math.floor((index - 1) / 2);
		}
		async init() {
			let parentIndex = this.parentIndex(this.length - 1);
			while (parentIndex >= 0) {
				this.shiftDown(parentIndex);
				parentIndex--;
			}
			console.log(this.heap);
		}
		take () {
			let min = this.heap[0];
			swap(this.heap, 0, this.length - 1);
			this.heap.pop();
			this.shiftDown(0);
			return min;
		}
		async shiftDown(index) {
			while (this.leftIndex(index) < this.length) {
				const leftIndex = this.leftIndex(index);
				const rightIndex = this.rightIndex(index);
				let minIndex = leftIndex;
				// 比较左右节点大小，假设左边大于右边，就那右边为最小与父节点对比
				if (rightIndex < this.length && this.compareFn(this.heap[leftIndex], this.heap[rightIndex]) > 0) {
					// console.log(this.heap[leftIndex], this.heap[rightIndex]);
					minIndex = rightIndex;
				}
				if (this.compareFn(this.heap[index], this.heap[minIndex]) > 0) {
					// console.log(this.heap[index], this.heap[minIndex]);
					// 交换位置
					swap(this.heap, index, minIndex);
					index = minIndex;
				} else {
					break;
				}
			}
			// console.log(this.heap);
		}
		insert(v) {
			this.heap.push(v);
			this.shiftUp(this.length - 1);
		}
		shiftUp(index) {
			// 父元素大于当前元素，交换位置
			while (index > 0 && this.compareFn(this.heap[this.parentIndex(index)], this.heap[index]) > 0) {
				const parentIndex = this.parentIndex(index);
				swap(this.heap, parentIndex, index);
				index = parentIndex;
			}
		}
		get length() {
			return this.heap.length;
		}
	}
	win.BinaryHeap = BinaryHeap;
}(window)

// var b = new BinaryHeap([3,1,2,5,4,8,0])
// b.take();
