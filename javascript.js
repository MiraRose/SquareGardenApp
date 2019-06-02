
var example1 = new Vue({
    el: '#example-1',

    data: {

        plots: [
            // [
            //     {
            //         selected: 'Row1-Box1',
            //         suggestion: 'None'
            //     },
            //     {
            //         selected: 'Row1-Box2',
            //         suggestion: 'None'
            //     },
            //     {
            //         selected: 'Row1-Box3',
            //         suggestion: 'None'
            //     },
            //     {
            //         selected: 'Row1-Box4',
            //         suggestion: 'None'
            //     }
            // ],

            // [
            //     {
            //         selected: 'Row2-Box1',
            //         suggestion: 'None'
            //     },
            //     {
            //         selected: 'Row2-Box2',
            //         suggestion: 'None'
            //     },
            //     {
            //         selected: 'Row2-Box3',
            //         suggestion: 'None'
            //     },
            //     {
            //         selected: 'Row2-Box4',
            //         suggestion: 'None'
            //     }
            // ],
            // [
            //     {
            //         selected: 'Row3-Box1',
            //         suggestion: 'None'
            //     },
            //     {
            //         selected: 'Row3-Box2',
            //         suggestion: 'None'
            //     },
            //     {
            //         selected: 'Row3-Box3',
            //         suggestion: 'None'
            //     },
            //     {
            //         selected: 'Row3-Box4',
            //         suggestion: 'None'
            //     }
            // ],

            // [
            //     {
            //         selected: 'Row4-Box1',
            //         suggestion: 'None'
            //     },
            //     {
            //         selected: 'Row4-Box2',
            //         suggestion: 'None'
            //     },
            //     {
            //         selected: 'Row4-Box3',
            //         suggestion: 'None'
            //     },
            //     {
            //         selected: 'Row4-Box4',
            //         suggestion: 'None'
            //     }
            // ],
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

    },
    created: function () {
            var i = 0;
            var x = 0;
            for (i = 0; i < 4; i++) {
                this.plots.push([]);
                for (x = 0; x < 4; x++) {
                    this.plots[i].push({selected: `row${i}box${x}`, suggestion: 'none'});
                }
            }
        },
    methods: {
        veggieSuggestion: function (plot) {
            console.log("Plot:", plot.selected);
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
        }
    }
}

)

//   for (i = 0; i < 10; i++) {


//     <div class = "col-sm-3 outerSquareBorder">
//         <div id = i class = "square">
//                 <div class="dropdown">
//                         <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                           Add a vegetable.
//                         </button>
//                         <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
//                           <a class="dropdown-item" href="#">Tomato</a>
//                           <a class="dropdown-item" href="#">Carrot</a>
//                           <a class="dropdown-item" href="#">Oregano</a>
//                         </div>
//                       </div>
//         </div>
//     </div> 

//     if (i % 3 = 0) {
//         </div>
//         <div class = "row no-gutters">


//     }
//   }