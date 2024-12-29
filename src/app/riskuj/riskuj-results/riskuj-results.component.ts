import { Component } from '@angular/core';
import { RiskujService, Team } from "../riskuj.service";
import { CommonModule } from "@angular/common";

interface PlaceColor {
    index: number;
    color: string;
}

const PLACE_COLORS: PlaceColor[] = [
    {
        index: 0,
        color: "#ffae00"
    }, {
        index: 1,
        color: "#cecece"
    }, {
        index: 2,
        color: "#b48429"
    },
]

const DEFAULT_PLACE_COLOR: PlaceColor = {
    index: -1,
    color: "#807659"
}


@Component({
    selector: 'app-riskuj-results',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './riskuj-results.component.html',
})
export class RiskujResultsComponent {
    teams: Team[] = [];

    constructor(private riskujService: RiskujService) {
        this.teams = this.riskujService.teams;
    }

    getTeamsOrder(): Team[] {
        return this.teams.sort((t1, t2) => t1.points - t2.points);
    }

    getPlaceColor(index: number): string {
        if (index < PLACE_COLORS.length) {
            return PLACE_COLORS[index].color;
        }
        return DEFAULT_PLACE_COLOR.color;
    }
}
