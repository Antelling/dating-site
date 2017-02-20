from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^rest-auth/', include('authentication.urls')),
    url(r'^rest-auth/registration', include('rest_auth.registration.urls')),
    url(r'^personality_test/', include('personality_test.urls')),
    url(r'^', include('static_pages.urls')),
]

