function faz_algo() {
	alert('Oi');
}

function exibe_users() {
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
