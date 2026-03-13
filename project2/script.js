// 1. Maintain an array to store task details
let taskArray = [];

// 2. Select DOM elements
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

// 3. Register 'onsubmit' event programmatically
taskForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop page refresh

    // Capture values from form
    const title = document.getElementById('taskTitle').value;
    const priority = document.getElementById('taskPriority').value;
    const status = document.querySelector('input[name="status"]:checked').value;

    // Create task object with unique ID
    const task = {
        id: Date.now(),
        title: title,
        priority: priority,
        status: status
    };

    // Add to the array
    taskArray.push(task);

    // Add to the DOM
    addTaskToDOM(task);

    // Reset form
    taskForm.reset();
});

// Function to create and append the task <li>
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.className = `list-group-item task-item priority-${task.priority}`;
    li.setAttribute('data-id', task.id);

    // Build the inner HTML
    li.innerHTML = `
        <div class="task-info">
            <span class="task-title-text fw-bold ${task.status === 'completed' ? 'completed-task' : ''}">${task.title}</span>
            <br>
            <span class="badge bg-secondary text-uppercase">${task.priority}</span>
        </div>
        <div class="btn-group">
            <button class="btn btn-sm btn-outline-success complete-btn">Complete</button>
            <button class="btn btn-sm btn-outline-danger remove-btn">Remove</button>
        </div>
    `;

    // 4. Programmatically register 'Remove' event
    li.querySelector('.remove-btn').addEventListener('click', function() {
        removeTask(task.id, li);
    });

    // 5. Programmatically register 'Complete' event
    li.querySelector('.complete-btn').addEventListener('click', function() {
        markAsComplete(task.id, li);
    });

    taskList.appendChild(li);
}

// Logic to mark as complete
function markAsComplete(id, element) {
    // Update data in array
    const taskObj = taskArray.find(t => t.id === id);
    if (taskObj) taskObj.status = 'completed';

    // Programmatically update CSS style (requirement)
    const titleSpan = element.querySelector('.task-title-text');
    titleSpan.style.textDecoration = "line-through";
    titleSpan.classList.add('completed-task');
}

// Logic to remove task
function removeTask(id, element) {
    // Remove from array
    taskArray = taskArray.filter(t => t.id !== id);
    
    // Remove from DOM
    element.remove();
}