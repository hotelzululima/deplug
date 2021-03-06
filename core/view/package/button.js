import m from 'mithril'
export default class ButtonBoxView {
  view (vnode) {
    const { pkg, install } = vnode.attrs
    if (pkg.archive) {
      return m('span', { class: 'button-box' }, [
        m('input', {
          type: 'button',
          value: 'Install',
          onclick: () => {
            install(pkg)
          },
        })
      ])
    }
    if (pkg.removal) {
      return [
        m('p', ['This package will be removed on the next startup.']),
        m('span', { class: 'button-box' }, [
          m('input', {
            type: 'button',
            value: 'Undo',
            onclick: () => {
              deplug.packages.setUninstallFlag(pkg.id, false)
            },
          })
        ])
      ]
    }
    return m('span', { class: 'button-box' }, [
      m('input', {
        type: 'button',
        value: pkg.disabled
          ? 'Enable'
          : 'Disable',
        onclick: () => {
          if (pkg.disabled) {
            deplug.packages.enable(pkg.id)
          } else {
            deplug.packages.disable(pkg.id)
          }
        },
      }),
      m('input', {
        type: 'button',
        value: 'Uninstall',
        style: {
          display: pkg.builtin
            ? 'none'
            : 'block',
        },
        onclick: () => {
          deplug.packages.setUninstallFlag(pkg.id, true)
        },
      })
    ])
  }
}
