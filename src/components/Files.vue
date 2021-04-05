<template>
  <div>
    <q-card v-for="(file,key) of files"
            :key="key"
            class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">
            שם הטופס:
            {{ file.name }}
          </div>

          <div class="text-h5 q-mt-sm q-mb-xs">
            {{ file.number }}
          </div>

          <div>
            {{ file.price }}
          </div>

          <div type="text">
            {{ file.isPaid ? 'שולם' : 'לא שולם' }}
          </div>


        </q-card-section>

        <q-card-section class="col-5 flex flex-center">
          <q-img :src="file.image" alt=""/>
        </q-card-section>
      </q-card-section>

      <q-separator/>
      <q-card-actions>
        <q-btn flat round icon="event"/>
        {{ file.date }}
        <q-btn flat @click="goToFile(file.id) ">
          Edit File
        </q-btn>
        <q-btn flat color="primary" icon="delete" @click="remove(file.id)"></q-btn>

      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  name: "Files",
  props: ['tableName'],

  computed: mapState('files', ['editedFileId', 'files']),

  methods: {
    ...mapActions('files', ['deleteFile']),
    ...mapMutations('files',['setEditedFileId','setEditedFolderIdFromFiles']),

    remove(fileId){
      this.setEditedFileId(fileId)
      this.setEditedFolderIdFromFiles(this.$route.params.id)
      this.deleteFile()
    },

    goToFile(id) {
      this.$router.push(`/AddFileId/${this.$route.params.id}/${id}`)

    }
  },

  created() {

  }
}
</script>

<style scoped>

.my-card {
  width: 400px;
}
</style>