<template>
    <div>
      <button @click="getRelatorio">Gerar Relatório</button>
      <pre>{{ relatorio }}</pre>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name:"Relatorio",
    data() {
      return {
        relatorio: ''
      }
    },
    methods: {
      async getRelatorio() {
        try {
          const response = await axios.get('http://localhost:8081/relatorio/gerar');
          this.relatorio = response.data;
        } catch (error) {
          console.error('Erro ao buscar o relatório:', error);
        }
      }
    }
  }
  </script>
  