import database from "../../drivers/firebase/database/index";
import firebaseDatabase from "../../drivers/firebase/index"

export default {

    getFiles: async ({ state, commit}) => {

        const files = await database.readFiles({entity: 'allFolders',folderId: state.editedFolderId, secondEntity: 'files'});

        commit('setFiles', files)
    },

    deleteFile: async ({ state, commit}) =>{

        await database.removeFile({secondEntity: 'files',folderId: state.editedFolderId, fileId: state.editedFileId});

        const fileId = state.editedFileId;

        //delete from db
        commit ('resetEditedFileId')

        //delete from store
        commit ('deleteFile', fileId)
    },


    updateFile: async ({ state, commit }) =>{

        const file = {}

        Object.assign( file, state.editedFile)
        file.id = state.editedFileId

        //saves in db
        await database.UpdatedFileById({entity: 'allFolders',folderId: state.editedFolderId, secondEntity: 'files',fileId: state.editedFileId, file})

        //saves in store
        commit ('resetEditedFile')
        commit ('resetEditedFileId')

        commit('editFile', file)
    },

    insertFile: async ({ state, commit }) => {

        const file = {}

        Object.assign(file, state.editedFile)
        console.log(state.editedFile,'ac')

        //    save in db
        file.id = (await database.createFiles({entity: 'allFolders', folderId: state.editedFolderId, secondEntity: 'files', file})).key

        //    sava in store
        commit('resetEditedFile')

        commit('insertFile',file)
    },

    setEditFileById: async ({state, commit}) => {

        let file = {};

        if(state.files.length && state.files.find(file => file.id === state.editedFileId)) {
            file = state.files.find(file => file.id === state.editedFileId);
        }else {
            file = await database.getFile({entity: 'allFolders',folderId: state.editedFolderId, secondEntity:'files', fileId: state.editedFileId })
        }

        commit('setEditedFile', file)
    },

    upload: async ({ state, commit },model) => {
        console.log(model,'model')

        await firebaseDatabase.firebase.storage().ref(`users/${window.user.uid}/images/${model.name}`)
            .put(model)
            .then(storageRef => {
                storageRef.ref.getDownloadURL()
                    .then((url) => {
                        console.log(url,'url')

                        commit ('setEditedFileImage', url)
                    })
            })
    },
}
