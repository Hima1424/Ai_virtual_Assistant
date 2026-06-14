text=input().lower()

responses={

"hello":"Hello! How can I help?",

"python":"Python is used for AI and development",

"who are you":
"I am an AI Virtual Assistant"

}

print(
responses.get(
text,
"Sorry, I didn't understand"
)
)