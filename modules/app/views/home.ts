import { tags } from './tags'
import * as h from './helper'

const doctype = tags.raw('<!DOCTYPE html>');
const htmlTag = tags.html();

export type LayoutParams = {
  moreJs?: string,
  moreCss?: string
}

export function layout(title: string, body: string[], params: LayoutParams) {

  let { moreJs, moreCss } = params

  return () => tags.frag([
    doctype,
    htmlTag({}, [
      tags.head([
        tags.headTitle(`${title} liheadsup.org`)
      ]),
      tags.body({ cls: [] }, [
        tags.header({ id: 'top' }, [

        ]),
        tags.div({
          id: 'main-wrap',
          cls: []
        }, body)
      ]),
      loadScripts(moreJs)
    ])
  ])
}

function liheadsupJsObject() {
  return h.embedJsUnsafe(`liheadsup={load:new Promise(r=>{window.onload=r})}`)()
}

function loadScripts(moreJs?: string) {
  return tags.frag([
    liheadsupJsObject(),
    moreJs || ''
  ])
}

export const home = () => layout(
  'Free Online Texas Hold\'em Headsup Poker Site', [
    tags.main({ class: 'vs_app' })
  ], {
    moreJs: tags.frag([
      h.vsTag(),
      h.embedJsUnsafeLoadThen(`LiHeadsup.boot()`)()
    ])
  })()
