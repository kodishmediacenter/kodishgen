<?php
// Verifica se o código foi enviado via método POST
if(isset($_POST['codigo'])) {
    // Obtém o código enviado pelo usuário
    $codigo = $_POST['codigo'];
    
    // Redireciona para o site aftv.news com o código como parte do URL
    header("Location: https://aftv.news/$codigo");
    exit(); // Certifica-se de que o script PHP termina após o redirecionamento
} else {
    // Se o código não foi enviado, redireciona para uma página de erro ou exibe uma mensagem de erro
    echo "Código não fornecido.";
}
?>
