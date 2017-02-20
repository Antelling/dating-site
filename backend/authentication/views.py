from django.shortcuts import *
from django.contrib.auth import *
from django.contrib.auth import models
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseForbidden
from .models import UserProfile
import json


def logout_user(request):
    if request.user.is_authenticated():
        logout(request)
    return HttpResponseRedirect('/')


def signup_user(request):
    if request.user.is_authenticated():
        # they did something weird
        return HttpResponseRedirect('/')

    if request.method == "GET":
        return render(request, "authentication/signup.html", {'user': False})

    elif request.method == "POST":
        if len(request.POST.get("password")) < 6:
            return HttpResponseForbidden("password must be at least 6 characters")

        models.User.objects.create_user(
            request.POST.get("username"),
            request.POST.get("email"),
            request.POST.get("password")
        )
        userprofile = UserProfile(
            has_viewed_tutorial=False,
            user=models.User.objects.get(username=request.POST.get("username")),
            paid_user=False,
            location=request.POST.get("location"),
            first_name=request.POST.get("first_name"),
            last_name=request.POST.get("last_name"),
            age=request.POST.get("age"),
            has_taken_test=False
        )
        userprofile.save()

        user = authenticate(username=request.POST.get("username"), password=request.POST.get("password"))

        if user is not None:
            login(request, user)
            print("logged in")
        else:
            return HttpResponse("error")
        print('added user')
        return HttpResponseRedirect("/")


def login_user(request):
    if request.user.is_authenticated():
        return HttpResponseRedirect('/')

    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return HttpResponseRedirect('/')
        else:
            return render(request, 'authentication/login.html', {'user': False, 'error': True})
    else:
        if request.user.is_authenticated():
            return HttpResponseRedirect('/')
        return render(request, 'authentication/login.html', {'user': False})


def is_username_available(request, url):
    try:
        _ = models.User.objects.get(username__iexact=url) #not case sensitive
        return HttpResponse('false')
    except models.User.DoesNotExist:
        return HttpResponse('true')


def user_info(request):
    owner = models.User.objects.get(username=request.user.username)
    profile = UserProfile.objects.get(user=owner)
    return HttpResponse(json.dumps({
        "is_staff": request.user.is_staff,
        "is_superuser": request.user.is_superuser,
        "username": request.user.username,
        "is_active": request.user.is_active,
        "email": request.user.email,
        "location": profile.location,
        "first_name": profile.first_name,
        "last_name": profile.last_name,
        "has_viewed_tutorial": profile.has_viewed_tutorial,
        "age": profile.age,
        "paid_user": profile.paid_user,
        "has_taken_test": profile.has_taken_test
    }))