from django.urls import path
from .views import submit_text, submission_result, text_submission, doc_upload

urlpatterns = [
    path('', submit_text, name='checker-submit-text'),
    path('results/<int:pk>', submission_result, name='submission_result'),

    path('text/', text_submission, name='text_submission'),
    path('doc/', doc_upload, name='doc_submission'),
]

# Plagiarism occurs when a person uses someone else's work, ideas, or expressions without giving proper credit. It's a serious ethical violation and is common in academic and professional environments.