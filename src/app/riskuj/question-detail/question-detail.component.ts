import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question, RiskujService } from "../riskuj.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-question-detail',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './question-detail.component.html',
})
export class QuestionDetailComponent implements OnInit {
    @Input() category;
    @Input() price;
    @Output() result = new EventEmitter<{ teamIndex: number | undefined, price: number }>();

    question: Question | undefined;
    multipleChoice: boolean;
    showAnswer = false;

    constructor(private riskujService: RiskujService) {
    }

    ngOnInit(): void {
        this.question = this.riskujService.getQuestion(this.category, this.price);
        this.multipleChoice = this.question?.answers.length > 1;
    }

    closeQuestion() {
        this.result.emit({
            teamIndex: undefined,
            price: 0
        });
    }


    rightAnswer() {
        this.result.emit({
            teamIndex: this.riskujService.activeTeamIndex,
            price: this.price
        });
    }

    wrongAnswer() {
        if (!this.riskujService.deductPoints) {
            this.price = 0;
        }
        this.result.emit({
            teamIndex: this.riskujService.activeTeamIndex,
            price: -this.price
        });
    }
}
