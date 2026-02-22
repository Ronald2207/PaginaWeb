// Função para abrir o modal
function openPaymentModal(planName, planPrice) {
    const modal = document.getElementById('paymentModal');
    const nameElement = document.getElementById('modal-plan-name');
    const priceElement = document.getElementById('modal-plan-price');
    const pixMsg = document.getElementById('status-msg');

    // Atualiza o conteúdo do modal com as informações do plano clicado
    nameElement.textContent = "Você escolheu: " + planName;
    priceElement.textContent = planPrice;

    // Atualiza a instrução do PIX com o valor do plano selecionado
    if (pixMsg) {
        pixMsg.innerHTML = `Valor exato a transferir: <strong>${planPrice}</strong><br>Envie o comprovante no WhatsApp.`;
    }

    // Mostra o modal (usando Flex para centralizar)
    modal.style.display = 'flex';
}

// Função para fechar o modal
function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'none';
}

// Fechar o modal se o usuário clicar fora da caixa de conteúdo
window.onclick = function(event) {
    const modal = document.getElementById('paymentModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Lógica do PIX (Mostrar/Ocultar apenas)
document.getElementById('btn-pix').addEventListener('click', function() {
    const container = document.getElementById('pix-container');
    
    if (container.style.display === 'block') {
        container.style.display = 'none';
    } else {
        container.style.display = 'block';
    }
});

// Função para copiar a chave PIX
function copyPix() {
    const copyText = document.getElementById("pix-key");
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* Para mobile */
    navigator.clipboard.writeText(copyText.value);
    alert("Chave PIX copiada!");
}

// Adicionar lógica aos OUTROS botões de pagamento
document.querySelectorAll('.pay-btn:not(.pix)').forEach(button => {
    button.addEventListener('click', function() {
        alert('Redirecionando para o gateway de pagamento...');
        // Aqui você integraria com Stripe, PayPal, Mercado Pago, etc.
    });
});

// Animação ao rolar a página (Scroll Reveal)
window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        }
    }
}

// Ativar reveal uma vez ao carregar para pegar elementos já visíveis
reveal();

// --- CARREGAMENTO AUTOMÁTICO DA GALERIA ---
document.addEventListener("DOMContentLoaded", function() {
    const galleryContainer = document.querySelector('.gallery-grid');
    
    // Configuração: Quantas fotos tentar carregar?
    const maxPhotos = 50; 

    if (galleryContainer) {
        for (let i = 1; i <= maxPhotos; i++) {
            // Cria o elemento da imagem
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.style.display = 'none'; // Começa oculto para não mostrar erro

            const img = document.createElement('img');
            // Tenta carregar .jpg primeiro
            const basePath = `static/foto-galeria/${i}`;
            img.src = `${basePath}.jpg`;
            img.alt = `Treino ${i}`;

            // Se a imagem carregar com sucesso, mostra ela
            img.onload = function() { div.style.display = 'block'; };
            
            // Se der erro, tenta outras extensões comuns
            img.onerror = function() {
                if (this.src.endsWith('.jpg')) {
                    this.src = `${basePath}.jpeg`; // Tenta .jpeg
                } else if (this.src.endsWith('.jpeg')) {
                    this.src = `${basePath}.png`;  // Tenta .png
                } else if (this.src.endsWith('.png')) {
                    this.src = `${basePath}.jpg.jpg`; // Tenta erro comum do Windows (.jpg.jpg)
                } else {
                    div.remove();
                }
            };

            div.appendChild(img);
            galleryContainer.appendChild(div);
        }
    }
});
