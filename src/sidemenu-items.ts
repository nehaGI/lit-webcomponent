import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { RufMenubarItemLit } from './menubar-item-lit';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ruf-sidemenu-item')
export class RufSideMenuItem extends RufMenubarItemLit {
  @property({
    type: Boolean,
  })
  disabled = false;

  static styles = [
    RufMenubarItemLit.styles,
    css`
   .item_disabled {
     opacity : 0.5;
     cursor: not-allowed;
    }
  `,
  ];

  render() {
    const classes = {
      item_disabled: this.disabled,
    };
    return html`
      <a @click=${this._itemSelected} class=${classMap(classes)}>
        <slot></slot>
      </a>
    `;
  }

  _itemSelected(event) {
    if (!this.disabled) {
      super._itemSelected(event);
    }
  }
}
