/* eslint-disable import/no-anonymous-default-export */


let command_control_KeyPrefix = "Shift"; // control key
let backspace_delete_keyPrefix = "backspace";  //backspcae key
if (navigator.platform.indexOf("Mac") === 0 || navigator.platform === "iPhone")
{
    command_control_KeyPrefix = "⌘"; // command key
    backspace_delete_keyPrefix = "delete"; //delete key
 }
 console.log(command_control_KeyPrefix);
export default 
{
    "Select tool" : "1",
    "Rectangle tool" : "2",
    "Circle tool" : "3",
    "delete shape" : backspace_delete_keyPrefix,
    "Cut shape" : [command_control_KeyPrefix,"X"],
    "Copy shape" : [command_control_KeyPrefix,"C"],
    "Paste shape" : [command_control_KeyPrefix,"V"],
    "Move shape" : "Arrow-keys",
    "Select multiple items" : ["Shift","click"],
    "Undo" : [command_control_KeyPrefix,"Z"],
    "Redo" : [command_control_KeyPrefix,"Shift","Z"],
}