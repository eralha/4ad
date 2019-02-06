var VERSION = 1;            // 1 (div info), 2 (div info w/custom msg), 3 (single div element), 4 (alert box)
var DATE_FORMAT = "dd/mm/aaaa"; // global date format for the validators
var aspnetPrefixName = 'ctl00$ContentPlaceHolder1$' //(v2.00)
var aspnetPrefixId = 'ctl00_ContentPlaceHolder1_' //(v2.00)

// ----------------------------------------------------------------------------
// VALIDATORS-AUX
// ----------------------------------------------------------------------------
// v5.50 - ALS@10/08/2017
// ----------------------------------------------------------------------------

function formItem(index, validation, id, message, firstId, params) {
    this.index = index;
    this.validation = validation;
    this.id = id;
    this.message = message;
    this.firstId = firstId;
    this.params = params;

    this.clientId = id; //(v2.00)
}
formItem.prototype.destroy = function(){
    this.index = null;
    this.validation = null;
    this.id = null;
    this.message = null;
    this.firstId = null;
    this.params = null;

    this.clientId = null;
}


function validatorCore(config) {

    //GLOBAL VARS
    this.VALIDATOR_KEY; //used to store the current Validator Key (index + id + validation)
    this.HASH_VAL = new Hash();
    this.ARRVAL = new Array();

    //GLOBAL VARS (customize)
    this.FORM_ID = config.FORM_ID || "aspnetForm";         // the FORM id

    this.ADD_VALIDATORS_ALL = false; // true/false
    this.MOVE_UP = false; // true/false
    this.SHOW_ALERT = false; // true/false

}



//
// HASHTABLE implementation (v2.00)
//

function Hash() {
    this.length = 0;
    this.items = new Array();
    for (var i = 0; i < arguments.length; i += 2) {
        if (typeof (arguments[i + 1]) != 'undefined') {
            this.items[arguments[i]] = arguments[i + 1];
            this.length++;
        }
    }

    this.removeItem = function(in_key) {
        var tmp_previous;
        if (typeof (this.items[in_key]) != 'undefined') {
            this.length--;
            var tmp_previous = this.items[in_key];
            delete this.items[in_key];
        }

        return tmp_previous;
    }

    this.getItem = function(in_key) {
        return this.items[in_key];
    }

    this.setItem = function(in_key, in_value) {
        var tmp_previous;
        if (typeof (in_value) != 'undefined') {
            if (typeof (this.items[in_key]) == 'undefined') {
                this.length++;
            }
            else {
                tmp_previous = this.items[in_key];
            }

            this.items[in_key] = in_value;
        }

        return tmp_previous;
    }

    this.hasItem = function(in_key) {
        return typeof (this.items[in_key]) != 'undefined';
    }

    this.clear = function() {
        for (var i in this.items) {
            delete this.items[i]; //resets item to 'undefined'
        }

        this.length = 0;
    }

    //sort hashtable by key
    this.sort = function() {
        var keys = [];

        //build array with keys
        for (var key in this.items) {
            keys.push(key)
        }
        //sort keys
        keys.sort();

        //store values in temp array
        var temp = new Array();
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            temp[key] = this.getItem(key)
        }

        //clear and initialize hashtable
        this.clear();
        this.items = new Array();

        //rebuild hashtable (sorted by key)
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = temp[key];

            this.setItem(key, value)
        }

    }

} //function Hash


// Validate per Screen (v2.10)
validatorCore.prototype.validScreen = function(screenId) {
    // fields to validate in current screen
    var allValid = true;
    for (var x = 0; x < this.ARRVAL.length; x++) {
        //var scr = this.ARRVAL[x].params[0];
        var scr = this.ARRVAL[x].params[this.ARRVAL[x].params.length - 1]; //get last item in "params"
        if (scr == screenId) {
            var isValid = this.validateField($('#' + this.FORM_ID).find("#" + this.ARRVAL[x].id));
            if (!isValid) allValid = false;
        }
    }
    return allValid;
}

