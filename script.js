const sketchPad = document.getElementById('sketchPad');
const gridSizeInput = document.getElementById('gridSize');
const gridSizeLabel = document.getElementById('gridSizeLabel');
const gridSizeLabel2 = document.getElementById('gridSizeLabel2');
const colorPicker = document.getElementById('colorPicker');
const resetBtn = document.getElementById('resetBtn');
const themeSwitch = document.getElementById('themeSwitch');
const themeLabel = document.getElementById('themeLabel');
const rainbowBtn = document.getElementById('rainbowBtn');
const eraserBtn = document.getElementById('eraserBtn');

let gridSize = parseInt(gridSizeInput.value, 10);
let penColor = colorPicker.value;
let isRainbow = false;
let isEraser = false;
let hue = 0;

function getPadBg() {
    return getComputedStyle(document.body).getPropertyValue('--pad-bg').trim() || '#fff';
}

function getRainbowColor() {
    hue = (hue + 15) % 360;
    return `hsl(${hue}, 100%, 50%)`;
}

function createGrid(size) {
    sketchPad.innerHTML = '';
    sketchPad.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    sketchPad.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('mouseover', () => {
            if (isEraser) {
                cell.style.backgroundColor = getPadBg();
            } else if (isRainbow) {
                cell.style.backgroundColor = getRainbowColor();
            } else {
                cell.style.backgroundColor = penColor;
            }
        });
        sketchPad.appendChild(cell);
    }
}

gridSizeInput.addEventListener('input', () => {
    gridSize = parseInt(gridSizeInput.value, 10);
    gridSizeLabel.textContent = gridSize;
    gridSizeLabel2.textContent = gridSize;
    createGrid(gridSize);
});

colorPicker.addEventListener('input', () => {
    penColor = colorPicker.value;
    if (isEraser) {
        isEraser = false;
        eraserBtn.classList.remove('active');
    }
    if (isRainbow) {
        isRainbow = false;
        rainbowBtn.classList.remove('active');
    }
});

rainbowBtn.addEventListener('click', () => {
    isRainbow = !isRainbow;
    rainbowBtn.classList.toggle('active', isRainbow);
    if (isRainbow) {
        isEraser = false;
        eraserBtn.classList.remove('active');
    }
});

eraserBtn.addEventListener('click', () => {
    isEraser = !isEraser;
    eraserBtn.classList.toggle('active', isEraser);
    if (isEraser) {
        isRainbow = false;
        rainbowBtn.classList.remove('active');
    }
});

resetBtn.addEventListener('click', () => {
    createGrid(gridSize);
});

themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        document.body.classList.add('night');
        themeLabel.textContent = '☀️';
    } else {
        document.body.classList.remove('night');
        themeLabel.textContent = '🌙';
    }
    createGrid(gridSize);
});

// Initialize
gridSizeLabel.textContent = gridSize;
gridSizeLabel2.textContent = gridSize;
createGrid(gridSize);