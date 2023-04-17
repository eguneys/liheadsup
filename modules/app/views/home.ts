import { tags } from './tags'

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
      ])
    ])
  ])
}

export const home = () => layout(
  'Free Online Texas Hold\'em Headsup Poker Site', [
  ], {})()
