<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-10 text-start">
                <h2 class="fs-3">Listar Configurações</h2>
            </div>
            <div class="col-md-2 d-grid gap-2">
                <router-link to="/configuracao/formulario" type="button" class="btn btn-primary">Cadastrar</router-link>
            </div>
        </div>
        <div>
            <div >
                <table class="table table-dark mt-4">
                    <thead>
                        <tr>
                            <th scope="col">Nº</th>
                            <th scope="col">ATIVO</th>
                            <th scope="col">VALOR HORA</th>
                            <th scope="col">TEMPO PARA DESCONTO</th>
                            <th scope="col">TEMPO DE DESCONTO</th>
                            <th scope="col">VALOR MINUTO MULTA</th>
                            <th scope="col">VAGAS MOTO</th>
                            <th scope="col">VAGAS CARRO</th>
                            <th scope="col">VAGAS VAN</th>
                            <th scope="col">INICIO EXPEDIENTE</th>
                            <th scope="col">FIM EXPEDIENTE</th>
                            <th scope="col">GERENCIAR</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="item in configuracaoList" :key="item.id">
                            <th>{{ item.id }}</th>
                            <th>
                                <span v-if="item.ativo" class="badge text-bg-success"> Ativo </span>
                                <span v-if="!item.ativo" class="badge text-bg-danger"> Inativo </span>
                            </th>
                            <th>{{ item.valorHora }}</th>
                            <th>{{ item.tempoParaDesconto }}</th>
                            <th>{{ item.tempoDeDesconto }}</th>
                            <th>{{ item.valorMinutoMulta }}</th>
                            <th>{{ item.vagasMoto }}</th>
                            <th>{{ item.vagasCarro }}</th>
                            <th>{{ item.vagasVan }}</th>
                            <th>{{ formatarHora(item.inicioExpediente) }}</th>
                            <th>{{ formatarHora(item.fimExpediente) }}</th>

                            <th class="col-md-2">
                                <div>
                                    <router-link type="button" class="btn btn-warning"
                                        :to="{ name: 'configuracao-formulario-editar-view', query: { id: item.id, form: 'editar' } }">
                                        <i class="bi bi-pencil-fill"></i>
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

import { defineComponent } from 'vue';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Configuracao } from '@/model/configuracao';
import configuracaoClient from '@/client/configuracao.client';


export default defineComponent({
    name: 'ConfiguracaoLista',
    data() {
        return {
            configuracaoList: new Array<Configuracao>()
        }
    },
    mounted() {
        this.findAll();
    },
    methods: {
        formatarHora(horaArray: number[]) {
    try {
        if (Array.isArray(horaArray) && horaArray.length >= 2) {
            let horas = horaArray[0] ? horaArray[0].toString().padStart(2, '0') : '00';
            let minutos = horaArray[1] ? horaArray[1].toString().padStart(2, '0') : '00';
            return `${horas}:${minutos}`;
        }
    } catch (error) {
        console.error("Erro ao formatar a hora:", error);
    }
    return "";
},
        findAll(){
            configuracaoClient.listAll()
                .then(sucess => {
                    this.configuracaoList = sucess;                    
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
});
</script>

<style lang="scss">
.text-menor {
    font-size: 14px;
}
</style>