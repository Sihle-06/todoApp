const apiUrl = 'http://localhost:3000';

// Load tasks

async function loadTasks() {
  const response = await fetch(`${apiUrl}/Task`);
  const tasks = await response.json();

  const tasksDiv = document.getElementById('tasks');
  tasksDiv.innerHTML = ''; 

  tasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.setAttribute('data-status', task.task_status); 

    taskDiv.innerHTML = `
      <div class="task-details">
        <span><strong>Task Name:</strong> ${task.task_name}</span>
        <span><strong>Status:</strong> ${task.task_status}</span>
      </div>
      <div class="task-actions">
        <button class="update-btn" onclick="updateTask(${task.tasks_id})">Update</button>
        <button class="delete-btn" onclick="deleteTask(${task.tasks_id})">Delete</button>
      </div>
    `;

    tasksDiv.appendChild(taskDiv);
  });
}


document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    
    const taskName = document.getElementById('taskName').value;
    //const taskStatus = 'Pending'
  
    
    if (!taskName) {
      alert('Task name is required!');
      return;  
    }

    if(taskName.length > 20){
      alert('Task name cannot exceed 20 characters!');
      return;
    }
  
    try {
     
      const response = await fetch(`${apiUrl}/Task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task_name: taskName}),
      });
  
      if (response.ok) {
        
        loadTasks();
        e.target.reset();
      } else {        
        const errorMessage = await response.text();
        alert('Failed to add task: ' + errorMessage);
      }
    } catch (error) {
      console.error('Error adding task:', error);
      alert('An error occurred while adding the task.');
    }
  });



async function updateTask(tasks_id) {
  try {
   
    const res = await fetch(`${apiUrl}/Task/${tasks_id}`);
    const taskData = await res.json();


    if (!taskData || taskData.length === 0) {
      console.error(`Task with ID ${tasks_id} not found.`);
      alert('Task not found.');
      return;
    }
    

    const task = Array.isArray(taskData) ? taskData[0] : taskData;


    if (task.task_status === 'Completed') {
      alert('Task cannot be updated. It is already completed.');
      return;
    }


    const newTaskName = prompt('Enter new task name:', task.task_name); 
    
    if(taskName.length > 20){
      alert('Task name cannot exceed 20 characters!');
      return;
    }



    const newTaskStatus = prompt('Enter new task status (Pending/Completed):', task.task_status);

   
    // Validate the new status input
    if (newTaskStatus.toLowerCase() !== 'pending' && newTaskStatus.toLowerCase() !== 'completed') {
      alert('Task status should be "Pending" or "Completed".');
      return;
    }

    // Ensure both task name and status are provided
    if (!newTaskName || !newTaskStatus) {
      alert('Task name and status are required!');
      return;
    }

    

    const response = await fetch(`${apiUrl}/Task/${tasks_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task_name: newTaskName, task_status: newTaskStatus }),
    });

    if (response.ok) {
      console.log(`Task ${tasks_id} updated successfully.`);
      await loadTasks(); // Reload tasks after updating
    } else {
      // Log error details for debugging
      const errorText = await response.text();
      console.error(`Failed to update task. Server response: ${errorText}`);
      alert('Failed to update task: ' + errorText);
    }
  } catch (error) {
    console.error('Error updating task:', error);
    alert('An error occurred while updating the task.');
  }
}


async function deleteTask(tasks_id) {
  const userConfirmed = confirm('Are you sure you want to delete this task?');

  if (!userConfirmed) {
    return;
  }

  const response = await fetch(`${apiUrl}/Task/${tasks_id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    loadTasks();
  } else {
    alert('Failed to delete task: ' + (await response.text()));
  }
}


loadTasks();