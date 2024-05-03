const fantasyKingdomNames = [
    "Eldoria",
    "Avaloria",
    "Emberhold",
    "Celestria",
    "Mythoria",
    "Verdantia",
    "Frostfall",
    "Shadowrealm",
    "Silverpeak",
    "Sunrise Dominion"
];

let provinces = [];

function generateRandomMapName() {
    const randomMapName = fantasyKingdomNames[Math.floor(Math.random() * fantasyKingdomNames.length)];
    document.getElementById('mapName').value = randomMapName;
    drawRegion();
}

function applyCustomization() {
    const mapName = document.getElementById('mapName').value;
    const culture = document.getElementById('culture').value;
    const province = document.getElementById('province').value;
    const state = document.getElementById('state').value;

    provinces = [];

    console.log('Map Name:', mapName);
    console.log('Culture:', culture);
    console.log('Province:', province);
    console.log('State:', state);

    drawRegion();
}

const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');

function drawRegion() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const shapeColor = getRandomColor();
    const x = Math.random() * (canvas.width - 100);
    const y = Math.random() * (canvas.height - 100);
    const width = Math.random() * 100 + 50; 
    const height = Math.random() * 100 + 50; 
    ctx.fillStyle = shapeColor;
    ctx.fillRect(x, y, width, height);

    provinces.push({ name: document.getElementById('province').value, x: x, y: y });

    const mapName = document.getElementById('mapName').value;
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 20px Arial';
    ctx.fillText(mapName, 20, 40);

    ctx.font = '14px Arial';
    ctx.fillStyle = '#000000';
    provinces.forEach(province => {
        ctx.fillText(province.name, province.x, province.y + 20);
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}