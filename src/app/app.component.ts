import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RiskujgameComponent } from "./riskuj/riskujgame/riskujgame.component";
import { CommonModule } from "@angular/common";
import { RiskujSettingsComponent } from "./riskuj/riskuj-settings/riskuj-settings.component";
import { RiskujService } from "./riskuj/riskuj.service";
import { RiskujResultsComponent } from "./riskuj/riskuj-results/riskuj-results.component";


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ RouterOutlet, CommonModule, RiskujSettingsComponent, RiskujgameComponent, RiskujResultsComponent ],
    templateUrl: './app.component.html',
})
export class AppComponent {
    title = 'riskuj';

    constructor(private riskujService: RiskujService) {
    }

    play() {
        this.riskujService.start()
    }

    getState() {
        return this.riskujService.state
}
}
