import {LightningElement, api, track} from 'lwc';

export default class ParentLwc extends LightningElement {

    @track currentPage;
    close = 'Zamknij';
    next = 'Dalej';
    previous = 'Wstecz';
    finish = 'Zakończ';
    pathComplete = 'slds-path__item slds-is-complete';
    pathIncomplete = 'slds-path__item slds-is-incomplete';
    pathActive = 'slds-path__item slds-is-current slds-is-active';
    showPreviousButton = false;
    showNextButton = false;
    showCancelButton = false;
    showFinishButton = false;
    screens = [
        {
            Name: 'childLWC1',
            Label: 'child LWC 1',
            Number: 0,
            FirstScreen: true,
            PageClass: this.pathIncomplete
        },
        {
            Name: 'childLWC2',
            Label: 'child LWC 2',
            Number: 1,
            MiddleScreen: true,
            PageClass: this.pathIncomplete
        },
        {
            Name: 'childLWC2',
            Label: 'child LWC 3',
            Number: 2,
            LastScreen: true,
            PageClass: this.pathIncomplete
        }
    ];
    connectedCallback() {
        this.currentPage = 0;
        this.setPath(this.screens[this.currentPage], false);
    }

    @api
    get firstPage() {
        return (this.currentPage === 0);
    }

    @api
    get secondPage() {
        return (this.currentPage === 1);
    }

    @api
    get thirdPage() {
        return (this.currentPage === 2);
    }

    handleCancel() {
        const closeComponent = new CustomEvent('close');
        this.dispatchEvent(closeComponent);
    }

    handleFinish(){
        this.handleCancel();
    }

    goToPreviousPage() {
        let previousScreen = this.screens[this.currentPage - 1];
        if (previousScreen.Number >= 0) {
            this.currentPage = previousScreen.Number;
            this.setPath(previousScreen, false);
        }
    }

    goToNextPage() {
        let nextScreen = this.screens[this.currentPage + 1];
        if (nextScreen.Number < this.screens.length) {
            this.currentPage = nextScreen.Number;
            this.setPath(nextScreen, true);
        }

    }

    setPath(screen, isNextAction) {
        screen.PageClass = this.pathActive;
        if (screen.FirstScreen){
            this.showPreviousButton = false;
            this.showNextButton = true;
            this.showCancelButton = true;
            this.showFinishButton = false;
        }
        else if (screen.MiddleScreen){
            this.showPreviousButton = true;
            this.showNextButton = true;
            this.showCancelButton = true;
            this.showFinishButton = false;
        }
        else if (screen.LastScreen){
            this.showPreviousButton = true;
            this.showNextButton = false;
            this.showCancelButton = true;
            this.showFinishButton = true;
        }
        if (isNextAction){
           this.screens[screen.Number - 1].PageClass = this.pathComplete;
        }
        else {
            this.screens[screen.Number + 1].PageClass = this.pathIncomplete;
        }
    }
}