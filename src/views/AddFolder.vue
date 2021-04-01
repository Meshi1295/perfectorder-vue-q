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
import firebaseDatabase from '../drivers/firebase/database'

export default {
  name: "AddFolder",
  components: {},
  data: () => ({

    nameFolder: '',
    folder: null,
    tableFolders: 'allFolders',
    folderId:'',
    waitForData: false

  }),

  methods: {
    insert() {
      firebaseDatabase.createFolder({entity: this.tableFolders, name: this.nameFolder})
          .then(() => {
            this.$router.push(`/home`)
          })
    },

    update() {
      firebaseDatabase.updateFolder({entity: this.tableFolders, folderId:this.folderId ,folder: this.nameFolder})
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