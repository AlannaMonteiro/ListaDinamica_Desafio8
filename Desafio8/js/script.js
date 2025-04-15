document.addEventListener("DOMContentLoaded", function () {
    const inputTarefa = document.querySelector("input[type='text']");
    const botaoAdicionar = document.querySelector("button");
    const lista = document.querySelector("#list-task");
  
    // Recuperar as tarefas salvas do localStorage
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  
    // Função para salvar as tarefas no localStorage
    function salvarTarefas() {
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
  
    // Função para criar cada item de tarefa
    function criarTarefa(texto, index, concluida = false) {
      const li = document.createElement("li");
      li.classList.add("task");
  
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("btn-checkbox");
      checkbox.checked = concluida;
  
      const paragrafo = document.createElement("p");
      paragrafo.textContent = texto;
      if (concluida) {
        paragrafo.classList.add("task-button", "completed");
      }
  
      const divButtons = document.createElement("div");
      divButtons.classList.add("icons");
  
      const botaoEditar = document.createElement("a");
      botaoEditar.href = "#atualizar";
      const imgEditar = document.createElement("img");
      imgEditar.src = "./img/PencilSimple.png";
      imgEditar.alt = "Editar";
      botaoEditar.appendChild(imgEditar);
  
      const botaoExcluir = document.createElement("a");
      botaoExcluir.href = "#deletar";
      const imgExcluir = document.createElement("img");
      imgExcluir.src = "./img/Trash.png";
      imgExcluir.alt = "Excluir";
      botaoExcluir.appendChild(imgExcluir);
  
      divButtons.appendChild(botaoEditar);
      divButtons.appendChild(botaoExcluir);
  
      li.appendChild(checkbox);
      li.appendChild(paragrafo);
      li.appendChild(divButtons);
  
      // Event listener editar tarefa
      botaoEditar.addEventListener("click", function () {
        editarTarefa(paragrafo, index);
      });
  
      // Event listener excluir tarefa
      botaoExcluir.addEventListener("click", function () {
        tarefas.splice(index, 1);
        salvarTarefas();
        renderizarTarefas();
      });
  
      // Event listener concluída
      checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
          paragrafo.classList.add("completed");
          tarefas[index].concluida = true;
        } else {
          paragrafo.classList.remove("completed");
          tarefas[index].concluida = false;
        }
        salvarTarefas();
      });
  
      return li;
    }
  
    // Função edição
    function editarTarefa(paragrafo, index) {
      paragrafo.contentEditable = true;
      paragrafo.focus();
  
      paragrafo.addEventListener("blur", function () {
        paragrafo.contentEditable = false;
        tarefas[index].texto = paragrafo.textContent.trim();
        salvarTarefas();
      });
  
      paragrafo.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          paragrafo.blur();
        }
      });
    }
  
    // Função de renderizacao
    function renderizarTarefas() {
      lista.innerHTML = "";
      tarefas.forEach((tarefa, index) => {
        const tarefaElement = criarTarefa(tarefa.texto, index, tarefa.concluida);
        lista.appendChild(tarefaElement);
      });
    }
  
    // Adicionar tarefa
    botaoAdicionar.addEventListener("click", function () {
      const texto = inputTarefa.value.trim();
      if (texto) {
        tarefas.push({ texto, concluida: false });
        salvarTarefas();
        renderizarTarefas();
        inputTarefa.value = "";
      }
    });
  
    // reset da pagina
    renderizarTarefas();
  });
  


// sublinhado 
checkbox.addEventListener("change", function () {
  if (checkbox.checked) {
    li.classList.add("completed"); 
    tarefas[index].concluida = true;
  } else {
    li.classList.remove("completed"); 
    tarefas[index].concluida = false;
  }
  salvarTarefas();
});
