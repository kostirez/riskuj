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

export interface Color {
    label: string;
    code: string;
}

const COLORS: Color[] = [
    {
        label: 'Červená',
        code: '#be0000',
    },
    {
        label: 'Modrá',
        code: '#0036f6',
    },
    {
        label: 'Zelená',
        code: '#478d1c',
    },
    {
        label: 'Žlutá',
        code: '#debd00',
    },
    {
        label: 'Fialová',
        code: '#8600c9',
    },
    {
        label: 'Oranžová',
        code: '#d77400',
    },

]

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

    getColors(): Color[] {
        return COLORS
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
        this.state = "results";
    }

    setChangingStrategy(changeAfterLose: false) {
        this.changeAfterLose = changeAfterLose;
    }
}
