export interface Task {
	id: string;
	title: string;
	status: 'todo' | 'doing' | 'done';
}

class TaskList {
	tasks = $state<Task[]>([]);
	currentInput = $state('');

	addTask() {
		if (this.currentInput.trim() === '') return;

		const newTask: Task = {
			id: crypto.randomUUID(),
			title: this.currentInput,
			status: 'todo'
		};
		this.tasks.push(newTask);
		this.currentInput = '';
	}

	deleteTask(id: string) {
		this.tasks = this.tasks.filter((t) => t.id != id);

		if(focusState.activeTaskId === id) {
			focusState.activeTaskId = null;
			focusState.isActive = false;
		}
	}

	todoTasks = $derived(this.tasks.filter((t) => t.status === 'todo'));
	doingTasks = $derived(this.tasks.filter((t) => t.status === 'doing'));
	doneTasks = $derived(this.tasks.filter((t) => t.status === 'done'));

setActiveTask(id: string) {
        this.tasks.forEach(t => {
            if (t.id === id) {
                // Jangan reset kalau sudah 'done'
                if (t.status !== 'done') t.status = 'todo'; 
                focusState.activeTaskId = id;
            } else {
                // Kembalikan task lain yang 'doing' ke 'todo'
                if (t.status === 'doing') t.status = 'todo';
            }
        });
    }
	setDoneTask (id: string | null) {
		const task = this.tasks.find(t => t.id === id)
		if (task) {
			task.status = 'done'
			focusState.isActive = false;
		}
		console.log("After Set to Done",task)
	}
}

export const taskList = new TaskList();

type Mode = 'promordo' | 'short-break' | 'long-break';
class FocusState {
	config = {
		'promordo': 2,
		'short-break': 2,
		'long-break': 2
	};

	mode = $state<Mode>('promordo');
	cycleCount = $state(0);
	time = $state(10);
	tasks = $state<Task[]>([]);
	seconds = $state(60 * this.time);
	isActive = $state(true);
	activeTaskId = $state<string | null>(null);

	modeLabel = $derived(
		{
			'promordo': 'Promordo',
			'short-break': 'Short Break',
			'long-break': 'Long Break'
		}[this.mode]
	);

	// switchPromordo(id:string) {

	// }

	nextMode() {
		this.isActive = true;
		if (this.mode === 'promordo') {
			this.cycleCount++;

			if (this.cycleCount % 4 === 0) {
				this.mode = 'long-break';
			} else {
				this.mode = 'short-break';

				// if (this.cycleCount >= 4 && this.mode === 'short-break') {
				// 	this.cycleCount = 0;
				// }
			}
		} else {
			this.mode = 'promordo';
		}
		this.seconds = this.config[this.mode] * 60;
	}

	displayTime = $derived({
		minutes: Math.floor(this.seconds / 60),
		secs: this.seconds % 60
	});

	activeTasks = $derived(taskList.tasks.find((t) => t.id === this.activeTaskId) || null);

	activeTaskTitle = $derived(this.activeTasks?.title || 'No Task');

	formattedTime = $derived(
		`${String(this.displayTime.minutes).padStart(2, '0')}:${String(this.displayTime.secs).padStart(2, '0')}`
	);

	toggleTimer() {
		this.isActive = !this.isActive;
	}
	change = $derived({
		newTime: this.time
	});
	changeTime(newTime: number) {
		this.time = newTime;
		this.seconds = 60 * this.time;
	}

	tick() {
		if (this.activeTaskId && this.isActive) {
			const currentTask = taskList.tasks.find((t) => t.id === this.activeTaskId);
			if (currentTask && currentTask.status !== 'doing') {
				currentTask.status = 'doing';
								console.log("this makes it 'doing'",currentTask.status)
			}
		}
		if (this.isActive && this.seconds > 0) {
			this.seconds -= 1;
		} else if (this.seconds === 0) {
			// this.isActive = false;
			this.nextMode();

			if (this.mode === 'long-break' || this.mode === 'short-break') {
				const currentTask = taskList.tasks.find((t) => t.id === this.activeTaskId);
				if (currentTask) {
					currentTask.status = 'done';
				}
			}
		}
	}
}
export const focusState = new FocusState();
