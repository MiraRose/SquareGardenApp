

var app = new Vue({
    
    el: '#app',

    data: {

        plots: [

        ],

        selected: 'Tomato',
        options: [
            // example: { text: 'Tomato', value: 'Tomato' },
        ],

        veggies: [
            //selected  //suggested                             //selected image
            ['Tomato', 'Asparagus, basil, beans, marigold, garlic, corn, dill, carrots, eggplant', 'images/svg/veggies/003-tomato.svg'],
            ['Carrot', 'Lettuce, onion, beans, strawberries', 'images/svg/veggies/001-carrot.svg'],
            ['Lettuce', 'Broccoli, carrots, dill, radish, onions, beans, broccoli', 'images/svg/veggies/036-lettuce.svg'],
            ['Dill', 'broccoli, cabbage, corn, eggplant, lettuce, onions, cucumbers', 'images/svg/veggies/dill.svg'],
            ['Pumpkin', 'Radishes', 'images/svg/veggies/002-pumpkin.svg'],
            ['Watermelon', 'Corn', 'images/svg/veggies/006-watermelon.svg'],
            ['Green Onions', 'Carrots, dill, lettuce, marigolds, tomatos', 'images/svg/veggies/010-spring-onion.svg'],
            ['Eggplant', 'Marigold, dill, beans', 'images/svg/veggies/011-eggplant.svg'],
            ['Pepper', 'Beans, tomatos, onions, basil', 'images/svg/veggies/012-bell-pepper.svg'],
            ['Potato', 'Beans, marigolds, peas, onion, garlic', 'images/svg/veggies/013-potato.svg'],
            ['Strawberries', 'Bush beans, onions', 'images/svg/veggies/016-strawberry.svg'],
            ['Broccoli', 'Dill, lettuce, onions, tomato, spinach', 'images/svg/veggies/018-broccoli.svg'],
            ['Radish', 'Lettuce', 'images/svg/veggies/021-radish.svg'],
            ['Peas', 'Garlic', 'images/svg/veggies/022-peas.svg'],
            ['Onion', 'Carrots, chamomile, strawberries, dill, lettuce, marigolds, tomatos', 'images/svg/veggies/023-onion.svg'],
            ['Chili Pepper', 'Beans, tomatos, onions', 'images/svg/veggies/028-chili.svg'],
            ['Garlic', 'Peas', 'images/svg/veggies/034-garlic.svg'],
            ['Cantalope', 'Corn', 'images/svg/veggies/035-melon.svg'],
            ['Corn', 'Dill, beans, potatos', 'images/svg/veggies/040-corn.svg'],
            ['Cabbage', 'Beans, chamomile, marigold, dill, tomato', 'images/svg/veggies/042-cabbage.svg'],
            ['Cucumber', 'Radishes, chamomile, marigold, peas, beans, carrots, dill, onions, garlic', 'images/svg/veggies/044-cucumber.svg'],
            ['Asparagus', 'Dill, tomatoes, basil', 'images/svg/veggies/048-asparagus.svg'],
            ['Marigold', 'Most plants', 'images/svg/veggies/marigold.svg'],
            ['Beans', 'Cucumbers, cabbage, carrots, corn, marigolds, potato, radish, lettuce, onion', 'images/svg/veggies/legumes.svg'],
            ['Spinach', 'Strawberries, peas, beans', 'images/svg/veggies/legumes.svg'],
            ['Basil', 'Chamomile', 'images/svg/veggies/002-basil.svg'],
            ['Chamomile', 'Chamomile', 'images/svg/veggies/007-chamomile.svg']


        ],

        listOfVeggies: [

        ]

    },

    created: function () {

        for (var i = 0; i < this.veggies.length; i++) {
            this.options.push({ text: this.veggies[i][0], value: this.veggies[i][0] })
        }

        this.options.sort(function(a, b) {
            if(a.text < b.text) { return -1; }
            if(a.text > b.text) { return 1; }
             return 0;
        })

        for (let i = 0; i < 4; i++) {
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
            for (let i = 0; i < 4; i++) {
                this.plots.push([]);
                for (let x = 0; x < 4; x++) {
                    this.plots[i].push({ selected: '', suggestion: 'none', partner: '', image: 'images/svg/veggies/dirt.svg' });
                }
            }
        },
        listMaker: function () {
            this.listOfVeggies = [];
            listOfJustVeggies = [];
            for (let i = 0; i < this.plots.length; i++) {
                for (let x = 0; x < this.plots[i].length; x++)
                    if (this.plots[i][x].selected != '') {
                        listOfJustVeggies.push(this.plots[i][x].selected);
                    }
            }

            this.listOfVeggies = _u.countBy(listOfJustVeggies);
            
        },
        veggiePlanter: function (plot, index1, index2) {

            for (let i = 0; i < this.veggies.length; i++) {
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
