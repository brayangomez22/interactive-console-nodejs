require('colors');

const { inquirerMenu, pause, readInput, listTasksToDelete, showCheckList, confirm } = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');

const main = async () => {
	let opt = '';
	const tasks = new Tasks();

	const tasksDB = readDB();

	if (tasksDB) {
		tasks.loadTasks(tasksDB);
	}

	do {
		opt = await inquirerMenu();

		switch (opt) {
			case '1':
				const desc = await readInput('Description: ');
				tasks.createTask(desc);
				break;
			case '2':
				tasks.fullList();
				break;
			case '3':
				tasks.listCompletedORPendingTasks((completed = true));
				break;
			case '4':
				tasks.listCompletedORPendingTasks((completed = false));
				break;
			case '5':
				const ids = await showCheckList(tasks.listArr);
				tasks.toggleCompleted(ids);
				break;
			case '6':
				const id = await listTasksToDelete(tasks.listArr);
				if (id !== '0') {
					const confirmDeletion = await confirm('Are you sure to delete the task?');

					if (confirmDeletion) {
						tasks.deleteTask(id);
						console.log('Task deleted successfully');
					} else {
						console.log('You have regretted deleting the task');
					}
				}
				break;
		}

		saveDB(tasks.listArr);

		if (opt !== '0') await pause();
	} while (opt !== '0');
};

main();
