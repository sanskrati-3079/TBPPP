document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const taskCount = document.querySelector('.task-count');
    
    function updateTaskCount() {
        const count = taskList.children.length;
        taskCount.textContent = `${count} task${count !== 1 ? 's' : ''}`;
    }

    function createTask(taskText) {
        const li = document.createElement('li');
        li.classList.add('slide-in');
        
        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';
        
        const checkbox = document.createElement('div');
        checkbox.className = 'checkbox';
        
        const taskTextSpan = document.createElement('span');
        taskTextSpan.className = 'task-text';
        taskTextSpan.textContent = taskText;
        
        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-task';
        deleteButton.innerHTML = '×';
        
        taskContent.appendChild(checkbox);
        taskContent.appendChild(taskTextSpan);
        
        taskActions.appendChild(deleteButton);
        
        li.appendChild(taskContent);
        li.appendChild(taskActions);
        
        // Toggle completion
        checkbox.addEventListener('click', () => {
            li.classList.toggle('completed');
        });
        
        // Delete task
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            li.classList.add('fade-out');
            setTimeout(() => {
                li.remove();
                updateTaskCount();
            }, 300);
        });
        
        return li;
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText) {
            const li = createTask(taskText);
            taskList.appendChild(li);
            taskInput.value = '';
            updateTaskCount();
        }
    }

    // Add task handlers
    document.querySelector('.quick-add').addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Clear completed tasks
    document.getElementById('clear-completed').addEventListener('click', () => {
        const completedTasks = taskList.querySelectorAll('.completed');
        completedTasks.forEach(task => {
            task.classList.add('fade-out');
            setTimeout(() => {
                task.remove();
                updateTaskCount();
            }, 300);
        });
    });

    // Delete all tasks
    document.getElementById('delete-all').addEventListener('click', () => {
        const tasks = taskList.querySelectorAll('li');
        tasks.forEach((task, index) => {
            task.classList.add('fade-out');
            setTimeout(() => {
                task.remove();
                if (index === tasks.length - 1) {
                    updateTaskCount();
                }
            }, 300);
        });
    });
});