// Validate per Screen (v2.10)
validatorCore.prototype.computeStep = function(actionButton, hideStep, showStep, validateStep) {
    if (validateStep) {
        // goto next screen only if fields are valid
        $(actionButton).click(function() {
            if (this.validScreen(validateStep)) {
                $(hideStep).hide();
                //$('body,html').animate({ scrollTop: 145 }, 700);
                $(showStep).fadeIn(600);
            }
            $('body,html').animate({ scrollTop: 145 }, 700);
            return false;
        });
    } else {
        // goto previous screen (no validation required)
        $(actionButton).click(function() {
            $(hideStep).hide();
            $('body,html').animate({ scrollTop: 145 }, 700);
            $(showStep).fadeIn(600);
            return false;
        });
    }
}

//Show Validators (v2.00)
validatorCore.prototype.ShowValidatorsV2 = function() {
    var msg = "";

    //sort items in hashtable
    this.HASH_VAL.sort();

    //get each validator in the hashtable
    for (var i in this.HASH_VAL.items) {
        msg += this.HASH_VAL.getItem(i); // + '\n';
    }

    this.HASH_VAL.clear();
    if (msg.length > 0) this.ShowMessageV2(msg)
}

//Show Message (v2.00)
validatorCore.prototype.ShowMessageV2 = function(msg) {

    if (VERSION == 3) {
        //show in page
        $("#validatorMessage").html("<a name='validatorMessage'></a>");

        if (String(window.location).indexOf("#") != -1) {
            window.location = String(window.location).substring(0, String(window.location).indexOf("#")) + "#validatorMessage";
        } else {
            window.location = window.location + "#validatorMessage";
        }

        $("#validatorMessage").html('<div style=\"color:#ff0000;font-weight:bold;\">Valide o correcto preenchimento dos seguintes campos:</div><div style=\"color:#ff0000;padding:10px 0 0 0;\"><ul>' + msg + '</ul></div>');
    } else {
        //show in alert box 
        msg = msg.replace(/<\/li>/gi, "\n");
        msg = msg.replace(/<li>/gi, "- ");
        alert('Valide o correcto preenchimento dos seguintes campos:\n' + msg); //normal
    }
}

//
// HASHTABLE implementation (END)
//


validatorCore.prototype.v = function(validation, id, message) {
    if (typeof (id) != 'undefined') {
        var args = Array.prototype.slice.call(arguments); //convert function arguments to Array
        this.addValidator.apply(this, args);
    } else {
        this.addValidator('ReqVal', validation); //allow short version: v("txtNome")
    }
}

validatorCore.prototype.addValidator = function(validation, id, message) {
    // arguments[0] == validation
    // arguments[1] == id
    // arguments[2] == message

    var args = []; // empty array
    // copy all other arguments we want to "pass through" 
    for (var i = 3; i < arguments.length; i++) {
        args.push(arguments[i]);
    }

    // check if "id" is Array
    if (id instanceof Array) {
        //multiple fields

        var arrId = new Array();
        arrId = id

        for (var j = 0; j < arrId.length; j++) {
            var item = new formItem(this.ARRVAL.length, validation, arrId[j], message, arrId[0], args)
            this.ARRVAL[this.ARRVAL.length] = item;
        }
    } else {
        // single field
        var item = new formItem(this.ARRVAL.length, validation, id, message, null, args)
        this.ARRVAL[this.ARRVAL.length] = item;
    }

}

validatorCore.prototype.processMessage = function(defaultMsg, newMsg) {

    //if no CUSTOM message is set then returns DEFAULT message
    if (newMsg == undefined) newMsg = defaultMsg;
    if (newMsg == null) newMsg = defaultMsg;

    if (newMsg != '') {
        if (VERSION == 1) return defaultMsg
        if (VERSION == 2) return newMsg
        if (VERSION > 2) {
            //store validator in hashtable (v2.00)
            this.HASH_VAL.setItem(this.VALIDATOR_KEY, newMsg);
            return newMsg;
        }
    }
    return ''
}

