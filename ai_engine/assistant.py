import sys

text=
sys.argv[1].lower()

responses={

"hello":
"Hello User",

"python":
"Python is powerful",

"who are you":
"I am AI Virtual Assistant"

}

print(

responses.get(

text,

"Sorry I don't understand"

)

)