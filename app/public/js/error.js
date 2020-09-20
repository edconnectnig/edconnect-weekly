var cont = document.createElement("div");
cont.className = 'container';
cont.style.width = '900px';
cont.style.margin = 'auto';

var roww = document.createElement("div");
roww.className = 'row';

var coll = document.createElement("div");
coll.className = 'col';

var alertt = document.createElement("div");
alertt.className = 'alert'
alertt.className += " alert-danger";
alertt.role = "alert";


err.className = 'alert alert-danger';

err.role = 'alert';

var errP1 = document.createElement('p');

errP1.textContent = 'A user with specified email address already exits';

document.alertt.appendChild(errP1);

var errP2 = document.createElement('p');

errP2.textContent = 'A user with specified matric number already exits';

document.alertt.appendChild(errP2);

document.getElementsByClassName('coll[0]').appendChild(alertt);

document.getElementsByClassName('row[0]').appendChild(coll);

document.getElementsByClassName('container[0]').appendChild(roww);

document.getElementById("alertFail").appendChild(cont);

/*
<form onsubmit="confirmInput()" action="https://www.w3schools.com/">
  Enter your name: <input id="fname" type="text" size="20">
  <input type="submit">
</form>
*/

<script type="text/javascript" language="javascript">
function redirect() {
  window.location.href="login.php"
}
</script>
/*
<form  name="form1" id="form1" method="post">  
    <input type="submit" class="button4" name="order" 
        id="order" value="Place Order" onclick="redirect();">
</form>
*/

// Using the async modifier allows for the use of the await keyword when executing the asynchronous Fetch request.
//Asynchronous means you can't use an element while it's not ready.

//Use the response.json() to actually access the data as opposed to accessing directly with response.data 

//Let me know if you need any help with that 

//Regards 

//-Ade

// Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//A Function to Get a Cookie

//Then, we create a function that returns the value of a specified cookie:
//Example
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/*
Function explained:

Take the cookiename as parameter (cname).

Create a variable (name) with the text to search for (cname + "=").

Decode the cookie string, to handle cookies with special characters, e.g. '$'

Split document.cookie on semicolons into an array called ca (ca = decodedCookie.split(';')).

Loop through the ca array (i = 0; i < ca.length; i++), and read out each value c = ca[i]).

If the cookie is found (c.indexOf(name) == 0), return the value of the cookie (c.substring(name.length, c.length).

If the cookie is not found, return "".
*/