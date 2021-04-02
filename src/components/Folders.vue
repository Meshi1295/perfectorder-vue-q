<template>
  <div class="q-pa-md">

    <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="white"
        navigation
        padding
        arrows
        height="300px"
        class="bg-primary text-white shadow-1 rounded-borders"
    >
      <template v-slot:navigation-icon="{ active, btnProps, onClick }">
        <q-btn v-if="active" size="lg" icon="folder" color="yellow" flat round dense @click="onClick"/>
        <q-btn v-else size="sm" :icon="btnProps.icon" color="white" flat round dense @click="onClick"/>
      </template>

      <q-carousel-slide v-for="(folder,key) of folders"
                        :key="key"
                        :label="folder.name"
                        :name="folder.name" class="column no-wrap flex-center">

        <q-icon name="style" size="56px"/>
        <div class="q-mt-md items-center">
          {{ folder.name }}
        </div>
        <q-btn flat color="white" @click="specificFolder(folder.id)">פתיחה</q-btn>
        <q-btn flat color="white" icon="delete" @click="removeFolders(folder.id)"></q-btn>
        <q-btn flat color="white" icon="edit" @click="updateFolder(folder.id)"></q-btn>

      </q-carousel-slide>
    </q-carousel>



  </div>
</template>

<script>
import firebaseDatabase from '../drivers/firebase/database'

import {mapState, mapActions, mapMutations} from 'vuex'


export default {
  name: "Folders",
  props: ['tableFolders'],

  computed: mapState('folders', ['editedFolderId', 'folders']),

  data() {
    return {
      slide: '',
      tableName: 'files',
      noFolders: false
    }
  },

  methods: {
    ...mapActions('folders', ['deleteFolder']),
    ...mapMutations('folders', ['setEditedFolderId']),

    specificFolder(id) {
      this.$router.push(`/folder/${id}`)
    },

    removeFolders(id) {
      this.setEditedFolderId(id)
      this.deleteFolder()
      .then(() => {
        this.slide = this.folders[0].name
      })
    },

    updateFolder(id){
      this.setEditedFolderId(id)
        this.$router.push(`/addFolder/${id}`)

    }
  },

  created() {
    // if (this.folders.length <= 0){
    //   this.noFolders = true
    // }else {
      this.slide = this.folders[0].name
    }
  // }
}
</script>

<style scoped>

</style>