from django.contrib.staticfiles.views import serve


# Create your views here.
def index(request):
    if request.user.is_authenticated():
        return serve(request, "dashboard.html")
    else:
        return serve(request, "index.html")