// place here each case that has a VALIDATOR
validatorCore.prototype.buildMessage = function(field) {
    var msg = '';

    for (var x = 0; x < this.ARRVAL.length; x++) {
        var item = this.ARRVAL[x]

        //console.log(item)

        item.id = item.clientId; //(v2.00)

        if (item.id == field[0].id) {

            //set validator key (v2.00)
            VALIDATOR_KEY = item.index + item.id + item.validation;

            switch (item.validation) {
                case 'ReqVal':
                    msg += this.processMessage('obrigatório', NM_ReqVal(item.id, item.message)); break;
                case 'Number':
                    msg += this.processMessage('número', NM_Number(item.id, item.message, item.params[0])); break;
                case 'Decimal':
                    msg += this.processMessage('número decimal', NM_Decimal(item.id, item.message)); break;
                case 'Date':
                    var msgTemp = item.params[0];
                    if (msgTemp == undefined) msgTemp = DATE_FORMAT;
                    msg += this.processMessage(msgTemp, NM_Date(item.id, item.message, item.params[0])); break;
                case 'Date3':
                    var tempArr = this.buildGroupArray(x);
                    if (tempArr.length == 0) { msg += ''; break; }
                    msg += this.processMessage('selecione', NM_Date3(tempArr, item.message, item.params[0], item.params[1], item.params[2])); break;


                case 'PastDate':
                    msg += this.processMessage('data já passou', NM_DateInterval(item.id, item.message, "", "31-12-2099")); break;
                case 'FutureDate':
                    msg += this.processMessage('data futura inválida', NM_DateInterval(item.id, item.message, "01-01-1801", "")); break;


                case 'Phone':
                    msg += this.processMessage('nº telefone', NM_Phone(item.id, item.message)); break;
                case 'CodPostal':
                    msg += this.processMessage('nnnn-nnn', NM_CP(item.id, item.message)); break;
                case 'CP':
                    msg += this.processMessage('nnnn-nnn', NM_CP(item.id, item.message)); break;
                case 'CodPostal43':
                    var tempArr = this.buildGroupArray(x);
                    if (tempArr.length == 0) { msg += ''; break; }
                    msg += this.processMessage('selecione', NM_CP43(tempArr, item.message)); break;
                case 'CP43':
                    var tempArr = this.buildGroupArray(x);
                    if (tempArr.length == 0) { msg += ''; break; }
                    msg += this.processMessage('selecione', NM_CP43(tempArr, item.message)); break;
                case 'EmailVal':
                    msg += this.processMessage('email inválido', NM_EmailVal(item.id, item.message)); break;
                case 'EmailConf':
                    msg += this.processMessage('email confirmação', NM_EmailConf(item.id, item.message, item.params[0])); break;
                case 'Combo':
                    msg += this.processMessage('selecione', NM_Combo(item.id, item.message)); break;
                case 'Radio':
                    var tempArr = this.buildGroupArray(x);
                    if (tempArr.length == 0) { msg += ''; break; }
                    msg += this.processMessage('selecione', NM_Radio(tempArr, item.message)); break;
                //Radio2    
                case 'DateInterval':
                    msg += this.processMessage('data inválida', NM_DateInterval(item.id, item.message, item.params[0], item.params[1])); break;
                case 'Matricula':
                    msg += this.processMessage('xx-xx-xx', NM_Matricula(item.id, item.message)); break;
                case 'Check':
                    var tempArr = this.buildGroupArray(x);
                    if (tempArr.length == 0) { msg += ''; break; }
                    msg += this.processMessage('selecione', NM_Check(tempArr, item.message, item.params[0])); break;
                case 'CheckCustom':
                    // v2.11
                    var tempArr = this.buildGroupArray(x);
                    if (tempArr.length == 0) { msg += ''; break; }
                    msg += this.processMessage('selecione', NM_CheckCustom(tempArr, item.message)); break;
                case 'PhoneEmail':
                    // v2.11
                    var tel = NM_Phone(item.id, item.message);
                    var eml = NM_EmailVal(item.id, item.message);
                    var newMsg = "";
                    if ((tel != '') && (eml != '')) newMsg = item.message;
                    msg += this.processMessage('telefone/email', newMsg); break;
                case 'TextLimit':
                    msg += this.processMessage('excedeu limite caracteres', NM_TextLimit(item.id, item.message, item.params[0])); break;
                case 'WordLimit':
                    if (item.params[1] != undefined) {
                        msg += this.processMessage('limitado ' + item.params[1] + ' palavras', NM_WordLimit(item.id, item.message, item.params[0], item.params[1])); break;
                    } else {
                        msg += this.processMessage('excedeu limite palavras', NM_WordLimit(item.id, item.message, item.params[0], item.params[1])); break;
                    }
                case 'WordLimitCounter': //v1.21
                    this.DisplayCounter(item.id, item.params[1]);

                    if (item.params[1] != undefined) {
                        msg += this.processMessage('limitado ' + item.params[1] + ' palavras', NM_WordLimit(item.id, item.message, item.params[0], item.params[1])); break;
                    } else {
                        msg += this.processMessage('excedeu limite palavras', NM_WordLimit(item.id, item.message, item.params[0], item.params[1])); break;
                    }
                case 'Range':
                    msg += this.processMessage('fora intervalo valores', NM_Range(item.id, item.message, item.params[0], item.params[1])); break;

                case 'FileExt': //v1.20
                    //params[0]: list of allowed extensions (ex: "jpg,jpeg,png,gif")
                    msg += this.processMessage('extensão ficheiro inválida (insira ' + item.params[0] + ')', NM_FileExt(item.id, item.message, item.params[0])); break;

                case 'Exists': //v1.23
                    //params[0]: text to check if exists
                    msg += this.processMessage('erro funcao custom', NM_Exists(item.id, item.message, item.params[0])); break;

                case 'Compare': //v2.20
                    //params[0]: field to compare to
                    //params[1]: comparison sign (default: "=")
                    msg += this.processMessage('!', NM_Compare(item.id, item.message, item.params[0], item.params[1])); break;

                case 'ReqValGroup': //v2.50
                    var tempArr = this.buildGroupArray(x);
                    if (tempArr.length == 0) { msg += ''; break; }
                    msg += this.processMessage('obrigatório (1)', NM_ReqValGroup(tempArr, item.message)); break;


                case 'NIF':
                    msg += this.processMessage('nif', NM_NIF(item.id, item.message)); break;
                case 'BI':
                    msg += this.processMessage('bi', NM_BI(item.id, item.message, item.params[0])); break;
                case 'CC':
                    msg += this.processMessage('cc', NM_CC(item.id, item.message, item.params[0], item.params[1])); break;
                case 'BICC':
                    msg += this.processMessage('bicc', NM_BICC(item.id, item.message)); break;

            } //switch

        } //if

    } //for

    //remove <li> das mensagens
    //msg = msg.replace(/<\/li>/gi, "");
    //msg = msg.replace(/<li>/gi, "");

    return msg;

} //END:BuildMessage

