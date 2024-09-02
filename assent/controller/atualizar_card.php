<?php

include '../../conn/conn.php';

// Verifica se foram recebidos dados válidos para atualização do card
if (isset($_POST['id'], $_POST['name'], $_POST['description'], $_POST['priority'], $_POST['deadline'])) {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $description = $_POST['description'];
    $priority = $_POST['priority'];
    $deadline = $_POST['deadline'];

    try {
        // Prepara e executa a query de atualização
        $stmt = $pdo->prepare("UPDATE tasks SET name = ?, description = ?, priority = ?, deadline = ? WHERE id = ?");
        $stmt->bindParam(1, $name, PDO::PARAM_STR);
        $stmt->bindParam(2, $description, PDO::PARAM_STR);
        $stmt->bindParam(3, $priority, PDO::PARAM_STR);
        $stmt->bindParam(4, $deadline, PDO::PARAM_STR);
        $stmt->bindParam(5, $id, PDO::PARAM_INT);
        $stmt->execute();

        // Retorna uma mensagem de sucesso
        echo json_encode(array("status" => "success", "message" => "Card atualizado com sucesso"));
    } catch (PDOException $e) {
        // Retorna uma mensagem de erro em caso de falha na execução da query
        echo json_encode(array("status" => "error", "message" => "Erro ao atualizar o card: " . $e->getMessage()));
    }
} else {
    // Retorna uma mensagem de erro se algum dos dados não foi recebido
    echo json_encode(array("status" => "error", "message" => "Dados inválidos para atualização do card"));
}

?>
