<?php
$target_dir = "Kodi/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Verifica se é uma imagem
if (isset($_POST["submit"])) {
    $check = getimagesize($_FILES["file"]["tmp_name"]);
    if ($check !== false) {
        echo "O arquivo é uma imagem - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "O arquivo não é uma imagem.";
        $uploadOk = 0;
    }
}

// Verifica se o arquivo já existe
if (file_exists($target_file)) {
    echo "Desculpe, o arquivo já existe.";
    $uploadOk = 0;
}

// Verifica o tamanho do arquivo
if ($_FILES["file"]["size"] > 3000000) { // 3 MB em bytes
    echo "Desculpe, o arquivo é muito grande. Limite é 3 MB.";
    $uploadOk = 0;
}

// Se houver algum problema, exibe mensagem de erro
if ($uploadOk == 0) {
    echo "Desculpe, seu arquivo não foi enviado.";
// Se tudo estiver correto, tenta fazer o upload
} else {
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        echo "O arquivo ". htmlspecialchars(basename($_FILES["file"]["name"])) . " foi enviado com sucesso.";
        echo '<meta http-equiv="refresh" content="2;url=index.html">'; // Redireciona para index.html após 2 segundos
    } else {
        echo "Desculpe, ocorreu um erro ao enviar seu arquivo.";
    }
}
?>