//force element redraw
$.fn.redraw = function() {
    $(this).each(function() {
        var redraw = this.offsetHeight;
    });
};

//v1.21 (WordLimitCounter)
validatorCore.prototype.DisplayCounter = function(fieldId, upperBound) {
    var value = $("#" + fieldId).val();

    //count words
    var words_total = 0;
    arr = value.replace(/\s/g, ' '); arr = arr.split(' ');
    for (i = 0; i < arr.length; i++) {
        if (arr[i].length > 0) words_total++;
    }

    //decreases upperBound value
    if (upperBound != undefined) {
        words_total = upperBound - words_total;
        if (words_total < 0) words_total = 0;
    }

    //force element redraw
    $("#" + this.removePrefix(fieldId) + "Counter").redraw();

    return $("#" + this.removePrefix(fieldId) + "Counter").html(words_total);
}

validatorCore.prototype.buildGroupArray = function(idx) {
    var tempArr = new Array();
    var first = this.ARRVAL[idx].firstId;
    for (var y = 0; y < this.ARRVAL.length; y++) {
        if (this.ARRVAL[y].firstId == first) { tempArr[tempArr.length] = this.ARRVAL[y].clientId; }
    }
    return tempArr
}

validatorCore.prototype.applyToGroupOfField = function(field, operation, msg) {
    var first = null;

    //search for first item in the group
    for (var y = 0; y < this.ARRVAL.length; y++) {
        if (this.ARRVAL[y].clientId == field[0].id) first = this.ARRVAL[y].firstId;
    }

    //if first item is not null, remove error from other items in the group
    if (first != null) {
        for (var y = 0; y < this.ARRVAL.length; y++) {
            if (this.ARRVAL[y].firstId == first) {
                var firstField = this.ARRVAL[y].clientId

                if (operation == 'add') {
                    this.toggleError(firstField, true)
                    this.toggleErrorMessage(firstField, msg)
                } else {
                    this.toggleError(firstField, false)
                    this.toggleErrorMessage(firstField)
                }
            }
        }
    }
}

