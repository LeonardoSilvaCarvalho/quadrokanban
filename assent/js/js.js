const $modal = document.getElementById("modal");
const $nameTarefa = document.getElementById("name");
const $descriptionInput = document.getElementById("description");
const $priorityInput = document.getElementById("priority");
const $deadlineInput = document.getElementById("deadline");
const $columnInput = document.getElementById("column");
const $idInput = document.getElementById("idInput");

const $creationModeTitle = document.getElementById("creationModeTitle");
const $editingModeTitle = document.getElementById("editingModeTitle");
const $viewModeTitle = document.getElementById("viewModeTitle");

const $creationModeBtn = document.getElementById("creationModeBtn");
const $editingModeBtn = document.getElementById("editingModeBtn");

// var tasks = localStorage.getItem("tasks");
// var taskList = tasks ? JSON.parse(tasks) : [];
var taskList = [];
selectTaskServidor();

var timers = {};
var lastId = 0; 

generateCards();


// gera id correspondentes a base de dados
function generateId() {
  const ids = taskList.map(task => task.id);
  const maxId = Math.max(...ids);
  return maxId >= 0 ? maxId + 1 : 0;
}


// modal
function openModal(data_column) {
  $modal.style.display = "flex";

  $columnInput.value = data_column;

  $creationModeTitle.style.display = "block";
  $creationModeBtn.style.display = "block";

  $editingModeTitle.style.display = "none";
  $editingModeBtn.style.display = "none";
  $viewModeTitle.style.display = "none";
}

function openModalToEdit(id) {
  $modal.style.display = "flex";

  $creationModeTitle.style.display = "none";
  $creationModeBtn.style.display = "none";
  $viewModeTitle.style.display = "none";

  $editingModeTitle.style.display = "block";
  $editingModeBtn.style.display = "block";

  const index = taskList.findIndex(function (task) {
    return task.id == id;
  });

  const task = taskList[index];

  $idInput.value = task.id;
  $nameTarefa.value = task.name;
  $descriptionInput.value = task.description;
  $priorityInput.value = task.priority;
  $deadlineInput.value = task.deadline;
  $columnInput.value = task.column;
}

function verConteudo(id) {
  $modal.style.display = "flex";

  $creationModeTitle.style.display = "none";
  $creationModeBtn.style.display = "none";
  $editingModeTitle.style.display = "none";
  $editingModeBtn.style.display = "none";

  $viewModeTitle.style.display = "block";

  const index = taskList.findIndex(function (task) {
    return task.id == id;
  });

  const task = taskList[index];

  $idInput.value = task.id;
  $nameTarefa.value = task.name;
  $descriptionInput.value = task.description;
  $priorityInput.value = task.priority;
  $deadlineInput.value = task.deadline;
  $columnInput.value = task.column;
}

function closeModal() {
  $modal.style.display = "none";

  $idInput.value = "";
  $nameTarefa.value = "";
  $descriptionInput.value = "";
  $priorityInput.value = "";
  $deadlineInput.value = "";
  $columnInput.value = "";
}


// colunas e cards (create, updade e delete)
function resetColumns() {
  document.querySelector('[data-column="1"] .body .cards_list').innerHTML = "";
  document.querySelector('[data-column="2"] .body .cards_list').innerHTML = "";
  document.querySelector('[data-column="3"] .body .cards_list').innerHTML = "";
  document.querySelector('[data-column="4"] .body .cards_list').innerHTML = "";
}

