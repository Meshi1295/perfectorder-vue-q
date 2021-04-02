<template>
  <div>
    <q-input filled v-model="nameFolder">
      <template v-slot:prepend>
        <q-icon name="folder"/>
      </template>
      <q-btn v-if="waitForData" push color="primary" label="הוסף תקייה" @click="insert()"/>
      <q-btn v-if="!waitForData"  push color="primary" label="עדכן תקייה" @click="update(editedFolder.id)"/>

    </q-input>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'

import firebaseDatabase from '../drivers/firebase/database'

export default {
  name: "AddFolder",
  computed: mapState('folders',['editedFolder']),


  data: () => ({

    nameFolder: '',
    folder: null,
    tableFolders: 'allFolders',
    waitForData: false
  }),

  methods: {
    ...mapActions('folders', ['insertFolder','updateFolder']),
    ...mapMutations('folders', ['setEditedFolder', 'setEditedFolderId']),

    localEditedNameFolder(){
     this.setEditedFolder(this.nameFolder)
    },

    insert() {
      this.localEditedNameFolder()
          this.insertFolder()
          .then(() => {
            this.$router.push(`/home`)
          })
    },

    update(id) {
      this.localEditedNameFolder()
      this.setEditedFolderId(id)
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
      firebaseDatabase.getFolder({entity: this.tableFolders, folderId: this.folderId})
      .then((res) =>{
        this.nameFolder = res.name

      })
    }
  }
}
</script>

<style scoped>

</style>