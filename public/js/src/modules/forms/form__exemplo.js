define('module/forms/form__exemplo', ['module/validators/validators-aux', 'module/validators/validators-lang'], function (validators){
    
    function module(elem){

        var formID = 'aspnetForm';

        var validator = new validators({  FORM_ID: 'aspnetForm' });
        validator.addValidator("ReqVal", "txtNome");
        validator.addValidator("ReqVal", "txtEmail");
        validator.addValidator("EmailVal", "txtEmail");
        validator.addValidator("Combo", "cboPais");
        validator.addValidator("Combo", "cboTipo");

        validator.addValidator("ReqVal", "txtTexto");
        
        validator.init();

        /*
        $('#'+formID).submit(function(){
            var form = this;

            if(validator.validateAllFields()){
                var formData = validator.getFormData();
            }

            return false;
        });
        */
    }

    return module;

});
