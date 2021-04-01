<!--<template>-->
<!--  <div>-->
<!--    <q-table-->
<!--        grid-->
<!--        card-class="bg-primary text-white"-->
<!--        title="Treats"-->
<!--        :data="files"-->
<!--        :columns="columns"-->
<!--        row-key="name"-->
<!--        :filter="filter"-->
<!--        hide-header-->
<!--    >-->

<!--    <template v-slot:body="props">-->
<!--      <q-tr :props="props">-->
<!--        <q-td key="name" :props="props" @click="this.goToItem(props.row.id)">{{ props.row.name }}</q-td>-->
<!--        <q-td key="date" :props="props">{{ props.row.date }}</q-td>-->
<!--        <q-td key="number" :props="props">{{ props.row.number }}</q-td>-->
<!--        <q-td key="price" :props="props">{{ props.row.price }}</q-td>-->
<!--        <q-td key="paid" :props="props">{{ props.row.paid }}</q-td>-->
<!--        <q-td key="actions" :props="props">-->
<!--          <q-btn @click="remove(props.row.id)">-->
<!--            <q-icon name="delete" />-->
<!--          </q-btn>-->
<!--        </q-td>-->

<!--      </q-tr>-->

<!--    </template>-->


<!--    </q-table>-->
<!--  </div>-->


<!--</template>-->

<!--<script>-->
<!--import api from '../drivers/api/index';-->

<!--export default {-->
<!--  name: "Files",-->
<!--  props: ['tableName', 'isReload', 'folder'],-->
<!--  data() {-->
<!--    return {-->
<!--      filter: '',-->
<!--      columns: [-->
<!--        {-->
<!--          name: 'desc',-->
<!--          required: true,-->
<!--          label: 'סוג הטופס',-->
<!--          align: 'left',-->
<!--          field: row => row.name,-->
<!--        },-->
<!--        {name: 'date', align: 'center', label: 'Date', field: 'date'},-->
<!--        {name: 'number', label: 'Number', field: 'number'},-->
<!--        {name: 'price', label: 'Price', field: 'price'},-->
<!--        {name: 'picture', label: 'Picture', field: 'picture'},-->
<!--        {name: 'paid', label: 'Paid', field: 'paid'},-->
<!--        {name: 'actions', label: 'Actions', field: 'actions'},-->

<!--      ],-->
<!--      files: []-->
<!--    }-->
<!--  },-->

<!--  methods: {-->
<!--    read() {-->
<!--      api.get({entity: this.tableName})-->
<!--      .then(result => {-->
<!--        this.files = result;-->
<!--        console.log(result)-->
<!--      })-->
<!--    },-->


<!--    remove(id) {-->
<!--      localStorageDriver.remove(this.tableName, id)-->
<!--      this.read();-->
<!--    },-->

<!--    goToItem(id) {-->
<!--      this.$router.push(`/folder/${id}`)-->
<!--    }-->

<!--  },-->

<!--  //לטעון את הטבלה מחדש-->
<!--  created() {-->
<!--    this.read();-->
<!--  },-->
<!--  watch: {-->
<!--    isReload() {-->
<!--      this.read();-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->