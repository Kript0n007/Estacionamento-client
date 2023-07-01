<template>
  <div>
    <h1>Bem-vindo ao Estacionamento XYZ</h1>
    <p>Quantidade de vagas disponíveis:</p>
    <ul>
      <li>Vagas de Moto: {{ vagasMoto }}</li>
      <li>Vagas de Carro: {{ vagasCarro }}</li>
      <li>Vagas de Van: {{ vagasVan }}</li>
    </ul>
    <button @click="reservarVaga">Reservar Vaga</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  data() {
    return {
      vagasMoto: 0,
      vagasCarro: 0,
      vagasVan: 0
    };
  },
  methods: {
    reservarVaga() {
      // Verifique a quantidade de vagas disponíveis para cada tipo e atualize os valores
      if (this.vagasMoto > 0) {
        this.vagasMoto--;
        alert("Vaga de moto reservada com sucesso!");
      } else {
        alert("Desculpe, não há vagas de moto disponíveis no momento.");
      }

      if (this.vagasCarro > 0) {
        this.vagasCarro--;
        alert("Vaga de carro reservada com sucesso!");
      } else {
        alert("Desculpe, não há vagas de carro disponíveis no momento.");
      }

      if (this.vagasVan > 0) {
        this.vagasVan--;
        alert("Vaga de van reservada com sucesso!");
      } else {
        alert("Desculpe, não há vagas de van disponíveis no momento.");
      }
    }
  }
});
</script>
