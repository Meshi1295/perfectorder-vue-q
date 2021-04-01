import firebaseInstance from '../';
import database from 'firebase/database';


function getRef (options){
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/allFolders/${options.folderId}/${options.secondEntity}/`)

}

function readFiles(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/allFolders/${options.folderId}/${options.secondEntity}/`)
        .once('value')
        .then(res => {
            const arr = []
            const map = res.val();
            for (const key in map) {
                const item = map[key];
                item.id = key;
                arr.push(item)
            }
            console.log(arr, 'arrFiles')
            return arr;
        })
}

function getFile(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/allFolders/${options.folderId}/${options.secondEntity}/${options.fileId}`)
        .once('value')
        .then(res => {
            const map = res.val();
            map.id = res.key;
            console.log(map, 'arrFiles')
            return map;
        })
}

function getFolder(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/${options.entity}/${options.folderId}`)
        .once('value')
        .then(res => {
            const map = res.val();
            map.id = res.key;
            console.log(map, 'arrFolder')
            return map;
        })
}


function createFiles(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/allFolders/${options.folderId}/${options.secondEntity}/`)
        .push(options.file);
}

function removeFile(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/allFolders/${options.folderId}/files/${options.fileId}`)
        .remove()

}


function UpdatedById(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/allFolders/${options.folderId}/${options.secondEntity}/${options.fileId}`)
        .update(options.file)
}


function readFolders(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/${options.entity}`)
        .once('value')
        .then(res => {
            return _getArray(res)
        })
}

function createFolder(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/${options.entity}/`)
        .push({name: options.name});
}

function removeFolder(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/${options.entity}/${options.folderId}`).remove()
}

function updateFolder(options){
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/${options.entity}/${options.folderId}/`)
        .update({name:options.folder})

}

function _getArray(res) {
    const arr = []
    const map = res.val();
    for (const key in map) {
        const item = map[key];
        item.id = key;
        arr.push(item)
    }
    console.log(arr, 'arr read db')
    return arr;
}


export default {
    readFolders,
    readFiles,
    createFolder,
    createFiles,
    removeFile,
    removeFolder,
    UpdatedById,
    updateFolder,
    getFile,
    getFolder,
    getRef


}