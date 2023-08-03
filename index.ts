import './src/menubar-lit.ts';
import './src/menubar-item-lit.ts';
import './src/sidemenu-items.ts';
import './src/sidemenu.ts';
import { RufMenubarLit } from './src/menubar-lit';
import { RufMenubarItemLit } from './src/menubar-item-lit';
import { RufSideMenuItem } from './src/sidemenu-items';
import { RufSideMenu } from './src/sidemenu';

declare global {
  interface HTMLElementTagNameMap {
    'ruf-menubar-lit': RufMenubarLit;
    'ruf-menubar-item-lit': RufMenubarItemLit;
    'ruf-sidemenu-item': RufSideMenuItem;
    'ruf-sidemenu': RufSideMenu;
  }
}

// listener for Basic Web Component
const rufMenubarLit = document.querySelector('ruf-menubar-lit');
rufMenubarLit?.addEventListener('selectChange', (event: any) => {
  console.log(event.detail.selectedItem);
});
