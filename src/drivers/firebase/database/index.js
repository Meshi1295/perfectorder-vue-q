import firebaseInstance from '../';
import database from 'firebase/database';


function getRef (options){
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/allFolders/${options.folderId}/${options.secondEntity}/`)
}

function readFiles(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/${options.entity}/${options.folderId}/${options.secondEntity}/`)
        .once('value')
        .then(res => {
            console.log(res, 'arrFiles')
            return _getArray(res)
        })
}

function getFile(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/${options.entity}/${options.folderId}/${options.secondEntity}/${options.fileId}`)
        .once('value')
        .then(res => {
            console.log(res, 'oneFiles')
            return res.val()
        })
}

function getFolder(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/${options.entity}/${options.folderId}`)
        .once('value')
        .then(res => {
            console.log(res.val(), 'oneFolder')
           return res.val()
        })
}

function createFiles(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/${options.entity}/${options.folderId}/${options.secondEntity}/`)
        .push(options.file);
}

function removeFile(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/allFolders/${options.folderId}/${options.secondEntity}/${options.fileId}`)
        .remove()
}

function UpdatedFileById(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/${options.entity}/${options.folderId}/${options.secondEntity}/${options.fileId}`)
        .update(options.file)
}

function updateFolderById(options){
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/${options.entity}/${options.folderId}`)
        .update(options.folder)
}

function readFolders(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/${options.entity}`)
        .once('value')
        .then(res => {
            console.log(res, 'arrFolders')
            return _getArray(res)
        })
}

function createFolder(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/${options.entity}/`)
        .push(options.folder);
}

function removeFolder(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/${options.entity}/${options.folderId}`)
        .remove()
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

function _getOneObj (res){
    const map = res.val();
    console.log(map,'map')
    map.id = res.key;
    return map;

}


export default {
    readFolders,
    readFiles,
    createFolder,
    createFiles,
    removeFile,
    removeFolder,
    UpdatedFileById,
    updateFolderById,
    getFile,
    getFolder,
    getRef
}