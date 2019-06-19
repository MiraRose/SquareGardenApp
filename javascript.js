

var app = new Vue({
    
    el: '#app',

    data: {

        plots: [

        ],

        selected: 'Tomato',
        options: [
            // { text: 'Tomato', value: 'Tomato' },
            // { text: 'Carrot', value: 'Carrot' },
            // { text: 'Lettuce', value: 'Lettuce' },
            // { text: 'Dill', value: 'Dill' },
            // { text: 'Marigold', value: 'Marigold' },
            // { text: 'Basil', value: 'Basil' }
        ],

        veggies: [
            //selected  //suggested //selected image
            ['Tomato', 'Carrot', 'images/svg/veggies/003-tomato.svg'],
            ['Carrot', 'Tomato', 'images/svg/veggies/001-carrot.svg'],
            ['Lettuce', 'Broccoli, carrots, dill, cilantro', 'images/svg/veggies/036-lettuce.svg'],
            ['Dill', 'broccoli, cabbage, corn, eggplant, lettuce, onions, cucumbers', 'images/svg/veggies/dill.svg']
        ],

        listOfVeggies: [

        ]

    },

    created: function () {

        for (var i = 0; i < this.veggies.length; i++) {
            this.options.push({ text: this.veggies[i][0], value: this.veggies[i][0] })
        }

        for (var i = 0; i < 4; i++) {
            this.plots.push([]);
            for (var x = 0; x < 4; x++) {
                this.plots[i].push({ selected: '', suggestion: 'none', partner: '', image: 'images/svg/veggies/dirt.svg' });
            }
        }
    },

    methods: {
        listMaker: function () {
            this.listOfVeggies = [];
            listOfJustVeggies = [];
            for (var i = 0; i < this.plots.length; i++) {
                for (var x = 0; x < this.plots[i].length; x++)
                    if (this.plots[i][x].selected != '') {
                        listOfJustVeggies.push(this.plots[i][x].selected);
                    }
            }

            this.listOfVeggies = _u.countBy(listOfJustVeggies);
            // var counts = {};
            // for (var i = 0; i < arr.length; i++) {
            //     var num = listOfJustVeggies[i];
            //     counts[num] = counts[num] ? counts[num] + 1 : 1;
            // }
        },
        veggiePlanter: function (plot, index1, index2) {

            for (var i = 0; i < this.veggies.length; i++) {
                if (plot.selected == this.veggies[i][0]) {
                    plot.partner = this.veggies[i][1];
                    plot.image = this.veggies[i][2];
                }
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
