let city, routeName;

// 縣市資料
const cityData = [
  { name: "臺北市", value: "Taipei" },
  { name: "新北市", value: "NewTaipei" },
  { name: "桃園市", value: "Taoyuan" },
  { name: "臺中市", value: "Taichung" },
  { name: "臺南市", value: "Tainan" },
  { name: "高雄市", value: "Kaohsiung" },
  { name: "基隆市", value: "Keelung" },
  { name: "新竹市", value: "Hsinchu" },
  { name: "新竹縣", value: "HsinchuCounty" },
  { name: "苗栗縣", value: "MiaoliCounty" },
  { name: "彰化縣", value: "ChanghuaCounty" },
  { name: "南投縣", value: "NantouCounty" },
  { name: "雲林縣", value: "YunlinCounty" },
  { name: "嘉義縣", value: "ChiayiCounty" },
  { name: "嘉義市", value: "Chiayi" },
  { name: "屏東縣", value: "PingtungCounty" },
  { name: "宜蘭縣", value: "YilanCounty" },
  { name: "花蓮縣", value: "HualienCounty" },
  { name: "臺東縣", value: "TaitungCounty" },
  { name: "金門縣", value: "KinmenCounty" },
  { name: "澎湖縣", value: "PenghuCounty" },
  { name: "連江縣", value: "LienchiangCounty" },
];

// 選取地區
const citySelect = document.querySelector("#citySelect");
function select() {
  let str = '<option value="">選擇縣市</option>';
  cityData.forEach((item) => {
    str += `<option value="${item.value}">${item.name}</option>`;
  });
  citySelect.innerHTML = str;
}
select();

// 顯示公車列表
const routeSelect = document.querySelector("#routeSelect");
const getBus = (e) => {
  city = e.target.value;
  //console.log("city", city);
  if (city) {
    axios
      .get(
        `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city}?$format=JSON`,
        {
          headers: getAuthorizationHeader(),
        }
      )
      .then(function (response) {
        const data = [];
        data.push(...response.data);
        let str = '<option value="">選擇路線</option>';
        data.forEach((d) => {
          str += `<option value="${d.RouteName.Zh_tw}">${d.RouteName.Zh_tw}</option>`;
        });
        routeSelect.innerHTML = str;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

// 設定搜尋路線
const setRoute = (e) => {
  routeName = e.target.value;
};

// 顯示搜尋結果
const searchBus = document.querySelector("#searchBus");
const routeGroup = document.querySelector("div.route_group");
const showRoute = () => {
  if (routeName) {
    console.log(city, routeName);
    axios
      .get(
        `https://ptx.transportdata.tw/MOTC//v2/Bus/EstimatedTimeOfArrival/City/${city}/${routeName}?&$format=JSON`,
        {
          headers: getAuthorizationHeader(),
        }
      )
      .then(function (response) {
        /* 取得到站時間資料 */
        const data = [];
        data.push(...response.data);
        console.log(data);
        /* 排列資料 */
        let str = "<p>請選擇乘車路線</p>";
        data.forEach((d) => {
          if (d.EstimateTime > 0) {
            console.log(
              `站名: ${d.StopName.Zh_tw} , 預估時間: ${d.EstimateTime}, 到站時間: ${d.DataTime}`
            );
            str += `
            <div class="dus_stop">
              <p class="btn btn_outline_dark">${d.EstimateTime}</p>
              <p class="routeName">${d.StopName.Zh_tw}</p>
            </div>`;
          } else {
            console.log(`站名:${d.StopName.Zh_tw}`);
            str += `
            <div class="dus_stop">
              <p class="btn btn_outline_dark">未發車</p>
              <p class="routeName">${d.StopName.Zh_tw}</p>
            </div>`;
          }
          // str += `<option value="${d.RouteID}">${d.RouteName.Zh_tw}</option>`;
        });
        /* 加入畫面 */
        routeGroup.innerHTML = str;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

citySelect.addEventListener("change", getBus);
routeSelect.addEventListener("change", setRoute);
searchBus.addEventListener("click", showRoute);

// // API
// axios
//   .get(
//     "https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/Station?$top=10&$format=JSON",
//     {
//       headers: getAuthorizationHeader(),
//     }
//   )
//   .then(function (response) {
//     const data = [];
//     const stationList = document.querySelector("ul.stationList");
//     // 1. get JSON data
//     data.push(...response.data);
//     // 2.
//     console.log(data[1].StationName.Zh_tw);
//     const stationName = data[1].StationName.Zh_tw;
//     stationList.innerHTML = `<li class="btn btn_primary">${stationName}</li>`;
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

function getAuthorizationHeader() {
  let AppID = "246448c88bce42bfa303e9edd65e4c4f";
  let AppKey = "EesoQpOrDrpMVg-rr-tuMKkOoVQ";
  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  let HMAC = ShaObj.getHMAC("B64");
  let Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';
  return { Authorization: Authorization, "X-Date": GMTString };
}
