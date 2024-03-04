function displayCommandInfo(commandList, widgetElement) {
    widgetElement.innerHTML = commandList.reduce(
        (htmlString, currObj) => htmlString + `<div>
            <p>${currObj.input}</p>
            <small>${currObj.description}</small>
        </div>`,
        ''
    )
    widgetElement.classList.add('animate__animated')
    widgetElement.classList.add('animate__zoomIn')
}
// Execute a command and return the widget element (widgetChild) added if the command corresponds to a widget, otherwise null
function executeCommand(commands, inputWords, widgetElement) {
    if (inputWords[0] === '') {
        console.log('Displaying command info...')
        displayCommandInfo(Object.values(commands), widgetElement)
        return null
    }
    if (commands[inputWords[0]] !== undefined && commands[inputWords[0]].type === 'widget') {
        console.log(`Displaying ${inputWords[0]} widget...`)
        const widgetChild = document.createElement(`${inputWords[0]}-widget`)
        widgetElement.replaceChildren(widgetChild)
        return widgetChild
    }
    console.log('Nothing to display...')
    widgetElement.replaceChildren()
    return null
}
function getCommandParamsAsObj(commandObj, inputWords) {
    // The commandParams object contains the command parameters the user typed after the command keyword as an object
    // e.g. notes $function $name -> { "function": XXX, "name": YYY }
    let commandParams = {}
    // commandWords are the words in the command - to take the previous example, that'd be ["notes", "$function", "$name"]
    // On the other hand, inputWords are the words the user entered, that might be ["notes", "add", "homework"]
    const commandWords = commandObj.input.split(' ')
    // The problem is that more than one word might correspond to one parameter or you might have less words than parameters
    // e.g. "notes add" or "notes add hello there, this name has spaces in it"
    // Start by taking the input words array sliced up to commandWord length
    let neededInputWords = inputWords.slice(0, commandWords.length)
    // If the input word array's longer than the command words, add all words after the last one to the last item in the array, seperated by spaces
    if (inputWords.length > commandWords.length)
        neededInputWords[commandWords.length - 1] += ' ' + inputWords.slice(commandWords.length).join(' ')
    // If the input word array's smaller than the command words, push an apropriate ammount of empty strings to fill it
    else if(inputWords.length < commandWords.length)
        neededInputWords.push(...Array(commandWords.length - inputWords.length).fill(''))
    // We iterate over all command words apart from the first, i.e. the command name
    for (let i = commandWords.length - 1; i > 0; i--) {
        // Then we add an item to the object, with the command word as key and the input word as value - i.e. "function" -> "add"
        commandParams[commandWords[i].substring(1)] = neededInputWords[i]
    }
    // Finally return the commandParams
    return commandParams
}
function setWidgetAttributes(commandObj, inputWords, widgetChild) {
    const commandParams = getCommandParamsAsObj(commandObj, inputWords)
    for (let attributeName in commandParams) {
        widgetChild.setAttribute(attributeName, commandParams[attributeName])
    }
}

function initWidgetElement() {
    return document.getElementById('widget')
}
function initCommandInput(commands, widgetElement) {
    // Store the command input element
    const commandInput = document.getElementById('command-input')
    // Store words the user has typed
    let inputWords = commandInput.value.split(' ')
    let firstWord = inputWords[0]
    // Execute the command that's typed in when page loads (unless the page is reloaded that's blank, so command info is displayed)
    let widgetChild = executeCommand(commands, inputWords, widgetElement)
    if (widgetChild !== null) setWidgetAttributes(commands[firstWord], inputWords, widgetChild)
    // Listen to user input and run a function
    commandInput.addEventListener('input', (_) => {
        // Get the words the user has typed
        inputWords = commandInput.value.split(' ')
        // If the first word is different than the previous one, update the "firstWord" and "widgetChild" accordingly and execute the command
        if (inputWords[0] !== firstWord) {
            firstWord = inputWords[0]
            widgetChild = executeCommand(commands, inputWords, widgetElement)
        }
        // If the user has inputed a command corresponding to a widget (e.g. notes), then update the widget's parameters
        if (widgetChild !== null) setWidgetAttributes(commands[firstWord], inputWords, widgetChild)
    })
    // Focus on the command input so user can type immediately on page load, without clicking on it
    commandInput.focus()
    commandInput.select()
}
async function initCommandPanel() {
    let fetchResponse = await fetch('commands.json')
    let commands = await fetchResponse.json() // An object where each command object is mapped to a keyword (e.g. "g" to search google)
    let widgetElement = initWidgetElement()
    initCommandInput(commands, widgetElement)
}

initCommandPanel()