const canvas = document.getElementById("jsCanvas"); // 캔버스
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor"); // 색깔들
const brush = document.getElementById("brushRange"); // 브러쉬 크키 조절
const fill = document.getElementById("jsFill"); // 그림판 채우기
const save = document.getElementById("jsSave"); // 그림판 저장 
const current = document.getElementById("currentColor"); // 현재 색깔 
const size = document.getElementById("canvasRange"); // 크기 조절

let painting = false;
let filling = false;
let canvas_size = 700; // 기본 캔버스 크기

canvas.width = canvas_size;
canvas.height = canvas_size;


ctx.fillStyle = "white"; // 기본 배경
ctx.fillRect(0, 0, canvas_size, canvas_size);

// 페인팅을 하고있는지 아닌지 구별하는 함수
function stop() {
    painting = false;
}

function start() {
    painting = true;
}

function OnMouse(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    if (filling === true) {
        painting = false;
    } // 필링모드 일때 페인트를 못하게 함
}

function changeColor(event) {
    const color = event.target.style.backgroundColor; // r클릭 시 색깔 설정
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    current.style.backgroundColor = color; // 현재 색상 표시
}

function brushSize(event) {
    const size = event.target.value; // range로 브러쉬 크키 설정
    ctx.lineWidth = size; // 선 굵기에 설정값으로 바꾸기
}

function fillClick(event) {
    if (filling === true) {
        filling = false;
        fill.innerText = "FILL";
    } else {
        filling = true;
        fill.innerText = "PAINT";
        ctx.fillStyle = ctx.strokeStyle;
    }
}

function canvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas_size, canvas_size);
        start();
    } else {
        painting = false;
    }
}

function saveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJs"
    link.click();
}

function canvasSize(event) {
    canvas_size = event.target.value; // range로 너비 설정
    canvas.width = canvas_size; // 설정한 너비 값으로 바꾸기
    current.style.backgroundColor = "#2c2c2c"; // 현재 색 다시 초기화
}

if (canvas) {
    canvas.addEventListener("mousemove", OnMouse); // 커서가 움직일 때
    canvas.addEventListener("mousedown", start); // 마우스를 클릭하고 떼지 않았을 때
    canvas.addEventListener("mouseup", stop); // 커서를 뗄 때
    canvas.addEventListener("mouseleave", stop); // 커서가 범위에서 사라질 때
    canvas.addEventListener("click", canvasClick); // 마우스를 클릭했을 때
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", changeColor)
);

if (brush) {
    brush.addEventListener("input", brushSize);
}

if (fill) {
    fill.addEventListener("click", fillClick);
}

if (save) {
    save.addEventListener("click", saveClick);
}

if (size) {
    size.addEventListener("input", canvasSize);
}
