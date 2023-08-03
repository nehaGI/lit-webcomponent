import { customElement } from 'lit/decorators.js';
import { LitElement, html } from 'lit';

@customElement('ruf-sidemenu')
export class RufSideMenu extends LitElement {
  render() {
    let temp = html`
    <div class="menu-verticle" id="ruf-sidemenu">
      <ruf-menubar-lit direction="column">
        <slot></slot>
      </ruf-menubar-lit>
    </div>
  `;
    return temp;
  }
}
