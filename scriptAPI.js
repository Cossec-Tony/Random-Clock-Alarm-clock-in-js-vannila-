// RECUPERER L'API YOUTUBE PUIS PRENDRE MA PLAYLIST MUSIQUE

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById("items");

let search = "";
let result = [];
let id;
idArray = new Array();
new_table = new Array();

const fetchPlaylist = async () => {
  playlist = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&forUsername=${"Youtube_user_id"}&playlistId=${"Id_of_the_playlist_here"}&key=${"key_API_here"}=${search}`
  )
    .then((response) => {
      return response.json();
    })
    // Prend les videoId de mes videos dans ma playlist
    .then(function once(result) {
      console.log(result.items);
      console.log(result.pageInfo);
      let items = result.items;
      return items.map(function once(item) {
        let span = createNode("Span");
        span.innerHTML = `${item.snippet}`;
        id = item.snippet.resourceId.videoId;
        idArray.push(id);
        console.log(id);
        // Melange la liste de musique
        function shuffleArray(inputArray) {
          inputArray.sort(() => Math.random() - 0.5);
        }
        shuffleArray(idArray);
      });
    });

  const getLastArrItem = (arr) => {
    var lastItem = arr.pop();
    new_table.push(lastItem);
    console.log(`Last element is ${lastItem}`);
    console.log(new_table);
  };
  getLastArrItem(idArray);
};

function clock() {
  console.log(idArray);
  //Fait marcher l'heure en temps réel
  const hr = document.getElementById("chr");
  const min = document.getElementById("cmin");
  const sec = document.getElementById("csec");

  var currentTime = new Date();

  setInterval(function () {
    hr.innerHTML = currentTime.getHours() + "  hr";
    min.innerHTML = currentTime.getMinutes() + "  min";
    sec.innerHTML = currentTime.getSeconds() + "  sec";
    currentTime = new Date();
  });

  //Régler les boutons pour qu'ils fonctionnent
  // BOUTON SET
  document.getElementById("set").addEventListener("click", function (e) {
    e.preventDefault;
    console.log(idArray);
    let bSet = document.getElementById("set");
    let bReset = document.getElementById("reset");
    let hr = document.getElementById("hr");
    let min = document.getElementById("min");
    let sec = document.getElementById("sec");
    let tpick_global = document.getElementById("tpick_global");

    console.log(hr.value);
    console.log(min.value);
    console.log(sec.value);

    tpick_global.disabled = true;
    bSet.disabled = true;
    bReset.disabled = false;
    hr.disabled = true;
    min.disabled = true;
    sec.disabled = true;

    //Lier l'heure du temps avec l'heure de l'alarme
    setInterval(function () {
      let now = new Date();
      let hr_final = now.getHours();
      let min_final = now.getMinutes();
      let sec_final = now.getSeconds();

      now_final = hr_final + min_final + sec_final;

      let alarm = null;
      alarm = hr.value + min.value + sec.value;

      if (
        hr.value == hr_final &&
        min.value == min_final &&
        sec.value == sec_final
      ) {
        window.location.replace(
          `https://music.youtube.com/watch?app=desktop&v=${new_table}?&autoplay=1&t=10000s&list=PLRtVnY_33BDRpMtU3qJi08bzN_w2UkEBI`
        );
      }
    });
  });

  // BOUTON RESET
  document.getElementById("reset").addEventListener("click", function (e) {
    e.preventDefault;
    window.location.reload();
  });

  //Flèche du Set Alarme
  function fleche() {
    const time_picker_element = document.querySelector(".time-picker");

    const hr_element = document.querySelector(".time-picker .hour .hr");
    const min_element = document.querySelector(".time-picker .minute .min");
    const sec_element = document.querySelector(".time-picker .second .sec");

    const hr_up = document.querySelector(".time-picker .hour .hr-up");
    const hr_down = document.querySelector(".time-picker .hour .hr-down");

    const min_up = document.querySelector(".time-picker .minute .min-up");
    const min_down = document.querySelector(".time-picker .minute .min-down");

    const sec_up = document.querySelector(".time-picker .second .sec-up");
    const sec_down = document.querySelector(".time-picker .second .sec-down");

    let hour = 0;
    let minute = 0;
    let second = 0;

    hr_up.addEventListener("click", hour_up);
    hr_down.addEventListener("click", hour_down);

    min_up.addEventListener("click", minute_up);
    min_down.addEventListener("click", minute_down);

    sec_up.addEventListener("click", second_up);
    sec_down.addEventListener("click", second_down);

    function hour_up() {
      hour++;
      if (hour > 23) {
        hour = 0;
      }
      setTime();
    }

    function hour_down() {
      hour--;
      if (hour < 0) {
        hour = 23;
      }
      setTime();
    }

    function minute_up() {
      minute++;
      if (minute > 59) {
        minute = 0;
      }
      setTime();
    }

    function minute_down() {
      minute--;
      if (minute < 0) {
        minute = 59;
      }
      setTime();
    }

    function second_up() {
      second++;
      if (second > 59) {
        second = 0;
      }
      setTime();
    }

    function second_down() {
      second--;
      if (second < 0) {
        second = 59;
      }
      setTime();
    }

    function setTime() {
      hr_element.value = formaTime(hour);
      min_element.value = formaTime(minute);
      sec_element.value = formaTime(second);

      time_picker_element.dataset.time =
        formaTime(hour) + ":" + formaTime(minute) + ":" + formaTime(second);
    }

    function formaTime(time) {
      if (time < 10) {
        time = "0" + time;
      }
      return time;
    }
  }
  fleche();
}
clock();
fetchPlaylist();
