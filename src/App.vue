<template>
  <div id="app">
    <div id="plantList">
      <h2>List of Plants</h2>

      <ul v-for="(value, name) in listOfVeggies" :key="value">
        <li>{{ name }}: {{ value }}</li>
      </ul>
    </div>

    <div id="menu">
      <h2>Menu</h2>
      <p>This is a helper app for 4x4 raised beds and companion gardening!</p>
      <p>Select a plant for a square and suggestions will appear around it.</p>
      <p>Suggestions are based on what the plant selected is helped by.</p>
      <div class="buttonDiv">
        <button v-on:click="clear()" class="customButton">Clear Garden</button>
        <h4>Garden Size</h4>
        <p><input v-model="dimensions.height" placeholder="4" /> x
        <input v-model="dimensions.width" placeholder="4" /></p>
        <button v-on:click="rebuild()" class="customButton">
          Rebuild Garden
        </button>
      </div>
    </div>

    <div class="container dirtArea">
      <div class="row">
        <div class="col-md">
          <h1>Square Gardening App</h1>
        </div>
      </div>
      <div v-for="(row, indexOfRow) in plots" :key="indexOfRow">
        <div class="row no-gutter">
          <div v-for="(plot, indexOfColumn) in row" :key="indexOfColumn">
            <div class="col-md-3 outerSquareBorder square">
              <select
                v-model="plot.selected"
                v-on:change="
                  veggiePlanter(plot, indexOfRow, indexOfColumn);
                  listMaker();
                "
                class="customSelect"
              >
                <option
                  v-for="option in options"
                  v-bind:value="option.value"
                  :key="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
              <div><img class="veggieImg" :src="plot.image" /></div>

              <p class="veggieImgText">
                Suggested: <br />
                {{ plot.suggestion }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="madeBy">
        Icons made by
        <a href="https://www.flaticon.com/authors/turkkub" title="turkkub"
          >turkkub</a
        >,
        <a
          href="https://www.freepik.com/?__hstc=57440181.1e5d3747425eb2281e7c4d932c965f65.1559145545708.1559235532392.1560213143737.3&__hssc=57440181.7.1560213143737&__hsfp=2784163161"
          title="Freepik"
          >Freepik</a
        >
        and
        <a href="https://www.flaticon.com/authors/monkik" title="monkik"
          >monkik</a
        >
        from
        <a href="https://www.flaticon.com/" title="Flaticon"
          >www.flaticon.com</a
        >
        are licensed by
        <a
          href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0"
          target="_blank"
          >CC 3.0 BY</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      plots: {},

      selected: "Tomato",
      options: [
        // example: { text: 'Tomato', value: 'Tomato' },
      ],

      veggies:
        //selected  //suggested                             //selected image
        {
          Asparagus: {
            friends: "Dill, tomatoes, basil",
            img: "../../assets/images/svg/veggies/048-asparagus.svg",
          },
          Basil: {
            friends: "Chamomile",
            img: "../../assets/images/svg/veggies/002-basil.svg",
          },
          Beans: {
            friends:
              "Cucumbers, cabbage, carrots, corn, marigolds, potato, radish, lettuce, onion",
            img: "../../assets/images/svg/veggies/legumes.svg",
          },
          Broccoli: {
            friends: "Dill, lettuce, onions, tomato, spinach",
            img: "../../assets/images/svg/veggies/018-broccoli.svg",
          },
          Cabbage: {
            friends: "Beans, chamomile, marigold, dill, tomato",
            img: "../../assets/images/svg/veggies/042-cabbage.svg",
          },
          Cantalope: {
            friends: "Corn",
            img: "../../assets/images/svg/veggies/035-melon.svg",
          },
          Carrot: {
            friends: "Lettuce, onion, beans, strawberries",
            img: "../../assets/images/svg/veggies/001-carrot.svg",
          },
          Chamomile: {
            friends: "None",
            img: "../../assets/images/svg/veggies/007-chamomile.svg",
          },
          "Chili Pepper": {
            friends: "Beans, tomatos, onions",
            img: "../../assets/images/svg/veggies/028-chili.svg",
          },
          Corn: {
            friends: "Dill, beans, potatos",
            img: "../../assets/images/svg/veggies/040-corn.svg",
          },
          Cucumber: {
            friends:
              "Radishes, chamomile, marigold, peas, beans, carrots, dill, onions, garlic",
            img: "../../assets/images/svg/veggies/044-cucumber.svg",
          },
          Dill: {
            friends:
              "broccoli, cabbage, corn, eggplant, lettuce, onions, cucumbers",
            img: "../../assets/images/svg/veggies/dill.svg",
          },
          Eggplant: {
            friends: "Marigold, dill, beans",
            img: "../../assets/images/svg/veggies/011-eggplant.svg",
          },
          Garlic: {
            friends: "Peas",
            img: "../../assets/images/svg/veggies/034-garlic.svg",
          },
          "Green Onions": {
            friends: "Carrots, dill, lettuce, marigolds, tomatos",
            img: "../../assets/images/svg/veggies/010-spring-onion.svg",
          },
          Lettuce: {
            friends: "Broccoli, carrots, dill, radish, onions, beans, broccoli",
            img: "../../assets/images/svg/veggies/036-lettuce.svg",
          },
          Marigold: {
            friends: "Most plants",
            img: "../../assets/images/svg/veggies/marigold.svg",
          },
          Onion: {
            friends:
              "Carrots, chamomile, strawberries, dill, lettuce, marigolds, tomatos",
            img: "../../assets/images/svg/veggies/023-onion.svg",
          },
          Peas: {
            friends: "Garlic",
            img: "../../assets/images/svg/veggies/022-peas.svg",
          },
          Pepper: {
            friends: "Beans, tomatos, onions, basil",
            img: "../../assets/images/svg/veggies/012-bell-pepper.svg",
          },
          Potato: {
            friends: "Beans, marigolds, peas, onion, garlic",
            img: "../../assets/images/svg/veggies/013-potato.svg",
          },
          Pumpkin: {
            friends: "Radishes",
            img: "../../assets/images/svg/veggies/002-pumpkin.svg",
          },
          Radish: {
            friends: "Lettuce",
            img: "../../assets/images/svg/veggies/021-radish.svg",
          },
          Spinach: {
            friends: "Strawberries, peas, beans",
            img: "../../assets/images/svg/veggies/legumes.svg",
          },
          Strawberries: {
            friends: "Bush beans, onions",
            img: "../../assets/images/svg/veggies/016-strawberry.svg",
          },
          Tomato: {
            friends:
              "Asparagus, basil, beans, marigold, garlic, corn, dill, carrots, eggplant",
            img: "../../assets/images/svg/veggies/003-tomato.svg",
          },
          Watermelon: {
            friends: "Corn",
            img: "../../assets/images/svg/veggies/006-watermelon.svg",
          },
        },

      listOfVeggies: {},

      dimensions: {
        height: 4,
        width: 4,
      },
    };
  },

  created: function () {
    /**
     *  Populates selection list of veggies at start up
     */

    for (let key of Object.keys(this.veggies)) {
      this.options.push({ text: key, value: key });
    }

    /**
     * Creates 4x4 plot at start up
     */

    for (let i = 0; i < this.dimensions.height; i++) {
      this.plots[i] = [];
      for (var x = 0; x < this.dimensions.width; x++) {
        this.plots[i][x] = {
          selected: "",
          suggestion: "none",
          partner: "",
          image: "../../assets/images/svg/veggies/dirt.svg",
        };
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
        this.plots[i] = [];
        for (var x = 0; x < 4; x++) {
          this.plots[i][x] = {
            selected: "",
            suggestion: "none",
            partner: "",
            image: "../../assets/images/svg/veggies/dirt.svg",
          };
        }
      }
    },

    rebuild: function () {
      this.plots = {};
      let newPlots = {};
      for (let i = 0; i < this.dimensions.height; i++) {
        newPlots[i] = [];
        for (var x = 0; x < this.dimensions.width; x++) {
          newPlots[i][x] = {
            selected: "",
            suggestion: "none",
            partner: "",
            image: "../../assets/images/svg/veggies/dirt.svg",
          };
        }
      }
      this.plots = newPlots;
    },

    /**
     * As veggies are chosen creates a list with counts
     */

    listMaker: function () {
      this.listOfVeggies = [];
      let localListOfVeggies = {};

      for (let plot in this.plots) {
        for (let subplot in this.plots[plot]) {
          let veggie = this.plots[plot][subplot].selected;
          if (veggie != "") {
            console.log(veggie);
            if (
              Object.prototype.hasOwnProperty.call(localListOfVeggies, veggie)
            ) {
              localListOfVeggies[veggie] = localListOfVeggies[veggie] + 1;
            } else {
              localListOfVeggies[veggie] = 1;
            }
          }
        }
      }
      this.listOfVeggies = localListOfVeggies;
    },

    /**
     * Sets image and partners for plot based on selection
     * @param {object} plot - the selected plot
     * @param {int} indexOfRow - index of row
     * @param {int} indexOfColumn - index of column
     */

    veggiePlanter: function (plot, indexOfRow, indexOfColumn) {
      let newVeggie = plot.selected;

      plot.partner = this.veggies[newVeggie].friends;
      plot.image = this.veggies[newVeggie].img;

      this.makeSuggestion(plot, indexOfRow, indexOfColumn);
    },

    /**
     * Populates suggestions within grid
     * @param {object} plot - the selected plot
     * @param {int} indexOfRow - index of row
     * @param {int} indexOfColumn - index of column
     */

    makeSuggestion: function (plot, indexOfRow, indexOfColumn) {
      const originalSquare = String(indexOfRow) + String(indexOfColumn);
      indexOfRow = parseInt(indexOfRow);
      indexOfColumn = parseInt(indexOfColumn);

      let directions = [indexOfColumn, indexOfRow];
      const up = indexOfRow - 1;
      directions.push(up);
      const down = indexOfRow + 1;
      directions.push(down);
      const left = indexOfColumn - 1;
      directions.push(left);
      const right = indexOfColumn + 1;
      directions.push(right);

      for (const direction of directions) {
        if (direction >= 0) {
          for (let direction2 of directions) {
            if (
              direction2 >= 0 &&
              String(direction) + String(direction2) != originalSquare
            ) {
              this.plots[direction][direction2].suggestion = plot.partner;
            }
          }
        }
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  background-image: linear-gradient(to right, #6b8c42, #7bc67b);
}

h1 {
  color: #ffffb5;
  text-align: center;
  font-family: "Josefin Sans", sans-serif;
  text-shadow: -3px 0 black, 0 3px black, 3px 0 black, 0 -3px black;
}

h2 {
  color: #ffffb5;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
  font-family: "Josefin Sans", sans-serif;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
}

h4 {
  color: #ffffb5;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
  font-family: "Josefin Sans", sans-serif;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
}

p {
  color: #ffffb5;
  font-family: "Merriweather", serif;
}

li {
  color: #ffffb5;
  font-family: "Merriweather", serif;
}

.customSelect {
  font-family: "Josefin Sans", sans-serif;
  font-size: 15px;
  background-color: #ffffb5;
}

.customButton {
  color: #ffffb5;
  font-family: "Merriweather", serif;
  background-color: #5a3921;
  border-style: solid;
  border-width: 3px;
  border-color: black;
  display: block;
  margin: auto;
}

.buttonDiv {
  margin: auto;
}

#plantList {
  position: absolute;
  float: left;
  margin-left: 1%;
  background-color: #5a3921;
  border-style: solid;
  border-width: 3px;
  border-color: black;
  box-shadow: 7px 7px;
}

#menu {
  position: absolute;
  left: 85%;
  background-color: #5a3921;
  width: 200px;
  border-style: solid;
  border-width: 3px;
  border-color: black;
  box-shadow: 7px 7px;
  padding: 5px 5px 5px 5px;
}

.dirtArea {
  margin: 25px auto auto auto;
  width: 600px;
  height: 600px;
}

.outerSquareBorder {
  border-style: dashed;
  border-width: 2px;
  border-color: black;
}

.square {
  background-color: #5a3921;
  /* padding-bottom: 100%; */
}

.veggieImgText {
  position: absolute;
  font-family: "Merriweather", serif;
  font-size: 12px;
  top: 18%;
  left: 10%;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

.veggieImg {
  height: 120px;
  width: 120px;
  padding: 5px 5px 5px 5px;
}

.madeBy {
  font-size: 12px;
  font-family: "Merriweather", serif;
  padding-top: 5px;
}

input {
  width: 20px;
  margin: 5px;
  color: black;
}
</style>
