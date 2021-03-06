import { Disposable } from 'disposables'
import m from 'mithril'
import marked from 'marked'

const fields = Symbol('fields')
class Markdown {
  view () {
    return m('p')
  }

  oncreate (vnode) {
    vnode.dom.innerHTML = marked(vnode.attrs.content)
  }
}

class Container {
  view (vnode) {
    const { opt, content, handler } = vnode.attrs
    return [
      m('h4', [
        opt.title,
        m('button', {
          style: { visible: opt.closeButton },
          onclick: () => {
            handler.dispose()
          },
        }, [m('i', { class: 'fa fa-close' })])
      ]),
      m(Markdown, { content })
    ]
  }
}

export default class Notification {
  constructor () {
    this[fields] = { container: null }
  }

  show (content, options = {}) {
    const opt = Object.assign({
      type: '',
      title: '',
      ttl: 5000,
      closeButton: true,
    }, options)
    if (this[fields].container === null) {
      this[fields].container = document.querySelector('div.notification')
    }
    const base = document.createElement('div')
    base.className = opt.type

    const handler = new Disposable(() => {
      base.remove()
    })
    m.mount(base, {
      view: () => m(Container, {
        opt,
        content,
        handler,
      }),
    })
    this[fields].container.appendChild(base)

    if (opt.ttl > 0) {
      setTimeout(() => {
        handler.dispose()
      }, opt.ttl)
    }
    return handler
  }
}
