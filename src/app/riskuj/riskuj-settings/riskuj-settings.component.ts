import { Component } from '@angular/core';
import * as Papa from 'papaparse';
import { CommonModule } from "@angular/common";
import { Question, RiskujService, Team } from "../riskuj.service";
import { FormsModule } from "@angular/forms";



@Component({
    selector: 'app-riskuj-settings',
    standalone: true,
    imports: [ CommonModule, FormsModule ],
    templateUrl: 'riskuj-settings.component.html'
})
export class RiskujSettingsComponent {
    parsedData: { kategorie: string; cena: number; otazka: string; odpoved1: string; odpoved2: string; odpoved3: string; }[] = [];
    showData: boolean = false;
    teamName: string = '';
    teamColor: string = '';
    colors: string[] = this.riskujService.getColors().map(c => c.label);
    teams: Team[] = [];
    deduct: false;
    changeAfterLose: false;

    constructor(private riskujService: RiskujService) {
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                const csvContent = reader.result as string;

                // Parsování CSV pomocí papaparse
                Papa.parse(csvContent, {
                    header: true, // První řádek bude použit jako klíče pro objekty
                    skipEmptyLines: true, // Přeskočení prázdných řádků
                    complete: (result) => {
                        // Mapa dat podle požadované struktury
                        this.parsedData = result.data.map((row: any) => ({
                            kategorie: row['kategorie'] || '',
                            cena: +row['cena'] || 0, // Převod ceny na číslo
                            otazka: row['otazka'] || '',
                            odpoved1: row['odpoved1'] || '',
                            odpoved2: row['odpoved2'] || '',
                            odpoved3: row['odpoved3'] || ''
                        }));
                    }
                });
            };

            reader.readAsText(file);

        }
    }

    addTeam() {
        if (this.teamName && this.teamColor) {
            this.teams.push({name: this.teamName, points: 0, color: this.teamColor});
            this.teamName = '';
            this.teamColor = '';
        }
    }

    setData() {

        const questions: Question[] = this.parsedData.map(d => ({
            question: d.otazka,
            answers: d.odpoved2 ? [ d.odpoved1, d.odpoved2, d.odpoved3 ] : [ d.odpoved1 ],
            price: d.cena,
            category: d.kategorie,
        }))
        this.riskujService.setQuestions(questions)
    }

    setTeams() {
        this.riskujService.setTeams(this.teams);
    }

    play() {
        this.riskujService.setDeduct(this.deduct);
        this.riskujService.setChangingStrategy(this.changeAfterLose);
        this.setTeams()
        this.setData()
        this.riskujService.play()
    }

    getColor(colorLabel: string): string {
        return this.riskujService.getColors().find(c=>c.label==colorLabel).code;
    }
}
