import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, merge, of } from 'rxjs';
import { StateService } from '@app/services/state.service';

@Component({
  selector: 'app-federation-alert',
  templateUrl: './federation-alert.component.html',
  styleUrls: ['./federation-alert.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FederationAlertComponent {
  network$: Observable<string>;

  constructor(
    public stateService: StateService,
  ) {
    this.network$ = merge(of(this.stateService.network), this.stateService.networkChanged$);
  }
}
