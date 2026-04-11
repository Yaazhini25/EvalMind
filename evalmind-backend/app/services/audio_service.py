import whisper
import pyttsx3
import uuid
import os

UPLOAD_FOLDER = "audio"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

model = whisper.load_model("base")

def transcribe_audio(file_path: str) -> str:
    result = model.transcribe(file_path)
    return result["text"]

def speak_question(text: str) -> str:
    output_file = f"audio/question_{uuid.uuid4()}.wav"
    engine = pyttsx3.init()
    engine.setProperty("rate", 150)
    engine.setProperty("volume", 1.0)
    engine.save_to_file(text, output_file)
    engine.runAndWait()
    return output_file