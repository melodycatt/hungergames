var generator = new NoiseMap.MapGenerator(configuration=);
var heightmap = generator.createMap(400, 200, {type: 'perlin'});

const canvas = document.getElementById('map-canvas');
const ctx = canvas.getContext('2d');
heightmap.draw(ctx, canvas.clientWidth, canvas.clientHeight, NoiseMap.STYLE.GRAY);
