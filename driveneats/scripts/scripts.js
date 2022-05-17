let precoPrato;
let precoBebida;
let precoSobremesa;

let nomePrato;
let nomeBebida;
let nomeSobremesa;

let total;

function converterNumero (preco) {
    preco = preco.replace("R$ ","").replace(",",".");
    
    preco = Number(preco) * 100;
    return preco;
}

function selecionarPrato (elemento) {
    
    //null OU elemento
    const itemSelecionado = document.querySelector(".pratos .selecionado");
    
    if (itemSelecionado !== null) {
        itemSelecionado.classList.remove("selecionado");
    }

    elemento.classList.add("selecionado");
    let preco = elemento.querySelector(".preco").innerHTML;
    nomePrato = elemento.querySelector(".titulo").innerHTML;
    precoPrato = converterNumero(preco);
    console.log(precoPrato)
    ativarPedido();
}

function selecionarBebida (elemento) {
    //null OU elemento
    const itemSelecionado = document.querySelector(".bebidas .selecionado");
    
    if (itemSelecionado !== null) {
        itemSelecionado.classList.remove("selecionado");
    }

    elemento.classList.add("selecionado");
    let preco = elemento.querySelector(".preco").innerHTML; 
    precoBebida = converterNumero(preco);
    nomeBebida = elemento.querySelector(".titulo").innerHTML;
    console.log(precoBebida)
    ativarPedido();
}

function selecionarSobremesa (elemento) {
    //null OU elemento
    const itemSelecionado = document.querySelector(".sobremesas .selecionado");
    
    if (itemSelecionado !== null) {
        itemSelecionado.classList.remove("selecionado");
    }

    elemento.classList.add("selecionado");
    let preco = elemento.querySelector(".preco").innerHTML; 
    precoSobremesa = converterNumero(preco);
    nomeSobremesa = elemento.querySelector(".titulo").innerHTML;
    console.log(precoSobremesa)
    ativarPedido();
}

function ativarPedido () {
    
    if (precoPrato !== undefined) {
        if (precoBebida !== undefined) {
            if (precoSobremesa !== undefined) {
                const botaoPedido = document.querySelector(".footer a");
                botaoPedido.classList.add("ativo");
                botaoPedido.innerHTML = "Fechar pedido";

            

                const total = precoPrato + precoBebida + precoSobremesa;
                const descricao = `Olá, gostaria de fazer o pedido:\n- Prato: ${nomePrato}\n- Bebida: ${nomeBebida}\n- Sobremesa: ${nomeSobremesa}\nTotal: R$ ${ (total/100).toFixed(2) }`;

                
                //botaoPedido.setAttribute("href", urlZapZap)
                //botaoPedido.setAttribute("target", "_blank")
            }
        }
        
    }
}

function fecharPedido () {
    
    if (precoPrato !== undefined) {
        if (precoBebida !== undefined) {
            if (precoSobremesa !== undefined) {
                const overlay = document.querySelector(".overlay");
                overlay.classList.remove("escondido");
                total = precoPrato + precoBebida + precoSobremesa;
 

                overlay.querySelector(".prato .nome").innerHTML = nomePrato;
                overlay.querySelector(".prato .preco").innerHTML = `R$ ${(precoPrato/100).toFixed(2)}`;

                overlay.querySelector(".bebida .nome").innerHTML = nomeBebida;
                overlay.querySelector(".bebida .preco").innerHTML = `R$ ${(precoBebida/100).toFixed(2)}`;

                overlay.querySelector(".sobremesa .nome").innerHTML = nomeSobremesa;
                overlay.querySelector(".sobremesa .preco").innerHTML = `R$ ${(precoSobremesa/100).toFixed(2)}`;

                overlay.querySelector(".total .preco-total").innerHTML = `R$ ${(total/100).toFixed(2)}`;

                
            }
        }
        
    }
}

function enviarPedido () {
    const descricao = `Olá, gostaria de fazer o pedido:\n- Prato: ${nomePrato}\n- Bebida: ${nomeBebida}\n- Sobremesa: ${nomeSobremesa}\nTotal: R$ ${ (total/100).toFixed(2) }`;
    const urlZapZap = `https://wa.me/55219999999999?text=${encodeURIComponent(descricao)}`;
    
    window.open(urlZapZap);
}

function cancelar () {
    const overlay = document.querySelector(".overlay").classList.add("escondido");
}

