import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PortalService } from '../../core';

@Component({
  selector: 'app-menu-card',
  template: `
    <ng-container *ngIf="portalService.portal | async as portal">
      <div class="clr-row">
        <div class="clr-col-12">
          <div class="card">
            <ng-template [cdkPortalOutlet]="portal"></ng-template>
          </div>
        </div>
      </div>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuCardComponent {
  constructor(public portalService: PortalService) {}
}
