export default {

    setFolders: ((state, folders) => state.folders = folders),

    setEditedFolderId: ((state, id) => state.editedFolderId = id),

    setEditedFolder: ((state, folder) => state.editedFolder = folder),

    resetEditedFolderId: ((state) => state.editedFolderId = ''),

    resetEditedFolder: ((state) => {
        for (const key of state.editedFolder) {
        state.editedFolder[key] = ''
        }
            delete state.editedFolder.id;
    }),


    editFolder: ((state, folder) => {
       const index = state.folders.findIndex(p => p.id === folder.id)
        state.folders.splice(index, 1, folder)
    }),

    deleteFolder: ((state, folderId) => {
        const index =  state.folders.findIndex(p => p.id === folderId)
        state.folders.splice(index,1);

    }),

    insertFolder: ((state, folder) => {
        state.folders.push(folder)
    })

}