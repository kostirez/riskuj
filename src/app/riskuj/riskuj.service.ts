import { Injectable } from '@angular/core';

export interface RiskujSettings {
    time: boolean;
    changeAfterLose: boolean;
}

export interface Question {
    question: string;
    answers: string[];
    price: number;
    category: string;
}

type State = 'start' | 'settings' | 'game' | 'results';

export interface Team {
    name: string;
    points: number;
    color: string;
}

@Injectable({
    providedIn: 'root'
})
export class RiskujService {

    teams: Team[] = [];
    activeTeamIndex: number = 0;
    state: State = 'start';
    deductPoints: boolean = false;
    changeAfterLose: boolean = false;

    constructor() {
        // this.setQuestions([
        //     {
        //         question: "otazka 1",
        //         answers: [ "odpoved 1", "odpoved 2" ],
        //         price: 100,
        //         category: "kategorie1",
        //     },
        //     {
        //         question: "otazka 2",
        //         answers: [ "odpoved 1", "odpoved 2" ],
        //         price: 200,
        //         category: "kategorie1",
        //     },
        //     {
        //         question: "otazka 3",
        //         answers: [ "odpoved 1", "odpoved 2" ],
        //         price: 300,
        //         category: "kategorie1",
        //     },
        //     {
        //         question: "otazka 1",
        //         answers: [ "odpoved 1", "odpoved 2" ],
        //         price: 100,
        //         category: "cestovani",
        //     },
        //     {
        //         question: "otazka 2",
        //         answers: [ "odpoved 1", "odpoved 2" ],
        //         price: 200,
        //         category: "cestovani",
        //     },
        //     {
        //         question: "otazka 3",
        //         answers: [ "odpoved 1" ],
        //         price: 300,
        //         category: "cestovani",
        //     },
        // ]);

        // this.setTeams([
        //     {
        //         name: "team 1",
        //         points: 0,
        //         color: "blue"
        //     },
        //     {
        //         name: "team 2",
        //         points: 0,
        //         color: "blue"
        //     },
        //     {
        //         name: "team 3",
        //         points: 0,
        //         color: "blue"
        //     },
        // ])
    }

    settings: RiskujSettings | undefined = undefined;
    private questions: Question[] = [];

    start() {
        if (this.state === 'start') {
            this.state = 'settings';
        }
    }

    play() {
        if (this.state === 'start') {
            this.state = 'settings';
        } else {
            this.state = 'game';
        }
    }

    public nextTeam() {
        this.activeTeamIndex += 1;
        if (this.teams.length === this.activeTeamIndex) {
            this.activeTeamIndex = 0
        }
    }

    public getTeamIndex(): number {
        return this.activeTeamIndex;
    }

    public setQuestions(questions: Question[]) {
        this.questions = questions;
    }

    public getTeams() {
        return this.teams;
    }

    public setTeams(teams: Team[]) {
        this.teams = teams;
    }

    public getCategories(): string[] {
        const ret: string[] = [];
        this.questions.forEach(q => {
            if (!ret.includes(q.category)) {
                ret.push(q.category);
            }
        });
        return ret;
    }

    public getQuestionsForCategory(category: string) {
        return this.questions.filter(q => q.category === category);
    }

    public getQuestion(category: string, price): Question | undefined {
        return this.getQuestionsForCategory(category)
            .find(q => q.price === price)
    }

    public getPricesForCategory(category: string): number[] {
        return this.getQuestionsForCategory(category)
            .map(q => q.price);
    }

    setDeduct(deduct: boolean) {
        this.deductPoints = deduct;
    }


    end() {
        this.state ="results";
    }

    setChangingStrategy(changeAfterLose: false) {
        this.changeAfterLose = changeAfterLose;
    }
}
