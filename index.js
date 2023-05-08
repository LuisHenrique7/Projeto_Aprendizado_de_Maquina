const predictUrl = "http://127.0.0.1:5000/predict"

const imageForm = document.querySelector("#image-form")
const imageSend = document.querySelector("#image-send")


// Adiciona um evento ao formulário que é disparado quando o formulário é enviado
imageForm.addEventListener("submit", (e) => {
    e.preventDefault();

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
    // const div = document.createElement("div");
    // const prediction1 = document.createElement("p");
    // const prediction2 = document.createElement("p");
    // const prediction3 = document.createElement("p");
    // // const prediction1 = document.createElement("p");
    // // const prediction2 = document.createElement("p");
    // // const prediction3 = document.createElement("p");

    // const animes = Object.keys(prediction);
    let temp = prediction.map((x,i) => `${i+1}. ${x.anime} (${Math.round(x.probability*100)}%)`)

    let breed = temp.reduce((acc,x)=>acc+x+'\n','')

    document.getElementById("result").innerText = breed;

    // Perfumaria
    document.getElementById("output").style.visibility = "visible";

}