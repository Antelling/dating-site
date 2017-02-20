from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/auth/', include('authentication.urls')),
    url(r'^api/personality_test/', include('personality_test.urls')),
    url(r'^', include('static_pages.urls')),
]

