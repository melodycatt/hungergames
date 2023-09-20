var generator = new NoiseMap.MapGenerator();
var heightmap = generator.createMap(400, 200, {type: 'perlin'});

var context = document.getElementById('map-canvas').getContext('2d');
heightmap.draw(context, 800, 400, NoiseMap.STYLE.GRAY);