function generateCards() {
  resetColumns();

  taskList.forEach(function (task) {
    const formattedDate = moment(task.deadline).format("DD/MM/YYYY");

    const columnBody = document.querySelector(
      `[data-column="${task.column_id}"] .body .cards_list`
    );

    if (!columnBody) {
      return;
    }

    const isTaskInProgress = task.column_id == 2;

    // Recupera o tempo gasto salvo no localStorage
    const savedTimeSpent = localStorage.getItem(`timeSpent-${task.id}`);
    task.time_spent = savedTimeSpent !== null ? parseInt(savedTimeSpent) : task.time_spent;

    const card = `
        <div class="card ${isTaskInProgress ? "show-play-button" : ""}" id="card-${task.id}" ondblclick="openModalToEdit(${task.id})" draggable="true" ondragstart="dragstart_handler(event)">
        <div class="card_header">
            <div class="card_header_left">
                <b>${task.id}</b>
                <span>${task.name}</span>
            </div>
            <div class="card_header_right">
                <div class="viu_btn">
                    <button class="viu_btn" onclick="verConteudo(${task.id})">
                        <span class="material-icons">visibility</span>
                    </button>
                </div>
                <div class="del_btn">
                    <button class="del_btn" onclick="deleteTask(${task.id})">
                        <span class="material-icons">delete</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="card_content">
            <div class="info">
                <b>Descrição:</b>
                <span>${task.description}</span>
            </div>
            <div class="info">
                <b>Prioridade:</b>
                <span>${task.priority}</span>
            </div>
            <div class="info">
                <b>Prazo:</b>
                <span>${formattedDate}</span>
            </div>
        </div>
        <div class="time-display" id="timeDisplay-${task.id}">
            <span>${formatTime(task.time_spent)}</span>
        </div>
        <button class="play" style="${isTaskInProgress ? '' : 'display: none;'}" onclick="startTimer(${task.id})"><span class="material-icons">play_circle_outline</span></button>
        <button class="pause" style="${isTaskInProgress ? '' : 'display: none;'}" onclick="pauseTimer(${task.id})"><span class="material-icons">pause_circle_outline</span></button>
    </div>
    `;
    
    columnBody.innerHTML += card;
  });
}



// VER O TIME PARA FINALIZAR PROJETO
function selectTaskServidor() {
  $.ajax({
    type: "GET",
    url: "assent/controller/select.php",
    success: function (response) {
      // Atualiza a variável taskList com os dados recebidos do servidor
      taskList = JSON.parse(response);
      
      taskList.forEach(task => {
        task.time_spent = parseInt(task.time_spent);
      });

      // Gera os cards com base nos dados recebidos
      generateCards();
    },
    error: function (xhr, status, error) {
      console.error("Erro ao obter as tarefas do servidor:", error);
    }
  });
}





function createTask() {
  const newTask = {
    id: generateId(),
    name: $nameTarefa.value,
    description: $descriptionInput.value,
    priority: $priorityInput.value,
    deadline: $deadlineInput.value,
    column: parseInt($columnInput.value),
    timeSpent: 0,
    acao: 'cadastrar',
  };
  
  const isTaskInProgress = newTask.column == 2;

  
  if (isTaskInProgress) {
    newTask.inProgress = true;
  }

  taskList.push(newTask);

  localStorage.setItem("tasks", JSON.stringify(taskList));

  $.ajax({
    type: "POST",
    url: "assent/controller/cadastrar.php",
    data: newTask,
    success: function (response) {
        location.reload();
    },
    error: function (xhr, status, error) {
        console.error("Erro ao enviar os dados:", error);
    }
});

  closeModal();
  generateCards();
}

function updateTask() {
  const task = {
    id: $idInput.value,
    name: $nameTarefa.value,
    description: $descriptionInput.value,
    priority: $priorityInput.value,
    deadline: $deadlineInput.value,
  };

  $.ajax({
    type: "POST",
    url: "assent/controller/atualizar_card.php",
    data: task,
    success: function(response) {
      const result = JSON.parse(response);
      if (result.status === "success") {
        // console.log(result.message);
        // Atualize o card localmente
        const index = taskList.findIndex(t => t.id == task.id);
        if (index !== -1) {
          taskList[index] = task;
        }
        generateCards();
        
        // Atualiza os dados buscando do servidor
        selectTaskServidor();
      } else {
        console.error(result.message);
      }
    },
    error: function(xhr, status, error) {
      console.error("Erro ao atualizar o card:", error);
    }
  });

  closeModal();
}

function deleteTask(id) {
  const index = taskList.findIndex(function (task) {
    return task.id == id;
  });

  if (index !== -1) {
    taskList.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    generateCards();
  }
  $.ajax({
    type: "POST",
    url: "assent/controller/deletar.php",
    data: { id: id },
    success: function(response) {
      const result = JSON.parse(response);
      if (result.status === "success") {
        // Remova o card da lista
        generateCards();
        console.log(result.message);
      } else {
        console.error(result.message);
      }
    },
    error: function(xhr, status, error) {
      console.error("Erro ao excluir o card:", error);
    }
  });

}


