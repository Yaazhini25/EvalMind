from new.evaluation.evaluator import evaluate

responses = [
    {
        "question": "What is Python?",
        "expected": "Python is a programming language",
        "user_answer": "Python is used for coding and development"
    },
    {
        "question": "What is OOP?",
        "expected": "Object oriented programming",
        "user_answer": "It is a concept using classes and objects"
    }
]

report = evaluate(responses)

print("\n===== FINAL REPORT =====")
print(report)