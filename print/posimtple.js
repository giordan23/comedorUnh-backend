

	var LF = "\n";
	var issueID = 1;
	var tmp = "123456789"
	var _inch = 3;

	function changeInch() {
		_inch = type_inch.value;
	}

	function viewResult(result) {
		p_result.value = result;
	}

	function PrintReceipt() {

		setPosId(issueID);
		checkPrinterStatus();

		printText("\n\nMiraeAsset Venture Tower 685,\nSampyeong-dong, Bundang-gu,\nSeongnam-si, Gyeonggi-do,\n463-400, Korea\n\n\n", 0, 0, false, false, false, 0, 1);

		if(_inch == 2) {
			// 2inch sample
			printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
			printText("Item name      Q'ty       price \n", 0, 0, false, false, false, 0, 0);
			printText("Items 1          1        100.00\n", 0, 0, false, false, false, 0, 0);
			printText("Items 2          1        200.00\n", 0, 0, false, false, false, 0, 0);
			printText("Items 3          1        300.00\n", 0, 0, false, false, false, 0, 0);
			printText("Items 4          1        400.00\n", 0, 0, false, false, false, 0, 0);
			printText("Items 5          1        500.00\n", 0, 0, false, false, false, 0, 0);
			printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
			printText("                 Sub-Total 895.0\n", 0, 1, true, false, false, 0, 0);
			printText("                 Discount    5.0\n", 0, 1, true, false, false, 0, 0);
			printText("                ----------------\n", 0, 0, false, false, false, 0, 0);
			printText("                 Tax Total 200.0\n", 0, 1, true, false, false, 0, 0);
			printText("                ----------------\n", 0, 0, false, false, false, 0, 0);
			printText("                 Total   1,000.0\n", 0, 1, true, false, false, 0, 0);
			printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
		} else if(_inch == 3) {
			// 3inch sample
			printText("------------------------------------------\n", 0, 0, false, false, false, 0, 0);
			printText("Item name             Q'ty          price \n", 0, 0, false, false, false, 0, 0);
			printText("Items 2                 1           100.00\n", 0, 0, false, false, false, 0, 0);
			printText("Items 2                 1           200.00\n", 0, 0, false, false, false, 0, 0);
			printText("Items 3                 1           300.00\n", 0, 0, false, false, false, 0, 0);
			printText("Items 4                 1           400.00\n", 0, 0, false, false, false, 0, 0);
			printText("Items 5                 1           500.00\n", 0, 0, false, false, false, 0, 0);
			printText("------------------------------------------\n", 0, 0, false, false, false, 0, 0);
			printText("                           Sub-Total 895.0\n", 0, 1, true, false, false, 0, 0);
			printText("                           Discount    5.0\n", 0, 1, true, false, false, 0, 0);
			printText("                          ----------------\n", 0, 0, false, false, false, 0, 0);
			printText("                           Tax Total 200.0\n", 0, 1, true, false, false, 0, 0);
			printText("                          ----------------\n", 0, 0, false, false, false, 0, 0);
			printText("                           Total   1,000.0\n", 0, 1, true, false, false, 0, 0);
			printText("------------------------------------------\n", 0, 0, false, false, false, 0, 0);
		} else if(_inch == 4) {
			// 4inch sample
			printText("--------------------------------------------------------------\n", 0, 0, false, false, false, 0, 0);
			printText("Item name                         Q'ty                  price \n", 0, 0, false, false, false, 0, 0);
			printText("Items 1                             1                   100.00\n", 0, 0, false, false, false, 0, 0);
			printText("Items 2                             1                   200.00\n", 0, 0, false, false, false, 0, 0);
			printText("Items 3                             1                   300.00\n", 0, 0, false, false, false, 0, 0);
			printText("Items 4                             1                   400.00\n", 0, 0, false, false, false, 0, 0);
			printText("Items 5                             1                   500.00\n", 0, 0, false, false, false, 0, 0);
			printText("--------------------------------------------------------------\n", 0, 0, false, false, false, 0, 0);
			printText("                                               Sub-Total 895.0\n", 0, 1, true, false, false, 0, 0);
			printText("                                               Discount    5.0\n", 0, 1, true, false, false, 0, 0);
			printText("                                              ----------------\n", 0, 0, false, false, false, 0, 0);
			printText("                                               Tax Total 200.0\n", 0, 1, true, false, false, 0, 0);
			printText("                                              ----------------\n", 0, 0, false, false, false, 0, 0);
			printText("                                               Total   1,000.0\n", 0, 1, true, false, false, 0, 0);
			printText("--------------------------------------------------------------\n", 0, 0, false, false, false, 0, 0);
		} else {
			// error
			return;
		}

		printText("Tel : 000 - 0000 - 0000\n", 0, 0, true, false, false, 0, 0);
		printText("Homepage : www.bixolon.com\n\n\n\n", 0, 0, false, false, false, 0, 0);

		printQRCode("www.bixolon.com",0,1,7,0);
		print1DBarcode("01234567890",0,4,70,2,1);
		printText("\n\n\n\n\n", 0, 0, false, false, false, 0, 0);
		cutPaper(1);

		var strSubmit = getPosData();

		console.log(strSubmit);

		issueID++;
		requestPrint(p_name.value, strSubmit, viewResult);

		return true;
	}


	var arrSymbol = [0, 1, 2, 3, 5, 6, 4, 7, 8];

	function PrintBarcode() {
		var barCodeData = barcode_data.value;
		var barCodeSymbol = arrSymbol[b_symbol.selectedIndex];
		var barCodeHeight = 100;
		var barCodeWidth = 3;

		var barCodeAlignment = b_align.selectedIndex;
		var barCodeHri = print_HRI.selectedIndex;

		setPosId(issueID);

		printText("print1DBarcode\n\n", 0, 0, false, false, false, 0, 0);
		print1DBarcode(barCodeData, barCodeSymbol, barCodeWidth, barCodeHeight, barCodeHri, barCodeAlignment);
		printText("\n\n\n\n\n\n\n\n", 0, 0, false, false, false, 0, 0);

		cutPaper(1);

		var strSubmit = getPosData();

		console.log(strSubmit);

		issueID++;
		requestPrint(p_name.value, strSubmit, viewResult);
	}

	function PrintImageFile() {
		setPosId(issueID);

		//imageFileWindows must use the full path of the local pc.
		var imageFileWindows = "C:\\BIXOLON\\WebPrintSDK\\logo.bmp";
		printBitmapFile(imageFileWindows,-2,1,false);
		
		printText("\n\n\n\n\n\n\n\n", 0, 0, false, false, false, 0, 0);
		cutPaper(1);

		var strSubmit = getPosData();

		console.log(strSubmit);

		issueID++;

		requestPrint(p_name.value, strSubmit, viewResult);
	}

	function PrintCanvas() {
		// canvas data to image(encode base64)
		var imgData = canvas.toDataURL();

		var imageAlignment = image_align.selectedIndex;

		var imageWidth = -2;
		if (image_width.selectedIndex == 0) {
			imageWidth = parseInt(image_input.value);
		}

		setPosId(issueID);
		checkPrinterStatus();
		printText("Canvas Image Sample \n\n", 0, 0, false, false, false, 0, 0);
		printBitmap(imgData, imageWidth, imageAlignment, false);

		printText("\n\n\n\n\n", 0, 0, false, false, false, 0, 0);
		cutPaper(1);

		var strSubmit = getPosData();

		console.log(strSubmit);

		issueID++;
		requestPrint(p_name.value, strSubmit, viewResult);
	}

	function PrintPagemode() {

		var rotation = pagemode_direct.selectedIndex;

		setPosId(issueID);

		checkPrinterStatus();
		pagemodeBegin();
		pagemodePrintArea(512, 700);
		pagemodePrintDirection(rotation);

		if (pagemode_direct.selectedIndex == 0) {//Normal
			pagemodePrintPosition(0, 80);
			printText("Web Print SDK!\n", 0, 1, false, false, false, 0, 0);
			pagemodePrintPosition(0, 150);
			printText("Test Print!!\n", 0, 0, false, false, false, 0, 0);
			pagemodePrintPosition(0, 230);
			printText(pagemode_direct.value, 0, 0, false, false, false, 0, 0);
			pagemodePrintPosition(100, 350);
			// printQRCode("http://www.bixolon.com", 0, 0, 5, 0);
		} else if(pagemode_direct.selectedIndex == 1 || pagemode_direct.selectedIndex == 3) {  //Left90 or Right90
			pagemodePrintPosition(100, 100);
			printText("Web Print SDK\n", 0, 1, false, false, false, 0, 0);
			pagemodePrintPosition(100, 170);
			printText("Test Print!!\n", 0, 0, false, false, false, 0, 0);
			pagemodePrintPosition(100, 250);
			printText(pagemode_direct.value, 0, 0, false, false, false, 0, 0);
			pagemodePrintPosition(200, 350);
			// printQRCode("http://www.bixolon.com", 0, 0, 5, 0);
		}
		else{//Rotate180
			pagemodePrintPosition(100, 100);
			printText("Web Print SDK!\n", 0, 1, false, false, false, 0, 0);
			pagemodePrintPosition(100, 170);
			printText("Test Print!!\n", 0, 0, false, false, false, 0, 0);
			pagemodePrintPosition(100, 250);
			printText(pagemode_direct.value, 0, 0, false, false, false, 0, 0);
			pagemodePrintPosition(230, 350);
			// printQRCode("http://www.bixolon.com", 0, 0, 5, 0);

		}
		pagemodeEnd();
		printText("\n\n\n\n\n", 0, 0, false, false, false, 0, 0);
		cutPaper(1);
		console.log(strSubmit);

		var strSubmit = getPosData();

		issueID++;
		requestPrint(p_name.value, strSubmit, viewResult);
	}

	function onImageWidthSelectChange() {
		if (image_width.selectedIndex == 0) {
			document.getElementById('image_input').style.display = 'inline-block';
		} else {
			document.getElementById('image_input').style.display = 'none';
		}
	}

	function erase() {
		var sigCanvas = document.getElementById("canvas");
			var context = sigCanvas.getContext("2d");
			context.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
	}

	// works out the X, Y position of the click inside the canvas from the X, Y position on the page
	function getPosition(mouseEvent, sigCanvas) {
		var rect = sigCanvas.getBoundingClientRect();
		return {
			X: mouseEvent.clientX - rect.left,
			Y: mouseEvent.clientY - rect.top
		};
	}

	function initialize() {
		// get references to the canvas element as well as the 2D drawing context
		var sigCanvas = document.getElementById("canvas");
		var context = sigCanvas.getContext("2d");
		context.strokeStyle = "#FF";
		context.lineJoin = "round";
		context.lineWidth = 5;


		// This will be defined on a TOUCH device such as iPad or Android, etc.
		var is_touch_device = "ontouchstart" in document.documentElement;

		if (is_touch_device) {
			// create a drawer which tracks touch movements
			var drawer = {
				isDrawing: false,
				touchstart: function (coors) {
					context.beginPath();
					context.moveTo(coors.x, coors.y);
					this.isDrawing = true;
				},
				touchmove: function (coors) {
					if (this.isDrawing) {
						context.lineTo(coors.x, coors.y);
						context.stroke();
					}
				},
				touchend: function (coors) {
					if (this.isDrawing) {
						this.touchmove(coors);
						this.isDrawing = false;
					}
				}
			};

			// create a function to pass touch events and coordinates to drawer
			function draw(event) {
				// get the touch coordinates.  Using the first touch in case of multi-touch
				var coors = {
					x: event.targetTouches[0].pageX,
					y: event.targetTouches[0].pageY
				};

				// Now we need to get the offset of the canvas location
				var obj = sigCanvas;

				if (obj.offsetParent) {
					// Every time we find a new object, we add its offsetLeft and offsetTop to curleft and curtop.
					do {
						coors.x -= obj.offsetLeft;
						coors.y -= obj.offsetTop;
					} while (
						// The while loop can be "while (obj = obj.offsetParent)" only, which does return null
						// when null is passed back, but that creates a warning in some editors (i.e. VS2010).
						(obj = obj.offsetParent) != null
					);
				}

				// pass the coordinates to the appropriate handler
				drawer[event.type](coors);
			}

			// attach the touchstart, touchmove, touchend event listeners.
			sigCanvas.addEventListener("touchstart", draw, false);
			sigCanvas.addEventListener("touchmove", draw, false);
			sigCanvas.addEventListener("touchend", draw, false);

			// prevent elastic scrolling
			sigCanvas.addEventListener(
				"touchmove",
				function (event) {
					event.preventDefault();
				},
				false
			);
		} else {
			// start drawing when the mousedown event fires, and attach handlers to
			// draw a line to wherever the mouse moves to
			$("#canvas").mousedown(function (mouseEvent) {
				var position = getPosition(mouseEvent, sigCanvas);
				context.moveTo(position.X, position.Y);
				context.beginPath();

				// attach event handlers
				$(this)
					.mousemove(function (mouseEvent) {
						drawLine(mouseEvent, sigCanvas, context);
					})
					.mouseup(function (mouseEvent) {
						finishDrawing(mouseEvent, sigCanvas, context);
					})
					.mouseout(function (mouseEvent) {
						finishDrawing(mouseEvent, sigCanvas, context);
					});
			});
		}
	}


	// draws a line to the x and y coordinates of the mouse event inside
	// the specified element using the specified context
	function drawLine(mouseEvent, sigCanvas, context) {
		var position = getPosition(mouseEvent, sigCanvas);

		context.lineTo(position.X, position.Y);
		context.stroke();
	}

	// draws a line from the last coordiantes in the path to the finishing
	// coordinates and unbind any event handlers which need to be preceded
	// by the mouse down event
	function finishDrawing(mouseEvent, sigCanvas, context) {
		// draw the line to the finishing coordinates
		drawLine(mouseEvent, sigCanvas, context);

		context.closePath();

		// unbind any events which could draw
		$(sigCanvas)
			.unbind("mousemove")
			.unbind("mouseup")
			.unbind("mouseout");
	}

	function changeBarcodeSymbol() {
		var symbologySelect = document.getElementById("b_symbol");
		var index = symbologySelect.selectedIndex;

		if 		(index == 0) { $("#barcode_data").val("123456789012"); }			//UPCA
		else if (index == 1) { $("#barcode_data").val("01234567890"); }				//UPCE
		else if (index == 2) { $("#barcode_data").val("12345678"); }				//EAN8
		else if (index == 3) { $("#barcode_data").val("1234567890123"); }			//EAN13
		else if (index == 4) { $("#barcode_data").val("2468024680"); }				//ITF
		else if (index == 5) { $("#barcode_data").val("ABCD1234567890$+-/:"); }		//Codabar
		else if (index == 6) { $("#barcode_data").val("ABCDE1234567890VWXYZ"); }	//Code39
		else if (index == 7) { $("#barcode_data").val("BXLTEST1234567890123"); }	//Code93
		else if (index == 8) { $("#barcode_data").val("BXLTEST12345678901234567"); }//Code128
	}

