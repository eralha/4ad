define('module/validators/validators-val', [], function () {
    
});


// ----------------------------------------------------------------------------
// VALIDATORS-VAL
// ----------------------------------------------------------------------------
// v5.50 - ALS@10/08/2017
// ----------------------------------------------------------------------------
// NOTA: baseado na versao v2.50
// ----------------------------------------------------------------------------

// campos obrigatorios
function NM_ReqVal(theField, theMessage) {
    if (document.getElementById(theField).value == "") {
        return TratarMensagem(theMessage);
    } else {
        return ""
    }
}

// numeros (se theLength estiver definido, tem de haver n digitos)
function NM_Number(theField, theMessage, theLength) {
    var len = theLength;
    var value = document.getElementById(theField).value;
    if (theLength == undefined) len = value.length;
    var reg = new RegExp("[0-9]{" + len + "}");

    if (value == "") return "";
    
    if (value.length != len) return TratarMensagem(theMessage);//v2.20

    if (reg.test(value) == false) {
        return TratarMensagem(theMessage);
    } else {
        return "";
    }
}

// numeros com virgula (ex: 39.99)
function NM_Decimal(theField, theMessage) {
    var value = document.getElementById(theField).value;
    var reg = /^[0-9]+(\.[0-9]+)?$/
    //var reg = /^[-+]?[0-9]+(\.[0-9]+)?$/    //incluir + ou - no inicio do valor
    
    if (value == "") return "";

    //forces replacement of "," by "."
    ReplaceChars(theField,".",[","])

    if (reg.test(value) == false) {
        return TratarMensagem(theMessage);
    } else {
        return "";
    }
}

// datas (se theMask nao estiver definido assume dd-mm-aaaa)
function NM_Date(theField, theMessage, theMask) {
    var value = document.getElementById(theField).value;

    if (value == "") return "";

    //forces replacement of ".","-","/" by "-"
    ReplaceChars(theField,DATE_FORMAT,[".","-","/"])
    
    if (!AUX_ValidDate(value, theMask)) {
        return TratarMensagem(theMessage);
    } else {
        return ""
    }
}

// telefone (9 numeros)
function NM_Phone(theField, theMessage) {
    var value = document.getElementById(theField).value;
    var reg = /[0-9]{9}/;

    if (value == "") return "";

    if (value.length != 9) return TratarMensagem(theMessage);//v2.20

    if (reg.test(value) == false) {
        return TratarMensagem(theMessage);
    } else {
        return "";
    }
}

// codigo postal (nnnn-nnn)
function NM_CP(theField, theMessage) {
    var value = document.getElementById(theField).value;
    var reg = /[0-9]{4}\-[0-9]{3}/;

    if (value == "") return "";

    if (reg.test(value) == false) {
        return TratarMensagem(theMessage);
    } else {
        return "";
    }
}

// codigo postal (nnnn-nnn), em 2 campos separados
function NM_CP43(arrField, theMessage) {
    var value4 = document.getElementById(arrField[0]).value;
    var value3 = document.getElementById(arrField[1]).value;
    var value = value4 + '-' + value3;
    var reg = /[0-9]{4}\-[0-9]{3}/;

    if (value == "-") return "";

    if (reg.test(value) == false) {
        return TratarMensagem(theMessage);
    } else {
        return "";
    }
}

// email de confirmacao
function NM_EmailConf(theField, theMessage, theFieldConf) {
    if (document.getElementById(theField).value != document.getElementById(theFieldConf).value) {
        return TratarMensagem(theMessage);
    } else {
        return ""
    }
}

// combo
function NM_Combo(theField, theMessage) {
	var cbo = document.getElementById(theField);

	//if combo has 0 or 1 option then ignore validator
	if (cbo.length <= 1) return ""; 

    if ((cbo.value == "0") || (cbo.value == "")) {
        return TratarMensagem(theMessage);
    } else {
        return ""
    }
}

