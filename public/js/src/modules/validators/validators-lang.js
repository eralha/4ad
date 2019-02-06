define('module/validators/validators-lang', [], function () {
    
});

// ----------------------------------------------------------------------------
// VALIDATORS-LANG
// ----------------------------------------------------------------------------
// v1.10 - ALS@10/08/2017
// ----------------------------------------------------------------------------
// NOTA: baseado na versao v5.01 - ALS@21-10-2015 do VALIDATORS-AUX
// ----------------------------------------------------------------------------
//
// Add multiple languages to form validators.
//
// OVERRIDES functions from 'validators-aux.js'; must be called after it.
// - processMessage(defaultMsg, newMsg)
// - buildMessage(field)
//

function setDefaultMsgLang(item) {

    var defaultMsg = window.ARR_MESSAGES[item.validation][window.LANG]

    // set here the messages with params (special cases)
    switch (item.validation) {
        case 'Date':
            //params[0]: accepted date format (ex: "dd/mm/aaaa")
            defaultMsg = item.params[0];
            if (defaultMsg == undefined || defaultMsg == '') defaultMsg = DATE_FORMAT;
            break;
        case 'WordLimit':
        case 'WordLimitCounter':
            //params[1]: number of words (ex: 50)
            if (item.params[1] != undefined) {
                defaultMsg = defaultMsg[0].replace('{0}', item.params[1])
            } else {
                defaultMsg = defaultMsg[1]
            }
            break;
        case 'FileExt':
            //params[0]: list of allowed extensions (ex: "jpg,jpeg,png,gif")
            defaultMsg = defaultMsg.replace('{0}', item.params[0])
            break;
    }

    return defaultMsg
}
// LANGUAGE PACK:END


