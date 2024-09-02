<?php

include '../../conn/conn.php';

// Verifica se foram recebidos dados válidos para atualização da column_id
if (isset($_POST['id'], $_POST['column_id'])) {
    $id = $_POST['id'];
    $column_id = $_POST['column_id'];

    try {
        // Prepara e executa a query de atualização
        $stmt = $pdo->prepare("UPDATE tasks SET column_id = ? WHERE id = ?");
        $stmt->bindParam(1, $column_id, PDO::PARAM_INT);
        $stmt->bindParam(2, $id, PDO::PARAM_INT);
        $stmt->execute();

        // Retorna uma mensagem de sucesso
        echo json_encode(array("status" => "success", "message" => "Column ID atualizada com sucesso"));
    } catch (PDOException $e) {
        // Retorna uma mensagem de erro em caso de falha na execução da query
        echo json_encode(array("status" => "error", "message" => "Erro ao atualizar a Column ID: " . $e->getMessage()));
    }
} else {
    // Retorna uma mensagem de erro se o ID ou a nova column_id não foram recebidos
    echo json_encode(array("status" => "error", "message" => "ID ou nova Column ID inválidos"));
}

?>
