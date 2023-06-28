<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-10 text-start">
        <h2 class="fs-3">Movimentacões</h2>
      </div>
      <div class="col-md-2 d-grid gap-2">
        <router-link
          to="/movimentacao/formulario"
          type="button"
          class="btn btn-primary"
          >Cadastrar</router-link
        >
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped">
          <thead>
            <tr class="text-menor">
              <th>Numero</th>
              <th>Ativo</th>
              <th>VeiculoId</th>
              <th>CondutorId</th>
              <th>Entrada</th>
              <th>Saida</th>
              <th>Valor Total</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr
              class="table-dark"
              v-for="item in movimentacaoList"
              :key="item.id"
            >
              <td class="col-md-1">{{ item.id }}</td>
              <td class="col-md-2">
                <span v-if="item.ativo" class="badge text-bg-success">
                  Ativo
                </span>
                <span v-if="!item.ativo" class="badge text-bg-danger">
                  Inativo
                </span>
              </td>
              <td>{{ item.veiculo.placa }}</td>
              <td>{{ item.condutor.nome }}</td>
              <td>{{ formatarData(item.entrada) }}</td>
              <td>{{ formatarData(item.saida) }}</td>
              <td>{{ item.valorTotal }}</td>
              <th class="col-md-2">
                <div>
                  <router-link
                    type="button"
                    class="btn btn-outline-warning"
                    :to="{
                      name: 'movimentacao-formulario-editar-view',
                      query: { id: item.id, form: 'editar' },
                    }"
                  >
                    <i class="bi bi-pencil-fill"></i>
                  </router-link>
                  <router-link
                    type="button"
                    class="btn btn-outline-danger ms-3"
                    :to="{
                      name: 'movimentacao-formulario-excluir-view',
                      query: { id: item.id, form: 'excluir' },
                    }"
                  >
                    <i class="bi bi-trash-fill"></i>
                  </router-link>
                  <router-link
                    type="button"
                    class="btn btn-outline-info ms-3"
                    :to="{
                      name: 'movimentacao-formulario-finalizar-view',
                      query: { id: item.id, form: 'finalizar' },
                    }"
                  >
                    Finalizar
                  </router-link>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
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

export default defineComponent({
  name: "MovimentacaoLista",
  data() {
    return {
      movimentacaoList: new Array<Movimentacao>(),
    };
  },
  mounted() {
    this.findAll();
  },
  methods: {
    findAllAbertas() {
      movimentacaoClient
        .findByAbertas()
        .then((sucess) => {
          this.movimentacaoList = sucess;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    findAll() {
      movimentacaoClient
        .listAll()
        .then((sucess) => {
          this.movimentacaoList = sucess;
        })
        .catch((error) => {
          console.log;
        });
    },
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
  },
});
</script>

<style lang="scss">
.text-menor {
  font-size: 14px;
}
</style>