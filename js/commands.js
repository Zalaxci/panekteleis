function displayCommandInfo(commandList, widgetElement) {
    widgetElement.innerHTML = commandList.reduce(
        (htmlString, currObj) => htmlString + `<div class="command-desc">
            <p>${currObj.input}</p>
            <small>${currObj.description}</small>
        </div>`,
        ''
    )
    widgetElement.classList.add('animate__animated')
    widgetElement.classList.add('animate__zoomIn')
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
// The most important function in this file - it runs on user input and "previews" the user's command
// We discern the following 5 cases:
function previewCommand(commands, inputWords, widgetElement) {
    // The user has typed none or 1 words, in which case the command info is displayed if not already shown
    if (inputWords.length === 1 && inputWords[0] === '') {
        if (widgetElement.querySelectorAll('.command-desc').length === 0) {
            console.log('Displaying command info...')
            displayCommandInfo(Object.values(commands), widgetElement)
        }
        return null
    }
    // The user has typed 2 or more words (or at least 2 or more spaces) but no valid command as the 1st word
    if (commands[inputWords[0]] === undefined) {
        console.log('Nothing to display...')
        widgetElement.replaceChildren()
        return null
    }
    switch (commands[inputWords[0]].type) {
        // The user has typed a command corresponding to a widget, followed by some parameters, so a widget element is created if necessary and its parameters are set
        case 'widget':
            const tagName = `${inputWords[0]}-widget`
            let widgetChild = widgetElement.querySelector(tagName)
            if (widgetChild === null) {
                console.log(`Creating ${tagName} element, since it is not present in the widget container...`)
                widgetChild = document.createElement(tagName)
                widgetElement.replaceChildren(widgetChild)
            }
            setWidgetAttributes(commands[inputWords[0]], inputWords, widgetChild)
            break;
        // The user has typed a command corresponding to a website (probably a search engine), so the description is displayed with the user's parameters placed in it
        case 'website':
            let desc = commands[inputWords[0]].description
            const commandParams = getCommandParamsAsObj(commands[inputWords[0]], inputWords)
            for (let paramName in commandParams) {
                desc = desc.replaceAll('$' + paramName, commandParams[paramName])
            }
            widgetElement.textContent = 'press enter to ' + desc
            break;
        // The user has typed a valid command, but it has no/invalid type in the commands.json
        default:
            console.warn(`Warning: ${inputWords[0]} has invalid or no command type (not widget or website)`)
            widgetElement.replaceChildren()
    }
}
// This function is run on the Enter key, and "executes" the typed command
function executeCommand(commandObj, inputWords, widgetChild) {
    switch (commandObj.type) {
        // In the case of a website / search engine, the user parameters are filled into the URL and it's opened in a new tab
        case 'website':
            let urlToOpen = commandObj.url
            const commandParams = getCommandParamsAsObj(commandObj, inputWords)
            console.log(commandParams)
            for (let paramName in commandParams) {
                urlToOpen = urlToOpen.replaceAll('$' + paramName, commandParams[paramName])
            }
            window.open(urlToOpen)
            break;
        // In the case of a widget, execute a function that differs per widget type
        case 'widget':
            // TODO
            break;
    }
}

function initWidgetElement() {
    return document.getElementById('widget')
}
function initCommandInput(commands, widgetElement) {
    const commandInput = document.getElementById('command-input')
    previewCommand(commands, commandInput.value.split(' '), widgetElement)
    commandInput.addEventListener('input', () => previewCommand(
        commands,
        commandInput.value.split(' '),
        widgetElement,
    ))
    commandInput.addEventListener('keyup', (e) => {
        if (e.code === 'Enter' && commands[firstWord] !== undefined)
            executeCommand(commands[firstWord], inputWords, widgetChild)
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