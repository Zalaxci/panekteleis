import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js'
import { Task } from 'https://cdn.jsdelivr.net/npm/@lit/task@1.0.0/+esm'

const globalStyles = css`
    * {
        text-align: center;
    }
    .parent {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .img-div {
        width: 80%;
        flex-grow: 1;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
`
function timeSwitchPromise(delay, abortSignal) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, delay)
        abortSignal?.addEventListener('abort', () => {
            clearTimeout(timeout)
            reject()
        })
    })
}
customElements.define(
    'gif-widget',
    class GifWidget extends LitElement {
        static properties = {
            gif_content: {
                type: String
            }
        }
        static styles = globalStyles
        _tenorAPITask = new Task(this, {
            task: async ([gif_content], {signal}) => {
                if (gif_content.trim().length <= 2)
                    throw new Error('$gif_content too small (smaller or equal to 2 characters)')
                await timeSwitchPromise(300, signal)
                console.log(`Fetching ${gif_content} gif...`)
                const tenorResponse = await fetch(
                    `https://api.tenor.com/v1/search?q=${gif_content}&key=TTJEW9NDWEJV&limit=1`,
                    { signal }
                )
                const tenorData = await tenorResponse.json()
                signal.throwIfAborted()
                console.log(tenorData.results[0])
                return {
                    title: tenorData.results[0]?.content_description || '',
                    imgUrl: tenorData.results[0]?.media[0]?.tinygif.url || '',
                }
            },
            args: () => [this.gif_content]
        })
        constructor() {
            super()
        }
        render() {
            return this._tenorAPITask.render({
                pending: () => html`<h3>Loading ${this.gif_content} gif...</h3>`,
                complete: ({ title, imgUrl }) => html`
                    <div class="parent">
                        <h2>${title}</h2>
                        <div class="img-div" style="background-image: url('${imgUrl}');"/>
                    </div>
                `,
                error: (e) => html`<h3>Error: ${e}</h3>`
            })
        }
    }
)
customElements.define(
    'w-widget',
    class WikiWidget extends LitElement {
        static properties = {
            article: {
                type: String
            }
        }
        static styles = globalStyles
        _wikipediaAPITask = new Task(this, {
            task: async ([articleTitle], {signal}) => {
                if (articleTitle.trim().length <= 2)
                    throw new Error('$article too small (smaller or equal to 2 characters)')
                await timeSwitchPromise(300, signal)
                console.log(`Fetching ${articleTitle} wikipedia article(s)...`)
                const wikiResponse = await fetch(
                    `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=description|pageimages&titles=${articleTitle}&piprop=original&formatversion=2`,
                    { signal }
                )
                const wikiData = await wikiResponse.json()
                console.log(wikiData)
                return {
                    title: wikiData.query.pages[0]?.title || '',
                    desc: wikiData.query.pages[0]?.description || '',
                    imgUrl: wikiData.query.pages[0]?.original?.source || '',
                }
            },
            args: () => [this.article]
        })
        constructor() {
            super()
        }
        render() {
            return this._wikipediaAPITask.render({
                pending: () => html`<h3>Loading ${this.article} wikipedia article(s)...</h3>`,
                complete: ({ title, description, imgUrl }) => html`
                    <div class="parent">
                        <h2>${title}</h2>
                        <h4>${description}</h4>
                        <div class="img-div" style="background-image: url('${imgUrl}');"/>
                    </div>
                `,
                error: (e) => html`<h3>Error: ${e}</h3>`
            })
        }
    }
)