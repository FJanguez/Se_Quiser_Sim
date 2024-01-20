document.addEventListener('DOMContentLoaded', function () {
    var naoButton = document.getElementById('naoBtn');
    var simButton = document.getElementById('simBtn');
    var imagemContainer = document.getElementById('imagemContainer');

    naoButton.addEventListener('mousemove', function (e) {
        // Posição do mouse
        var mouseX = e.clientX;
        var mouseY = e.clientY;

        // Área ao redor do botão "Não" para teleportação
        var teleportArea = 100; // Ajuste conforme necessário

        // Posição do botão "Sim"
        var simButtonRect = simButton.getBoundingClientRect();

        // Posição do botão "Não"
        var buttonRect = this.getBoundingClientRect();
        var buttonX = buttonRect.left + buttonRect.width / 2;
        var buttonY = buttonRect.top + buttonRect.height / 2;

        // Calcula a distância euclidiana entre o mouse e o centro do botão "Não"
        var distance = Math.sqrt(Math.pow(mouseX - buttonX, 2) + Math.pow(mouseY - buttonY, 2));

        // Verifica se o mouse está na área ao redor do botão "Não"
        var isMouseNearNao = (
            mouseX >= buttonRect.left - teleportArea &&
            mouseX <= buttonRect.right + teleportArea &&
            mouseY >= buttonRect.top - teleportArea &&
            mouseY <= buttonRect.bottom + teleportArea
        );

        // Verifica se o mouse está perto do botão "Sim"
        var isMouseNearSim = (
            mouseX >= simButtonRect.left &&
            mouseX <= simButtonRect.right &&
            mouseY >= simButtonRect.top &&
            mouseY <= simButtonRect.bottom
        );

        // Teleporta o botão "Não" para uma posição bem longe se o mouse estiver na área ao redor do botão "Não"
        if (isMouseNearNao && !isMouseNearSim) {
            var randomX, randomY;
            do {
                randomX = Math.floor(Math.random() * (window.innerWidth - this.clientWidth));
                randomY = Math.floor(Math.random() * (window.innerHeight - this.clientHeight));
            } while (
                // Garante que o botão "Não" não se teleporte sobre o botão "Sim"
                (randomX >= simButtonRect.left && randomX <= simButtonRect.right) &&
                (randomY >= simButtonRect.top && randomY <= simButtonRect.bottom)
            );

            // Define a nova posição do botão "Não"
            this.style.position = 'absolute';
            this.style.left = randomX + 'px';
            this.style.top = randomY + 'px';

            // Desabilita temporariamente a interação com o botão "Sim"
            simButton.style.pointerEvents = 'none';

            // Restaura a interação com o botão "Sim" após um intervalo de tempo (por exemplo, 2 segundos)
            setTimeout(function () {
                simButton.style.pointerEvents = 'auto';
            }, 2000);
        }
    });

    // Adiciona um evento para reativar a interação com o botão "Sim" se o mouse sair do botão "Não"
    naoButton.addEventListener('mouseout', function () {
        simButton.style.pointerEvents = 'auto';
    });

    simButton.addEventListener('click', function () {
        // Exibe a imagem quando o botão "Sim" é clicado
        imagemContainer.style.display = 'block';
    });
});
