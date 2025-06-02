//****Class List JavaScript file creator V 1.0.0
//****by Sean Doyle
//****This file is used with classfilemaker.html to allow users to paste in a class list from a csv file and turn it into the JavaScript file required for Volunteerinator.
var txtFlag = false;
var formHandle = document.forms.vol_form;
var formTxt = formHandle.vol__txt;
var resetBtn = document.getElementById("btn_reset");
var js_head = "var myClass = [\r";
var js_end = "\r];";

//This function gets the class list from the form and turns it into the text for the JS file
function processForm() {
	var classString = '';
	var classRaw = formTxt.value;
	var classRawArray = [], classNamesArray = [];
	var nameTemp, nameTempFirst = "", nameTempLast = "";
	
	//convert raw input to array of names
	//found the regex for this here: https://code.tutsplus.com/tutorials/parsing-a-csv-file-with-javascript--cms-25626
	classRawArray = classRaw.split(/\r?\n|\r/);

	//convert each array item to FirstName LastName and add to new array
	for (var i = 0; i < classRawArray.length; i++) {
		nameTemp = classRawArray[i].split(', '); 
		nameTempFirst = nameTemp[1];
		nameTempLast = nameTemp[0];
		classNamesArray.push('"' + nameTempFirst + ' ' + nameTempLast + '"')
	}

	//create string of names with array architecture
	for (var i = 0; i < classNamesArray.length - 1; i++) {
		classString += '\t' + classNamesArray[i];
		//check if item is last and add comma if it isn't
		if (i !== classNamesArray.length - 2) {
			classString += ',\r';
		}
	}

	//output code strings concatenated with string of names
	formTxt.value = js_head + classString + js_end;

	return false;
}// end processForm

//This function resets the form
function resetForm() {
	formTxt.value = "";
	formTxt.focus();
	return false;
}

//This function clears the textarea when clicked - if flag variable is set to false.
function clearForm() {
	if (txtFlag === false) {
		formTxt.value = "";
		txtFlag = true;
	}
	if (formTxt.value !== "" && formTxt.value !== "Paste your class list here") {
		formTxt.select();
	}
}

//Set listeners
formHandle.vol__txt.onfocus = clearForm;
formHandle.onsubmit = processForm;
resetBtn.onclick = resetForm;