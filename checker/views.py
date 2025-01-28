from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404
from .forms import SubmissionForm
from .models import Submission
from .tasks import check_plagiarism

def submit_text(request):
    if request.method == "POST":
        form = SubmissionForm(request.POST)
        if form.is_valid():
            submission = form.save()
            # Trigger Celery task
            check_plagiarism.delay(submission.id)
            return redirect("submission_result", pk=submission.id)
    else:
        form = SubmissionForm()

    context = {
        "form": form
    }

    return render(request, "checker/index.html", context)


def submission_result(request, pk):
    submission = get_object_or_404(Submission, pk=pk)

    context = {
        "submission": submission
    }

    return render(request, "checker/submission_result.html", context)

def text_submission(request):
    form = SubmissionForm()

    context = {
        "form": form
    }

    return render(request, 'checker/partials/text_upload.html', context)

def doc_upload(request):
    form = SubmissionForm()

    context = {
        "form": form
    }
    return render(request, 'checker/partials/doc_upload.html', context)