<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quadro Kanban</title>
    <link rel="shortcut icon" href="assent/image/icon.png" type="image/x-icon">
    <link rel="stylesheet" href="assent/css/style.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>

    <div class="header">
        <h1>Quadro Kanban</h1>
        <!-- <button class="primary" onclick="openModal()">Nova Tarefa</button> -->
    </div>

    <div class="container">

        <div class="column" data-column="1" ondrop="drop_handler(event)" ondragover="dragover_handler(event)">
            <div class="head">
                <span>A Fazer</span>
            </div>
                <div class="body">
                    <button class="add_btn" onclick="openModal(1)">
                        <span class="material-icons">add</span>
                        Adicionar Item
                    </button>
                    <div class="cards_list"></div>
                </div>
                <div class="cardAqui">
                    <b>Solte o card Aqui !</b>
                </div>
            </div>

        <div class="column" data-column="2" ondrop="drop_handler(event)" ondragover="dragover_handler(event)">
            <div class="head">
                <span>Em Progresso</span>
            </div>
                <div class="body">
                    <button class="add_btn" onclick="openModal(2)">
                        <span class="material-icons">add</span>
                        Adicionar Item
                    </button>
                    <div class="cards_list"></div>
                </div>
                <div class="cardAqui">
                    <b>Solte o card Aqui !</b>
                </div>
        </div>

        <div class="column" data-column="3" ondrop="drop_handler(event)" ondragover="dragover_handler(event)">
            <div class="head">
                <span>Finalizado</span>
            </div>
                <div class="body">
                    <button class="add_btn" onclick="openModal(3)">
                        <span class="material-icons">add</span>
                        Adicionar Item
                    </button>
                    <div class="cards_list"></div>
                </div>
                <div class="cardAqui">
                    <b>Solte o card Aqui !</b>
                </div>
        </div>

        <div class="column" data-column="4" ondrop="drop_handler(event)" ondragover="dragover_handler(event)">
            <div class="head">
                <span>Arquivado</span>
            </div>
                <div class="body">
                    <button class="add_btn" onclick="openModal(4)">
                        <span class="material-icons">add</span>
                        Adicionar Item
                    </button>
                    <div class="cards_list"></div>
                </div>
                <div class="cardAqui">
                    <b>Solte o card Aqui !</b>
                </div>
        </div>

    </div>

    <div id="modal">

        <div class="box">
            <div class="head">
                <span id="creationModeTitle">Nova tarefa</span>
                <span id="editingModeTitle">Editar tarefa</span>
                <span id="viewModeTitle">Ver tarefa</span>
                <button onclick="closeModal()" class="material-icons">close</button>
            </div>

            <div class="form">
                <input type="hidden" id="idInput">

                <div class="form-group">
                    <label for="name">Nome da Tarefa</label>
                    <input type="text" id="name">
                </div>

                <div class="form-group">
                    <label for="description">Descrição</label>
                    <textarea id="description"  rows="3"></textarea>
                </div>

                <div class="form-group">
                    <label for="priority">Prioridade</label>
                    <select id="priority">
                        <option>Baixa</option>
                        <option>Media</option>
                        <option>Alta</option>
                    </select>
                </div>
                
                <div class="form-group" style="display: none;">
                    <label for="column">Coluna</label>
                    <select id="column">
                        <option value="1">A Fazer</option>
                        <option value="2">Em Progresso</option>
                        <option value="3">Finalizado</option>
                        <option value="4">Arquivado</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="deadline">Prazo</label>
                    <input type="date" id="deadline" name="deadline">
                </div>

                <button class="primary" onclick="createTask()" id="creationModeBtn">Cadastrar</button>
                <button class="primary" onclick="updateTask()" id="editingModeBtn">Salvar alterações</button>

            </div>

        </div>

    </div>
    

    <script src="assent/js/momentjs.js"></script>
    <script src="assent/js/js.js"></script>

</body>
</html>