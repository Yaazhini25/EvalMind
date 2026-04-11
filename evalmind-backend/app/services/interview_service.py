from uuid import uuid4
from datetime import datetime
from app.data.question_bank import QUESTION_BANK
from app.store.session_store import sessions

def create_interview_session(level: str):
    level = level.lower()

    if level not in QUESTION_BANK:
        return None

    session_id = str(uuid4())
    first_question = QUESTION_BANK[level][0]

    session = {
        "session_id": session_id,
        "level": level,
        "status": "running",
        "start_time": str(datetime.now()),
        "time_left": 300,
        "current_question_index": 0,
        "responses": []
    }

    sessions[session_id] = session

    return {
        "session_id": session_id,
        "status": "running",
        "time_left": 300,
        "question": {
            "question_id": first_question["question_id"],
            "question_text": first_question["question_text"]
        }
    }
def submit_answer(session_id: str, question_id: int, user_answer: str):
    if session_id not in sessions:
        return {"error": "Invalid session ID"}

    session = sessions[session_id]
    if session["status"] != "running":
        return {"error": f"Interview is currently {session['status']}. Cannot submit answer."}
    level = session["level"]
    current_index = session["current_question_index"]
    questions = QUESTION_BANK[level]

    if current_index >= len(questions):
        return {"message": "Interview already completed"}

    current_question = questions[current_index]

    # Store answer in order
    session["responses"].append({
        "question_id": current_question["question_id"],
        "question_text": current_question["question_text"],
        "expected_answer": current_question["expected_answer"],
        "user_answer": user_answer,
        "timestamp": str(datetime.now())
    })

    # Move to next question
    session["current_question_index"] += 1

    # Check if more questions exist
    if session["current_question_index"] < len(questions):
        next_question = questions[session["current_question_index"]]

        return {
            "status": "running",
            "time_left": session["time_left"],
            "question": {
                "question_id": next_question["question_id"],
                "question_text": next_question["question_text"]
            }
        }
    else:
        session["status"] = "completed"
        return {
            "status": "completed",
            "message": "Interview completed successfully",
            "responses": session["responses"]
        }
def get_session_data(session_id: str):
    if session_id not in sessions:
        return {"error": "Session not found"}

    return sessions[session_id]

def pause_interview(session_id: str):
    if session_id not in sessions:
        return {"error": "Session not found"}

    session = sessions[session_id]

    if session["status"] != "running":
        return {"error": f"Interview cannot be paused because it is currently {session['status']}"}

    session["status"] = "paused"

    return {
        "message": "Interview paused successfully",
        "session_id": session_id,
        "status": session["status"]
    }

def resume_interview(session_id: str):
    if session_id not in sessions:
        return {"error": "Session not found"}

    session = sessions[session_id]

    if session["status"] != "paused":
        return {"error": f"Interview cannot be resumed because it is currently {session['status']}"}

    session["status"] = "running"

    return {
        "message": "Interview resumed successfully",
        "session_id": session_id,
        "status": session["status"]
    }

def stop_interview(session_id: str):
    if session_id not in sessions:
        return {"error": "Session not found"}

    session = sessions[session_id]

    if session["status"] in ["completed", "stopped"]:
        return {"error": f"Interview is already {session['status']}"}

    session["status"] = "stopped"

    return {
        "message": "Interview stopped successfully",
        "session_id": session_id,
        "status": session["status"],
        "responses": session["responses"]
    }

def get_interview_result(session_id: str):
    if session_id not in sessions:
        return {"error": "Interview session not found."}

    session = sessions[session_id]
    level = session["level"]
    all_questions = QUESTION_BANK[level]
    responses = session["responses"]

    return {
        "session_id": session["session_id"],
        "level": session["level"],
        "status": session["status"],
        "start_time": session["start_time"],
        "total_questions": len(all_questions),
        "answered_questions": len(responses),
        "current_question_index": session["current_question_index"],
        "questions_and_answers": responses
    }