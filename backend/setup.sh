#!/usr/bin/env bash
touch DEV;
echo "fjdkfjsdhkdfj&*^&^*)()" > SECRET;

apt-get install python3-pip python-dev;
pip3 install -r requirements.txt;

cd ~
git clone https://www.github.com/datalogai/recurrentshop.git
cd recurrentshop
python3 setup.py install

sudo pip3 install git+https://github.com/farizrahman4u/seq2seq.git

echo "done"