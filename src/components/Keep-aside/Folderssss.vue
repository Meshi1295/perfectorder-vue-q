<template>

  <div class="iconBut">
    <q-btn v-for="(folder,key) in folders"
           :key="key"
           :label="folder.name"
           padding="xl"
           color="primary"
           round
           icon="eco"
           @click="specificFolder(folder.id)"
    />

  </div>
</template>

<script>
import api from '../../drivers/api';

export default {
  name: "Folderssss",
  props: ['tableName', 'folders'],
  data() {

  },
  methods: {
    read() {
      api.get({entity: this.tableName})
          .then(res => {
            this.folders = res
          })
    },

    specificFolder(id) {
      this.$router.push(`/folder/${id}`)

    }
  },
  created() {
    this.read()
  }
}
</script>


<style scoped>

.iconBut {
  flex-direction: row;
  align-items: center;

}

</style>