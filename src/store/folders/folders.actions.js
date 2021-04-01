import database from "../../drivers/firebase/database";

export default {

    getFolders: async ({ commit }) => {

        const folders = await database.readFolders({entity: 'allFolders'});

        commit('setFolders', folders)


    },

    deleteFolder: async ({ state, commit}) =>{
        //delete from db
        await database.removeFolder({entity: 'allFolders', folderId: state.editedFolderId});

        const folderId = state.editedFolderId;

        commit ('resetEditedFolderId')

        //delete from store
        commit ('deleteFolder', folderId)
    },


    updateFolder: async ({ state, commit }) =>{

        const folder = {}

        Object.assign( folder, state.editedFolder)
        folder.id = state.editedFolderId

       //saves in db
        await database.UpdatedById({entity: 'tableFolders', id: folder.editedFolderId, folder})

       //saves in store
        commit ('resetEditedFolder')
        commit ('resetEditedFolderId')

        commit('editedFolder', folder)
    },

    insertFolder: async ({ state, commit }) => {

        const folder = {}

        Object.assign(folder, state.editedFolder)

        // save in db
        folder.id = await database.createFolder({entity: 'tableFolders', folder})

        // sava in store
        commit('resetEditedFolder')

        commit('insertFolder')
    },

    setEditFolderById: async ({state, commit}) => {

        let folder = {};
        if(state.folders.length && state.folders.find(folder => folder.id === state.editedFolderId)) {
            folder = state.folders.find(folder => folder.id === state.editedFolderId);
        }else {
            folder = await database.getFolder({entity: 'tableFolders', folderId: state.editedFolderId})
        }

        commit('setEditedFolder', folder)
    }
}