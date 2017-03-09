'use babel';

import { CompositeDisposable } from 'atom';

export default {

    bar: '',
    msg: '',
    tips: '',
    pane: '',
    body: '',

    activate() {
        setTimeout(() => {
            this.body = document.querySelector("body");
            this.msg = document.querySelector("ul.background-message.centered");
            this.tips = document.querySelector("background-tips");
            this.pane = document.querySelector("atom-pane-container.panes");
            this.bar = document.querySelector(".tab-bar");

            this.all();
        }, 1000)
    },

    all() {
        // make tab full width
        atom.config.observe('apex-ui.tabWidth', (newVal) => {
            newVal ?
            this.bar.classList.add("is-full-width") :
            this.bar.classList.remove("is-full-width");
        })

        // dont gray scale the un-focused pane
        atom.config.observe('apex-ui.grayFilter', (newVal) => {
            newVal ?
            this.body.classList.add("is-blurred-same") :
            this.body.classList.remove("is-blurred-same");
        })

        // show logo
        atom.config.observe('apex-ui.showLogo', (newVal) => {
            newVal ?
            this.msg.classList.add("logo") :
            this.msg.classList.remove("logo");
        })

        // use img instead of logo
        atom.config.observe('apex-ui.bgImage', (newVal) => {
            if (!newVal) {
                this.pane.classList.remove("bgImage")
                this.pane.style.backgroundImage = 'none';
                this.tips.style.display = 'block';
            }
            // so it wokrs when atom first opens
            // drawback is on first run window looks bad
            else {
                this.pane.classList.add("bgImage")
                this.pane.style.backgroundImage = `url('${newVal}')`;
                this.tips.style.display = 'none';
            }
        })

        // show img only when no panes are opened
        atom.workspace.onDidChangeActivePaneItem((item) => {
            var val = atom.config.get('apex-ui.bgImage');

            if (val !== '') {
                if (item == undefined) {
                    this.pane.classList.add("bgImage")
                    this.pane.style.backgroundImage = `url('${val}')`;
                    this.tips.style.display = 'none';
                } else {
                    this.pane.classList.remove("bgImage")
                    this.pane.style.backgroundImage = 'none';
                    this.tips.style.display = 'block';
                }
            }
        })
    }
};
