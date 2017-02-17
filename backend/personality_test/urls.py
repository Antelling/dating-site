from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.five_parts, name='5parts personality test'),
]
