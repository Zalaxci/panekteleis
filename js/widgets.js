import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js'
import { Task } from 'https://cdn.jsdelivr.net/npm/@lit/task@1.0.0/+esm'

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
        static styles = css`
            * {
                text-align: center;
            }
            img {
                position: relative;
                left: 50%;
                transform: translateX(-50%);
                box-shadow: 10px 10px 1px 0px rgba(52,58,69,0.6);
                -webkit-box-shadow: 10px 10px 1px 0px rgba(52,58,69,0.6);
                -moz-box-shadow: 10px 10px 1px 0px rgba(52,58,69,0.6);
            }
        `
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
                const title = tenorData.results[0].content_description
                const imgUrl = tenorData.results[0].media[0].tinygif.url
                return { title, imgUrl }
            },
            args: () => [this.gif_content]
        })
        constructor() {
            super()
        }
        shouldUpdate() {
            return this.gif_content.trim() !== ''
        }
        render() {
            return this._tenorAPITask.render({
                pending: () => html`<h3>Loading ${this.gif_content} gif...</h3>`,
                complete: ({ title, imgUrl }) => html`
                    <h2>${title}</h2>
                    <img src="${imgUrl}"/>
                `,
                error: (e) => html`<h3>Error: ${e}</h3>`
            })
        }
    }
)