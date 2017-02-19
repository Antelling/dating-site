from django.shortcuts import render
from django.contrib.staticfiles.views import serve

# Create your views here.
def index(request):
    print(request.user)
    print(request.user.is_authenticated)
    print(request.user.username)
    if request.user.is_authenticated():
        return serve(request, "dashboard.html")
    else:
        return serve(request, "index.html")
