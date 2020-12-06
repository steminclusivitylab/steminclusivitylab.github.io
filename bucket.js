
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
      apiKey: "AIzaSyBTO-R3Gju0cqp_oXznsSy9YQB-ItL0lT4",
      authDomain: "sengin-db101.firebaseapp.com",
      projectId: "sengin-db101",
      storageBucket: "sengin-db101.appspot.com",
      messagingSenderId: "99657983617",
      appId: "1:99657983617:web:9e0ac2906f55e8933d8f80",
      measurementId: "G-LHX5NTJZE8"
    };
    // Initialize Firebase
    
    firebase.initializeApp(firebaseConfig);
    
    list()
function parse(){
    
    var storage = firebase.storage();
    console.log(storage)
    var storageRef = storage.ref();
    console.log(storageRef);
    console.log("FIKCK");
}

function upload(){
  let fil = document.getElementById("myFile").files[0];
  let storageRef = firebase.storage().ref();
  let name = fil.name;
  let path = "documents/" + name
  let ref = storageRef.child(path);
  
  let fileReader= new FileReader();
  fileReader.onload = function (fileLoadedEvent) {
    ref.putString(fileLoadedEvent.target.result, 'data_url').then(function(snapshot) {
      console.log('Uploaded a data_url string!');
    });

  };
  fileReader.readAsDataURL(fil);
  
}
function download(e){
  console.log(e.target.name);
  let storageRef = firebase.storage().ref();
  let path = "documents/" + e.target.name;
  storageRef.child(path).getDownloadURL().then(function(url) {
    // `url` is the download URL for 'images/stars.jpg'
  
    
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.open('GET', url);
  xhr.onload = function(event) {
    var blob = xhr.response;
    saveBlob(blob, e.target.name);
  };
  
  xhr.send();
  
})
}
function saveBlob(blob, fileName) {
  var a = document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  a.download = fileName;
  a.dispatchEvent(new MouseEvent('click'));
}


async function list(){
  let listRef = firebase.storage().ref().child("documents");
  let documents = []
  let res = await listRef.listAll();
  res.items.forEach(function(itemRef) {
    documents.push(itemRef.name); 
  });
  var ul = document.getElementById("documents");
  ul.innerHTML = "";
  for (let i of documents){
    var li = document.createElement("li");
    var button = document.createElement("button");
    button.onclick = download;
    button.innerHTML = i;
    button.name=i;
    li.appendChild(button);
    ul.appendChild(li);
  }
  
  
}
