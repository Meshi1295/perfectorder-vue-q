<template>
  <div>
    <q-input filled v-model="nameFolder">
      <template v-slot:prepend>
        <q-icon name="folder"/>
      </template>
      <q-btn v-if="waitForData" push color="primary" label="הוסף תקייה" @click="insert()"/>
      <q-btn v-if="!waitForData"  push color="primary" label="עדכן תקייה" @click="update()"/>

    </q-input>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'

import firebaseDatabase from '../drivers/firebase/database'

export default {
  name: "AddFolder",
  computed: mapState('folders',['editedFolderId','folders']),


  data: () => ({

    folderId:'',
    nameFolder: '',
    folder: null,
    tableFolders: 'allFolders',
    waitForData: false
  }),

  methods: {
    ...mapActions('folders', ['insertFolder','updateFolder','setEditFolderById']),
    ...mapMutations('folders', ['setEditedFolder', 'setEditedFolderId']),

    localEditedNameFolder(){
     this.setEditedFolder({name:this.nameFolder})
    },

    insert() {
      this.localEditedNameFolder(this.nameFolder)
          this.insertFolder({name:this.nameFolder})
          .then(() => {
            this.$router.push(`/home`)
          })
    },

    update() {
      this.localEditedNameFolder()
      this.updateFolder()
          .then(() => {
            this.$router.push(`/home`)
          })
    }
  },

  created() {

    if (this.$route.params.type === 'add') {
      this.waitForData=true

    } else {
      this.waitForData=false
      this.folderId = this.$route.params.type
      let folder = this.folders.find(folder => folder.id === this.folderId);
      this.nameFolder = folder.name
      this.setEditedFolderId(this.$route.params.type)
      this.setEditFolderById()
    }
  }
}
</script>

<style scoped>

</style>