import database from "../../drivers/firebase/database/index";
import firebaseDatabase from "../../drivers/firebase/index"

export default {

    getFiles: async ({state, commit}) => {

        const files = await database.readFiles({
            entity: 'allFolders',
            folderId: state.editedFolderId,
            secondEntity: 'files'
        });

        commit('setFiles', files)
    },

    deleteFile: async ({state, commit}) => {

        await database.removeFile({secondEntity: 'files', folderId: state.editedFolderId, fileId: state.editedFileId});

        const fileId = state.editedFileId;

        //delete from db
        commit('resetEditedFileId')

        //delete from store
        commit('deleteFile', fileId)
    },


    updateFile: ({state, commit}) => {

        const file = {}

        Object.assign(file, state.editedFile)
        file.id = state.editedFileId

        //saves in db
        return database.UpdatedFileById({
            entity: 'allFolders',
            folderId: state.editedFolderId,
            secondEntity: 'files',
            fileId: state.editedFileId,
            file
        })
            .then(() => {
                //saves in store
                commit('resetEditedFile')
                commit('resetEditedFileId')

                commit('editFile', file)
            })
    },

    insertFile: async ({state, commit}) => {

        const file = {}

        Object.assign(file, state.editedFile)
        console.log(state.editedFile, 'ac')

        //    save in db
        file.id = (await database.createFiles({
            entity: 'allFolders',
            folderId: state.editedFolderId,
            secondEntity: 'files',
            file
        })).key

        //    sava in store
        commit('resetEditedFile')

        commit('insertFile', file)
    },

    setEditFileById: async ({state, commit}) => {

        let file = {};

        if (state.files.length && state.files.find(file => file.id === state.editedFileId)) {
            file = state.files.find(file => file.id === state.editedFileId);
        } else {
            file = await database.getFile({
                entity: 'allFolders',
                folderId: state.editedFolderId,
                secondEntity: 'files',
                fileId: state.editedFileId
            })
        }

        commit('setEditedFile', file)
    },

    upload: ({state, commit, dispatch}, model) => {
        console.log(model, 'model')

        return firebaseDatabase.firebase.storage().ref(`users/${window.user.uid}/images/${state.editedFolderId}/${state.editedFileId}/img`)
            .put(model)
            .then(storageRef => {
                return storageRef.ref.getDownloadURL()
                    .then((url) => {
                        console.log(url, 'url')

                        commit('setEditedFileImage', url)
                        return url;
                        // dispatch('insertFile') בשביל להשתמש בפונקציה מתוך האקשן לאקשן
                    })
            })
    },
}
