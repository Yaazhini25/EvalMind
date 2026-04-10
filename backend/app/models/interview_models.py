from pydantic import BaseModel
class StartInterviewRequest(BaseModel):
    level: str

class SubmitAnswerRequest(BaseModel):
    session_id: str
    question_id: int
    user_answer: str

class SessionControlRequest(BaseModel):
    session_id: str