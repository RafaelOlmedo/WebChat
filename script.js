function faz_algo() {
	alert('Oi');
}

// Recupera o usuário que está logando.
function getConnectingUser() {

	// Check browser support
	if (typeof(Storage) !== "undefined") {

		// Armazena o usuário em uma WebStorage.
	    localStorage.setItem("user", document.getElementById("user").value);

	    // Alert apenas de teste.
	    alert(localStorage.getItem("user"));
	} 
	else {
	    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
	}
}

// Abre o HTML do chat.
function open_chat_page() {

	getConnectingUser();

	window.location.href = 'chat.html';

	 // Alert apenas de teste.
	 document.getElementById("connected_user").innerHTML = "Rafael";
}


function show_users() {
	var xhttp = new XMLHttpRequest();

	 xhttp.onreadystatechange = function() {
			// 4 DONE | 200 OK
	        if (this.readyState == 4 && this.status == 200) {

	        	// var usersConnected
	            console.log(this.responseText);
	            Users = JSON.parse(this.responseText);
				alert(Users);

				console.log(Users);

	    }}
	xhttp.open("GET", "http://www.angelito.com.br/webchat/users");
	xhttp.send();

	
}
