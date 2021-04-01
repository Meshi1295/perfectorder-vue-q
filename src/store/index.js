import Vue from 'vue'
import Vuex from 'vuex'
import folders from './folders'
import files from './files'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules:{
        folders,
        files
    }
})


