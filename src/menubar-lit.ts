import { LitElement, css, html } from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
} from 'lit/decorators.js';
import { RufMenubarItemLit } from './menubar-item-lit';

@customElement('ruf-menubar-lit')
export class RufMenubarLit extends LitElement {
  @property({
    reflect: true,
  })
  selectedPath = '';

  @property()
  inkbarColor = css`purple`;

  @property({
    reflect: true,
  })
  direction = 'row';

  render() {
    return html`
    <h1>RUF Menubar using Lit</h1>
    <div id="menubar-container" class="menubar-${this.direction}-style">
      <slot></slot>
    </div>
    `;
  }

  static styles = css`
    .menubar-row-style {
      display: flex;
      flex-direction: row;
      align-items: center;
      border: 1px solid #b3bfc2;
      ::slotted(*) {
        cursor: pointer;
        border-bottom: solid 4px transparent;
      }
      ::slotted(.ruf-menubar-item-active) {
        border-bottom-color: var(--ruf-menubar-inkbar-color, #4bcd3e);
      }
    }

    .menubar-column-style {
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid #b3bfc2;
      ::slotted(*) {
        cursor: pointer;
        border-left: solid 4px transparent;
      }
      ::slotted(.ruf-menubar-item-active) {
        border-left-color: var(--ruf-menubar-inkbar-color, #4bcd3e);
      }
    }
    ::slotted(*:hover) {
      background:  #b3bfc2;
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('itemSelected', this.itemSelection);
    setTimeout(() => {
      this.selectedPath = '/item1';
    }, 0);
  }

  override attributeChangedCallback(name, _old, value) {
    super.attributeChangedCallback(name, _old, value);
    if (name === 'selectedpath' && _old !== value) {
      this.select(value);
    }
  }

  itemSelection(event) {
    event.stopPropagation();
    event.preventDefault();
    this.updateActiveClass(event.detail.selectedItem);
    this.selectedPath = event.detail.selectedPath;
  }

  @queryAssignedElements({
    flatten: true,
  })
  _defaultSlottedEls!: Array<RufMenubarItemLit>;

  updateActiveClass(selection) {
    this._defaultSlottedEls.forEach((item) => {
      if (item.innerText === selection) {
        item?.classList?.add('ruf-menubar-item-active');
      } else {
        item?.classList?.remove('ruf-menubar-item-active');
      }
    });
  }

  select(path: string) {
    if (!!path) {
      this._defaultSlottedEls.forEach((item: RufMenubarItemLit) => {
        if (item.path === path && !item.nonselectable) {
          this.updateActiveClass(item.innerText);
          const selectItemEvent = new CustomEvent('selectChange', {
            detail: {
              selectedItem: item.innerText,
              selectedPath: item.path,
              selectedData: item.data,
            }, // send data to listener
            bubbles: true, // bubble event upwards in DOM
            composed: true, //bubble up event from Shadow DOM to real DOM
          });
          this.dispatchEvent(selectItemEvent);
        }
      });
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('itemSelected', this.itemSelection);
  }
}
