# Todo List Application

A simple, elegant and efficient Todo List web application built with vanilla JavaScript and HTML/CSS.

![Todo App](https://raw.githubusercontent.com/HitkarMiglani/TodoApp/refs/heads/master/image.png)

## Features

- **Create Tasks**: Add new tasks to your todo list
- **Mark as Completed**: Toggle tasks between completed and pending states
- **Delete Tasks**: Remove tasks you no longer need
- **Filter Tasks**: View all tasks, only pending tasks, or only completed tasks
- **Clear Completed**: Remove all completed tasks at once
- **Persistent Storage**: Tasks are saved in the browser's local storage
- **Responsive Design**: Works on desktop and mobile devices
- **Task Counters**: Shows the number of pending and completed tasks
- **Empty State Messages**: Helpful messages when there are no tasks in a category

## How to Use

1. **Add a Task**:

   - Type your task in the input field
   - Press Enter or click the "+" button

2. **Complete a Task**:

   - Click the checkbox next to a task to mark it as completed
   - Click again to mark it as pending

3. **Delete a Task**:

   - Click the "Delete" button next to the task

4. **Filter Tasks**:

   - Click "All" to view all tasks
   - Click "Pending" to view only pending tasks
   - Click "Completed" to view only completed tasks

5. **Clear Completed Tasks**:
   - Click "Clear Completed" to remove all completed tasks

## Technical Details

### Structure

- **HTML**: Basic structure with input field, buttons, and task container
- **CSS**: Embedded styles for a clean, modern UI
- **JavaScript**: Core functionality using vanilla JavaScript

### Code Organization

The JavaScript code is organized into several functions:

- **init()**: Initializes the application
- **setupEventListeners()**: Sets up all event listeners
- **addTask()**: Adds a new task to the list
- **renderTasks()**: Renders tasks based on the current filter
- **toggleTaskStatus()**: Toggles the status of a task
- **deleteTask()**: Removes a task from the list
- **storeTasks()**: Saves tasks to localStorage
- **getTasks()**: Retrieves tasks from localStorage

### Local Storage

Tasks are stored in the browser's localStorage, allowing them to persist between sessions. The data structure used is:

```javascript
[
  {
    id: 1,
    title: "Task name",
    status: "Pending", // or "Completed"
  },
  // more tasks...
];
```

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/HitkarMiglani/TodoApp.git
   ```

2. Open `index.html` in your browser

Or simply download the ZIP file and open `index.html` in your browser.

## Browser Support

This application works in all modern browsers including:

- Chrome
- Firefox
- Safari
- Edge

## Future Improvements

Potential future enhancements:

- Task priorities
- Due dates
- Categories/tags
- Search functionality
- Dark mode
- Cloud synchronization

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Created by [Hitkar Miglani](https://github.com/HitkarMiglani)
