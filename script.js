// Firebaseのライブラリをインポート
// ふぉお
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebaseの設定
const firebaseConfig = {
  apiKey: "AIzaSyDTBh7aHPRG5QHXX0HylM-1d6Ttey48dHk",
  authDomain: "aicampc.firebaseapp.com",
  projectId: "aicampc",
  storageBucket: "aicampc.appspot.com",
  messagingSenderId: "895396954793",
  appId: "1:895396954793:web:90f9fd9e8416795a6d9fb8"
};

// Firebaseアプリの初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// データを追加する関数
async function addBabysitter(username, age,address,education) {
  try {
    await addDoc(collection(db, "babysitter"), {
      username: username,
      age: age,
      address: address,
      education: education,
      createdAt: new Date()
    });
    alert("データが登録されました！");
    window.location.href = 'kennnsaku.html';
  } catch (error) {
    console.error("エラーが発生しました:", error);
  }
}
// フォームの送信イベントリスナー
const addBabySitterForm = document.getElementById("addBabySitter");
if(addBabySitterForm){
    addBabySitterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const age = parseInt(document.getElementById("age").value);
    const address = document.getElementById("address").value;
    const education = document.getElementById("education").value;
    addBabysitter(username, age,address,education);
  });
}

// Firestoreからデータを取得して表示する関数
async function queryData() {
  const resultList = document.getElementById("resultList");
  resultList.innerHTML = "";

  try {
    const q = query(collection(db, "babysitter"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const listItem = document.createElement("li");
      listItem.textContent = `名前: ${data.username}, 年齢: ${data.age}, 住所: ${data.address}, 最終学歴: ${data.education}, `;
      resultList.appendChild(listItem);
    });
  } catch (error) {
    console.error("クエリエラー:", error);
  }
}


// "resultContainer" というIDを持つ要素を取得
const resultContainer = document.getElementById("resultContainer");

// "resultContainer"が存在するか確認
if(resultContainer){
  queryData();
}
