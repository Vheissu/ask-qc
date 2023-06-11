import { IApiService } from './services/api-service';
import MarkdownIt from 'markdown-it';

export class MyApp {
    private question: string = '';
    private response: string = '';
    private loading: boolean = false;
    private errored: boolean = false;
    private error: string = '';

    constructor(@IApiService private readonly api: IApiService) {}

    private async ask() {
        try {
            const md = new MarkdownIt();
            this.response = '';

            this.loading = true;
            const response = await this.api.ask(this.question);
            console.log(response);
            const markdown = md.render(response.text);
            this.typeResponse(markdown, 0);
        } catch (error) {
            this.loading = false;
            this.errored = true;

            if (error.status === 429) {
                this.error = `You have exceeded your daily question limit.`;
            }

            if (error.status === 401) {
                this.error = `You are not logged in or your session has expired.`;
            }

            if (this.errored) {
                setTimeout(() => this.dismissError(), 5000);
            }
        }
    }

    private typeResponse(response: string, i: number) {
        if (i < response.length) {
            this.response += response.charAt(i);
            setTimeout(() => this.typeResponse(response, i + 1), 30);
        } else {
            this.loading = false;
        }
    }

    private keyPressed(which: number) {
        if (which === 13) {
            this.ask();
        }

        return true;
    }

    private dismissError() {
        this.errored = false;
    }

    private logout() {
        this.api.logout();
    }
}
