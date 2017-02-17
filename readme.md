Okay so there are three top level folders:

###Flask
is a simple webapp that shows recommendations from the different algorithms I've implemented. I use it for testing new algorithms,
since its easier to iterate in flask then django.

###Backend
is a django REST api for the front end.

###Frontend 
holds the VueJS code

#TODO:

- flask (core algorithm)
  - experiment with attention seq2seq model
  - figure out why the numbers validate gives change slightly each time, this should be deterministic
  - get way, way more data
    - experiment with married couples
- backend
  - auth
    - login
    - logout
    - signup
      - is_username_taken api
  - initializing
    - get their personality
      - will probably have to implement 5 parts personality test, to be proffesional. That's easy, theres a paper explaining it.
    - get their zip
      - we probably want like a 30 mile max or something
    - get their photos
  - messaging
    - django channels for websockets
- frontend
  - auth pages
  - index
  - legal, contact
  - dashboard page
  - messaging page
  
     
