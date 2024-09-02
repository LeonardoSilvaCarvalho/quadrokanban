<?php

include '../../conn/conn.php';

// Verifique se os dados necessários foram enviados via POST
if(isset($_POST['id']) && isset($_POST['time_spent'])) {
    // Obtém os dados enviados via POST
    $id = $_POST['id'];
    $time_spent = $_POST['time_spent'];

    // Converte o tempo gasto de segundos para o formato 'HH:MM:SS'
    $formatted_time_spent = gmdate('H:i:s', $time_spent);

    // Atualize o campo time_spent no banco de dados
    $sql = "UPDATE tasks SET time_spent = :time_spent WHERE id = :id";

    try {
        // Prepara a declaração SQL para execução
        $stmt = $pdo->prepare($sql);
        
        // Vincula os parâmetros com os valores
        $stmt->bindParam(':time_spent', $formatted_time_spent, PDO::PARAM_STR); // Use PDO::PARAM_STR para dados de tipo TIME
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        
        // Executa a declaração
        if($stmt->execute()) {
            // Retorna uma resposta de sucesso
            echo json_encode(array('status' => 'success', 'message' => 'Campo time_spent atualizado com sucesso.'));
        } else {
            // Retorna uma resposta de erro se a execução falhar
            echo json_encode(array('status' => 'error', 'message' => 'Falha ao atualizar o campo time_spent.'));
        }
    } catch(PDOException $e) {
        // Retorna uma resposta de erro se ocorrer uma exceção
        echo json_encode(array('status' => 'error', 'message' => 'Erro ao atualizar o campo time_spent: ' . $e->getMessage()));
    }
} else {
    // Retorna uma resposta de erro se os dados não foram enviados corretamente
    echo json_encode(array('status' => 'error', 'message' => 'Dados incompletos.'));
}
?>
