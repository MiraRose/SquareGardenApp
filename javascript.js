

var app = new Vue({
    
    el: '#app',

    data: {

        plots: [

        ],

        selected: 'Tomato',
        options: [
            // example: { text: 'Tomato', value: 'Tomato' },
        ],

        veggies: 
            //selected  //suggested                             //selected image
            {            
            'Asparagus': {'friends':'Dill, tomatoes, basil', 'img':'images/svg/veggies/048-asparagus.svg'},
            'Basil': {'friends':'Chamomile', 'img':'images/svg/veggies/002-basil.svg'},
            'Beans': {'friends':'Cucumbers, cabbage, carrots, corn, marigolds, potato, radish, lettuce, onion', 'img':'images/svg/veggies/legumes.svg'},
            'Broccoli': {'friends':'Dill, lettuce, onions, tomato, spinach', 'img':'images/svg/veggies/018-broccoli.svg'},
            'Cabbage': {'friends':'Beans, chamomile, marigold, dill, tomato', 'img':'images/svg/veggies/042-cabbage.svg'},
            'Cantalope': {'friends':'Corn', 'img':'images/svg/veggies/035-melon.svg'},
            'Carrot': {'friends':'Lettuce, onion, beans, strawberries', 'img':'images/svg/veggies/001-carrot.svg'},
            'Chamomile': {'friends':'None', 'img':'images/svg/veggies/007-chamomile.svg'},
            'Chili Pepper': {'friends':'Beans, tomatos, onions', 'img':'images/svg/veggies/028-chili.svg'},
            'Corn': {'friends':'Dill, beans, potatos', 'img':'images/svg/veggies/040-corn.svg'},
            'Cucumber': {'friends':'Radishes, chamomile, marigold, peas, beans, carrots, dill, onions, garlic', 'img':'images/svg/veggies/044-cucumber.svg'},
            'Dill': {'friends':'broccoli, cabbage, corn, eggplant, lettuce, onions, cucumbers', 'img':'images/svg/veggies/dill.svg'},
            'Eggplant': {'friends':'Marigold, dill, beans', 'img':'images/svg/veggies/011-eggplant.svg'},
            'Garlic': {'friends':'Peas', 'img':'images/svg/veggies/034-garlic.svg'},
            'Green Onions': {'friends':'Carrots, dill, lettuce, marigolds, tomatos', 'img':'images/svg/veggies/010-spring-onion.svg'},
            'Lettuce': {'friends':'Broccoli, carrots, dill, radish, onions, beans, broccoli', 'img':'images/svg/veggies/036-lettuce.svg'},
            'Marigold': {'friends':'Most plants', 'img':'images/svg/veggies/marigold.svg'},
            'Onion': {'friends':'Carrots, chamomile, strawberries, dill, lettuce, marigolds, tomatos', 'img':'images/svg/veggies/023-onion.svg'},
            'Peas': {'friends':'Garlic', 'img':'images/svg/veggies/022-peas.svg'},
            'Pepper': {'friends':'Beans, tomatos, onions, basil', 'img':'images/svg/veggies/012-bell-pepper.svg'},
            'Potato': {'friends':'Beans, marigolds, peas, onion, garlic', 'img':'images/svg/veggies/013-potato.svg'},
            'Pumpkin': {'friends':'Radishes', 'img':'images/svg/veggies/002-pumpkin.svg'},
            'Radish': {'friends':'Lettuce', 'img':'images/svg/veggies/021-radish.svg'},
            'Spinach': {'friends':'Strawberries, peas, beans', 'img':'images/svg/veggies/legumes.svg'},
            'Strawberries': {'friends':'Bush beans, onions', 'img':'images/svg/veggies/016-strawberry.svg'},
            'Tomato': {'friends':'Asparagus, basil, beans, marigold, garlic, corn, dill, carrots, eggplant', 'img':'images/svg/veggies/003-tomato.svg'},
            'Watermelon': {'friends':'Corn', 'img':'images/svg/veggies/006-watermelon.svg'}
        }
        
        ,

        listOfVeggies: [

        ]

    },

    created: function () {

        /**
         *  Populates selection list of veggies at start up
         */

        for (let key of Object.keys(this.veggies)) {
            this.options.push({ text: key, value: key })
        }

        /**
         * Creates 4x4 plot at start up
         */

        for (let i = 0; i < 4; i++) {
            this.plots.push([]);
            for (var x = 0; x < 4; x++) {
                this.plots[i].push({ selected: '', suggestion: 'none', partner: '', image: 'images/svg/veggies/dirt.svg' });
            }
        }
    },

    methods: {

        /**
         * Clears the garden plot, resetting to dirt
         */

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

        /**
         * As veggies are chosen creates a list with counts
         */

        listMaker: function () {
            this.listOfVeggies = [];
            listOfJustVeggies = [];
            for (let plot of this.plots) {
                for (let subplot of plot)
                    if (subplot.selected != '') {
                        listOfJustVeggies.push(subplot.selected);
                    }
            }

            this.listOfVeggies = _u.countBy(listOfJustVeggies);
            
        },

        /**
         * Sets image and partners for plot based on selection
         * @param {object} plot - the selected plot
         * @param {int} indexOfRow - index of row
         * @param {int} indexOfColumn - index of column
         */
        
        veggiePlanter: function (plot, indexOfRow, indexOfColumn) {

            plot.partner = this.veggies[plot.selected].friends;
            plot.image = this.veggies[plot.selected].img;

            this.makeSuggestion(plot, indexOfRow, indexOfColumn);
            
        },

        /**
         * Populates suggestions within grid
         * @param {object} plot - the selected plot
         * @param {int} indexOfRow - index of row
         * @param {int} indexOfColumn - index of column
         */

        makeSuggestion: function (plot, indexOfRow, indexOfColumn) {

            if (indexOfColumn + 1 < this.plots[indexOfRow].length) {
                this.plots[indexOfRow][indexOfColumn + 1].suggestion = plot.partner;
            }
            if (indexOfRow + 1 < this.plots.length) {
                this.plots[indexOfRow + 1][indexOfColumn].suggestion = plot.partner;
            }
            if (indexOfColumn + 1 < this.plots[indexOfRow].length
                && indexOfRow + 1 < this.plots.length) {
                this.plots[indexOfRow + 1][indexOfColumn + 1].suggestion = plot.partner;
            }
            if (indexOfColumn - 1 >= 0) {
                this.plots[indexOfRow][indexOfColumn - 1].suggestion = plot.partner;
            }
            if (indexOfRow - 1 >= 0) {
                this.plots[indexOfRow - 1][indexOfColumn].suggestion = plot.partner;
            }
            if (indexOfRow - 1 >= 0 && indexOfColumn - 1 >= 0) {
                this.plots[indexOfRow - 1][indexOfColumn - 1].suggestion = plot.partner;
            }
            if (indexOfRow + 1 < this.plots.length && indexOfColumn - 1 >= 0) {
                this.plots[indexOfRow + 1][indexOfColumn - 1].suggestion = plot.partner;
            }
            if (indexOfRow - 1 >= 0 && indexOfColumn + 1 < this.plots[indexOfRow].length) {
                this.plots[indexOfRow - 1][indexOfColumn + 1].suggestion = plot.partner;
            }
        }

    },
}


)
