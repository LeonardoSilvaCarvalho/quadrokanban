<?php

include '../../conn/conn.php';

// Verifica se foi recebido um ID válido para exclusão
if (isset($_POST['id']) && !empty($_POST['id'])) {
    $id = $_POST['id'];

    try {
        // Prepara e executa a query de exclusão
        $sql = "DELETE FROM tasks WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(1, $id, PDO::PARAM_INT);
        
        if ($stmt->execute()) {
            // Retorna uma mensagem de sucesso
            echo json_encode(array("status" => "success", "message" => "Card excluído com sucesso"));
        } else {
            // Retorna uma mensagem de erro em caso de falha na execução da query
            echo json_encode(array("status" => "error", "message" => "Erro ao excluir o card"));
        }
    } catch (PDOException $e) {
        // Retorna uma mensagem de erro em caso de exceção PDO
        echo json_encode(array("status" => "error", "message" => "Erro ao excluir o card: " . $e->getMessage()));
    }

    // Fecha o statement
    $stmt->closeCursor();
} else {
    // Retorna uma mensagem de erro se o ID não foi recebido
    echo json_encode(array("status" => "error", "message" => "ID inválido"));
}

// Fecha a conexão com o banco de dados
$pdo = null;

?>
