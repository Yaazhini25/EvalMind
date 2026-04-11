def generate_report(results):
    strengths = []
    weaknesses = []
    suggestions = []

    for r in results:
        if r["score"] >= 75:
            strengths.append(r["question"])
        else:
            weaknesses.append(r["question"])

    if weaknesses:
        suggestions.append("Revise core concepts of weak areas")
        suggestions.append("Try to include more technical keywords")
        suggestions.append("Practice explaining concepts clearly")

    if not weaknesses:
        suggestions.append("Great performance! Keep it up!")

    return {
        "strengths": strengths,
        "weaknesses": weaknesses,
        "suggestions": suggestions
    }