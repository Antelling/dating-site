from django.contrib.staticfiles.views import serve
from django.views.decorators.csrf import ensure_csrf_cookie


# Create your views here.
@ensure_csrf_cookie
def index(request):
    if request.user.is_authenticated():
        return serve(request, "dashboard.html")
    else:
        return serve(request, "index.html")
