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
      temp_html = `<li class="movie-card" onclick=alert("영화&nbsp"+"id:&nbsp"+"${id}")>
                      <img class="movie-img" src =${img_url} art=${title}"&nbsp이미지" />
                      <div  class="movie-info">
                        <span class="movie-title">${title}</span>
                        <span class="grade">${vote_average}</span>
                        <p>${overview}</p>
                      </div>
                    </li>`;

      // id가 "moive"인 요소들 안의 HTML을 temp_html로 변경하기
      document.querySelector(".movie").innerHTML += temp_html;
    });

    // ======================= 검색 기능 ===========================
    // 2-2. filter 사용해서 input값이 들어있는 영화들 추출하는 filterMovies 함수 선언
    function filterMovies(movieTitle) {
      filterArr = movies.filter(
        (item) => item.title.toLowerCase().includes(movieTitle) // movies의 title과 movieTitle 비교 후 filterArr 저장
      );

      // 새로고침
      document.getElementById("movie").innerHTML = "";

      // 2-3. filterArr에 대한 forEach로 검색된 영화만 화면에 다시 띄우기
      filterArr.forEach((data) => {
        let title = data.title;
        let overview = data.overview;
        let poster_path = data.poster_path;
        let vote_average = data.vote_average;
        let id = data.id;

        let img_url = `https://image.tmdb.org/t/p/w300${poster_path}`;

        let temp_html = ``;
        temp_html = `<li class="movie-card" onclick=alert("영화&nbsp"+"id:&nbsp"+"${id}")>
                        <img class="movie-img" src =${img_url} art=${title}"&nbsp이미지" />
                        <div class="movie-info">
                          <span class="movie-title">${title}</span>
                          <span class="grade">${vote_average}</span>
                          <p>${overview}</p>
                        </div>
                      </li>`;

        document.querySelector(".movie").innerHTML += temp_html;
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
        alert("영화 제목을 입력해 주세요.");
      } else if (movieTitle.length > 50) {
        alert("영화 제목이 너무 길어요.");
      } else {
        // 2-1. filter 사용해서 input값이 들어있는 영화들 추출하는 filterMovies 함수 호출
        filterMovies(movieTitle);
      }
    }

    // 3. button 클릭 시 btnClick 함수 호출
    searchButton.addEventListener("click", btnClickDisplay);

    // 3-1. 키보드 enter키 입력 시 btnClick 함수 호출

    searchInput.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        searchButton.click();
      }
    });
  })
  // ======================= 검색 기능 ===========================

  .catch((err) => console.error(err));

// ==================== 상단 이동 스크롤 기능 ========================
const topBtn = document.querySelector(".scroll-to-top");

// window를 scroll 하면 checkHeight 함수 호출
window.addEventListener("scroll", checkHeight);

// window의 높이를 확인하는 checkHeight 함수 선언
// window가 400px 이상 스크롤 되었을 때 버튼 보이게 하기
function checkHeight() {
  if (window.scrollY < 400) {
    topBtn.style.display = "none";
  } else {
    topBtn.style.display = "flex";
  }
}

// 상단 이동 스크롤 버튼 클릭시 상단으로 (부드럽게) 이동하게 해주는 이벤트
topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// 상단 바에 있는 돋보기 버튼 클릭 시 검색창 보이게 하는 기능
// 검색창 옆에 닫기 버튼 클릭 시 검색창 사라지게 하는 기능
const menuSearchBtn = document.querySelector(".menu-search");
const searchCloseBtn = document.querySelector(".close-btn");
const searchContainer = document.querySelector("#search-container");

menuSearchBtn.addEventListener("click", displaySearchContainer);

function displaySearchContainer() {
  searchContainer.style.display = "block";
}

searchCloseBtn.addEventListener("click", noneDisplaySearchContainer);

function noneDisplaySearchContainer() {
  searchContainer.style.display = "none";
}
