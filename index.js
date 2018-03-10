var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

//------------------- Zmienne globalne -------------------------------
var NewFrameReceived = false;
var waitingForFrame = false;
//var seriaRxBuffer = new Buffer();

//------------------- Obs³uga portu szeregowego --------------------------------
var port = new SerialPort('/dev/ttyS1', {
	//parser: serialport.parsers.readline('\n'),
	//parser: serialport.parsers.byteDelimiter([0xAA, 0xAA]),
	parser: serialport.parsers.customFrame([0xAA, 0xAA], 17),
	baudrate: 9600,
	bufferSize: 128
});

port.on('open', function () {
  port.write('main screen turn on', function(err, bytesWritten) {
    if (err) {
      return console.log('Error: ', err.message);
    }
    console.log(bytesWritten, 'bytes written');
  });
});

//Obs³uga odbioru i bufora
port.on('data', function (data) {
	NewFrameReceived = true;
	console.log('Data: ' + data.toString('hex'));
});




//----------------------------------------------------------------
var requestMag   = [0xAA, 0xAA, 0x02, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF];
var requestGyro  = [0xAA, 0xAA, 0x02, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF];
var requestAccel = [0xAA, 0xAA, 0x02, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF];
var requestState = [0xAA, 0xAA, 0x02, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF];

setInterval(sensorUpdate, 1000);

function sensorUpdate() {
		getMagData();
}

function getMagData() {
	port.write(requestMag);
	waitingForFrame = true;
	port.flush();	//czyœci bufor RX ze wszystkich danych
	//seriaRxBuffer = new Buffer();	//czyszczenie bufora
}