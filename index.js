var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

//------------------- Zmienne globalne -------------------------------
var NewFrameReceived = false;
var waitingForFrame = false;
//var seriaRxBuffer = new Buffer();
var getData_queue = 0;

var MagX = 0;
var MagY = 0;
var MagZ = 0;

var GyroX = 0;
var GyroY = 0;
var GyroZ = 0;

var AccelX = 0;
var AccelY = 0;
var AccelZ = 0;

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
	switch(data[3]){
		case 1: console.log('Mag data'); break;
		case 2: console.log('Gyro data'); break;
		case 3: console.log('Accel data'); break;
		case 4: console.log('State data'); break;
		default: console.log('Wrong data'); break;
	}
	decodeFrame(data);
	console.log('MagX: ' + MagX + '\t\tGyroX: ' + GyroX + '\tAccelX: ' + AccelX);
	console.log('MagY: ' + MagY + '\t\tGyroY: ' + GyroY + '\tAccelY: ' + AccelY);
	console.log('MagZ: ' + MagZ + '\t\tGyroZ: ' + GyroZ + '\tAccelZ: ' + AccelZ);
});




//----------------------------------------------------------------
var requestMag   = [0xAA, 0xAA, 0x02, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF];
var requestGyro  = [0xAA, 0xAA, 0x02, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF];
var requestAccel = [0xAA, 0xAA, 0x02, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF];
var requestState = [0xAA, 0xAA, 0x02, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF];

setInterval(sensorUpdate, 1000);

function sensorUpdate() {
	switch(getData_queue){
		case 0:  getMagData(); 		break;
		case 1:  getGyroData(); 	break;
		case 2:  getAccelData(); 	break;
		case 3:  getStateData(); 	break;
		default: getData_queue = 0; 	break;
	}
	if(getData_queue < 3) getData_queue++;
	else getData_queue = 0;
}

function getMagData() {
	port.write(requestMag);
	waitingForFrame = true;
	port.flush();	//czyœci bufor RX ze wszystkich danych
}

function getGyroData() {
	port.write(requestGyro);
	waitingForFrame = true;
	port.flush();	//czyœci bufor RX ze wszystkich danych
}

function getAccelData() {
	port.write(requestAccel);
	waitingForFrame = true;
	port.flush();	//czyœci bufor RX ze wszystkich danych
}

function getStateData() {
	port.write(requestState);
	waitingForFrame = true;
	port.flush();	//czyœci bufor RX ze wszystkich danych
}

function decodeFrame(data){
	var view = new DataView(new ArrayBuffer(20));
	
	// set bytes
	data.forEach(function (b, i) {
    		view.setUint8(i, b);
	});

	if(data[3] == 1){
		MagX = view.getFloat32(4, true);
		MagY = view.getFloat32(8, true);
		MagZ = view.getFloat32(12, true);
	}
	else if(data[3] == 2){
		GyroX = view.getFloat32(4, true);
		GyroY = view.getFloat32(8, true);
		GyroZ = view.getFloat32(12, true);
	}
	else if(data[3] == 3){
		AccelX = view.getFloat32(4, true);
		AccelY = view.getFloat32(8, true);
		AccelZ = view.getFloat32(12, true);
	}

	console.log('Frame decoded!');
}