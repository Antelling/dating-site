from django.shortcuts import render
from django.contrib.staticfiles.views import serve
from django.http import HttpResponse

import json


# Create your views here.
def index(request):
    if request.user.is_authenticated():
        return serve(request, "dashboard.html")
    else:
        return serve(request, "index.html")


def info(request):
    return HttpResponse(json.dumps({
        "is_staff": request.user.is_staff,
        "is_superuser": request.user.is_superuser,
        "username": request.user.username,
        "is_active": request.user.is_active,
        "email": request.user.email
    }))
