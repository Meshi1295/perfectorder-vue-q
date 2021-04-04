<template>
  <div class="q-pa-md">
    Add into Input:
    <div class="q-gutter-md row">
      <q-input rounded filled v-model="localEditedFile.name" label="שם הטופס"/>
    </div>
    <div class="q-pa-md">
      <div class="q-gutter-md row items-start">
        <q-date v-model="localEditedFile.date"/>
      </div>
    </div>
    <q-input rounded outlined type="number" v-model="localEditedFile.number" label="מספר הטופס"/>
    <br>
    <q-input rounded outlined type="number" v-model="localEditedFile.price" label="סכום הטופס"/>
    <br>
    <q-file filled bottom-slots v-model="model" label="Files" counter max-files="12">

      <template v-slot:append>
        <q-icon v-if="model !== null" name="close" @click.stop="model = null" class="cursor-pointer"/>
        <q-icon name="create_new_folder" @click.stop/>
      </template>

      <template v-slot:hint>
        Field hint
      </template>

      <template v-slot:after>
        <q-btn round dense flat icon="send"/>
      </template>
    </q-file>

    <div>
      <q-btn
          :color="localEditedFile.isPaid ?'green':'black'"
          @click="localEditedFile.isPaid=true" flat label="שולם"/>
      <q-btn
          :color="!localEditedFile.isPaid ? 'red' : 'black'"
          @click="localEditedFile.isPaid=false" flat label="לא שולם"/>
    </div>
    <br>
    <q-btn v-if="!editedFile.id" push color="primary" label="הוסף מסמך" @click=" insert()"/>
    <q-btn v-if="editedFile.id" push color="primary" label="עדכן" @click=" update()"/>

  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

import firebaseDatabase from '../drivers/firebase/database'

export default {
  name: "File",

  computed: mapState ('files', ['editedFile', 'editedFolderId', 'editedFileId']),

  data: () => ({

    localEditedFile: {
      name: '',
      date: '',
      number: 0,
      price: 0,
      image: '',
      isPaid: false
    },
    model: null

}),

  methods: {
    ...mapActions('files', ['insertFile', 'updateFile', 'setEditFileById']),
    ...mapMutations('files',['setEditedFile', 'setEditedFileId', 'setEditedFolderId']),

    localSetEditedFile(){
      this.setEditedFile(this.localEditedFile)
    },

    insert(){
      this.localSetEditedFile();
      this.insertFile();
      // this.localInsert()
    },

    update(){
      this.localSetEditedFile();
      this.updateFile();
      // this.localUpdate()
    },

    localInsert() {
      firebaseDatabase.firebase.storage().ref(`users/${window.user.uid}/images/${this.model.name}`)
          .put(this.model).then(storageRef => {
            storageRef.ref.getDownloadURL()
                .then((url) => {
                  this.editedFile.image = url
                })
                .then(() => {
                  firebaseDatabase.createFiles({
                    secondEntity: this.tableName,
                    folderId: this.folderId,
                    file: this.editedFile
                  })
                      .then(() => {
                        this.$router.push(`/folder/${this.folderId}`)
                      })
                })
          }
      )
    },
    // localUpdate() {
    //   firebaseDatabase.UpdatedById({
    //     secondEntity: this.tableName, folderId: this.folderId,
    //     fileId: this.editedFile.id, file: this.editedFile
    //   })
    //       .then(() => {
    //         this.$router.push(`/folder/${this.folderId}`)
    //       })
    // }
  },

  created() {
    this.setEditedFileId(this.$route.params.fileId)
    this.setEditedFolderId(this.$route.params.folderId)
    this.setEditFileById()
    .then(() => {
      Object.assign(this.localEditedFile, this.editedFile)
    })
  }
}



</script>

<style>

</style>