import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ruf-menubar-item-lit')
export class RufMenubarItemLit extends LitElement {
  @property({
    reflect: true,
  })
  path = 'NA';

  @property({
    type: Object,
    reflect: true,
  })
  data = {};

  @property({
    type: Boolean,
    reflect: true,
  })
  nonselectable = false;

  @property({
    type: Boolean,
  })
  disabled = true;

  render() {
    return html`
      <a @click=${this._itemSelected}>
        <slot></slot>
      </a>
    `;
  }

  /*When writing components intended to be subclassed in TypeScript, the static styles field should be explicitly typed as CSSResultGroup to allow flexibility for users to override styles with an array */
  static styles: CSSResultGroup = css`
    a {
      padding: 8px 15px;
      display: inline-block;
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
  }

  _itemSelected(event) {
    event.stopPropagation();
    event.preventDefault();

    if (this.nonselectable) {
      return;
    }

    const selectItemEvent = new CustomEvent('itemSelected', {
      detail: {
        selectedItem: this.innerHTML,
        selectedPath: this.path,
        selectedData: this.data,
      }, // send data to listener
      bubbles: true, // bubble event upwards in DOM
      composed: true, //bubble up event from Shadow DOM to real DOM
    });

    this.dispatchEvent(selectItemEvent);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
  }
}
