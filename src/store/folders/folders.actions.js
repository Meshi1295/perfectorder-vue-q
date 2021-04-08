import database from "../../drivers/firebase/database";

export default {

    getFolders: async ({commit}) => {

        const folders = await database.readFolders({entity: 'allFolders'});

        commit('setFolders', folders)
    },

    deleteFolder: async ({state, commit}) => {
        //delete from db
        await database.removeFolder({entity: 'allFolders', folderId: state.editedFolderId});

        const folderId = state.editedFolderId;

        commit('resetEditedFolderId')

        //delete from store
        commit('deleteFolder', folderId)
    },


    updateFolder: async ({state, commit}) => {

        const folder = {}

        Object.assign(folder, state.editedFolder)

        //saves in db
        await database.updateFolderById({entity: 'allFolders', folderId: state.editedFolderId, folder})
        folder.id = state.editedFolderId

        //saves in store
        commit('resetEditedFolder')
        commit('resetEditedFolderId')

        commit('editFolder', folder)
    },

    insertFolder: async ({state, commit}, folder) => {

        // save in db
        folder.id = (await database.createFolder({entity: 'allFolders', folder})).key

        // sava in store
        commit('resetEditedFolder')

        commit('insertFolder', folder)
    },

    setEditFolderById: async ({state, commit}) => {

        let folder = {};
        if (state.folders.length && state.folders.find(folder => folder.id === state.editedFolderId)) {
            folder = state.folders.find(folder => folder.id === state.editedFolderId);
        } else {
            folder = await database.getFolder({entity: 'tableFolders', folderId: state.editedFolderId})
        }

        commit('setEditedFolder', folder)
    },
}