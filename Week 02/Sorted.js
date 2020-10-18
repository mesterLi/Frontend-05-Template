void function (win) {
	const swap = (arr, i, j) => {
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}

	class Sorted {
		constructor(data = [], compare = (a, b) => a - b) {
			this.data = data;
			this.compare = compare;
			this.firstData = [];
		}
		addFirst(v) {
			this.firstData.push(v);
		}
		clear() {
			this.data = [];
		}
		take() {
			const len = this.firstData.length;
			if (len !== 0) {
				[this.firstData[0], this.firstData[len - 1]] = [this.firstData[len - 1], this.firstData[0]];
				return this.firstData.pop();
			}
			let min = this.data[0];
			let minIndex = 0;
			for (let i = 1; i < this.length; i++) {
				if (this.compare(min, this.data[i]) > 0) {
					min = this.data[i];
					minIndex = i;
				}
			}
			swap(this.data, minIndex, this.length - 1);
			this.data.pop();
			return min;
		}
		insert(v) {
			this.data.push(v);
		}
		get length() {
			return this.data.length;
		}
	}
	win.Sorted = Sorted;
}(window)
