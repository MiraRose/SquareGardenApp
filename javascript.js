

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
            ['Dill', 'broccoli, cabbage, corn, eggplant, lettuce, onions, cucumbers', 'images/svg/veggies/dill.svg'],
            ['Pumpkin', 'none', 'images/svg/veggies/002-pumpkin.svg'],
            ['Watermelon', 'none', 'images/svg/veggies/006-watermelon.svg'],
            ['Green Onions', 'none', 'images/svg/veggies/010-spring-onion.svg'],
            ['Eggplant', 'none', 'images/svg/veggies/011-eggplant.svg'],
            ['Bell Pepper', 'none', 'images/svg/veggies/012-bell-pepper.svg'],
            ['Potato', 'none', 'images/svg/veggies/013-potato.svg'],
            ['Strawberries', 'none', 'images/svg/veggies/016-strawberry.svg'],
            ['Broccoli', 'none', 'images/svg/veggies/018-broccoli.svg'],
            ['Radish', 'none', 'images/svg/veggies/021-radish.svg'],
            ['Peas', 'none', 'images/svg/veggies/022-peas.svg'],
            ['Onion', 'none', 'images/svg/veggies/023-onion.svg'],
            ['Chili Pepper', 'none', 'images/svg/veggies/028-chili.svg'],
            ['Garlic', 'none', 'images/svg/veggies/034-garlic.svg'],
            ['Cantalope', 'none', 'images/svg/veggies/035-melon.svg'],
            ['Corn', 'none', 'images/svg/veggies/040-corn.svg'],
            ['Cabbage', 'none', 'images/svg/veggies/042-cabbage.svg'],
            ['Cucumber', 'none', 'images/svg/veggies/044-cucumber.svg'],
            ['Asparagus', 'none', 'images/svg/veggies/048-asparagus.svg']
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
        clear: function () {
            this.plots = [];
            this.listOfVeggies = [];
            for (var i = 0; i < 4; i++) {
                this.plots.push([]);
                for (var x = 0; x < 4; x++) {
                    this.plots[i].push({ selected: '', suggestion: 'none', partner: '', image: 'images/svg/veggies/dirt.svg' });
                }
            }
        },
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
