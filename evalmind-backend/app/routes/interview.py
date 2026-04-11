from fastapi import APIRouter
from app.models.interview_models import StartInterviewRequest, SubmitAnswerRequest, SessionControlRequest, EvaluateRequest
from app.services.interview_service import create_interview_session, submit_answer, get_session_data, pause_interview, resume_interview, stop_interview, get_interview_result
from app.evaluation.evaluator import evaluate
from fastapi import APIRouter, UploadFile, File
from fastapi.responses import FileResponse
from app.services.audio_service import transcribe_audio, speak_question
import os
import shutil
router = APIRouter()
@router.post("/start-interview")
def start_interview(data: StartInterviewRequest):
    result = create_interview_session(data.level)

    if result is None:
        return {"error": "Invalid level selected"}

    return result

@router.post("/submit-answer")
def submit_user_answer(data: SubmitAnswerRequest):
    return submit_answer(data.session_id, data.question_id, data.user_answer)

@router.get("/debug-session/{session_id}")
def debug_session(session_id: str):
    return get_session_data(session_id)

@router.post("/pause-interview")
def pause_current_interview(data: SessionControlRequest):
    return pause_interview(data.session_id)

@router.post("/resume-interview")
def resume_current_interview(data: SessionControlRequest): 
    return resume_interview(data.session_id)

@router.post("/stop-interview")
def stop_current_interview(data: SessionControlRequest):
    return stop_interview(data.session_id)

@router.get("/get-interview-result/{session_id}")
def fetch_interview_result(session_id: str):
    return get_interview_result(session_id)

@router.post("/evaluate")
def evaluate_interview(data: EvaluateRequest):
    return evaluate(data.responses)

@router.post("/transcribe")
async def transcribe_audio_route(file: UploadFile = File(...)):
    file_path = f"audio/{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    text = transcribe_audio(file_path)
    os.remove(file_path)
    return {"transcription": text}

@router.get("/speak")
async def speak_question_route(text: str):
    output_file = speak_question(text)
    return FileResponse(output_file, media_type="audio/wav")