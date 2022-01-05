require('colors');
const Task = require('./task');

class Tasks {
	_list = {};

	get listArr() {
		const list = [];
		Object.keys(this._list).forEach((key) => list.push(this._list[key]));

		return list;
	}

	constructor() {
		this._list = {};
	}

	loadTasks(tasks = []) {
		tasks.forEach((task) => (this._list[task.id] = task));
	}

	createTask(desc = '') {
		const task = new Task(desc);

		this._list[task.id] = task;
	}

	fullList() {
		console.log();

		if (this.listArr.length === 0) {
			console.log('No registered tasks');
		} else {
			this.listArr.forEach((task, i) => {
				const idx = `${i + 1}.`.green;
				const { desc, completedIn } = task;
				const state = completedIn ? 'Completed'.green : 'Pending'.red;

				console.log(`${idx} ${desc} :: ${state}`);
			});
		}
	}

	listCompletedORPendingTasks(completed = true) {
		console.log();
		let count = 0;
		this.listArr.forEach((task) => {
			const { desc, completedIn } = task;
			const state = completedIn ? `${completedIn}`.green : `${completedIn}`.red;

			if (completed) {
				if (completedIn) {
					count += 1;
					console.log(`${(count + '.').green} ${desc} :: ${state}`);
				}
			} else {
				if (!completedIn) {
					count += 1;
					console.log(`${(count + '.').green} ${desc} :: ${state}`);
				}
			}
		});
	}

	deleteTask(id = '') {
		if (this._list[id]) {
			delete this._list[id];
		}
	}

	toggleCompleted(ids = []) {
		ids.forEach((id) => {
			const task = this._list[id];

			if (!task.completedIn) {
				task.completedIn = new Date().toISOString();
			}
		});

		this.listArr.forEach((task) => {
			if (!ids.includes(task.id)) {
				this._list[task.id].completedIn = null;
			}
		});
	}
}

module.exports = Tasks;
