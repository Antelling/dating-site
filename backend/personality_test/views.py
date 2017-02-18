from django.shortcuts import render

from django.http import HttpResponse
# Create your views here.
def five_parts(request):
    return HttpResponse(request.user.username)