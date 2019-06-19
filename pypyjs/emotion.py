import paralleldots
import requests
import json
import os

#when sending a image file

api_key   = "FbDvOlRGrqHYQWWwo97b4D3zl0qAVIxTT1QZ4JLnhYo"

# path = "./images/happy.jpeg"
path = "../../emoji.png"

f = open("../js/emotion.js", "a")
pythonDictionary = paralleldots.facial_emotion( path )
# dictionaryToJson = json.dumps(pythonDictionary)

item = pythonDictionary['facial_emotion']
ac = max(item,key=lambda item:item['score']) #compare based on EACH items 'score' field
if (ac['tag'] == "Happy" or ac['tag'] == "Surprise"):
    message = """
    document.getElementById('happy1').style.display = 'block';
    document.getElementById('sad1').style.display = 'none';
    document.getElementById('neutral1').style.display = 'none'; 
    """
    f.write(message)
    f.close()
elif (ac['tag'] == "Sad" or ac['tag'] == "Fear" or ac['tag'] == "Disgust" or ac['tag'] == "Angry"):
    message = """
    document.getElementById('happy1').style.display = 'none';
    document.getElementById('sad1').style.display = 'block';
    document.getElementById('neutral1').style.display = 'none';
    """
    f.write(message)
    f.close()
else:
    message = """
    document.getElementById('happy1').style.display = 'none';
    document.getElementById('sad1').style.display = 'none';
    document.getElementById('neutral1').style.display = 'block';
    """
    f.write(message)
    f.close()

# f.write(paralleldots.facial_emotion( path ))
# print( paralleldots.facial_emotion( path ) )

facial_emotion = requests.post( "https://apis.paralleldots.com/v3/facial_emotion", params={ "api_key": api_key } ,files={"file": open("../../emoji.png","rb")}).text

if os.path.exists("../../emoji.png"):
  os.remove("../../emoji.png")
else:
  print("The file does not exist")
