from sentence_transformers import SentenceTransformer, util

# Load model only once (important)
model = SentenceTransformer('all-MiniLM-L6-v2')

def compute_similarity(expected, user_answer):
    if not expected or not user_answer:
        return 0.0

    emb1 = model.encode(expected, convert_to_tensor=True)
    emb2 = model.encode(user_answer, convert_to_tensor=True)

    score = util.cos_sim(emb1, emb2).item()
    return round(score * 100, 2)