async function send() {

try {

const text =
document.getElementById("msg").value;

const payload = { message: text };

if (window.currentImageBase64) {
    payload.imageBase64 = window.currentImageBase64;
    payload.mimeType = window.currentImageMimeType;
}

const response =
await fetch(
"http://localhost:3000/chat",
{
method: "POST",

headers: {
"Content-Type":
"application/json"
},

body: JSON.stringify(payload)

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

speakText(data.reply);

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

// ===== VOICE INTEGRATION (STT & TTS) =====

// 1. Text to Speech
function speakText(text) {
    if (!('speechSynthesis' in window)) {
        console.warn("Text-to-Speech not supported in this browser.");
        return;
    }
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
}

// 2. Speech to Text
function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Speech Recognition is not supported in your browser. Please try Google Chrome.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const btn = document.getElementById("speak-btn");
    btn.classList.add("recording");
    btn.innerText = "🛑 Listening...";

    recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById("msg").value = transcript;
        
        // Auto-send the recognized text
        send();
    };

    recognition.onspeechend = () => {
        recognition.stop();
    };

    recognition.onend = () => {
        btn.classList.remove("recording");
        btn.innerText = "🎤 Speak";
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        btn.classList.remove("recording");
        btn.innerText = "🎤 Speak";
    };
}

// ===== IMAGE INTEGRATION =====

document.getElementById('image-input').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) {
        window.currentImageBase64 = null;
        window.currentImageMimeType = null;
        document.getElementById('image-preview').style.display = 'none';
        return;
    }

    window.currentImageMimeType = file.type;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const result = event.target.result;
        document.getElementById('image-preview').src = result;
        document.getElementById('image-preview').style.display = 'block';
        
        // Extract base64 without the data URI prefix
        window.currentImageBase64 = result.split(',')[1];
    };
    reader.readAsDataURL(file);
});