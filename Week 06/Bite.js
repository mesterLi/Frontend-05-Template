// 错误 对象行为改变状态只应该改变自己状态
// class People {
// 	constructor(name) {
// 		this.name = '小红'；
// 	}
// }
// class Dog {
// 	bite(People) {
//
// 	}
// }

class Dog {
	constructor() {
	}
	bite() {
	}
}

class People {
	hurt(hurtBeover) {
		// do something
	}
}
const people = new People();
people.hurt(new Dog().bite())