//(v2.00)
validatorCore.prototype.removePrefix = function(id) {
    return id.replace(aspnetPrefixId, "")
}

validatorCore.prototype.validateField = function(field) {

    var msg = this.buildMessage(field);

    if (this.ignoreValidator(this.removePrefix(field[0].id))) msg = ''; //(v2.00)

    if (msg != '') {
        this.applyToGroupOfField(field, 'add', msg);

        this.toggleError(field, true);
        if (VERSION > 2) return false; //(v2.00)
        this.toggleErrorMessage(field[0].id, msg)
        return false;
    } else {
        this.applyToGroupOfField(field);

        this.toggleError(field, false);
        this.toggleErrorMessage(field[0].id)
        return true;
    }
}

validatorCore.prototype.destroy = function() {

    $('#' + this.FORM_ID).find("[id*='Info']").remove();
    $('#' + this.FORM_ID).find('.error').removeClass('error');

    for(i in this.ARRVAL){
        $('#' + this.FORM_ID).find("#" + this.ARRVAL[i].clientId).unbind('blur');
        $('#' + this.FORM_ID).find("#" + this.ARRVAL[i].clientId).unbind('keyup');

        this.ARRVAL[i].destroy();
        this.ARRVAL[i] = null;
    }

    this.ARRVAL = null;
    delete this.ARRVAL;
}

//v99
validatorCore.prototype.toggleError = function(field, showError) {
    if (showError) { $(field).addClass("error") } else { $(field).removeClass("error") }
}

// (v4.40) add error class to tinymce textarea
validatorCore.prototype.toggleErrorMessage = function(objId, msg) {

    //toggle class in INFO element
    if (!msg) {
        $('#' + this.FORM_ID).find("#" + this.removePrefix(objId) + "Info").html("").hide().removeClass("error");
    } else {
        $('#' + this.FORM_ID).find("#" + this.removePrefix(objId) + "Info").html(msg).show().addClass("error");
    }


    /*
    //check for errors in tinyMCE textarea 
    if (!tinyMCE.get(objId)) return false;

            var elem = tinyMCE.get(objId).getBody();

            //toggle class in tinyMCE element
    if (!msg) {
    $(elem).removeClass("error") //add ERROR class to editor
    $("#" + objId).parent().find(".mceLayout").removeClass("error"); //add ERROR class to table
    } else {
    $(elem).addClass("error") //add ERROR class to editor
    $("#" + objId).parent().find(".mceLayout").addClass("error"); //add ERROR class to table
    }
    */
}



validatorCore.prototype.validateAllFields = function() {
    var allValid = true;
    var flagFocus = false; // (v4.30)

    this.HASH_VAL.clear(); //clear hashtable (v2.00)

    for (var x = 0; x < this.ARRVAL.length; x++) {
        var isValid = this.validateField($('#' + this.FORM_ID).find("#" + this.ARRVAL[x].clientId));
        if (!isValid && !flagFocus) { flagFocus = true; $('#' + this.FORM_ID).find("#" + this.ARRVAL[x].clientId).focus(); } //focus on first invalid field (v4.30)
        if (!isValid) allValid = false;
    }

    if (VERSION > 2) this.ShowValidatorsV2() // (v2.00)

    if ((!allValid) && this.SHOW_ALERT) this.showAlertMessage();

    return allValid;
}




