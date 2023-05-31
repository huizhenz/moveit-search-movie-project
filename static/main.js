const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTRlNjI1NzM4ZTljNTA3YTlkNDUxODQ3MjZjYTBiNCIsInN1YiI6IjY0NzIxOWRhYTE5OWE2MDEzMzI3ZTBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QGHS5mD2MAGc3NCZSUL5r86mKqr3aOreb0U0_4p0eNE",
  },
};

let movies;
let filterArr = [];
// TMDB API 호출하기 위한 fetch
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    movies = response["results"];

    // TMDB 중 필요한 데이터 가져오기 위한 forEach
    movies.forEach((data) => {
      let title = data.title;
      let overview = data.overview;
      let poster_path = data.poster_path;
      let vote_average = data.vote_average;
      let id = data.id;

      let img_url = `https://image.tmdb.org/t/p/w300${poster_path}`;

      let temp_html = ``;
      temp_html = `<div class="movie-card" onclick=alert("영화&nbsp"+"id:&nbsp"+"${id}")>
                  <div class="movie-img">   
                    <p><img src = ${img_url} /></p>
                  </div>
                    <p>${title}</p>
                    <p>${overview}</p>
                    <p>${vote_average}</p>
                </div>`;

      // id가 "moive"인 요소들 안의 HTML을 temp_html로 변경하기
      document.getElementById("movie").innerHTML += temp_html;
    });

    // ======================= 검색 기능 ===========================
    // filter 사용해서 input값이 들어있는 영화들 추출하는 filterMovies 함수 선언
    function filterMovies(movieTitle) {
      filterArr = movies.filter(
        (item) => item.title.toLowerCase().includes(movieTitle) // movies의 title과 movieTitle 비교 후 filterArr 저장
      );

      // 새로고침
      document.getElementById("movie").innerHTML = "";

      // filterArr에 대한 forEach
      filterArr.forEach((data) => {
        let title = data.title;
        let overview = data.overview;
        let poster_path = data.poster_path;
        let vote_average = data.vote_average;
        let id = data.id;

        let img_url = `https://image.tmdb.org/t/p/w300${poster_path}`;

        let temp_html = ``;
        temp_html = `<div class="movie-card" onclick=alert("영화&nbsp"+"id:&nbsp"+"${id}")>
                    <div class="movie-img">   
                      <p><img src = ${img_url} /></p>
                    </div>
                      <p>${title}</p>
                      <p>${overview}</p>
                      <p>${vote_average}</p>
                  </div>`;

        document.getElementById("movie").innerHTML += temp_html;
      });
    }

    // 영화 타이틀에서 입력한 글자가 있으면 그 글자만 따로 배열을 받아 다시 화면에 띄우기
    // 1. input 값과 button값을 받아서 변수에 할당
    const searchInput = document.querySelector("#search-container input");
    const searchButton = document.querySelector("#search-container button");

    // 2. user가 입력한 input값을 받는 btnClick 함수 선언
    function btnClickDisplay() {
      let movieTitle = searchInput.value.toLowerCase().trim();

      if (movieTitle === "") {
        alert("Please write movie title");
      } else if (movieTitle.length > 50) {
        alert("your movie title is too long");
      } else {
        // filter 사용해서 input값이 들어있는 영화들 추출하는 filterMovies 함수 호출
        filterMovies(movieTitle);
      }
    }

    // 3. button 클릭 시 이벤트 btnClick 함수 호출
    searchButton.addEventListener("click", btnClickDisplay);
  })
  // ======================= 검색 기능 ===========================

  .catch((err) => console.error(err));
