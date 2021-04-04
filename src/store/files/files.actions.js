import database from "../../drivers/firebase/database/index";

export default {

    getFiles: async ({ state, commit }) => {

        const files = await database.readFiles({entity: 'allFolders',folderId: state.editedFolderId, secondEntity: 'files'});

        commit('setFiles', files)
        // commit('editedFolderId')

    },

    deleteFile: async ({ state, commit}) =>{

        await database.removeFile({entity: 'files', id: state.editedFileId});

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
        await database.UpdatedFileById({secondEntity: 'files',fileId: file.editedFileId, file})

        //saves in store
        commit ('resetEditedFile')
        commit ('resetEditedFileId')

        commit('editedFile', file)
    },

    insertFile: async ({ state, commit }) => {

        const file = {}

        Object.assign(file, state.editedFile)

        //    save in db
        file.id = (await database.createFiles({entity: 'allFolders', folderId: state.editedFolderId, secondEntity: 'files', file})).key

        //    sava in store
        commit('resetEditedFile')

        commit('insertFile')
    },

    setEditFileById: async ({state, commit, id}) => {
       const folderId = id

        let file = {};

        if(state.files.length && state.files.find(file => file.id === state.editedFileId)) {
            file = state.files.find(file => file.id === state.editedFileId);
        }else {
            file = await database.getFile({entity: 'allFolders',folderId: state.editedFolderId, secondEntity:'files', fileId: state.editedFileId })
        }

        commit('setEditedFile', file)
    }
}
