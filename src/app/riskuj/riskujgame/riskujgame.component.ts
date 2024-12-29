import { Component } from '@angular/core';
import { RiskujService, Team } from "../riskuj.service";
import { CommonModule } from "@angular/common";
import { QuestionDetailComponent } from "../question-detail/question-detail.component";

interface QuestionBox {
    price: number;
    status: 'ready' | 'done';
}

interface Row {
    category: string;
    questionBoxes: QuestionBox[];
}

@Component({
    selector: 'app-riskujgame',
    standalone: true,
    imports: [ CommonModule, QuestionDetailComponent ],
    templateUrl: './riskujgame.component.html',
})
export class RiskujgameComponent {
    rows: Row[] = [];
    teams: Team[] = [];
    openQuestionDialog = false;
    selectedPrice: number | undefined;
    selectedCategory: string | undefined;

    constructor(
        private riskujService: RiskujService
    ) {
        this.teams = this.riskujService.getTeams();
        const categories = this.riskujService.getCategories();
        categories.forEach(c => {
            const prices = this.riskujService.getPricesForCategory(c);
            const questionBoxes: QuestionBox[] = prices.map(p =>
                ({
                    price: p,
                    status: 'ready',
                })
            )
            this.rows.push(
                {
                    category: c,
                    questionBoxes: questionBoxes
                }
            );
        });
    }
    getTeamIndexOnTurn(): number {
        return this.riskujService.activeTeamIndex
}

    public clickQuestion(category: string, questionBox: QuestionBox) {
        if (questionBox.status === 'done') {
            return;
        }
        this.openQuestion(category, questionBox.price);
    }

    public openQuestion(category: string, price: number) {
        this.selectedCategory = category;
        this.selectedPrice = price;
        this.openQuestionDialog = true;
    }

    public setQuestionBoxDone(category: string, price: number): void {
        const rowIndex = this.rows.findIndex(r => r.category == category);
        const row = this.rows.find(r => r.category == category);
        const priceIndex = row.questionBoxes.findIndex(b => b.price == price);
        this.rows[rowIndex].questionBoxes[priceIndex].status = 'done';
    }

    resolveQuestion(teamIndex: number | undefined, price: number) {
        if (teamIndex != undefined) {
            this.teams[teamIndex].points += price;
            this.setQuestionBoxDone(this.selectedCategory!, this.selectedPrice!);
            this.checkEnd();
            this.nextTurn(price)
        }
        this.closeQuestion();
    }

    nextTurn(points: number) {
        if (this.riskujService.changeAfterLose && points > -1) {
            return;
        }
        this.riskujService.nextTeam();
    }

    public closeQuestion() {
        this.selectedCategory = undefined;
        this.selectedPrice = undefined;
        this.openQuestionDialog = false;
    }

    checkEnd() {
        let end = true
        this.rows.forEach(r => {
            r.questionBoxes.forEach(r => {
                if (r.status === "ready") {
                    end = false;
                }
            })
        });
        if (end) {
            this.riskujService.end()
        }

    }

    getColor(colorLabel: string) {
        return this.riskujService.getColors().find(c=>c.label==colorLabel).code;
    }
}
