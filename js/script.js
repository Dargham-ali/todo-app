
// تحديد العناصر الأساسية
let theme = document.querySelector('.theme'); 
let body = document.querySelector('.body'); 
let mid = document.querySelector('.mid'); 
let lower = document.querySelector('.lower'); 
let new_todo = document.querySelector('.new-todo'); 
let num = document.querySelector('.num'); 

// استرجاع المهام المخزنة عند تحميل الصفحة
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// تحميل المهام عند تشغيل الصفحة
function loadTasks() {
  lower.innerHTML = ''; // مسح المهام القديمة قبل التحميل
  tasks.forEach((task, index) => {
    let new_task = `
    <div class="task flex justify-start items-center w-96 pl-4 relative py-2" data-index="${index}">
      <input onclick="click_ch(${index})" class="hover:cursor-pointer" type="checkbox" ${task.completed ? 'checked' : ''}>
      <p class="par text-sm ml-4 bg-transparent text-[hsl(236,33%,92%)] hover:cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}">
      ${task.text}  
      </p>
      <i onclick="click_x(${index})"
      class="fa-solid fa-x text-[hsl(235,19%,35%)] hover:text-white transition absolute right-11 text-xs cursor-pointer"></i>
    </div>
    `;
    lower.innerHTML += new_task;
  });
  updateTaskCount();
}

// إضافة مهمة جديدة
function add_task() {
  if (new_todo.value.trim() !== '') {
    let task = {
      text: new_todo.value.trim(),
      completed: false
    };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    new_todo.value = ''; 
    loadTasks();
  } else {
    alert("Task Is Not Found !");
  }
}

// حذف المهمة عند الضغط على `X`
function click_x(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

// تحديث حالة المهمة عند التحديد
function click_ch(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

// تحديث عدد المهام المتبقية
function updateTaskCount() {
  let remainingTasks = tasks.filter(task => !task.completed).length;
  num.innerHTML = remainingTasks;
}

// تغيير الثيم (الوضع الليلي/النهاري)
function click_theme() {
  body.classList.toggle('bg-white');
  body.classList.toggle('bg-[url(images/bg-desktop-light.jpg)]');  
  mid.classList.toggle('bg-[hsl(236,33%,92%)]'); 
  new_todo.classList.toggle('text-black'); 
  lower.classList.toggle('bg-[hsl(236,33%,92%)]');
  let todos = document.querySelectorAll('.par'); 
  todos.forEach(todo => {
    todo.classList.toggle('text-black');
  });
}

// تحميل المهام عند تشغيل الصفحة
loadTasks();
