function displayCommandInfo(commandList, widgetElement) {
    widgetElement.innerHTML = commandList.reduce(
        (htmlString, currObj) => htmlString + `<div>
            <p>${currObj.command}</p>
            <small>${currObj.description}</small>
        </div>`,
        ''
    )
}

function initWidgetElement() {
    return document.getElementById('widget')
}
function initCommandInput(commandList, widgetElement) {
    let commandInput = document.getElementById('command-input')
    commandInput.focus()
    commandInput.select()
    commandInput.addEventListener('keyup', (_) => {
        if (commandInput.value == '') displayCommandInfo(commandList, widgetElement)
    })
    displayCommandInfo(commandList, widgetElement)
    return commandInput
}
async function initCommandPanel() {
    let fetchResponse = await fetch('commands.json')
    let commandList = await fetchResponse.json()
    let widgetElement = initWidgetElement()
    let commandInput = initCommandInput(commandList, widgetElement)
}

initCommandPanel()