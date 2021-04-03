export default {

    setFolders: ((state, folders) => state.folders = folders),

    setEditedFolderId: ((state, id) => {
        debugger;
        state.editedFolderId = id
    }),

    setEditedFolder: ((state, folder) => {
        debugger;
        state.editedFolder.name = folder
    }),

    resetEditedFolderId: ((state) => {
        debugger;
        state.editedFolderId = ''
    }),

    resetEditedFolder: ((state) => {
        debugger;
        for (let key in state.editedFolder) {
        state.editedFolder[key] = ''
        }
       delete state.editedFolder.id;
    }),


    editFolder: ((state, folderId) => {
        debugger;
       const index = state.folders.findIndex(p => p.id === folderId)
        state.folders.splice(index, 1, folderId)
    }),

    deleteFolder: ((state, folderId) => {
        const index =  state.folders.findIndex(p => p.id === folderId)
        state.folders.splice(index,1);
    }),

    insertFolder: ((state, folder) => {
        state.folders.push(folder)
    })
}