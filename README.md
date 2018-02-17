# Satlab_serialDeamon

Inicjalizacja czystego Oniona:
1) opkg update
2) opkg install git git-http ca-bundle
3) opkg install nodejs
4) opkg install npm
5) git clone https://github.com/stratus9/Satlab_serialDeamon.git
6) cd Satlab_serialDeamon
7) npm init -y
8) npm install github:sdesalas/node-serialport-omega2
9) npm install crc binary-parser


# Help sites

Biblioteka CRC: https://github.com/alexgorbatchev/node-crc
Parser binarny: https://github.com/keichi/binary-parser
Customowy parser serial: https://stackoverflow.com/questions/44820013/custom-parser-for-node-serialport
