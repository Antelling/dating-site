#!/usr/bin/env bash
touch DEV;
cat "fjdkfjsdhkdfj&*^&^*)()" > SECRET;

sudo apt-get install python-pip python-dev;
pip install -r requirements.txt;

cd ~
git clone https://www.github.com/datalogai/recurrentshop.git
cd recurrentshop
python setup.py install

sudo pip install git+https://github.com/farizrahman4u/seq2seq.git

echo "done"