// validar Radio buttons
function NM_Radio(theField, theMessage) {
    var retVal = "";

    for (var i = 0; i < theField.length; i++) {
        if (document.getElementById(theField[i]).checked) retVal = "checked";
    }

    if (retVal != "checked") {
        return TratarMensagem(theMessage);
    } else {
        return ""
    }
}

function NM_Radio22(theField, theMessage, theFieldName) {
    var retVal = "";

    var theFieldName = document.getElementsByName(theFieldName)

    for (var i = 0; i < theFieldName.length; i++) {
        if (theFieldName[i].checked) retVal = "checked";
    }

    if (retVal != "checked") {
        return TratarMensagem(theMessage);
    } else {
        return ""
    }
}

// validar Radio buttons
function NM_Radio2(theFieldName, theMessage) {
    var retVal = "";

    var theFieldName = document.getElementsByName(theFieldName)

    for (var i = 0; i < theFieldName.length; i++) {
        if (theFieldName[i].checked) retVal = "checked";
    }

    if (retVal != "checked") {
        return TratarMensagem(theMessage);
    } else {
        return ""
    }
}

// validar data entre uma data de inicio e uma data de fim (se dateStart ou dateEnd forem "", assume data de hoje)
function NM_DateInterval(theField, theMessage, dateStart, dateEnd) {
    var value = document.getElementById(theField).value;

    //ignore empty field
    if (value == "") return "";

    if (!AUX_ValidDate(value)) {
        //ignore date in wrong format
        return ""
    } else {

        var date_value = AUX_ConvertToDate(value);
        var date_start = AUX_ConvertToDate(dateStart);
        var date_end = AUX_ConvertToDate(dateEnd);
        
        if ((date_value >= date_start) && (date_value <= date_end)){
            return ""
        } else {
            return TratarMensagem(theMessage);
        }

    }
}

// validar data em campos separados; valida se é obrigatório; valida intervalo de datas
function NM_Date3(arrDate, theMessage, isRequired, dateStart, dateEnd) {
	if (dateStart == undefined) dateStart="";
	if (dateEnd == undefined) dateEnd="";
	
    var valDay = document.getElementById(arrDate[0]).value;
    var valMonth = document.getElementById(arrDate[1]).value;
    var valYear = document.getElementById(arrDate[2]).value;

    var value = valDay + "-" + valMonth + "-" + valYear;

    //date is not required and the fields are empty
    if ((!isRequired) && (value == "--")) return ""; // ok

    //forces dd/mm/aaaa or dd-mm-aaaa (v2.40)
    if (DATE_FORMAT.indexOf("/") > 0) value = Right("0" + valDay,2) + "/" + Right("0" + valMonth,2) + "/" + valYear; 
    if (DATE_FORMAT.indexOf("-") > 0) value = Right("0" + valDay,2) + "-" + Right("0" + valMonth,2) + "-" + valYear; 

	if ((dateStart=="") && (dateEnd=="")) {
		//check if the date is valid
		if (!AUX_ValidDate(value)) return TratarMensagem(theMessage); // error (date is not valid)
		
	} else {

		if (AUX_ValidDate(value)) {
			//check if the date is inside the given range (dateStart, dateEnd)
			var date_value = AUX_ConvertToDate(value);
			var date_start = AUX_ConvertToDate(dateStart);
			var date_end = AUX_ConvertToDate(dateEnd);

			if ((date_value >= date_start) && (date_value <= date_end)){
				return ""; // ok
			} else {
				return TratarMensagem(theMessage); // error (date is out of range)
			}
		}		
	}

	return ""; // ok
}


