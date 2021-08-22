
 var firebaseConfig = {
      apiKey: "AIzaSyDmlQ6nEB6zUTIzWokhicXNbk8ki0w_F0g",
      authDomain: "kwitter-cde20.firebaseapp.com",
      databaseURL: "https://kwitter-cde20-default-rtdb.firebaseio.com",
      projectId: "kwitter-cde20",
      storageBucket: "kwitter-cde20.appspot.com",
      messagingSenderId: "902232023749",
      appId: "1:902232023749:web:40001c0887c3f2140986ac",
      measurementId: "G-Q25T5GB0JG"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

username=localStorage.getItem("username");
document.getElementById("username").innerHTML= "Welcome " + username + "!";

function addroom(){
  room_name=document.getElementById("room_name").value; 
  firebase.database().ref("/").child(room_name).update({
    purpose:"adding room name"
  });
  localStorage.setItem("room_name", room_name);
  window.location="letschat_page.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      console.log("Room_names"+Room_names);
      row = "<div class='room_name' id = " + Room_names + " onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML+=row;
      });});}
getData();
function logout(){
  localStorage.removeItem("username");
  localStorage.removeItem("room_name");
  window.location="index.html";
}
function redirectToRoomName(name){
  localStorage.setItem("room_name", name);
  window.location="letschat_page.html";
}
