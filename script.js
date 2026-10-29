console.log("sprint test dengan localStorage");

let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");
let addButton = document.getElementById("addButton");

// 1. Ambil data dari localStorage saat aplikasi dimuat
let savedTasks = localStorage.getItem("myTasks");
let tasks = savedTasks ? JSON.parse(savedTasks) : [];

// Fungsi untuk menyimpan data ke localStorage
function saveTasks() {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

function renderList() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerText = task;

        let button = document.createElement("button");
        button.classList.add("deleteButton");
        button.innerText = "Delete";
        button.addEventListener("click", () => {
            deleteTask(index);
        });

        li.appendChild(button);
        taskList.appendChild(li);
    });
}

function addList() {
    let task = taskInput.value.trim();

    if (task === "") {
        alert("tugas tidak boleh kosong");
    } else {
        tasks.push(task);
        
        saveTasks(); // 2. Simpan setiap kali tugas ditambah
        renderList();

        taskInput.value = "";
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    
    saveTasks(); // 3. Simpan setiap kali tugas dihapus
    renderList();   
}

// Jalankan render awal saat halaman dibuka
renderList();

addButton.addEventListener('click', addList);
taskInput.addEventListener("keypress", (tombol) => {
    if (tombol.key === "Enter") {
        addList();
    }
});