//(v4.30)
validatorCore.prototype.showAlertMessage = function() {

    //check if jQueryUI is loaded
    if (!($.ui)) {
        //not loaded
        alert('ATENÇÃO!\nConfirme o correto preenchimento dos campos indicados!')
        return
    }

    //render Custom Alert Message (requires jQueryUI)
    var form = $('#' + this.FORM_ID);
    var alertbox = this.FORM_ID + "_alertbox"

    if ($("#" + alertbox).length == 0) {
        //add message container
        form.after("<div id='" + alertbox + "' title='Atenção!' style='display:none;'>Confirme o correto preenchimento dos campos indicados.</div>");

        //setup alert box
        $("#" + alertbox).dialog({
            autoOpen: false,
            width: 250,
            height: 100,
            dialogClass: 'mymodal',
            //open: function(event, ui) { $(".ui-dialog-titlebar-close", ui).hide(); }, //hide close button
            //beforeClose: function(event, ui) { $('.modal').hide(); },
            //buttons: { 'Ok': function() { $(this).dialog("close"); } }, //add button
            modal: true
        });

        $(".mymodal").css("font-size", "12px").css("z-index", "9999");
    }

    $(".ui-dialog-titlebar-close").css("visibility", "hidden"); //hide close button
    $("#" + alertbox).dialog("open");
    $(".ui-widget-overlay").css("background", "black"); //background color for overlay (only works after Dialog is open)
    $(".mymodal").delay(2000).fadeOut(500);
    setTimeout(function() { $("#" + alertbox).dialog("close"); }, 2500);

}

validatorCore.prototype.setupForm = function() {
    var sup = this;

    //setupScreen();

    //global vars
    var form = $("#" + this.FORM_ID);

    //attach events
    for (var i = 0; i < this.ARRVAL.length; i++) {

        // check if element exists
        if ($("#" + this.ARRVAL[i].id).length == 0) {
            //element not found

            // check if element with ASP.NET prefix exists
            if ($("#" + aspnetPrefixId + this.ARRVAL[i].id).length == 0) {
                //DEBUG:element not found
                //alert("ERRO: o campo '" + this.ARRVAL[i].id + "' não foi encontrado!");
            } else {
                //element found; adds PREFIX to ID in the array
                this.ARRVAL[i].clientId = aspnetPrefixId + this.ARRVAL[i].clientId;
                if (this.ARRVAL[i].firstId != null) this.ARRVAL[i].firstId = aspnetPrefixId + this.ARRVAL[i].firstId;
            }
        }


        //On blur
        $(form).find("#" + this.ARRVAL[i].clientId).blur(function() { sup.validateField($(this)) });
        //On key press
        $(form).find("#" + this.ARRVAL[i].clientId).keyup(function() { sup.validateField($(this)) });

    }

    form.submit(function() {
        sup.ScrollUp();
        return sup.validateAllFields(form);
    });

    //form reset
    form.on("reset", function() {
        //hide validators when form resets
        for (var x = 0; x < sup.ARRVAL.length; x++) {
            var field = $("#" + sup.ARRVAL[x].clientId)
            sup.applyToGroupOfField(field);
            field.removeClass("error");
            //$("#" + removePrefix(field[0].id) + "Info").html("").hide().removeClass("error");
            sup.toggleErrorMessage(field[0].id)
        }
    });

}

//v2.00
//COPIAR ESTA FUNCAO PARA A PAGINA DO FORM
validatorCore.prototype.ignoreValidator = function(objId) {

    // usage example:

    // // se "rdoIrmaoFrequentarNao" tiver checkado ignora validator do "txtNumeroIrmao"
    // if (objId == 'txtNumeroIrmao') {
    //      if ($("#rdoIrmaoFrequentarNao").attr("checked") == 'checked') { return true; }
    // }

    return false
}

//goto top of the page
validatorCore.prototype.ScrollUp = function() {
    if (this.MOVE_UP) {
        $('html, body').animate({
            scrollTop: $('body').offset().top
        }, 1500);
    }
}