function NM_Matricula(theField, theMessage) {

    var value = document.getElementById(theField).value;

    if (value == "") return "";

    var reg = new RegExp("[ABCDEFGHIJKLMNOPQRSTUVXZ][ABCDEFGHIJKLMNOPQRSTUVXZ]");

    var reg1 = new RegExp("[A-Z][A-Z]-[0-9][0-9]-[0-9][0-9]"); //example: AP-12-37
    var reg2 = new RegExp("[0-9][0-9]-[A-Z][A-Z]-[0-9][0-9]"); //example: 98-TX-19
    var reg3 = new RegExp("[0-9][0-9]-[0-9][0-9]-[A-Z][A-Z]"); //example: 56-44-RS

    if (reg.test(value.substr(0,2) )) { reg = reg1; }
    if (reg.test(value.substr(3,2) )) { reg = reg2; }
    if (reg.test(value.substr(6,2) )) { reg = reg3; }

    if (reg.test(value) == false) {
        return TratarMensagem(theMessage);
    } else {
        return "";
    }
}

// validar Checkboxes
function NM_Check(theField, theMessage, minSelectedValues, theTextfield) {
    var retVal = "";
    var iCounter = 0;

    for (var i = 0; i < theField.length; i++) {
        if (document.getElementById(theField[i]).checked) { retVal = "checked"; iCounter++; }
    }

    //check number of selected items
    if ((minSelectedValues != null) && (minSelectedValues != "")) {
		if (iCounter < minSelectedValues) retVal = ""; 
    }

    //
    if ((theTextfield != null) && (theTextfield != "") && (document.getElementById(theField[i-1]).checked)) {
		if (document.getElementById(theTextfield).value == "") { retVal = ""; }
    }


    if (retVal != "checked") {
        return TratarMensagem(theMessage);
    } else {
        return ""
    }
}

// textarea com tamanho limitado
function NM_TextLimit(theField,theMessage,theLength) {
    var len = theLength;
    var value = document.getElementById(theField).value;
    
    if (value == "") return "";

	if (value.length > len) {
	
	    //document.getElementById(theField).value = document.getElementById(theField).value.substring(0, len); //<----------------------
	
		return TratarMensagem(theMessage);
	} else {
		return ""
	}
}

// textarea com limite de palavras
function NM_WordLimit(theField,theMessage,lowerBound,upperBound) {
    // lowerBound = 0 ou 1, para nao considerar limite inferior
    // upperBound = (não preenchido), para nao considerar limite superior
    var value = document.getElementById(theField).value;

    //count words
    var words_total = 0;
    arr = value.replace(/\s/g, ' '); arr = arr.split(' ');
    for (i = 0; i < arr.length; i++) {
        if (arr[i].length > 0) words_total++;
    }

    if ((lowerBound == 0) || (lowerBound == 1)) lowerBound = 0;
    
    if (value == "") return "";
        
	if ((words_total >= lowerBound) && ( (words_total <= upperBound) || (upperBound == undefined) )) {
		return ""
	} else {
		//theMessage = theMessage.replace("{0}",lowerBound).replace("{1}",upperBound);
		return TratarMensagem(theMessage);
	}
}

// numero entre MIN e MAX
function NM_Range(theField, theMessage, lowerValue, higherValue) {
    var value = document.getElementById(theField).value;
    var len = value.length;
    var reg = new RegExp("[0-9]{" + len + "}");

    if (value == "") return "";

    if (reg.test(value) == false) {
		return TratarMensagem(theMessage);
    } else {
		if ( (value >= lowerValue) && (value <= higherValue) ) {
			return "";
		} else {
			return TratarMensagem(theMessage);
		}
    }
}

//v1.20
function NM_FileExt(theField, theMessage, theList) {
    //theList = list of allowed extensions (ex: "jpg,jpeg,png,gif")
    var fileName = document.getElementById(theField).value;
    var fileExtension = fileName.substr(fileName.lastIndexOf('.') + 1);

    if (fileName == "") return "";

    var lst = theList; // "jpg,gif,png,jpeg"

    if (searchStringInList(lst, fileExtension) >= 0) {
        return ""
    } else {
        return TratarMensagem(theMessage);
    }
}

//v1.23 - validar se theText está presente no campo introduzido
function NM_Exists(theField, theMessage, theText) {
    var value = document.getElementById(theField).value.toLowerCase();
    if (value == "") return "";
    
    if ( value.indexOf(theText) >= 0 ) {
        return ""
    } else {    
        return TratarMensagem(theMessage);
    }

}


