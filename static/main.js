const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTRlNjI1NzM4ZTljNTA3YTlkNDUxODQ3MjZjYTBiNCIsInN1YiI6IjY0NzIxOWRhYTE5OWE2MDEzMzI3ZTBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QGHS5mD2MAGc3NCZSUL5r86mKqr3aOreb0U0_4p0eNE",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    let movies = response["results"];

    movies.forEach((data) => {
      let title = data["title"];
      let overview = data["overview"];
      let poster_path = data["poster_path"];
      let vote_average = data["vote_average"];
      let id = data["id"];

      let temp_html = ``;
      let img_url = `https://image.tmdb.org/t/p/w300${poster_path}`;

      //// <a href="#">
      temp_html = `<div class="movie-card" onclick=alert("영화&nbsp"+"id:&nbsp"+"${id}")> 
                    <p><img src = ${img_url} /></p>
                    <p>${title}</p>
                    <p>${overview}</p>
                    <p>${vote_average}</p>
                  </div>`;

      document.getElementById("movie").innerHTML += temp_html; // +=를 사용하여 계속 더해지게
    });
  })
  .catch((err) => console.error(err));
