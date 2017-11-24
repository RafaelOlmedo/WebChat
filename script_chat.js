var connected_user = localStorage.getItem("user");

document.getElementById("connected_user").innerHTML = connected_user;

/* INÍCIO - Recupera usuários conectados */

// Valida se usuário já está conectado.			
var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
// 4 DONE | 200 OK
if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

	// Label dos usuários conectados.
	var labelAllUsers = document.getElementById("all_users");

	// Resultado formatado para o JSON.
	var allUsersJson = JSON.parse(this.responseText);

	// Coloca a mensagem inicial.
	labelAllUsers.innerHTML = "Usuários conectados: ";

	for (var i = 0; i < allUsersJson.length; i++) {
		if ( i == 0) {
			labelAllUsers.innerHTML += allUsersJson[i];
		}
		else {
			labelAllUsers.innerHTML += " | " + allUsersJson[i];
		}
	}

}}
xhttp.open("GET", "http://www.angelito.com.br/webchat/users");
xhttp.send();

/* FIM - Recupera usuários conectados */

getMessages();

// Recupera as mensagens dos usuários.
function getMessages() {

	// Usuário que está atualmente conectado.
	// PQ ESSA MERDA NÃO DEU CERTO??????
	var user = document.getElementById("connected_user").innerHTML;

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
	// 4 DONE | 200 OK
	if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

		// Retorno das mensagens formatado em JSON.
		var messagesJSON = JSON.parse(this.responseText);

		// div principal das mensagens.
		var mainDiv = document.getElementById("messages");

		for (var i = 0; i < messagesJSON.length; i++) {
			// Cria div que irá receber uma mensagem.
			var divMessage = document.createElement("div"); 

			divMessage.innerHTML = messagesJSON[i].user;

			mainDiv.appendChild(divMessage);
		}

	}}
	xhttp.open("GET", "http://www.angelito.com.br/webchat/messages?nickname=" + connected_user);
	xhttp.send();


}