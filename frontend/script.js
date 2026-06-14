async function send() {

try {

const text =
document.getElementById("msg").value;

const response =
await fetch(
"http://localhost:3000/chat",
{
method: "POST",

headers: {
"Content-Type":
"application/json"
},

body: JSON.stringify({
message: text
})

}
);

const data =
await response.json();

document
.getElementById(
"output"
)
.innerText =
data.reply;

}

catch(error){

console.log(error);

document
.getElementById(
"output"
)
.innerText =
"Connection Error";

}

}