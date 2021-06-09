const b = document.getElementsByClassName("main-body")[0];

b.addEventListener("click", test);
function test(){
    console.log("click");
}

let height = 0;
let width = 0;
let x = [];
let y = [];
let nn; //인공신경망 변수

const option = {
    task:"regression",
    debug:true,
}
function setup(){
    width= windowWidth;
    height= b.clientHeight;
    const canvas = createCanvas(width, height);
    canvas.parent(b);
    background(222);

    //인공신경망 만들기
    nn = ml5.neuralNetwork(option);
    console.log(nn);
}

function mouseClicked(){
    x.push(mouseX);
    y.push(mouseY);
    customDraw();

    //인공신경망에 데이터 삽입
    nn.addData( [mouseX], [mouseY]);

    if(x.length===20){
        train();
    }
}


function train(){
    nn.normalizeData();
    nn.train({
        epochs: 100
    },
        predict);
}

function predict(){
    for (let i = 0; i < width; i++) {
        nn.predict([i],(err,result) => {
            let p = result[0].value;
            stroke(0,0,255);
            circle(i, p, 1);
        })
    }
}

function customDraw() {
    //background(222);
    for (let i = 0; i < x.length; i++) {
        stroke(255,0,0);
        circle(x[i], y[i], 10);
    }
}