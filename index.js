const predictUrl = "http://localhost:5000/predict";

const imageForm = document.querySelector("#image-form");
const imageSend = document.querySelector("#image-send");

// Altera a imagem conforme seleciona as imagens para envio
imageSend.addEventListener("change", (e) => {
    var selectedFile = e.target.files[0];
    var reader = new FileReader();

    var img = document.getElementById("image-selected");
    img.title = selectedFile.name;
    reader.onload = function(event) {
        img.src = event.target.result;
      };
    
    reader.readAsDataURL(selectedFile);
    document.getElementById("image-selected").style.visibility = "visible";

    // Mostra o botão de envio
    document.getElementById("button-send").style.visibility = "visible"

    // Oculta a saída do modelo
    document.getElementById("output").style.visibility = "hidden";
    document.getElementById("results-analysis").style.visibility = "hidden";
})


// Adiciona um evento ao formulário que é disparado quando o formulário é enviado
imageForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Oculta o botão de envio
    document.getElementById("button-send").style.visibility = "hidden"

    // Cria um objeto FormData e adiciona a imagem selecionada pelo usuário
    const formData = new FormData();
    formData.append('image', imageSend.files[0]);

    // Envia a imagem para o servidor usando a função postImage
    postImage(formData);
});

// Envia a imagem para o servidor e recebe a resposta
async function postImage(formData) {
    const response = await fetch(predictUrl, {
        method: "POST",
        body: formData,
    })

    // Converte a resposta em um objeto JSON
    const data = await response.json();

    console.log(data);
    viewPrediction(data);
}

function viewPrediction(prediction) {
    // Arruma as respostas do modelo
    let temp = prediction.map((x,i) => `${i+1}. ${x.anime} (${(x.probability*100).toFixed(2)}%)`)
    let breed = temp.reduce((acc,x)=>acc+x+'\n','')

    // Exibe a saída do modelo
    document.getElementById("result").innerText = breed;
    document.getElementById("output").style.visibility = "visible";

    // Exibe a análise dos resultados
    document.getElementById("results-analysis").style.visibility = "visible";
    document.getElementById("container-status").style.visibility = "visible";

}

// Vida do modelo
var life = 10;
document.getElementById("model-lifepoint").innerText = life;


// Função que aumenta a vida do modelo ao apertar sim
const buttonYes = document.getElementById("button-sim");
buttonYes.addEventListener("click", (e) => {
    if (life < 20) {
        life = life + 1;
        document.getElementById("model-lifepoint").innerText = life;
    } else if (life == 20) {
        life = 20;
        document.getElementById("game-win").style.visibility = "visible";
    }

    changeLifePoint(life, "yes");
});

// Função que reduz a vida do modelo ao apertar não
const buttonNo = document.getElementById("button-nao");
buttonNo.addEventListener("click", (e) => {
    if (life > 1) {
        life = life - 1;
        document.getElementById("model-lifepoint").innerText = life;
    
    } else {
        life = 0;
        document.getElementById("model-lifepoint").innerText = life;
        document.getElementById("game-over").style.visibility = "visible";
    }

    changeLifePoint(life, "no");
});

function changeLifePoint(life, type) {
    if (type === "no") {
        for (var i = 20; i > life; --i) {
            document.getElementById(`life-point-${i}`).style.visibility = "hidden";
        }
    
    } else {
        for (var i = 1; i <= life; ++i) {
            document.getElementById(`life-point-${i}`).style.visibility = "visible";
        }
    }
}