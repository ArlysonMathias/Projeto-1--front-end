const baseURL = "http://localhost:3000/atividades";

async function findAllAtividades() {
  const response = await fetch(`${baseURL}/todas-atividades`);

  const atividades = await response.json();

  atividades.forEach(function (atividades) {
    document.querySelector("#lista-tarefas").insertAdjacentHTML(
      "beforeend",
      `
    <div class="lista-tarefas">
      <ul id="lista-tarefas-ul">
          <li>
            <span class="span-id">${atividades.id}</span>
            <span class="textoTarefa">${atividades.atividade}</span>
            <div>
              <button class="btnEditar">
                <i class="fa-solid fa-pencil"></i>
              </button>
              <button onclick="abrirModalDelete(${atividades.id})" class="btnApagar">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </li>
      </ul>
    </div>   
       `
    );
  });
}

async function abrirModalPesquisa() {
  const id = document.querySelector("#pesquisar-id").value;
  let confirmeId = 0;
  console.log(id);

  const response = await fetch(`${baseURL}/todas-atividades`);

  const atividades = await response.json();

  atividades.forEach(function (index) {
    if (index.id == id) {
      confirmeId++;
    }
  });

  if (confirmeId < 1) {
    alert("Id não encontrado");
  } else {
    document.querySelector(".modal-overlay").style.display = "flex";
    //chama a função de pesquisa por ID
    findByIdAtividade();
  }

  document.getElementById("pesquisar-id").value = "";
}

function fecharModal() {
  document.querySelector(".modal-overlay").style.display = "none";
}

async function findByIdAtividade() {
  const id = document.querySelector("#pesquisar-id").value;

  const response = await fetch(`${baseURL}/atividade/${id}`);

  const atividades = await response.json();

  const atividadeEscolhida = document.querySelector("#atividade-escolhida");

  atividadeEscolhida.innerHTML = `
    <div class="lista-tarefas">
        <ul id="lista-tarefas-ul">
            <li>
                <span class="textoTarefa">${atividades.atividade}</span>
                <div>
                <button class="btnEditar">
                    <i class="fa-solid fa-pencil"></i>
                </button>
                <button onclick="abrirModalDelete(${atividades.id})" class="btnApagar">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                </div>
            </li>
      </ul>
  </div>   
    `;

  document.getElementById("pesquisar-id").value = "";
}

findAllAtividades();
