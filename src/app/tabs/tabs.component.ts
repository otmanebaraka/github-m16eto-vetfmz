import {
  Component,
  ContentChildren,
  QueryList,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> =
    new QueryList<TabComponent>();

  @Input() activeTabIndex: number = 0;
  @Output() closeTabEvent = new EventEmitter<number>();

  constructor(private cdr: ChangeDetectorRef) {}

  selectTab(tab: TabComponent) {
    this.cdr.markForCheck();
    this.tabs.toArray().forEach((t) => (t.active = false));
    tab.active = true;
  }

  closeTab(tab: TabComponent, index: number) {
    this.closeTabEvent.emit(index);
  }
}
