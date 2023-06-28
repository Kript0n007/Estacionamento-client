<template>
    <div class="container col-6">
        <h3 class="mt-5">Cadastre uma nova Configuracao</h3>
        <hr>

        <div v-if="mensagem.ativo" class="row">
            <div class="col-md-12 text-start">
                <div :class="mensagem.css" role="alert">
                    <strong> {{ mensagem.titulo }} </strong> {{ mensagem.mensagem }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 text-start">
                <label class="form-label mt-3">Valor hora *</label>
                <input type="number" :disabled="this.form === 'excluir' ? '' : disabled" class="form-control" placeholder="Valor por hora"
                    v-model="configuracao.valorHora">
            </div>
            <div class="col-md-12 text-start">
                <label class="form-label mt-3">Tempo para desconto *</label>
                <input type="number" :disabled="this.form === 'excluir' ? '' : disabled" class="form-control" placeholder="Valor em hora"
                    v-model="configuracao.tempoParaDesconto">
            </div>
            <div class="col-md-12 text-start">
                <label class="form-label mt-3">Tempo de desconto *</label>
                <input type="number" :disabled="this.form === 'excluir' ? '' : disabled" class="form-control" placeholder="Valor em hora"
                    v-model="configuracao.tempoDeDesconto">
            </div>
            <div class="col-md-12 text-start">
                <label class="form-label mt-3">Valor minuto Multa *</label>
                <input type="number" :disabled="this.form === 'excluir' ? '' : disabled" class="form-control" placeholder="Valor por minuto"
                    v-model="configuracao.valorMinutoMulta">
            </div>
            <div class="col-md-12 text-start">
                <label class="form-label mt-3">Vagas para motos *</label>
                <input type="number" :disabled="this.form === 'excluir' ? '' : disabled" class="form-control" placeholder="Número de vagas"
                    v-model="configuracao.vagasMoto">
            </div>
            <div class="col-md-12 text-start">
                <label class="form-label mt-3">Vagas para carros *</label>
                <input type="number" :disabled="this.form === 'excluir' ? '' : disabled" class="form-control" placeholder="Número de vagas"
                    v-model="configuracao.vagasCarro">
            </div>
            <div class="col-md-12 text-start">
                <label class="form-label mt-3">Vagas para vans *</label>
                <input type="number" :disabled="this.form === 'excluir' ? '' : disabled" class="form-control" placeholder="Número de vagas"
                    v-model="configuracao.vagasVan">
            </div>
            <div class="col-md-12 text-start">
                <label class="form-label mt-3">Inicio Expediente *</label>
                <input type="text" :disabled="this.form === 'excluir' ? '' : disabled" class="form-control" placeholder="09:00:00"
                    v-model="configuracao.inicioExpediente">
            </div>
            <div class="col-md-12 text-start">
                <label class="form-label mt-3">Fim Expediente *</label>
                <input type="text" :disabled="this.form === 'excluir' ? '' : disabled" class="form-control" placeholder="18:00:00"
                    v-model="configuracao.fimExpediente">
            </div>
            <div class="col-md-6 text-start">
                        <label class="form-label">Gerar desconto*</label>
                        <select v-model="configuracao.gerarDesconto" :disabled="this.form === 'excluir' ? '' : disabled"
                            class="form-select" aria-label="Default select example">
                            <option v-for="item in options" :value="item.value">{{ item.text }}</option>
                        </select>
            </div>
         <div class="row mt-3">
            <div class="col-md-3 offset-md-6">
                <div class="d-grid gap-2">
                    <router-link type="button" class="btn btn-primary" to="/configuracao/lista">Voltar
                    </router-link>
                </div>
            </div>
            <div class="col-md-3 ">
                <div class="d-grid gap-2">
                    <button v-if="this.form === undefined" type="button" class="btn btn-success"
                        @click="onClickCadastrar()">
                        Cadastrar
                    </button>
                    <button v-if="this.form === 'editar'" type="button" class="btn btn-warning" @click="onClickEditar()">
                        Editar
                    </button>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { Configuracao } from '@/model/configuracao';
import configuracaoClient from '@/client/configuracao.client';

export default defineComponent({
    name: 'ConfiguracaoFormulario',
    data() {
        return {
            configuracao: new Configuracao(),
            mensagem: {
                ativo: false as boolean,
                titulo: "" as string,
                mensagem: "" as string,
                css: "" as string
            },
            options: [
                { text: 'true', value: true },
                { text: 'false', value: false }
            ]
        }
    },
    computed: {
        id() {
            return this.$route.query.id
        },
        form() {
            return this.$route.query.form
        }
    },
    mounted() {

        if (this.id !== undefined) {
            this.findById(Number(this.id));
        }

    },
    methods: {
        findById(id: number) {
            configuracaoClient.findById(id)
                .then(sucess => {
                    this.configuracao = sucess;
                })
                .catch(Error => {
                    console.log(Error);
                })
        },
        onClickCadastrar() {
            configuracaoClient.cadastrar(this.configuracao)
                .then(sucess => {
                    this.configuracao = new Configuracao()

                    this.mensagem.ativo = true
                    this.mensagem.mensagem = sucess;
                    this.mensagem.titulo = "Parabens. ";
                    this.mensagem.css = "alert alert-success alert-dismissible fade show"
                })
                .catch(error => {
                    const mensagemError = error.data;
                    this.mensagem.ativo = true;
                    this.mensagem.mensagem = mensagemError;
                    this.mensagem.titulo = "Error. ";
                    this.mensagem.css = "alert alert-danger alert-dismissible fade show"
                })
        },
        onClickEditar() {
            configuracaoClient.editar(this.configuracao.id, this.configuracao)
                .then(sucess => {
                    this.configuracao = new Configuracao()

                    this.mensagem.ativo = true;
                    this.mensagem.mensagem = sucess;
                    this.mensagem.titulo = "Parabens. "
                    this.mensagem.css = "alert alert-success alert-dismissible fade show"
                })
                .catch(error => {
                    const mensagemError = error.data;
                    this.mensagem.ativo = true;
                    this.mensagem.mensagem = mensagemError;
                    this.mensagem.titulo = "Error. ";
                    this.mensagem.css = "alert alert-danger alert-dismissible fade show"
                });
        }
    }
})
</script>
