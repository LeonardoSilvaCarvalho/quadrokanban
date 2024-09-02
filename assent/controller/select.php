<?php

include '../../conn/conn.php';

// Método para selecionar as tarefas do banco de dados
function selectTask() {
    global $pdo;
    
    try {
        // Prepara a consulta SQL para selecionar todas as tarefas
        $stmt = $pdo->prepare("SELECT * FROM tasks");
        
        // Executa a consulta
        $stmt->execute();
        
        // Obtém todas as linhas de resultado como um array associativo
        $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Retorna o array de tarefas como JSON
        return json_encode($tasks);
    } catch (PDOException $e) {
        // Se ocorrer um erro, retorna uma mensagem de erro
        return json_encode(array("error" => "Erro ao selecionar as tarefas do banco de dados: " . $e->getMessage()));
    }
}

// Chama a função selectTask() e imprime o resultado
echo selectTask();
