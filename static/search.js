// // 영화 타이틀에서 입력한 글자가 있으면 그 글자만 따로 배열을 받아 다시 화면에 띄우기

// // 1. input 값과 button값을 받아서 변수에 할당
// const searchMovie = document.getElementById("search-container"); // querySelector와 getElementById의 차이는 ?
// const searchInput = document.querySelector("#search-container input");
// // const searchInput = searchMovie.querySelector("#input");
// const searchButton = document.querySelector("#search-container button");

// function btnClick() {
//   // event.preventDefalut(); // ?
//   // console.log(searchInput.value); // console.dir은 객체의 속성확인
//   const movieTitle = searchInput.value;

//   if (movieTitle === "") {
//     alert("Please write movie title");
//   } else if (movieTitle.length > 70) {
//     alert("your movie title is too long");
//   }

//   filter();
//   console.log(movieTitle);
//   // user가 입력하는 값의 유효성을 확인하는 것은 좋은 연습, user를 믿지말자
//   // html 안에 input 태그에서도 유효성 검사를 할 수 있는데, 그러려면 input은 form 태그 안에 있어야 함
// }

// // button 요소를 클릭시 이벤트 btnClick 함수 실행
// searchButton.addEventListener("click", btnClick); // btnClick()은 바로 실행되어 버림
// // searchMovie.addEventListener("submit", btnClick);

// // ============================================================

// // function filterMovies(moviet) {
// //   let renderHTML = ``;
// //   if (moviet.toLowerCase().indexOf(title.toLowerCase()) !== -1) {
// //     renderHTML += temp_html;
// //   }
// // }