// ----------------------------------------------------------------------------
// MODULE : html injection (setupScreen)
// ----------------------------------------------------------------------------
validatorCore.prototype.vSetupFields = function() {

    var sup = this;

    var form = this.FORM_ID;

    $("#" + form + " :input[type=text]").each(function() {
        sup.vAddParams(this);

        var id = $(this).attr("id");
        if (this.ADD_VALIDATORS_ALL) this.v("ReqVal", id, "obrigatório"); //add ReqVal
        if (!($(this).attr("maxlength"))) $(this).attr("maxlength", "250"); // set default MAXLENGTH in TEXT fields to 250
    });

    $("#" + form + " :input[type=password]").each(function() {
        sup.vAddParams(this);

        var id = $(this).attr("id");
        if (this.ADD_VALIDATORS_ALL) this.v("ReqVal", id, "obrigatório"); //add ReqVal
        if (!($(this).attr("maxlength"))) $(this).attr("maxlength", "250"); // set default MAXLENGTH in TEXT fields to 250
    });

    $("#" + form + " textarea").each(function() {
        sup.vAddParams(this);

        var id = $(this).attr("id");
        if (this.ADD_VALIDATORS_ALL) this.v("ReqVal", id, "obrigatório"); //add ReqVal
    });

    $("#" + form + " select").each(function() {
        sup.vAddParams(this);
    });

    $("#" + form + " :input[type=checkbox]").each(function() {
        var id = $(this).attr("id");

        sup.vAddLabelFor(this);

        //$(this).before("<div id='" + id + "Info'></div>"); //add Span INFO
        $(this).attr("name", id);

    });

    $("#" + form + " :input[type=radio]").each(function() {
        var id = $(this).attr("id");

        sup.vAddLabelFor(this);

        //$(this).before("<div id='" + id + "Info'></div>"); //add Span INFO
    });

}

//check if element is LABEL; if is LABEL, set FOR if it doesn't exists
validatorCore.prototype.vAddLabelFor = function(o) {
    var id = $(o).attr("id");
    var next = $(o).next($("label"));
    var prev = $(o).prev($("label"));

    //check NEXT    
    if (next.is("label")) {
        if (!(next.attr("for"))) next.attr("for", id)
    }

    //check PREVIOUS
    if (prev.is("label")) {
        if (!(prev.attr("for"))) prev.attr("for", id)
    }
}

//v99
function vAddParams_LIXO(o) {
    var id = $(o).attr("id");

    $(o).prev($("label")).attr("for", id); //add FOR to Label element
    $(o).wrap("<div class='valbox'></div>"); //place element inside DIV
    $(o).after("<div id='" + id + "Info'></div>"); //add Span INFO
    $(o).attr("name", id);
}

//v99
validatorCore.prototype.vAddParams = function(o) {
    var id = $(o).attr("id");

    $(o).parents("li").find("label").first().attr("for", id); //add FOR to Label element

    //handle VALBOX
    if ($(o).parent().is("div")) {
        $(o).parent().addClass("valbox");
    } else {
        $(o).wrap("<div class='valbox'></div>"); //place element inside DIV
    }

    $(o).after("<div id='" + id + "Info'></div>"); //add Span INFO
    $(o).attr("name", id);
}

validatorCore.prototype.init = function() {
    if (this.ARRVAL.length > 0) this.vSetupFields(); //(v4.30)
    this.setupForm();
}

/*
//place this function in the ASPX page
function vAddValidators() {
//place here the required validators
}

$(document).ready(function() {
vAddValidators();
if (this.ARRVAL.length > 0) vSetupFields(); //(v4.30)
if (typeof setupForm == 'function') { setupForm(); }
});
*/

//
// MODULE : html injection (END)
//

