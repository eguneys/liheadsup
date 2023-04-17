function tag(tag: string) {
  return (options: any, args: Array<string> = []) => {

    let klass = '',
      attrs = '',
      id = '',
      body = '';

    if (Array.isArray(options) || typeof options === 'string') {
      body = tags.frag(options);
    } else {
      let { cls, id: _id, ..._attrs } = options;

      if (cls) {
        if (Array.isArray(cls)) {
          klass = cls.join(' ');
        } else {
          klass = cls;
        }
        if (klass !== '') {
          klass = ` class="${klass}"`;
        }
      }

      if (_id) {
        id = ` id="${_id}"`;
      }

      if (_attrs) {
        attrs = Object.keys(_attrs).map(_ => {
          return ` ${_}="${_attrs[_]}"`;
        }).join(' ');
      }

      body = tags.frag(args);
    }

    return `<${tag}${id}${klass}${attrs}>${body}</${tag}>`;
  };
}

export const tags = {
  frag(args: Array<string> | string) {
    return typeof args === 'string' ? args : args.join('');
  },

  raw(content: string) { return content; },

  html() { return tag('html'); },

  head: tag('head'),
  body: tag('body'),

  div: tag('div'),
  ul: tag('ul'),
  li: tag('li'),
  a: tag('a'),
  date: tag('date'),

  nav: tag('nav'),

  linkt: tag('link'),

  link: (href: string, rel='stylesheet') => {
    return `<link href=${href} rel=${rel}>`;
  },

  script: (defer: boolean, src: string) => {
    return tag('script')({
      defer: "defer",
      src
    });
  },

  h1: tag('h1'),
  h2: tag('h2'),
  h3: tag('h3'),


  p: tag('p'),
  br: () => `<br/>`,
    span: tag('span'),
  strong: tag('strong'),

  main: tag('main'),
  section: tag('section'),

  aside: tag('aside'),

  header: tag('header'),

  input: tag('input'),
  button: tag('button'),
  form: tag('form'),

  meta: tag('meta'),

  headTitle: (title: string) => {
    return tag('title')([title]);
  }

};
