<?php
// Incluir o arquivo de conexão com o banco de dados
include '../../conn/conn.php';

// Verificar se os índices do array $_POST estão definidos antes de acessá-los
$name = isset($_POST['name']) ? $_POST['name'] : '';
$description = isset($_POST['description']) ? $_POST['description'] : '';
$priority = isset($_POST['priority']) ? $_POST['priority'] : '';
$deadline = isset($_POST['deadline']) ? $_POST['deadline'] : '';
$column_id = isset($_POST['column']) ? $_POST['column'] : '';
$time_spent = isset($_POST['time_spent']) ? $_POST['time_spent'] : '00:00:00'; // Adiciona um valor padrão para time_spent

if (empty($deadline)) {
    $deadline = null;
}

if (isset($_POST['acao']) && $_POST['acao'] == 'cadastrar') {
    // Chamar a função para inserir dados
    inserirDados($pdo, $name, $description, $priority, $deadline, $column_id, $time_spent);
}

// Função para inserir dados no banco de dados usando PDO
function inserirDados($pdo, $name, $description, $priority, $deadline, $column_id, $time_spent) {
    try {
        // Preparar a declaração SQL
        $stmt = $pdo->prepare("INSERT INTO tasks (name, description, priority, deadline, column_id, time_spent) VALUES (:name, :description, :priority, :deadline, :column_id, :time_spent)");
        
        // Vincular parâmetros
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':priority', $priority);
        
        // Verificar se deadline não é null antes de vincular
        if ($deadline !== null) {
            $stmt->bindParam(':deadline', $deadline);
        } else {
            $stmt->bindValue(':deadline', null, PDO::PARAM_NULL);
        }
        
        $stmt->bindParam(':column_id', $column_id);
        $stmt->bindParam(':time_spent', $time_spent);

        // Executar a declaração
        $stmt->execute();

        echo "Dados inseridos com sucesso.";
    } catch(PDOException $e) {
        echo "Erro ao inserir dados: " . $e->getMessage();
    }
}
?>
