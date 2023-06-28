<template>
  <div class="container col-6">
    <h3 class="mt-5">Cadastre uma nova Movimentação</h3>
    <hr />

    <div v-if="mensagem.ativo" class="row">
      <div class="col-md-12 text-start">
        <div :class="mensagem.css" role="alert">
          <strong> {{ mensagem.titulo }} </strong> {{ mensagem.mensagem }}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      </div>
      <!-- <div v-if="this.form != 'finalizar'" class="col-md-12 text-start">
        <div :class="mensagem.css" role="alert">
          <strong> {{ mensagem.titulo }} </strong> {{ mensagem.mensagem }}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      </div> -->
    </div>
    <!-- <div v-if="this.form === 'finalizar'" class="col-md-12 text-start">
                <div :class="mensagem.css" role="alert">
                    <strong>{{ mensagem.titulo }}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    <br>Entrada: {{ formatarData(mensagem.mensagem.entrada) }}
                    <br>Saida: {{ formatarData(mensagem.mensagem.saida) }}
                    <br>Condutor: {{ mensagem.mensagem.condutor.nome }}
                    <br>Veiculo: {{ mensagem.mensagem.veiculo.placa }}
                    <br>Tempo: {{ mensagem.mensagem.tempo }} Horas
                    <br>tempo para desconto:{{ mensagem.mensagem.tempoParaDesconto }} Horas
                    <br>Valor Total: {{ mensagem.mensagem.valorTotal }} R$
                    <br>Desconto: {{ mensagem.mensagem.desconto }} R$
                </div>
            </div> -->
    <div class="row">
      <div class="col-md-12 text-start">
        <label class="form-label mt-3">Placa do Veiculo *</label>
        <select v-model="movimentacao.veiculo" class="form-select">
          <option v-for="item in veiculo" :value="item">
            {{ item.placa }}
          </option>
        </select>
      </div>
      <div class="col-md-12 text-start">
        <label class="form-label mt-3">Nome do Condutor *</label>
        <select v-model="movimentacao.condutor" class="form-select">
          <option v-for="item in condutor" :value="item">
            {{ item.nome }}
          </option>
        </select>
      </div>
      <div class="col-md-12 text-start">
        <label class="form-label mt-3">Entrada *</label>
        <input
          type="text"
          this
          class="form-control"
          placeholder="yyyy-mm-ddThh:min:ss"
          v-model="movimentacao.entrada"
        />
      </div>
      <!-- <div class="col-md-12 text-start">
        <label class="form-label mt-3">Saida *</label>
        <input
          type="text"
          this
          class="form-control"
          v-model="movimentacao.saida"
        />
      </div> -->
      <div class="col-md-12 text-start">
        <label class="form-label mt-3">Valor total *</label>
        <input
          type="text"
          this
          class="form-control"
          v-model="movimentacao.valorTotal"
        />
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-md-3 offset-md-6">
        <div class="d-grid gap-2">
          <router-link
            type="button"
            class="btn btn-primary"
            to="/movimentacao/lista"
            >Voltar
          </router-link>
        </div>
      </div>
      <div class="col-md-3">
        <div class="d-grid gap-2">
          <button
            v-if="this.form === undefined"
            type="button"
            class="btn btn-success"
            @click="onClickCadastrar()"
          >
            Cadastrar
          </button>
          <button
            v-if="this.form === 'editar'"
            type="button"
            class="btn btn-warning"
            @click="onClickEditar()"
          >
            Editar
          </button>
          <button
            v-if="this.form === 'excluir'"
            type="button"
            class="btn btn-danger"
            @click="onClickExcluir()"
          >
            Excluir
          </button>
          <button
            v-if="this.form === 'finalizar'"
            type="button"
            class="btn btn-info"
            @click="FinalizarMovimentacao()"
          >
            Finalizar
          </button>
          <button class="btn btn-danger" @click="getRelatorio">
            Gerar Relatório
          </button>
          <div
            v-if="relatorio"
            class="d-flex justify-content-center align-items-center vh-50"
          >
            <div class="card w-95">
              <div class="card-header text-center">Relatório</div>
              <div class="card-body">
                <pre class="card-text">{{ relatorio }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import movimentacaoClient from "@/client/movimentacao.client";
import { Movimentacao } from "@/model/movimentacao";
import veiculoClient from "@/client/veiculo.client";
import { Veiculo } from "@/model/veiculo";
import condutorClient from "@/client/condutor.client";
import { Condutor } from "@/model/condutor";

export default defineComponent({
  name: "MovimentacaoFormulario",
  data() {
    return {
      relatorio: "",
      movimentacao: new Movimentacao(),
      veiculo: new Array<Veiculo>(),
      condutor: new Array<Condutor>(),
      mensagem: {
        ativo: false as boolean,
        titulo: "" as string,
        mensagem: "" as string,
        css: "" as string,
      },
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
    form() {
      return this.$route.query.form;
    },
  },
  mounted() {
    if (this.id !== undefined) {
      this.findById(Number(this.id));
    }

    this.listAllVeiculo();
    this.listAllCondutor();
  },
  methods: {
    formatarData(data: any) {
      console.log("Data recebida:", data);
      if (data) {
        try {
          let dateObj;
          if (Array.isArray(data)) {
            // O mês no objeto Date começa do 0 (janeiro) até 11 (dezembro), por isso é necessário subtrair 1 do mês.
            let year = data[0];
            let month = data[1] - 1; // Ajustar para base 0
            let day = data[2];
            let hours = data[3];
            let minutes = data[4];
            let seconds = data.length > 5 ? data[5] : 0; // Se os segundos não estão presentes, defina como 0

            dateObj = new Date(year, month, day, hours, minutes, seconds);
          } else {
            dateObj = new Date(data);
          }
          return format(dateObj, "dd/MM/yyyy HH:mm:ss", { locale: ptBR });
        } catch (error) {
          console.error("Erro ao formatar data:", error);
          return "";
        }
      }
      return "";
    },
    async getRelatorio() {
      try {
        this.relatorio = await movimentacaoClient.gerarRelatorio();
      } catch (error) {
        console.error("Erro ao buscar o relatório:", error);
      }
    },
    findById(id: number) {
      movimentacaoClient
        .findById(id)
        .then((sucess) => {
          this.movimentacao = sucess;
        })
        .catch((Error) => {
          console.log(Error);
        });
    },
    listAllVeiculo() {
      veiculoClient
        .listAll()
        .then((sucess) => {
          this.veiculo = sucess;
        })
        .catch((Error) => {
          console.log(Error);
        });
    },
    listAllCondutor() {
      condutorClient
        .listAll()
        .then((sucess) => {
          this.condutor = sucess;
        })
        .then((Error) => {
          console.log(Error);
        });
    },
    onClickCadastrar() {
      movimentacaoClient
        .cadastrar(this.movimentacao)
        .then((sucess) => {
          this.movimentacao = new Movimentacao();

          this.mensagem.ativo = true;
          this.mensagem.mensagem = sucess;
          this.mensagem.titulo = "Parabens. ";
          this.mensagem.css = "alert alert-success alert-dismissible fade show";
        })
        .catch((error) => {
          const mensagemError = error.data;
          this.mensagem.ativo = true;
          this.mensagem.mensagem = mensagemError;
          this.mensagem.titulo = "Error. ";
          this.mensagem.css = "alert alert-danger alert-dismissible fade show";
        });
    },
    onClickEditar() {
      movimentacaoClient
        .editar(this.movimentacao.id, this.movimentacao)
        .then((sucess) => {
          this.movimentacao = new Movimentacao();

          this.mensagem.ativo = true;
          this.mensagem.mensagem = sucess;
          this.mensagem.titulo = "Parabens. ";
          this.mensagem.css = "alert alert-success alert-dismissible fade show";
        })
        .catch((error) => {
          const mensagemError = error.data;
          this.mensagem.ativo = true;
          this.mensagem.mensagem = mensagemError;
          this.mensagem.titulo = "Error. ";
          this.mensagem.css = "alert alert-danger alert-dismissible fade show";
        });
    },
    onClickExcluir() {
      movimentacaoClient
        .deletar(this.movimentacao.id)
        .then((sucess) => {
          this.movimentacao = new Movimentacao();

          this.$router.push({ name: "movimentacao-lista-view" });
        })
        .catch((error) => {
          const mensagemError = error.data;
          this.mensagem.ativo = true;
          this.mensagem.mensagem = mensagemError;
          this.mensagem.titulo = "Error. ";
          this.mensagem.css = "alert alert-danger alert-dismissible fade show";
        });
    },
    FinalizarMovimentacao() {
      movimentacaoClient
        .fecharMovimentacao(this.movimentacao.id)
        .then((sucess) => {
          this.movimentacao = new Movimentacao();
          this.mensagem.ativo = true;
          this.mensagem.mensagem = sucess;
          this.mensagem.titulo = "Parabens! ";
          this.mensagem.css = "alert alert-success alert-dismissible fade show";
        })
        .catch((error) => {
          const mensagemError = error.data;
          this.mensagem.ativo = true;
          this.mensagem.mensagem = mensagemError;
          this.mensagem.titulo = "Error! ";
          this.mensagem.css = "alert alert-danger alert-dismissible fade show";
        });
    },
  },
});
</script>
