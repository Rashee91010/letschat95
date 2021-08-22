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

username = localStorage.getItem("username");
room_name = localStorage.getItem("room_name");

function send() {
      msg = document.getElementById("message").value;
      firebase.database().ref(room_name).push({
            name: username,
            message: msg,
            like: 0
      });
      document.getElementById("message").value = "";
}
function logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("room_name");;
      window.location = "index.html";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log("firebase_message_id" + firebase_message_id);
                        console.log("message_data" + message_data);
                        name = message_data["name"];
                        message = message_data["message"];
                        like = message_data["like"];
                        name1 = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
                        message1 = "<h4 class='message_h4'>" + message + "</h4>";
                        likebutton ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='update(this.id)'>";
                        buttontext="<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button><hr>";
                        row = name1 + message1 + likebutton + buttontext;
                        document.getElementById("output").innerHTML += row;

                  }
            });
      });
}
getData();

function update(message_id){
buttonid=message_id;
likes=document.getElementById(buttonid).value;
likesfinal=Number(likes)+1;
console.log(likesfinal);
firebase.database().ref(room_name).child(message_id).update({
      like:likesfinal
});
}
