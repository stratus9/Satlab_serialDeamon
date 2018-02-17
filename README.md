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

## Disable debug on Serial port 0
https://www.hackster.io/sidwarkd/free-up-the-serial-port-on-the-onion-omega-7b3849

## Help sites

Biblioteka CRC: https://github.com/alexgorbatchev/node-crc

Parser binarny: https://github.com/keichi/binary-parser

Customowy parser serial: https://stackoverflow.com/questions/44820013/custom-parser-for-node-serialport

## Node benchmark

```
{
    var t1 = new Date();
    var arr = new CBuf(10000);

    for (var j = 0; j < 1000; j++) {
        for (var i = 0; i < 10000; i++) {
            arr.push(i);
        }
        for (var i = 0; i < 10000; i++) {
            if(!arr.empty())
                arr.pop();
        }
    }
    var t2 = new Date();

    console.log("cbuf time="+(t2 - t1));
}
```
