from app.evaluation.similarity import compute_similarity
from app.evaluation.keyword_checker import keyword_score
from app.evaluation.report_generator import generate_report
def evaluate(responses):
    # Edge case: no answers
    if not responses or len(responses) == 0:
        return {
            "overall_score": 0,
            "details": [],
            "strengths": [],
            "weaknesses": [],
            "suggestions": ["No answers provided"]
        }

    results = []
    total_score = 0

    for r in responses:
        expected = r.get("expected", "")
        user_answer = r.get("user_answer", "")

        sim = compute_similarity(expected, user_answer)
        key = keyword_score(expected, user_answer)

        # Weighted scoring
        final_score = (0.7 * sim) + (0.3 * key)

        result = {
            "question": r.get("question", ""),
            "semantic_score": sim,
            "keyword_score": key,
            "score": round(final_score, 2)
        }

        results.append(result)
        total_score += final_score

    overall_score = round(total_score / len(responses), 2)

    report = generate_report(results)

    return {
        "overall_score": overall_score,
        "details": results,
        "strengths": report["strengths"],
        "weaknesses": report["weaknesses"],
        "suggestions": report["suggestions"]
    }