from fastapi import APIRouter
from app.models.interview_models import StartInterviewRequest, SubmitAnswerRequest, SessionControlRequest
from app.services.interview_service import create_interview_session, submit_answer, get_session_data, pause_interview, resume_interview, stop_interview, get_interview_result

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