//v2.20
// comparar 2 campos
function NM_Compare(theField, theMessage, theFieldConf, theSign) {
    var retVal = "err";

    //set theSign default value
    if (theSign == undefined) theSign = "=";

    if (theSign == "=") {
        if (document.getElementById(theField).value == document.getElementById(theFieldConf).value) retVal = ""; 
    }

    //return value
    if (retVal == "err") {
        return TratarMensagem(theMessage);
    } else {
        return ""
    }
}

// campos obrigatorios (num Grupo um deve estar preenchido) //v2.50
function NM_ReqValGroup(theField, theMessage) {
    var iCounter = 0;

    for (var i = 0; i < theField.length; i++) {
        //contar vazios
        if (document.getElementById(theField[i]).value == "") iCounter++;
    }
    
    if (iCounter == theField.length) {
        return TratarMensagem(theMessage);
    } else {
        return ""
    }
}


//v1.20
//AUX
function searchStringInList(l, str) {
    if ((l == "*") || (l == "*.*") || (l == "")) return 0 //accept all
    
    var a = l.split(","); //convert list to array
    
    for (var i = 0; i < a.length; i++) {
        if (a[i].toLowerCase() == str.toLowerCase()) return i; //match found
    }
    return -1; //no match found
}

// ------------------
// funcoes auxiliares
// ------------------
// - AUX_ValidDate(theDate, theMask)
// - AUX_ConvertToDate(theDate)
// - TratarMensagem(theMessage)
// - getCaretPosition(ctrl)
// - setCaretPosition(ctrl, pos)
//

// validar Data
function AUX_ValidDate(theDate, theMask) {
    var theFormat = theMask;
    
    if (theMask == undefined) theFormat = DATE_FORMAT; //global variable set in "validators3-core.js"
    if (theFormat == undefined) theFormat = 'dd-mm-aaaa';

    var ano = '', mes = '', dia = '', dtOK = 0;
    var totalOK;
    
    if ((theDate.length == 8) && (theFormat.length == 8)) { totalOK = 3 } else { totalOK = 5 };
    
    for (i = 0; i < (theDate.length); i++) {
        if (theDate.charAt(i) == theFormat.charAt(i)) { dtOK++ }
        if (theFormat.charAt(i) == 'd') { dia += theDate.charAt(i) }
        if (theFormat.charAt(i) == 'm') { mes += theDate.charAt(i) }
        if (theFormat.charAt(i) == 'a') { ano += theDate.charAt(i) }
    }

    if (dia.charAt(0) == '0') { diaZero = '0' } else { diaZero = '' }
    if (mes.charAt(0) == '0') { mesZero = '0' } else { mesZero = '' }

    if (dia != diaZero + parseInt(dia, 10)) { return false } else { dia = eval(dia) };
    if (mes != mesZero + parseInt(mes, 10)) { return false } else { mes = eval(mes) };
    if (ano != '' + parseInt(ano, 10)) { return false } else { ano = eval(ano) };

    switch (mes) {
        case 2: if (ano % 4 == 0) { diasmes = 29 } else { diasmes = 28 }; break;
        case 4: diasmes = 30; break;
        case 6: diasmes = 30; break;
        case 9: diasmes = 30; break;
        case 11: diasmes = 30; break;
        default: diasmes = 31; break;
    };

    if ((dia > 0) && (dia <= diasmes)) { dtOK++ }
    if ((mes > 0) && (mes < 13)) { dtOK++ }
    if ((ano > 1800) && (ano < 9999)) { dtOK++ }

    if (dtOK == totalOK) 
		return true 
	else 
		return false;
}

function AUX_ConvertToDate(theDate) {
    // "theDate" must be in the format: dd-mm-yyyy 
    var retval = new Date();
    if (theDate != "") { retval.setFullYear(theDate.substring(6, 10), theDate.substring(3, 5) - 1, theDate.substring(0, 2)); }
    return retval;
}