//OVERRIDE
var _processMessage = function(item, newMsg) {

    // LANGUAGE PACK
    defaultMsg = setDefaultMsgLang(item)

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


//OVERRIDE (for each case, replace PT message by 'item' variable)
// place here each case that has a VALIDATOR
var _buildMessage = function(field) {
    var msg = '';

    for (var x = 0; x < this.ARRVAL.length; x++) {
        var item = this.ARRVAL[x]



        item.id = item.clientId; //(v2.00)

        if (item.id == field[0].id) {

            //set validator key (v2.00)
            VALIDATOR_KEY = item.index + item.id + item.validation;

            switch (item.validation) {
                case 'ReqVal':
                    msg += this.processMessage(item, NM_ReqVal(item.id, item.message)); break;
                case 'Number':
                    msg += this.processMessage(item, NM_Number(item.id, item.message, item.params[0])); break;
                case 'Decimal':
                    msg += this.processMessage(item, NM_Decimal(item.id, item.message)); break;
                case 'Date':
                    msg += this.processMessage(item, NM_Date(item.id, item.message, item.params[0])); break;
                case 'Date3':
                    var tempArr = this.buildGroupArray(x);
                    if (tempArr.length == 0) { msg += ''; break; }
                    msg += this.processMessage(item, NM_Date3(tempArr, item.message, item.params[0], item.params[1], item.params[2])); break;

                case 'PastDate':
                    msg += this.processMessage(item, NM_DateInterval(item.id, item.message, "", "31-12-2099")); break;
                case 'FutureDate':
                    msg += this.processMessage(item, NM_DateInterval(item.id, item.message, "01-01-1801", "")); break;

                case 'Phone':
                    msg += this.processMessage(item, NM_Phone(item.id, item.message)); break;
                case 'CodPostal':
                    msg += this.processMessage(item, NM_CP(item.id, item.message)); break;
                case 'CP':
                    msg += this.processMessage(item, NM_CP(item.id, item.message)); break;
                case 'CodPostal43':
                    var tempArr = this.buildGroupArray(x);
                    if (tempArr.length == 0) { msg += ''; break; }
                    msg += this.processMessage(item, NM_CP43(tempArr, item.message)); break;
                case 'CP43':
                    var tempArr = this.buildGroupArray(x);
                    if (tempArr.length == 0) { msg += ''; break; }
                    msg += this.processMessage(item, NM_CP43(tempArr, item.message)); break;
                case 'EmailVal':
                    msg += this.processMessage(item, NM_EmailVal(item.id, item.message)); break;
                case 'EmailConf':
                    msg += this.processMessage(item, NM_EmailConf(item.id, item.message, item.params[0])); break;
                case 'Combo':
                    msg += this.processMessage(item, NM_Combo(item.id, item.message)); break;
                case 'Radio':
                    var tempArr = this.buildGroupArray(x);
                    if (tempArr.length == 0) { msg += ''; break; }
                    msg += this.processMessage(item, NM_Radio(tempArr, item.message)); break;
                //Radio2     
                case 'DateInterval':
                    msg += this.processMessage(item, NM_DateInterval(item.id, item.message, item.params[0], item.params[1])); break;
                case 'Matricula':
                    msg += this.processMessage(item, NM_Matricula(item.id, item.message)); break;
                case 'Check':
                    var tempArr = this.buildGroupArray(x);
                    if (tempArr.length == 0) { msg += ''; break; }
                    msg += this.processMessage(item, NM_Check(tempArr, item.message, item.params[0])); break;
                case 'CheckCustom':
                    // v2.11
                    var tempArr = this.buildGroupArray(x);
                    if (tempArr.length == 0) { msg += ''; break; }
                    msg += this.processMessage(item, NM_CheckCustom(tempArr, item.message)); break;
                case 'PhoneEmail':
                    // v2.11
                    var tel = NM_Phone(item.id, item.message);
                    var eml = NM_EmailVal(item.id, item.message);
                    var newMsg = "";
                    if ((tel != '') && (eml != '')) newMsg = item.message;
                    msg += this.processMessage(item, newMsg); break;
                case 'TextLimit':
                    msg += this.processMessage(item, NM_TextLimit(item.id, item.message, item.params[0])); break;
                case 'WordLimit':
                    msg += this.processMessage(item, NM_WordLimit(item.id, item.message, item.params[0], item.params[1])); break;
                    
                    //if (item.params[1] != undefined) {
                    //    msg += this.processMessage('limitado ' + item.params[1] + ' palavras', NM_WordLimit(item.id, item.message, item.params[0], item.params[1])); break;
                    //} else {
                    //    msg += this.processMessage('excedeu limite palavras', NM_WordLimit(item.id, item.message, item.params[0], item.params[1])); break;
                    //}
                case 'WordLimitCounter': //v1.21
                    this.DisplayCounter(item.id, item.params[1]);
                    msg += this.processMessage(item, NM_WordLimit(item.id, item.message, item.params[0], item.params[1])); break;

                case 'Range':
                    msg += this.processMessage(item, NM_Range(item.id, item.message, item.params[0], item.params[1])); break;

                case 'FileExt': //v1.20
                    //params[0]: list of allowed extensions (ex: "jpg,jpeg,png,gif")
                    msg += this.processMessage(item, NM_FileExt(item.id, item.message, item.params[0])); break;

                case 'Exists': //v1.23
                    //params[0]: text to check if exists
                    msg += this.processMessage(item, NM_Exists(item.id, item.message, item.params[0])); break;

                case 'Compare': //v2.20
                    //params[0]: field to compare to
                    //params[1]: comparison sign (default: "=")
                    msg += this.processMessage(item, NM_Compare(item.id, item.message, item.params[0], item.params[1])); break;

                case 'ReqValGroup': //v2.50
                    var tempArr = this.buildGroupArray(x);
                    if (tempArr.length == 0) { msg += ''; break; }
                    msg += this.processMessage(item, NM_ReqValGroup(tempArr, item.message)); break;

                case 'NIF':
                    msg += this.processMessage(item, NM_NIF(item.id, item.message)); break;
                case 'BI':
                    msg += this.processMessage(item, NM_BI(item.id, item.message, item.params[0])); break;
                case 'CC':
                    msg += this.processMessage(item, NM_CC(item.id, item.message, item.params[0], item.params[1])); break;
                case 'BICC':
                    msg += this.processMessage(item, NM_BICC(item.id, item.message)); break;

            } //switch

        } //if

    } //for

    //remove <li> das mensagens
    //msg = msg.replace(/<\/li>/gi, "");
    //msg = msg.replace(/<li>/gi, "");

    return msg;

} //END:BuildMessage

function override_core(){
    // LANGUAGE PACK
    url = window.location.href
    window.LANG = 0 //default language: PT

    if (url.indexOf("/en/") >= 0 || url.indexOf("/eng/") >= 0) window.LANG = 1 // language: EN

    window.ARR_MESSAGES = {
        'ReqVal': ['obrigatório', 'mandatory'],
        'Number': ['número', 'wrong format'],
        'Decimal': ['número decimal', 'wrong format'],
        'Date': ['', ''],
        'Date3': ['selecione', 'wrong format'],
        'PastDate': ['data já passou', 'wrong format'],
        'FutureDate': ['data futura inválida', 'wrong format'],

        'Phone': ['nº telefone', 'phone number'],
        'CodPostal': ['nnnn-nnn', 'nnnn-nnn'],
        'CP': ['nnnn-nnn', 'nnnn-nnn'],
        'CodPostal43': ['selecione', 'select'],
        'CP43': ['selecione', 'select'],

        'EmailVal': ['email inválido', 'wrong format'],
        'EmailConf': ['email confirmação', 'same as email'],
        'Combo': ['selecione', 'pick one'],
        'Radio': ['selecione', 'pick one'],

        'DateInterval': ['data inválida', 'wrong format'],
        'Matricula': ['xx-xx-xx', 'xx-xx-xx'],
        'Check': ['selecione', 'please check'],
        'CheckCustom': ['selecione', 'please check'],

        'PhoneEmail': ['telefone/email', 'phone/email'],
        'TextLimit': ['excedeu limite caracteres', 'character limit exceeded'],
        'WordLimit': [['limitado {0} palavras', 'excedeu limite palavras'], ['limited to {0} words', 'word limit exceeded']],
        'WordLimitCounter': [['limitado {0} palavras', 'excedeu limite palavras'], ['limited to {0} words', 'word limit exceeded']],

        'Range': ['fora intervalo valores', 'out of range'],
        'FileExt': ['extensão ficheiro inválida (insira {0})', 'invalid file extension (insert {0})'],
        'Exists': ['erro funcao custom', 'error'],
        'Compare': ['!', '!'],
        'ReqValGroup': ['obrigatório (1)', 'mandatory (1)'],

        'NIF': ['formato inválido', 'wrong format'],
        'BI': ['formato inválido', 'wrong format'],
        'CC': ['formato inválido', 'wrong format'],
        'BICC': ['formato inválido', 'wrong format']        
    }

    validatorCore.prototype.buildMessage = _buildMessage;
    validatorCore.prototype.processMessage = _processMessage;

    window.validatorLangBuildMessage = _buildMessage;
    window.validatorLangProcessMessage = _processMessage;
}

var idInterval;

if(typeof validatorCore == 'function'){
    override_core();
}else{
    idInterval = setInterval(function(){
        if(validatorCore){
            override_core();
            clearInterval(idInterval);
        }
    }, 10);
}