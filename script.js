let tasks = [];
        let taskIdCounter = 1;

        const taskInput = document.getElementById('taskInput');
        const todoList = document.getElementById('todoList');
        const totalTasksEl = document.getElementById('totalTasks');
        const completedTasksEl = document.getElementById('completedTasks');
        const pendingTasksEl = document.getElementById('pendingTasks');
        const clearAllBtn = document.getElementById('clearAllBtn');

        // Add task function
        function addTask() {
            const taskText = taskInput.value.trim();
            
            if (taskText === '') {
                alert('Please enter a task!');
                return;
            }

            const task = {
                id: taskIdCounter++,
                text: taskText,
                completed: false,
                createdAt: new Date()
            };

            tasks.push(task);
            taskInput.value = '';
            renderTasks();
            updateStats();
        }

        // Toggle task completion
        function toggleTask(taskId) {
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.completed = !task.completed;
                renderTasks();
                updateStats();
            }
        }

        // Delete task
        function deleteTask(taskId) {
            tasks = tasks.filter(t => t.id !== taskId);
            renderTasks();
            updateStats();
        }

        // Clear all tasks
        function clearAllTasks() {
            if (confirm('Are you sure you want to clear all tasks?')) {
                tasks = [];
                renderTasks();
                updateStats();
            }
        }

        // Render tasks
        function renderTasks() {
            if (tasks.length === 0) {
                todoList.innerHTML = `
                    <div class="empty-state">
                        <h3>No tasks yet</h3>
                        <p>Add your first task above to get started!</p>
                    </div>
                `;
                clearAllBtn.style.display = 'none';
                return;
            }

            clearAllBtn.style.display = 'block';
            
            todoList.innerHTML = tasks.map(task => `
                <div class="todo-item ${task.completed ? 'completed' : ''} new-item" data-id="${task.id}">
                    <div class="todo-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask(${task.id})"></div>
                    <div class="todo-text">${task.text}</div>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">×</button>
                </div>
            `).join('');

            // Remove animation class after animation completes
            setTimeout(() => {
                document.querySelectorAll('.new-item').forEach(item => {
                    item.classList.remove('new-item');
                });
            }, 300);
        }

        // Update statistics
        function updateStats() {
            const total = tasks.length;
            const completed = tasks.filter(t => t.completed).length;
            const pending = total - completed;

            totalTasksEl.textContent = total;
            completedTasksEl.textContent = completed;
            pendingTasksEl.textContent = pending;
        }

        // Event listeners
        taskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTask();
            }
        });

        // Focus on input when page loads
        taskInput.focus();

        // Initialize
        updateStats();
    