// arrasta e solta
function changeColumn(task_id, column_id) {
  if (task_id && column_id) {
    const cardElement = document.getElementById(`card-${task_id}`);
    cardElement.draggable = true;
    
    // Atualize a column_id do card localmente
    taskList = taskList.map(task => {
      if (task.id == task_id) {
        task.column_id = column_id;
      }
      return task;
    });

    // Envie uma requisição AJAX para atualizar a column_id no servidor
    $.ajax({
      type: "POST",
      url: "assent/controller/atualizar_column_id.php",
      data: { id: task_id, column_id: column_id },
      success: function(response) {
        console.log("Column ID atualizada com sucesso:", response);
      },
      error: function(xhr, status, error) {
        console.error("Erro ao atualizar a Column ID:", error);
      }
    });

    generateCards();
  }
}

function dragstart_handler(ev) {
  ev.dataTransfer.setData("my_custom_data", ev.target.id);
  ev.dataTransfer.effectAllowed = "move";
}

function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}

function drop_handler(ev) {
  ev.preventDefault();
  const task_id = ev.dataTransfer.getData("my_custom_data").split("-")[1];
  const column_id = ev.target.dataset.column;

  changeColumn(task_id, column_id);
}





// VER O TIME PARA FINALIZAR PROJETO
//  time dos cards
function startTimer(taskId) {
  if (timers[taskId]) return;

  const task = taskList.find(task => task.id === taskId);
  if (!task) return;

  const savedTimeSpent = localStorage.getItem(`timeSpent-${taskId}`);
  if (savedTimeSpent !== null && savedTimeSpent !== undefined) {
    task.timeSpent = parseInt(savedTimeSpent);
  } else {
    task.timeSpent = 0; // Iniciar a contagem a partir de zero se não houver tempo salvo
  }

  const playButton = document.querySelector(`#card-${taskId} .play`);
  if (playButton) {
    playButton.style.display = "none";
  }

  const pauseButton = document.querySelector(`#card-${taskId} .pause`);
  if (pauseButton) {
    pauseButton.style.display = "block";
  }

  timers[taskId] = setInterval(() => {
    if (!taskList.find((task) => task.id === taskId)) {
      clearInterval(timers[taskId]);
      delete timers[taskId];
      return;
    }
    task.timeSpent++;
    localStorage.setItem(`timeSpent-${taskId}`, task.timeSpent);
    updateTimeDisplay(taskId);
  }, 1000);
}

function pauseTimer(taskId) {
  if (!timers[taskId]) return;

  clearInterval(timers[taskId]);
  delete timers[taskId];

  const pauseButton = document.querySelector(`#card-${taskId} .pause`);
  if (pauseButton) {
    pauseButton.style.display = "none";
  }

  const playButton = document.querySelector(`#card-${taskId} .play`);
  if (playButton) {
    playButton.style.display = "block";
  }

  // Salvar o tempo gasto no localStorage
  const task = taskList.find(task => task.id === taskId);
    if (task) {
        localStorage.setItem(`timeSpent-${taskId}`, task.timeSpent); // Salva o tempo atualizado
    }
}


window.addEventListener('beforeunload', function() {
  for (const taskId in timers) {
    clearInterval(timers[taskId]);
    delete timers[taskId];
  }
});

function updateTimeDisplay(taskId) {
  const task = taskList.find(task => task.id === taskId);
  if (!task) return;

  const formattedTime = formatTime(task.timeSpent);

  const timeDisplay = document.querySelector(`#timeDisplay-${taskId} span`);
  if (timeDisplay) {
    timeDisplay.textContent = formattedTime;
  }

  // Atualize o valor do campo time_spent no banco de dados
  updateTaskTime(taskId, task.timeSpent);
}

function updateTaskTime(taskId, timeSpent) {
  $.ajax({
    type: "POST",
    url: "assent/controller/atualizar_time_spent.php",
    data: { id: taskId, time_spent: timeSpent },
    success: function(response) {
      console.log("Campo time_spent atualizado com sucesso:", response);
    },
    error: function(xhr, status, error) {
      console.error("Erro ao atualizar o campo time_spent:", error);
    }
  });
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}


function padZero(value) {
  return value < 10 ? `0${value}` : value;
}
