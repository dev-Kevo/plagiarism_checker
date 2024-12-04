from django.db import models

class Submission(models.Model):
    text = models.TextField()
    similarity_score = models.FloatField(null=True, blank=True)  # Store plagiarism percentage
    matched_sources = models.JSONField(null=True, blank=True)   # List of matched sources
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Submission {self.id}"
