export default {

    setFiles: ((state, files) => {
        debugger;
        state.files = files
    }),

    setEditedFileId: ((state, fileId) => {
        debugger;
        state.editedFileId = fileId
    }),
    setEditedFolderIdFromFiles: ((state, folderId) => {
        debugger;
        state.editedFolderId = folderId
    }),

    setEditedFile: ((state, file) => {
        debugger;
        state.editedFile = file
    }),

    resetEditedFileId: ((state) => {
        debugger;
     state.editedFileId = ''
    }),

    resetEditedFile: ((state) => {
        for (const key of state.editedFile) {
            state.editedFile[key] = ''
        }
        delete state.editedFile.id;
    }),

    editFile: ((state, file) => {
        const index = state.files.findIndex(p => p.id === file.id)
        state.files.splice(index, 1, file)
    }),

    deleteFile: ((state, fileId) => {
        const index = state.files.findIndex(p => p.id === fileId)
        state.files.splice(index, 1);
    }),

    insertFile: ((state, file) => {
        state.files.push(file)
    }),

}