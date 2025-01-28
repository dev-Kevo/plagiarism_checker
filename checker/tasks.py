from sentence_transformers import SentenceTransformer, util
from celery import shared_task
from .models import Submission

@shared_task
def check_plagiarism(submission_id):
    # Load the SentenceTransformer model
    model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

    # Fetch the submission object
    submission = Submission.objects.get(id=submission_id)
    input_text = submission.text

    # Example sources (replace with your own source database or scraped content)
    sources = [
        "Artificial intelligence is the simulation of human intelligence in machines that are programmed to think like humans and mimic their actions.",
        "Machine learning is a subset of artificial intelligence that involves teaching machines to learn and make decisions without explicit programming.",
        "Natural language processing allows computers to understand and process human languages, enabling human-computer interaction.",
        "The quick brown fox jumps over the lazy dog, a sentence often used to test typewriters and fonts.",
        "Python is a high-level programming language that emphasizes code readability and allows developers to express concepts in fewer lines of code.",
        "Django is a high-level Python web framework that promotes rapid development and clean, pragmatic design.",
        "Plagiarism is the act of using someone else's work or ideas without proper acknowledgment.",
        "Data science is an interdisciplinary field that uses scientific methods, processes, algorithms, and systems to extract knowledge and insights from structured and unstructured data.",
        "Blockchain technology enables secure and transparent transactions, creating a decentralized digital ledger.",
        "The internet of things connects devices, allowing them to communicate and exchange data over the internet without human intervention."
    ]

    # Compute embeddings
    input_embedding = model.encode(input_text, convert_to_tensor=True)
    source_embeddings = model.encode(sources, convert_to_tensor=True)

    # Calculate cosine similarity between input text and all sources
    similarities = util.pytorch_cos_sim(input_embedding, source_embeddings)

    # Prepare the results
    results = [
        {"source": sources[i], "score": float(similarities[0][i])}
        for i in range(len(sources))
    ]

    # Save the highest similarity score and matched sources
    submission.similarity_score = max([r["score"] for r in results])
    submission.matched_sources = results
    submission.save()
