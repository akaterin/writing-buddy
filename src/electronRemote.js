const electronRemote = window.require('electron').remote
const dialog = electronRemote.dialog
const fs = electronRemote.fs
export default electronRemote
export { dialog, fs }

