
var app = new Vue({
    el: '#app',

    data: {

        plots: [

        ],

        selected: 'Tomato',
        options: [
            { text: 'Tomato', value: 'Tomato' },
            { text: 'Carrot', value: 'Carrot' },
            { text: 'Lettuce', value: 'Lettuce' },
            { text: 'Dill', value: 'Dill' },
            { text: 'Marigold', value: 'Marigold' },
            { text: 'Basil', value: 'Basil' }
        ],
        items: [

        ]
    },
    created: function () {
        var i = 0;
        var x = 0;
        for (i = 0; i < 4; i++) {
            this.plots.push([]);
            for (x = 0; x < 4; x++) {
                this.plots[i].push({ selected: ' ', suggestion: 'none' });
            }
        }
    },
    methods: {
        veggieSuggestion: function (plot) {
            if (plot.selected === 'Carrot') {
                plot.suggestion = 'Tomato';
            }
            if (plot.selected === 'Tomato') {
                plot.suggestion = 'Marigold, Dill, Basil';
            }
            if (plot.selected === 'Dill') {
                plot.suggestion = 'Tomato';
            }
            if (plot.selected === 'Basil') {
                plot.suggestion = 'Tomato'
            }
        },
        shoppingItems: function (plot) {
            this.items.push(plot.selected);
        }
    }
}

)