// AUX : funcao generica para tratar mensagens
function TratarMensagem(theMessage) {
	if (VERSION == 1) return theMessage
	if (VERSION == 2) return theMessage
	
	//else
	return "<li>" + theMessage + "</li>"
}

// AUX: get Cursor/Caret position in the text field
function getCaretPosition (ctrl) {
	var CaretPos = 0;	// IE Support
	if (document.selection) {
		ctrl.focus ();
		var Sel = document.selection.createRange ();
		Sel.moveStart ('character', -ctrl.value.length);
		CaretPos = Sel.text.length;
	}
	// Firefox support
	else if (ctrl.selectionStart || ctrl.selectionStart == '0')
		CaretPos = ctrl.selectionStart;
	return (CaretPos);
}
// AUX: set Cursor/Caret position in the text field
function setCaretPosition(ctrl, pos){
	if(ctrl.setSelectionRange)
	{
		ctrl.focus();
		ctrl.setSelectionRange(pos,pos);
	}
	else if (ctrl.createTextRange) {
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}

// AUX: automatically replaces bad character in the text field with valid ones
function ReplaceChars(theField,sMask,arrCharsToReplace) {
	//theField ............ STRING : field ID
	//sMask ............... STRING : char that will be stored; this can be a single CHAR or a string with a char that exists in the "arrCharsToReplace"
	//arrCharsToReplace ... ARRAY : list of chars to replace
	//
	//example: ReplaceChars("txtPreco",".",[","])
	//example: ReplaceChars("txtData",DATE_FORMAT,[".","-","/"])
	
	var arr = arrCharsToReplace;
	
	var ctrl = document.getElementById(theField);
	var value = ctrl.value;
	
	var doReplace = false;
	var validChar = sMask;
	
	for (var i = 0; i < arr.length; i++) {
		//look for valid char
		if ( sMask.indexOf(arr[i]) >= 0 ) validChar = arr[i];

		//check if replace is needed (check for wrong chars)
		if ( value.indexOf(arr[i]) > 0 && validChar != arr[i]) doReplace = true;	
	}

	if (doReplace) {
		var getPos = getCaretPosition(ctrl);
		//replace wrong chars
		for (var i = 0; i < arr.length; i++) { value = value.replace(arr[i],validChar); }
		ctrl.value = value;
		setCaretPosition(ctrl,getPos);
	}
}

function trim(str, chars) {
	return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

//v2.40
function Left(str, n){
	if (n <= 0)
	    return "";
	else if (n > String(str).length)
	    return str;
	else
	    return String(str).substring(0,n);
}

//v2.40
function Right(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}

// email valido     
function NM_EmailVal(theField, theMessage) {
    var value = document.getElementById(theField).value;
    //var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var reg = /^([A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)$/;

    if (value == "") return "";

    if (reg.test(value) == false) {
        return TratarMensagem(theMessage);
    } else {
        return "";
    }
}



// ----------------------------------------------------------------------------
// NIF,BI,CC
// ----------------------------------------------------------------------------

function NM_NIF(theField, theMessage) {
    var value = document.getElementById(theField).value;
    
    if (value == "") return "";
    
    if (NIF_is_valid(value)) {
        return ""        
    } else {
        return TratarMensagem(theMessage);
    }
}
function NM_BI(theField, theMessage, theField2) {
    var value = document.getElementById(theField).value;
    value = value.replace(/\s/g,''); // remover todos os espaços
    
    var chkDigit;
    if (theField2 != undefined) { 
        chkDigit = document.getElementById(theField2).value; 
    } else { 
        chkDigit = value.slice(-1); // na ultima posicao está o check digit
        value = value.slice(0, -1); // remove caracter na ultima posicao
    }
    
    if (value == "") return "";
    
    if (BI_is_valid(value, chkDigit)) {
        return ""        
    } else {
        return TratarMensagem(theMessage);
    }
}

function NM_CC(theField, theMessage, theField2, theField3) {
    var value = document.getElementById(theField).value;
    if (theField2 != undefined) value += document.getElementById(theField2).value;
    if (theField3 != undefined) value += document.getElementById(theField3).value;
    
    if (value == "") return "";
    
    if (CC_is_valid(value)) {
        return ""        
    } else {
        return TratarMensagem(theMessage);
    }
}

function NM_BICC(theField, theMessage) {
    var value = document.getElementById(theField).value;
    if (value.length > 10) {
        return NM_CC(theField, theMessage)
    } else {
        return NM_BI(theField, theMessage)
    }
}

	    function CC_is_valid(numFull) {
	        // Nota: adaptacao do "Algoritmo Validacao Luhn"
	        var total = 0;
	        numFull = numFull.replace(/\s/g,''); // remover todos os espaços
	        numFull = numFull.toUpperCase(); // forçar maiusculas
	        numFull = numFull.split("").reverse().join(""); // aplicar reverse

	        // verifica tamanhos; só aceita com 11 ou 12 caracteres
	        if ((numFull.length < 11) || (numFull.length > 12)) return false;
	        
	        //percorre numero da direita para a esquerda
	        for (var i = 0; i < numFull.length; i++) {

	            var sChar = numFull[i];
	            var iCharNum = 0;
	            var iCharCode = sChar.charCodeAt(0);

	            // converte letras em numeros (A=10, B=11 ... Y=34, Z=35)
	            if (iCharCode > 64) { iCharNum = iCharCode - 55 } else { iCharNum = parseInt(sChar) }
	            
	            if (i==1 || i==2) {
	                // no indice 1 ou 2, apenas aceita letras (A..Z)
	                if (iCharNum < 10) return false;
	            } else {
	                // nos outros indices, apenas aceita numeros (0..9)
	                if (iCharNum > 9) return false;
	            }

	            // a cada 2º elemento, multiplica-se por 2; se resultado maior ou igual a 10, subtrai-se 9
	            if (i % 2 == 1) {
	                iCharNum = iCharNum * 2;
	                if (iCharNum >= 10) iCharNum -= 9;
	            }

	            total += iCharNum;
	        }
	        
	        // se TOTAL for multiplo de 10, entao numero é valido
	        if (total % 10 == 0) { return true } else { return false }
	    }

	    function NIF_is_valid(nif) {
	        var c;

	        // verifica o tamanho
	        if (nif.length != 9) return false;

	        // valida primeiro digito
	        c = nif.charAt(0);
	        if ((c == '0') || (c == '3') || (c == '4') || (c == '7') || (c == '8')) return false;

	        // valida primeiro digito (apenas aceita iniciado por 1 ou 2)
	        if ((c == '5') || (c == '6') || (c == '9')) return false;

	        // algoritmo de validação
	        return AlgoritmoValidacao(nif)
	    }

	    function BI_is_valid(nbi, checkDigit) {
	        var BIformated;

	        nbi = nbi.toString();
	        checkDigit = checkDigit.toString(); // numero: 0..9
	        
	        // verifica tamanhos
	        if ((nbi.length < 7) || (nbi.length > 8)) return false;
	        if (checkDigit.length != 1) return false;
	        
	        // prepara o numero de BI formatado
	        if (nbi.length == 8)
	            BIformated = nbi + checkDigit;
	        else
	            BIformated = '0' + nbi + checkDigit;

	        // algoritmo de validação
	        return AlgoritmoValidacao(BIformated);
	    }

	    function AlgoritmoValidacao(numFormated) {
	        var ctl = 0;
	        var val = 0;

	        for (var pos = 0; pos < 8; ++pos) {
	            val += parseInt(numFormated.charAt(pos)) * (9 - pos);
	        }

	        if ((val % 11) != 0) ctl = (11 - val % 11) % 10;

	        return ctl == parseInt(numFormated.charAt(8))
	    }
// ----------------------------------------------------------------------------
// FIM: NIF,BI,CC
// ----------------------------------------------------------------------------
