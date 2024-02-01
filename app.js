Quagga.init({
    inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#interactive'),
        constraints: {
            width: 640,
            height: 480,
            facingMode: "environment" // or "user" for the front camera
        },
    },
    decoder: {
        readers: ["ean_reader", "ean_8_reader", "code_128_reader"]
    }
}, function (err) {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Initialization finished. Ready to start");
    Quagga.start();
});

Quagga.onDetected(function (result) {
    const code = result.codeResult.code;
    document.getElementById('result').innerHTML = 'Scanned Barcode: ' + code;
    Quagga.stop();
});
