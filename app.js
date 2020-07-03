function divItem(item){
	let div = document.createElement("div");
	div.classList.add("form-box");
	div.dataset.idx = item.idx;
	div.innerHTML = `
	<input type="number" placeholder="인덱스" class="form-idx" value="${item.idx}">
	<input type="text" placeholder="이름" class="form-name" value="${item.name}">
	<input type="text" placeholder="사진" class="form-photo" value="${item.photo}">
	<input type="text" placeholder="타입" class="form-type" value="${item.type}">
	<input type="text" placeholder="위치" class="form-locate" value="${item.location}">
	<input type="number" placeholder="별점" class="form-rating" value="${item.rating}">
	<input type="number" placeholder="싱글 룸 갯수" class="form-single" value="${item.rooms.single}">
	<input type="number" placeholder="더블 룸 갯수" class="form-double" value="${item.rooms.double}">
	<input type="number" placeholder="트리플 룸 갯수" class="form-triple" value="${item.rooms.tripple}">
	<input type="number" placeholder="패밀리 룸 갯수" class="form-family" value="${item.rooms.family}">
	<input type="number" placeholder="커넥팅 룸 갯수" class="form-conn" value="${item.rooms.connecting}">
	<input type="number" placeholder="싱글 룸 가격" class="price-single" value="${item.price.single}">
	<input type="number" placeholder="더블 룸 가격" class="price-double" value="${item.price.double}">
	<input type="number" placeholder="트리플 룸 가격" class="price-triple" value="${item.price.tripple}">
	<input type="number" placeholder="패밀리 룸 가격" class="price-family" value="${item.price.family}">
	<input type="number" placeholder="커넥팅 룸 가격" class="price-conn" value="${item.price.connecting}">
	`;
	return div;
}

function divv(){
	let div = document.createElement("div");
	div.classList.add("form-box");
	div.innerHTML = `
	<input type="number" placeholder="인덱스" class="form-idx">
	<input type="text" placeholder="이름" class="form-name">
	<input type="text" placeholder="사진" class="form-photo">
	<input type="text" placeholder="타입" class="form-type">
	<input type="text" placeholder="위치" value="[0,0]" class="form-locate">
	<input type="number" placeholder="별점" class="form-rating">
	<input type="number" placeholder="싱글 룸 갯수" class="form-single">
	<input type="number" placeholder="더블 룸 갯수" class="form-double">
	<input type="number" placeholder="트리플 룸 갯수" class="form-triple">
	<input type="number" placeholder="패밀리 룸 갯수" class="form-family">
	<input type="number" placeholder="커넥팅 룸 갯수" class="form-conn">
	<input type="number" placeholder="싱글 룸 가격" class="price-single">
	<input type="number" placeholder="더블 룸 가격" class="price-double">
	<input type="number" placeholder="트리플 룸 가격" class="price-triple">
	<input type="number" placeholder="패밀리 룸 가격" class="price-family">
	<input type="number" placeholder="커넥팅 룸 가격" class="price-conn">
	`;	

	return div;
}
const log = console.log;

class App {
	constructor(list){
		this.arr = [];
		this.idx = -1;
		list.forEach(x=>{
			let div = divItem(x);
			this.idx = x.idx;
			document.querySelector(".container").appendChild(div);
		});
		this.idx++;

		for(this.idx*=1; this.idx <= 100; this.idx++){
			let div = divv();
			div.dataset.idx = this.idx;
			div.querySelector(".form-idx").value = this.idx;
			document.querySelector(".container").appendChild(div);
		}

		document.querySelector("#btn").addEventListener("click",(e)=>{
			this.arr = [];
			document.querySelectorAll(".form-box").forEach((x)=>{
				let idx = x.dataset.idx;
				let data = {
					"idx": x.querySelector(".form-idx").value*1,
					"name": x.querySelector(".form-name").value,
					"photo": x.querySelector(".form-photo").value,
					"type": x.querySelector(".form-type").value,
					"location": [0,2],
					"rating": x.querySelector(".form-rating").value*1,
					"rooms": {
						"single": x.querySelector(".form-single").value*1,
						"double": x.querySelector(".form-double").value*1,
						"tripple": x.querySelector(".form-triple").value*1,
						"family": x.querySelector(".form-family").value*1,
						"connecting": x.querySelector(".form-conn").value*1
					},
					"price": {
						"single": x.querySelector(".price-single").value*1,
						"double": x.querySelector(".price-double").value*1,
						"tripple": x.querySelector(".price-triple").value*1,
						"family": x.querySelector(".price-family").value*1,
						"connecting": x.querySelector(".price-conn").value*1
					}
				};
				this.arr.push(data);
				let json = JSON.stringify(this.arr,null,2);
				this.arr.forEach(x=>{
					let img = new Image();
					img.src = `images/${x.photo}`;
				});
				// log(json);
			});
		});
		setInterval(()=>{
				// document.querySelector("#btn").click();
		},10000);
	}

}

window.addEventListener("load",(e)=>{

	let xhr = new XMLHttpRequest();
	xhr.onload = function(){
		let arr = JSON.parse(this.responseText);
		let app = new App(arr);
	}
	xhr.open("GET","accommodations.json","true");
	xhr.send();



});