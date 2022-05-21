const baseURL = "http://localhost:3000/atividades";


async function findAllAtividades() {
   
  const response = await fetch(`${baseURL}/todas-atividades`);

  const atividades = await response.json();

  atividades.forEach(function (atividades) {
    document.querySelector("#lista-tarefas").insertAdjacentHTML(
      "beforeend",
      `
    <div class="lista-tarefas">
      <ul id="lista-tarefas-li">
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

findAllAtividades();

function abrirModalPesquisa() {
  document.querySelector(".modal-overlay").style.display = "flex";

  //chama a função de pesquisa por ID
  findByIdAtividade();
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
        <ul id="lista-tarefas-li">
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
}

async function createAtividade() {
  const atividade = document.querySelector("#novaTarefa").value;

  const tarefa = { atividade };

  const response = await fetch(`${baseURL}/create`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(tarefa),
  });

  const novaTarefa = await response.json();

  const html = `
    <div class="lista-tarefas">
        <ul id="lista-tarefas-li">
            <li>
            <span class="span-id">${novaTarefa.id}</span>
                <span class="textoTarefa">${novaTarefa.atividade}</span>
                <div>
                <button class="btnEditar">
                    <i class="fa-solid fa-pencil"></i>
                </button>
                <button  onclick="abrirModalDelete(${novaTarefa.id})" class="btnApagar">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                </div>
            </li>
            </ul>
        </div> `;

  document
    .querySelector("#lista-tarefas")
    .insertAdjacentHTML("beforeend", html);

}

function abrirModalDelete(id) {
  document.querySelector("#overlay-delete").style.display = "flex";

  
  
}

function fecharModalDelete(id) {
  document.querySelector("#overlay-delete").style.display = "none";
  const btnSim = document.querySelector(".btn-delete-yes");

  btnSim.addEventListener("click", function () {
    deleteTarefa(id);
    
  });

}

async function deleteTarefa(id) {
  const response = await fetch(`${baseURL}/delete/${id}`, {
    method: "delete",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    mode: "cors",
  });

//   const result = await response.json();

   document.getElementById("lista-tarefas").innerHTML = "";

  fecharModalDelete();
  findAllAtividades();
}


