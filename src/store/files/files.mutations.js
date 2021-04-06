export default {

    setFiles: ((state, files) => {
        state.files = files
    }),

    setEditedFileId: ((state, fileId) => {
        state.editedFileId = fileId
    }),
    setEditedFolderIdFromFiles: ((state, folderId) => {
        state.editedFolderId = folderId
    }),

    setEditedFile: ((state, file) => {
        debugger;
        state.editedFile = file
    }),

    setEditedFileImage:((state, url) => {
        state.editedFile.image = url
    }),

    resetEditedFileId: ((state) => {
     state.editedFileId = ''
    }),

    resetEditedFile: ((state) => {
        for (const key in state.editedFile) {
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