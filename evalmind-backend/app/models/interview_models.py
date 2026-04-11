from pydantic import BaseModel
from typing import List, Dict, Any

class StartInterviewRequest(BaseModel):
    level: str

class SubmitAnswerRequest(BaseModel):
    session_id: str
    question_id: int
    user_answer: str

class SessionControlRequest(BaseModel):
    session_id: str

class EvaluateRequest(BaseModel):
    responses: List[Dict[str, Any]]