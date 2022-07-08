const isMac = navigator.platform.indexOf("Mac") === 0 || navigator.platform === "iPhone";
const controlKeyPrefix = isMac ? "⌘" : "Control";
const backspaceKeyPrefix = isMac ? "delete" : "backspace";

export const supportedKeyboardEvents =
{
    "Select tool" : ["1"],
    "Rectangle tool" : ["2"],
    "Circle tool" : ["3"],
    "delete shape" : [backspaceKeyPrefix],
    "Cut shape" : [controlKeyPrefix,"X"],
    "Copy shape" : [controlKeyPrefix,"C"],
    "Paste shape" : [controlKeyPrefix,"V"],
    "Move shape" : ["Arrow-keys"],
    "Select multiple items" : ["Shift","click"],
    "Undo" : [controlKeyPrefix,"Z"],
    "Redo" : [controlKeyPrefix,"Shift","Z"]
}