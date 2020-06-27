import { AbstractControl } from '@angular/forms';

export class SignupFieldValidators {

    static passwordsShouldMatch(control: AbstractControl){
        let password = control.get('password');
        let confirmPassword = control.get('confirmPassword');
        
        if(password && confirmPassword){
            if(password.value !== confirmPassword.value)
            return { passwordsShouldMatch: true }
        }
        
        return null;    
    }

}   