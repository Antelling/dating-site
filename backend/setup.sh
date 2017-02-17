#!/usr/bin/env bash
touch DEV;
echo "fjdkfjsdhkdfj&*^&^*)()" > SECRET;

apt-get install python3-pip python-dev;
pip3 install -r requirements.txt;

cd ~
git clone https://www.github.com/datalogai/recurrentshop.git
cd recurrentshop
python3 setup.py install

cd ~/api/backend

sudo pip3 install git+https://github.com/farizrahman4u/seq2seq.git

python3 manage.py migrate

python3 manage.py runserver 0.0.0.0:80