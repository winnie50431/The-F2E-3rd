const data = [];
const stationList = document.querySelector("ul.stationList");
axios
  .get(
    "https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/Station?$top=10&$format=JSON",
    {
      headers: getAuthorizationHeader(),
    }
  )
  .then(function (response) {
    // 1. get JSON data
    data.push(...response.data);
    // 2.
    console.log(data[1].StationName.Zh_tw);
    const stationName = data[1].StationName.Zh_tw;
    stationList.innerHTML = `<li class="btn btn_primary">${stationName}</li>`;
  })
  .catch(function (error) {
    console.log(error);
  });

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
