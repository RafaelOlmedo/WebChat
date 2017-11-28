function faz_algo() {
	alert('Oi');
}

// Recupera o usuário que está logando.
function getConnectingUser() {

	// Check browser support
	if (typeof(Storage) !== "undefined") {

		// usuário informado no input.
		var user = document.getElementById("user").value;

		// Validar se usuário foi preenchido.

		if (user == "") {
			alert('Coloca informação ae palhaço!!')
		}
		else {

			// Valida se usuário já está conectado.			
			var xhttp = new XMLHttpRequest();

			xhttp.onreadystatechange = function() {
			// 4 DONE | 200 OK
			if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

		    	if (this.responseText == "Usuário desconectado!") {
		    		return false;
		    	}
		    	else {
		    		
		    		// Armazena no WebStorage o usuário informado.
		    		localStorage.setItem("user", document.getElementById("user").value);

		    		window.location.href = 'chat.html';
		    	}

		    }}
			xhttp.open("GET", "http://www.angelito.com.br/webchat/messages?nickname=" + user);
			xhttp.send();



			// if (valid_if_conneted_user(user) == true) {
			// 	// Armazena o usuário em uma WebStorage.
		 //    	localStorage.setItem("user", document.getElementById("user").value);

		 //   		// Alert apenas de teste.
		 //    	alert(localStorage.getItem("user"));
			// }
			// else{
			// 	alert('Sai daqui!');
			// }



			
		}
		
	} 
	else {
	    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
	}
}

// Abre o HTML do chat.
function open_chat_page() {

	getConnectingUser();

	// window.location.href = 'chat.html';

	 // Alert apenas de teste.
	 //document.getElementById("connected_user").innerHTML = "Rafael";
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

function valid_if_conneted_user(user) {
		
	alert('http://www.angelito.com.br/webchat/messages?nickname=' + user);
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
	// 4 DONE | 200 OK
	if (this.readyState == 4 && this.status == 200) {

    	if (this.responseText == "Usuário desconectado!") {
    		return false;
    	}
    	else {
    		return true;
    	}

    }}
	xhttp.open("GET", "http://www.angelito.com.br/webchat/messages?nickname=" + user);
	xhttp.send();
}

function deleteAllUsers() {

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
	// 4 DONE | 200 OK
	if (this.readyState == 4 && this.status == 200) {

    	if (this.responseText == "Usuários desconectados!") {
    		alert("Todos os usuários foram desconectados!")
    	}
    	else {
    		alert("Ocorreu um erro ao desconectar os usuários.")
    		
    	}

    }}
	xhttp.open("GET", "http://www.angelito.com.br/webchat/reset_users");
	xhttp.send();
}

function deleteAllMessages() {

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
	// 4 DONE | 200 OK
	if (this.readyState == 4 && this.status == 200) {

    	if (this.responseText == "Mensagens excluídas!") {
    		alert("Todas as mensagens foram excluídas!")
    	}
    	else {
    		alert("Ocorreu um erro ao excluir todas as mensagens.")
    		
    	}

    }}
	xhttp.open("GET", "http://www.angelito.com.br/webchat/reset_messages");
	xhttp.send();
}