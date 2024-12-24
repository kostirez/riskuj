import { Component } from '@angular/core';

type State = 'settings' | 'game' | 'results';


@Component({
  selector: 'app-riskuj-main',
  standalone: true,
  imports: [],
  templateUrl: './riskuj-main.component.html',
})
export class RiskujMainComponent {

  state: State = 'settings';


}