/*
* Importa as funções de validação e exporta o modulo que vai trabalhar com os validatorsCore
* O nosso modulo apenas torna publicas as funções:
* v(validation, id, message)
* addValidator(validation, id, message)
* validateAllFields()
*/
define('module/validators/validators-aux', ['module/validators/validators-val'], function() {

    /* 5.10
     * Novos parametros para configuração
          FORM_ID: Id do elemento html form
          ajaxSubmit: Se o submit deste formulário vai ser feito por ajax
          ajaxUrl: Url para enviar o pedido ajax
          ajaxMethod: Se quisermos atribuir um metodo específico de pedido HTTP GET OR POST, POST por defeito
          ajaxComplete: Função que precisemos chamar após o pedido estar completo
          ajaxError: Função que precisemos chamar se o pedido gerar erro
         }
     */
    function Module(config) {

        if(window.validatorLangBuildMessage && window.validatorLangProcessMessage){
            validatorCore.prototype.buildMessage = window.validatorLangBuildMessage;
            validatorCore.prototype.processMessage = window.validatorLangProcessMessage;
        }

        this.core = new validatorCore(config);
        this.formID = this.core.FORM_ID;
        this._form = $('#' + this.core.FORM_ID);

        this.ajaxComplete = config.ajaxComplete || null;
        this.ajaxError = config.ajaxError || null;

        var sup = this;

        if(config.ajaxSubmit == true){
            $(this._form).submit(function(){

                console.log('val submit');

                if(config.ajaxMethod){
                    sup.ajaxSubmit(config.ajaxUrl, config.ajaxMethod);
                }else{
                    sup.ajaxSubmit(config.ajaxUrl);
                }

                return false;
            });
        }
    }

    Module.prototype.init = function() {
        this.core.init();
    }

    Module.prototype.v = function(validation, id, message) {
        return this.core.v(validation, id, message);
    }

    Module.prototype.addValidator = function() {
        return this.core.addValidator.apply(this.core, arguments);
    }

    Module.prototype.validateAllFields = function() {
        return this.core.validateAllFields();
    }

    Module.prototype.destroy = function() {
        if(!this.core) { return; }

        this.core.destroy();

        this._form = null;
        this.core = null;
        delete this.core;

        console.log('validators destroyed');

        return null;
    }

    /* 5.10
     * Faz o submit do form por Ajax e mostra mensagens de loading e successo
     * Dentro do form terá que ter as seguintes DIV's com as seguintes classes:
     * 1 'loading__view': Irá ficar visível enquanto o form carrega 
     * 2 'SUCCESS__view': Irá ficar visível quando o form é submetido com successo
     * 3 '{{ESTADO}}__view': O serviço ajax pode retornar outros estados, basta cria div com prefixo do estado
     */
    Module.prototype.ajaxSubmit = function(url) {
        var method = (arguments[1]) ? arguments[1] : 'POST';
        var form = this._form;
        var sup = this;

        if(this.validateAllFields()){
            var formData = this.getFormData();

            $(form).find('.form__view').addClass('hidden');
            $(form).find('.loading__view').removeClass('hidden');

            $.ajax({
              type : method,
              url: url,
              data: formData,
              dataType : 'json'
            }).done(function(data) {
              $(form).find('.loading__view').addClass('hidden');
              $(form).find('.'+data[0].status+'__view').removeClass('hidden');
              $(form).find('.form__view').removeClass('hidden');

              if(data[0].status == 'SUCCESS'){ $(form)[0].reset(); }

              //se existir callback associado chamamos
              if(typeof sup.ajaxComplete == 'function'){ sup.ajaxComplete(); }
              
              setTimeout(function(){
                $(form).find('.'+data[0].status+'__view').addClass('hidden');
              }, 2000);
            });
        }
    }

    Module.prototype.getFormData = function() {
        var data = {};
        var form = $('#' + this.core.FORM_ID);

        $(form).find('input[type="text"],input[type="hidden"]').each(function() {
            var id = $(this).attr('id');
            data[id] = $(this).val();
        });
        $(form).find('input[type="checkbox"]').each(function() {
            var id = $(this).attr('id');
            data[id] = $(this).is(':checked');
        });
        $(form).find('input[type="radio"]').each(function() {
            if($(this).is(':checked')){
                var id = $(this).attr('name');
                data[id] = $(this).val();
            }
        });
        $(form).find('textarea').each(function() {
            var id = $(this).attr('id');
            data[id] = $(this).val();
        });
        $(form).find('select').each(function() {
            var id = $(this).attr('id');
            data[id] = $(this).val();
        });

        return data;
    }

    /* 
    ----------------------------------------------------------------------------
    + MODULE : html injection (setupScreen)

    Resumo funcoes:
    + up

    ----------------------------------------------------------------------------
    */

    return Module;
});