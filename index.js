var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var port = new SerialPort('/dev/ttyS1', {
	//parser: serialport.parsers.readline('\n'),
	parser: serialport.parsers.raw,
	baudrate: 9600
});

port.on('open', function () {
  port.write('main screen turn on', function(err, bytesWritten) {
    if (err) {
      return console.log('Error: ', err.message);
    }
    console.log(bytesWritten, 'bytes written');
  });
});


port.on('data', function (data) {
  console.log('Data: ' + data);
});


setInterval(sendTest, 1000);

function sendTest() {
  port.write('I am alive!\n');
}
