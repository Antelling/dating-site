from django.shortcuts import render
import math
from django.http import HttpResponse
from django.contrib.auth.models import User
from authentication.models import UserProfile


def reverse(num):
    return 6 - num


def extract(num):
    return [num <= 0, abs(num)]


# Create your views here.
def five_parts(request):
    user = User.objects.get(username=request.user.username)
    profile = UserProfile.objects.get(user=user)
    smap = [
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
    if request.POST.__contains__("data"):
        for i, question in enumerate(request.POST.get("data")):
            negative, key = extract(smap[i])
            if negative:
                question = reverse(int(question))
            key = map[str(key)]
            total[key]+=negative
        profile.has_taken_test = True
        profile.save()
        return HttpResponse(str(total))
    else:
        return HttpResponse(request.user.username)
