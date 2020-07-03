const log = console.log;
const times = 20;
class App {
	constructor(list){
		this.cntArr = [0,0,0,0];
		this.canvas = document.querySelector("#canvas");
		this.ctx = this.canvas.getContext("2d");
		this.arr = [];
		for(let i = 0; i < list.length; i++){
		// for(let i = 0; i < 50; i++){
			let arrTemp = [];
			for(let j = 0; j < list[i].length; j++){
			// for(let j = 0; j < 50; j++){
				let locate = new Locate(j,i,this.ctx,list[i][j]);
				this.cntArr[list[i][j]]++;
				arrTemp.push(locate);
				locate.draw();
			}
			this.arr.push(arrTemp);
			document.querySelector(".empty > span").innerHTML = this.cntArr[0];
			document.querySelector(".street > span").innerHTML = this.cntArr[1];
			document.querySelector(".sleep > span").innerHTML = this.cntArr[2];
			document.querySelector(".festival > span").innerHTML = this.cntArr[3];
		}

		this.canvas.addEventListener("click",(e)=>{
			let x = Math.floor(e.offsetX/times);
			let y = Math.floor(e.offsetY/times);
			let locate = this.arr[y][x];
			this.cntArr[locate.value]--;
			locate.click();
			this.cntArr[locate.value]++;
			document.querySelector(".empty > span").innerHTML = this.cntArr[0];
			document.querySelector(".street > span").innerHTML = this.cntArr[1];
			document.querySelector(".sleep > span").innerHTML = this.cntArr[2];
			document.querySelector(".festival > span").innerHTML = this.cntArr[3];
		});

		document.querySelector("#btn").addEventListener("click",(e)=>{
			let arr = [];
			for(let i = 0; i < list.length; i++){
				let arrTemp = [];
				for(let j = 0; j < list[0].length; j++){
					arrTemp.push(this.arr[i][j].value);
				}
				arr.push(arrTemp);
			}
			// log(JSON.stringify(arr,null,0));
			down(arr);
		});

	}

}

class Locate {


	constructor(x,y,ctx,value){
		this.x = x;
		this.y = y;
		this.ctx = ctx;
		this.value = value;
		this.colorArr = ["#fff","#0d7811","#ff7777","#c13bff"];
	}
	
	click(){
		this.value++;
		if(this.value >= 4) this.value = 0;
		this.draw();
	}

	draw(){
		this.ctx.fillStyle = this.colorArr[this.value];
		let drawX = this.x*times;
		let drawY = this.y*times;
		this.ctx.fillRect(drawX,drawY,times,times);
		this.ctx.strokeRect(drawX,drawY,times,times);
	}

}

window.addEventListener("load",()=>{
	$.getJSON("map.json",(e)=>{
		let app = new App(e);
	});
});


function down(jsonData) {
	let downData = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonData, null, '\t'));
	let downElem = document.createElement("a");
	downElem.setAttribute("href", downData);
	downElem.setAttribute("download", "map.json");
	downElem.click();
}

// 0 1 2 3 4
// 0 1 2 3 4
// 0 1 2 3 4
// 0 1 2 3 4
// 0 1 2 3 4

// [0,0] => 0 0 ~ 20 20
// [1,0] => 20 0 ~ 40 20
// [2,0] => 40 0 ~ 60 20
// [3,0] => 60 0 ~ 40 20

// [0,1] => 0 20 ~ 20 40
// [1,1] => 20 20 ~ 40 40
// [2,1] => 40 20 ~ 60 40
// [3,1] => 60 20 ~ 80 20


// [0,2] => 0 40 ~ 20 60
// [1,2] => 20 40 ~ 40 60
// [2,2] => 40 40 ~ 60 60
// [3,2] => 60 40 ~ 80 60