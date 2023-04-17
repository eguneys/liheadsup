import { env as e } from './env'
import { tags } from '../tags'

let assetBaseUrl = () => ''

export function assetUrl(path: string) {
  return `${assetBaseUrl()}/assets/${path}`
}

function jsAt(path: string) {
  return tags.script(true, assetUrl(path))
}

export function jsModule(name: string) {
  return jsAt(`compiled/${name}.js`)
}

export const vsTag = () => jsModule('vs')


export const embedJsUnsafe = (js: string) => () => {
  //let nonce = ctx.nonce ? ` nonce="${ctx.nonce}"`:'';
  let nonce = ''

  return `<script${nonce}>${js}</script>`;
};

export const embedJsUnsafeLoadThen = (js: string) => () => {
    return embedJsUnsafe(`liheadsup.load.then(() =>{${js}})`)();
};
