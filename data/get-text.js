function commitData() {
    var textArea = document.getElementById("edit-box");
    text = textArea.value;
    self.port.emit("sites-entered", text);
    textArea.value = '';

    // Listen for the "show" event being sent from the
    // main add-on code. It means that the panel's about
    // to be shown.
    //
    // Set the focus to the text area so the user can
    // just start typing.
}

self.port.on("show", function onShow() {
    var textArea = document.getElementById("edit-box");
    var comfirmBtn = document.getElementById("comfirm-btn");
    textArea.focus();
    comfirmBtn.onclick = commitData;
});
