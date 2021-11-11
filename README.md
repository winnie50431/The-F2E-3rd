# 實作紀錄

The F2E 網頁開發紀錄。

【學習目標】

1. 手刻 RWD
2. 應用 TPX API (引入 axios)
   - 顯示資料
   - 搜尋功能
3. 定位功能

### 頁面

- 台灣景點(首頁)
- 美食住宿
- 景點交通

---

## 功能規劃

#### 首頁

1. 顯示景點
2. 依條件搜尋，顯示景點

#### 交通景點

1. 選擇縣市、公車路線
   - 依選擇 **【縣市】**，取得縣市相應的 **【公車路線】**。 (11.8 checked)
2. 搜尋，顯示車次與到站時間
   - 依選擇 **【公車路線】**，取得相應 **【站牌】**。 (11.8 checked)
   - 區分 _往返路線_ 的站牌。
   - 依站牌，配對 **【到站時間】**。
   - 渲染畫面。

---

### 筆記

Fetch API vs. Axios

- **Fetch API**
  回傳 Promise → 使用 Response 物件 → 用 method(ex. json())獲得 body
- **Axios**
  回傳 Promise ，且與 Response & Error 物件一同被解析。

參考資料:

- [Fetch 還是 Axios——哪個更適合 HTTP 請求？\_杭州程式設計師張張 - MdEditor](https://www.gushiciku.cn/pl/pjgD/zh-tw)
- [支援 OData 查詢語法](https://motc-ptx-api-documentation.gitbook.io/motc-ptx-api-documentation/api-te-se/odata#odata-yu-fa)
