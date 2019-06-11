
var app = new Vue({
    el: '#app',

    data: {

        plots: [

        ],

        selected: 'Tomato',
        options: [
            { text: 'Tomato', value: 'Tomato'},
            { text: 'Carrot', value: 'Carrot'},
            { text: 'Lettuce', value: 'Lettuce'},
            { text: 'Dill', value: 'Dill'},
            { text: 'Marigold', value: 'Marigold'},
            { text: 'Basil', value: 'Basil'}
        ],

        // veggies: [
        //     {'Tomato': 'images/svg/veggies/003-tomato.svg'},
        //     {'Carrot': 'images/svg/veggies/001-tomato.svg'}
        // ]
        
    },
    created: function () {
        var i = 0;
        var x = 0;
        for (i = 0; i < 4; i++) {
            this.plots.push([]);
            for (x = 0; x < 4; x++) {
                this.plots[i].push({ selected: '', suggestion: 'none', partner: '' , image: 'images/svg/veggies/dirt.svg'});
            }
        }
    },
    methods: {
        
        veggiePlanter: function (plot, index1, index2) {
            
            if (plot.selected == 'Carrot') {
                plot.partner = 'Tomato';
                plot.image = 'images/svg/veggies/001-carrot.svg';
            }
            else if (plot.selected == 'Tomato') {
                plot.partner = 'Carrot';
                plot.image = 'images/svg/veggies/003-tomato.svg';
            }
            

            if (index2 + 1 < this.plots[index1].length) {
                this.plots[index1][index2 + 1].suggestion = plot.partner;
            }
            if (index1 + 1 < this.plots.length) {
                this.plots[index1 + 1][index2].suggestion = plot.partner;
            }
            if (index2 + 1 < this.plots[index1].length
                && index1 + 1 < this.plots.length) {
                this.plots[index1 + 1][index2 + 1].suggestion = plot.partner;
            }
            if (index2 - 1 >= 0) {
                this.plots[index1][index2 - 1].suggestion = plot.partner;
            }
            if (index1 - 1 >= 0) {
                this.plots[index1 - 1][index2].suggestion = plot.partner;
            }
            if (index1 - 1 >= 0 && index2 - 1 >= 0) {
                this.plots[index1 - 1][index2 - 1].suggestion = plot.partner;
            }
            if (index1 + 1 < this.plots.length && index2 - 1 >= 0) {
                this.plots[index1 + 1][index2 - 1].suggestion = plot.partner;
            }
            if (index1 - 1 >= 0 && index2 + 1 < this.plots[index1].length) {
                this.plots[index1 - 1][index2 + 1].suggestion = plot.partner;
            }
        }

    },
}


)
