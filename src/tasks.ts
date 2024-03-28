const taskForm = document.querySelector<HTMLFormElement>(".form");
const formInput = document.querySelector<HTMLFormElement>(".form-input");

const taskListElement = document.querySelector<HTMLUListElement>(".list");

type Task = {
    description: string;
    isCompleted: boolean;
};

const tasks: Task[] = loadTasks();

tasks.forEach(renderTask);

function loadTasks(): Task[] {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
}

taskForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskDescription = formInput?.value;
    if (taskDescription) {
        const task: Task = {
            description: taskDescription,
            isCompleted: false,
        };
        addTask(task);
        renderTask(task);
        updateStorage();

        formInput.value = "";
        return;
    }
    alert("Please enter a task description");
});

function addTask(task: Task): void {
    tasks.push(task);
}

function renderTask(task: Task): void {
    const taskElement = document.createElement("li");
    taskElement.textContent = task.description;

    const taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskCheckbox.checked = task.isCompleted;

    taskCheckbox.addEventListener("change", () => {
        task.isCompleted = !task.isCompleted;
        updateStorage();
    });

    taskElement.appendChild(taskCheckbox);
    taskListElement?.appendChild(taskElement);
}

function updateStorage(): void {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
