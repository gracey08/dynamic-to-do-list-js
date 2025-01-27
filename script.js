document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        const text = taskText || taskInput.value.trim();
    
        if (text === "") {
            alert("Please enter a task.");
            return;
        }
    
        // Create a new list item
        const li = document.createElement('li');
        li.textContent = text;
    
        // Create a new button for removing the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn'; // Note: Using className instead of classList.add
    
        // Add click event listener to remove button
        removeBtn.onclick = function() {
            taskList.removeChild(li);
            removeTaskFromStorage(text);
        };
    
        // Append the remove button to the list item
        li.appendChild(removeBtn);
    
        // Append the list item to the task list
        taskList.appendChild(li);
    
        // Clear the input field
        taskInput.value = '';
    
        if (save) {
            saveTaskToStorage(text);
        }
    }

    // Function to save a task to Local Storage
    function saveTaskToStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Event listener for the 'Add Task' button
    addButton.addEventListener('click', () => addTask());

    // Event listener for adding tasks with the Enter key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load existing tasks from Local Storage when the page loads
    loadTasks();
});