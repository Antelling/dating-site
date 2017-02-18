from django.shortcuts import render
import math
from django.http import HttpResponse


def reverse(num):
    return 6 - num


def extract(num):
    return [False if num > 0 else True, num if num > 0 else -1 * num]


# Create your views here.
def five_parts(request):
    map = [
        1, -2, 3, -4, 5,
        -1, 2, -3, 4, -5,
        1, -2, 3, -4, 5,
        -1, 2, -3, 4, -5,
        1, -2, 3, -4, 5,
        -1, 2, -3, 4, -5,
        1, -2, 3, -4, 5,
        -1, 2, -3, -4, 5, #and the pattern dies
        1, 2, 3, -4, 5,
        -1, 2, 3, -4, 5
    ]
    map = {
        "1": "extraversion",
        "2": "agreeableness",
        "3": "conscientiousness",
        "4": "emotional_stability",
        "5": "imagination"
    }
    total = {
        "extraversion": 0,
        "agreeableness": 0,
        "conscientiousness": 0,
        "emotional_stability": 0,
        "imagination": 0
    }
    if "response" in request.POST:
        for i, question in enumerate(request.POST.response):
            negative, key = extract(map[i])
            if negative:
                question = reverse(question)
            key = map[key]
            total[key] += question
        return HttpResponse(str(total))
    else:
        return HttpResponse(request.user.username)
