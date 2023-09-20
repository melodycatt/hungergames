class hgMap {
   static COLORS = {
      OCEAN: ['#004e82', 'OCEAN'],
      POND: ['#027ed1', 'POND'],
      DESERT: ['#ffd505', 'DESERT'],
      SCORCHED: ['#ffa305', 'SCORCHED'],
      SAVANNAH: ['#c7d907', 'SAVANNAH'],
      PLAINS: ['#00b518', 'PLAINS'],
      FOREST: ['#017811', 'FOREST'],
      JUNGLE: ['#05fc11', 'JUNGLE'],
      SWAMP: ['#002e02', 'SWAMP'],
      TAIGA: ['#002e18', 'TAIGA'],
      SNOWY_TAIGA: ['#254536', 'SNOWY_TAIGA'],
      TUNDRA: ['#8ba699', 'TUNDRA'],
      MOUNTAINS: ['#858585', 'MOUNTAINS'],
      ROCKY_MOUNTAINS: ['#2d2e2e', 'ROCKY_MOUNTAINS'],
      TAIGA_MOUNTAINS: ['#16241d', 'TAIGA_MOUNTAINS'],
      SNOWY_MOUNTAINS: ['#a1a1a1', 'SNOWY_MOUNTAINS'],
      WMOUNTAINS: ['#e3e3e3', 'WMOUNTAINS'],
   }

   constructor(width, height, heightm, moisture) {
      console.log(width, height, heightm, moisture);
      this.heightm = heightm
      this.moisture = moisture
      this.width = width;
      this.height = height;
      this.data = new Array(height * width).fill(0);
   }

   generate() {
      for (let y = 0; y < this.height; y++) {
         for(let x = 0; x < this.width; x++) {
            this.set(x, y, getBiome(x, y, this.heightm, this.moisture));
         }
      }     
   }
   
   set(x, y, value) {
      this.data[y * this.width + x] = value;
   }

   get(x, y) {
      return this.data[y * this.width + x];
   }
   
   drawMap(context, width, height) {
      var cellwidth = width / this.width;
      var cellheight = height / this.height;
      for(let y = 0; y < this.height; y++) {
         for(let x = 0; x < this.width; x++) {
            try {               
               context.fillStyle = this.get(x,y)[0] // this.getColor(heightm.get(x, y), this.get(x, y)[0]);
            } catch (error) {
               console.log(x, y, "POOPY ERROR :( FIX IT NOW", error, heightm);
            }
            context.fillRect(x * cellwidth, y * cellheight, cellwidth, cellheight);
         }
      }
   }
   
   getColor(value, color) {
      var rgb = hexToRgb(color);
      var r = this.interpolate(value*rgb[0], color, rgb[0], 0);
      var g = this.interpolate(value*rgb[1], color, rgb[1], 1);
      var b = this.interpolate(value*rgb[2], color, rgb[2], 2);
      console.log("rgb(" + r + "," + g + "," + b + ")")
      return "rgb(" + r + "," + g + "," + b + ")";
   }

   interpolate(t, hex, next, rgb) {
      var prev = hexToRgb(Object.values(hgMap.COLORS).map(x => x[0])[Object.values(hgMap.COLORS).map(x => x[0]).indexOf(hex) - 1])[rgb];
      
      if (t == next) {
         return next;
      }
      if (t < next) {
         return Math.floor(scale(t, prev, next, prev, next) == NaN ? 1 : scale(t, prev, next, prev, next));
      }
      return 'guh?';
   }
}



function getBiome(x, y, heightm, moisture) {
   console.log('hi')
   if (heightm.get(x, y) < 0.2 && moisture.get(x, y) > 0.3) {
      if (moisture.get(x,y) > 0.7) return hgMap.COLORS.OCEAN
      return hgMap.COLORS.POND
   } 
   if (heightm.get(x, y) < 0.3){
      if (moisture.get(x, y) < 0.1) return hgMap.COLORS.SCORCHED
      if (moisture.get(x, y) < 0.2) return hgMap.COLORS.DESERT
      return hgMap.COLORS.SAVANNAH
   }
   if (heightm.get(x, y) < 0.5) {
      if (moisture.get(x, y) < 0.4) return hgMap.COLORS.PLAINS
      if (moisture.get(x, y) < 0.7) return hgMap.COLORS.FOREST
      if (moisture.get(x, y) < 0.8) return hgMap.COLORS.JUNGLE
      return hgMap.COLORS.SWAMP
   }
   if (heightm.get(x, y) < 0.8) {
      if (moisture.get(x, y) < 0.4) return hgMap.COLORS.TAIGA
      if (moisture.get(x, y) < 0.7) return hgMap.COLORS.SNOWY_TAIGA
      return hgMap.COLORS.TUNDRA
   }
   if (moisture.get(x, y) < 0.1) return hgMap.COLORS.MOUNTAINS
   if (moisture.get(x, y) < 0.3) return hgMap.COLORS.ROCKY_MOUNTAINS
   if (moisture.get(x, y) < 0.6) return hgMap.COLORS.TAIGA_MOUNTAINS
   if (moisture.get(x, y) < 0.9) return hgMap.COLORS.SNOWY_MOUNTAINS
   return hgMap.COLORS.WMOUNTAINS
}

