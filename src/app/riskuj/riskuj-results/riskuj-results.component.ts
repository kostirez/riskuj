import { Component } from '@angular/core';
import { RiskujService, Team } from "../riskuj.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-riskuj-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './riskuj-results.component.html',
})
export class RiskujResultsComponent {
    teams: Team[] = [];

    constructor(private riskujService: RiskujService) {
        this.teams = this.riskujService.teams;
    }

    getTeamsOrder(): Team[] {
        return this.teams.sort((t1,t2) => t1.points-t2.points);
    }
}
