// Realiza as 
function loadPage() {
	
	var connected_user = localStorage.getItem("user");

	document.getElementById("connected_user").innerHTML = connected_user;

	/*
		Funções que precisam ser executadas ao abrir a página.
	*/

	getConnectedUsers();
	getMessages();

}

/*
	Funções que precisam ser executadas para manter a página atualizada.
*/

setInterval(getConnectedUsers, 50000);
setInterval(getMessages, 30000);

/* INÍCIO - Recupera usuários conectados */

function getConnectedUsers() {
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

}

/* FIM - Recupera usuários conectados */


// Recupera as mensagens dos usuários.
function getMessages() {

	// Usuário que está atualmente conectado.
	// PQ ESSA MERDA NÃO DEU CERTO??????
	 var user = localStorage.getItem("user");
	//var user = connected_user;

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
	// 4 DONE | 200 OK
	if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

		// Retorno das mensagens formatado em JSON.
		var messagesJSON = JSON.parse(this.responseText);

		// div principal das mensagens.
		var mainDiv = document.getElementById("messages");

		// Limpa para não repetir as mensagems.
		mainDiv.innerHTML = "";

		for (var i = 0; i < messagesJSON.length; i++) {
			// Cria div que irá receber uma mensagem.
			var divMessage = document.createElement("div"); 

			divMessage.id = "message";

			// span do usuário / data.
			var spanUser = document.createElement("span");

			spanUser.id = "span_user";

			// span da mensagem.
			var spanMessage = document.createElement("span");

			spanMessage.id = "span_message";			

			// SPAN - DATA + USER.
			spanUser.innerHTML = "[" +  messagesJSON[i].datetime + "] " + messagesJSON[i].user + " diz: <br>";

			// SPAN - MESSAGE.
			spanMessage.innerHTML = messagesJSON[i].textmsg;

			// Adiciona os span na div da mensagem.
			divMessage.appendChild(spanUser);
			divMessage.appendChild(spanMessage);

			// Adiciona a div de mensagem na div geral.
			mainDiv.appendChild(divMessage);
		}

	}}
	xhttp.open("GET", "http://www.angelito.com.br/webchat/messages?nickname=" + user);
	xhttp.send();

}

// Salva a mensage.
function saveMessage() {
	// Valida se usuário já está conectado.			
	var xhttp = new XMLHttpRequest();

	var user = document.getElementById("connected_user").innerHTML;

	var message = document.getElementById("input_message").value;

	xhttp.onreadystatechange = function() {
	// 4 DONE | 200 OK
	if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

		// Limpa a mensagem digitada pois já salvou.
		document.getElementById("input_message").value = "";

		getMessages();
		

	}}
	xhttp.open("POST", "http://www.angelito.com.br/webchat/send?nickname=" + user + "&textmsg=" + message);
	xhttp.send();
}