const generator = new NoiseMap.MapGenerator(config={generateSeed: true});

/*var heightm = generator.createMap(32, 32, {type: 'simplex', frequency: 1, amplitude: 1, generateSeed: true})
/*var heightmaps = []
heightmaps.push(generator.createMap(400, 200, {type: 'simplex', frequency: 1, amplitude: 1, generateSeed: true}))
heightmaps.push(generator.createMap(400, 200, {type: 'simplex', frequency: 0.5, amplitude: 0.5, generateSeed: true}))
heightmaps.push(generator.createMap(400, 200, {type: 'simplex', frequency: 0.25, amplitude: 1, generateSeed: true}))

const height = new NoiseMap.HeightMap(400, 200)

for (let y = 0; y < 200; y++) {
   for(let x = 0; x < 400; x++) {
      height.set(x, y, ((heightmaps[0].get(x, y) * 1) + (heightmaps[1].get(x, y) * 0.5) + (heightmaps[2].get(x, y) * 0.25)) / (1 + 0.5 + 0.25));
   }
}

var canvas = document.getElementById('height-canvas');
var context = canvas.getContext('2d');
heightm.stepValues(100);
heightm.draw(context, 128, 128, NoiseMap.STYLE.GRAY);

const moisture = generator.createMap(32, 32, {type: 'simplex', frequency: 1, amplitude: 1, generateSeed: true})
/*var moisturemaps = [];

moisturemaps.push(generator.createMap(400, 200, {type: 'perlin', frequency: 1, amplitude: 1, generateSeed: true}))
moisturemaps.push(generator.createMap(400, 200, {type: 'perlin', frequency: 0.5, amplitude: 0.5, generateSeed: true}))
moisturemaps.push(generator.createMap(400, 200, {type: 'perlin', frequency: 0.25, amplitude: 0.25, generateSeed: true}))

for (let y = 0; y < 200; y++) {
   for(let x = 0; x < 400; x++) {
      moisture.set(x, y, ((moisturemaps[0].get(x, y) * 1) + (moisturemaps[1].get(x, y) * 0.5) + (moisturemaps[2].get(x, y) * 0.25)) / (1 + 0.5 + 0.25));
   }
}
canvas = document.getElementById('moisture-canvas');
var context = canvas.getContext('2d');
moisture.stepValues(100);
moisture.draw(context, 128, 128, NoiseMap.STYLE.GRAY);

// equivalent_elevation = 10*e*e + poles + (equator-poles) * sin(PI * (y / height))

const hexToRgb = hex =>
  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))
canvas = document.getElementById('map-canvas');
var context = canvas.getContext('2d');
var mainmap = new hgMap(32, 32, heightm, moisture);

mainmap.generate();
document.getElementById('status').innerHTML = 'DON!!!';
mainmap.drawMap(context, canvas.clientWidth, canvas.clientHeight);

console.log(hexToRgb('#027ed1'))*/


function scale(x, oldMin, oldMax, newMin, newMax) {
   return newMin + (newMax - newMin) * (x - oldMin) / (oldMax - oldMin);
}

const genButton = document.getElementById('gen')

genButton.addEventListener('click', () => {
   const height = document.getElementById('height')
   const moist = document.getElementById('moisture')
   const heightf = document.getElementById('heightfrequency')
   const moistf = document.getElementById('moistfrequency')
   const size = document.getElementById('size')

   const heightm = generator.createMap(size.value, size.value, {type: 'simplex', frequency: heightf.value, amplitude: 1, generateSeed: true})
   console.log(height)
   var canvas = document.getElementById('height-canvas');
   canvas.height = size.value * 4
   canvas.width = size.value * 4
   for (let y = 0; y < heightm.height; y++) {
      for (let x = 0; x < heightm.width; x++) {
         heightm.set(x, y, Math.pow(heightm.get(x, y), height.value))
      }   
   }
   var context = canvas.getContext('2d');
   heightm.stepValues(100);
   heightm.draw(context, size.value * 4, size.value * 4, NoiseMap.STYLE.GRAY);

   const moisture = generator.createMap(size.value, size.value, {type: 'simplex', frequency: moistf.value, amplitude: 1, generateSeed: true})
   canvas = document.getElementById('moisture-canvas');
   canvas.height = size.value * 4
   canvas.width = size.value * 4
   for (let y = 0; y < moisture.height; y++) {
      for (let x = 0; x < moisture.width; x++) {
         moisture.set(x, y, Math.pow(moisture.get(x, y), moist.value))
      }   
   }
   context = canvas.getContext('2d');
   moisture.stepValues(100);
   moisture.draw(context, size.value * 4, size.value * 4, NoiseMap.STYLE.GRAY);
   
   canvas = document.getElementById('map-canvas');
   canvas.height = size.value * 4
   canvas.width = size.value * 4
   context = canvas.getContext('2d');
   const mainmap = new hgMap(size.value, size.value, heightm, moisture);

   console.log(canvas, context, mainmap);

   mainmap.generate();
   document.getElementById('status').innerHTML = 'DON!!!';
   mainmap.drawMap(context, size.value * 4, size.value * 4);
})