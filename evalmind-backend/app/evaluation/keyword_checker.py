import re

def keyword_score(expected, user_answer):
    if not expected or not user_answer:
        return 0.0

    expected_words = set(re.findall(r'\w+', expected.lower()))
    user_words = set(re.findall(r'\w+', user_answer.lower()))

    if len(expected_words) == 0:
        return 0.0

    common = expected_words.intersection(user_words)

    score = (len(common) / len(expected_words)) * 100
    return round(score, 2)