
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu-item',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './sidebarMenuItem.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuItemComponent {

  @Input({ required: true }) icon!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) path!: string;
}
