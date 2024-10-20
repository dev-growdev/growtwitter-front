import emailjs from 'emailjs-com';
export const sendMail = async (templateParams: any) => {

emailjs.send('service_69wkhvg', 'template_cadastro', templateParams, '-bWQfYQkiTFxtiAOE')
.then((response) => {

  console.log('SUCCESS!', response.status, response.text);

 
}, (error) => {
  console.log('FAILED...', error);
 
});
};

export const sendMailReset = async (templateParams: any): Promise<any> => {

    emailjs.send('service_69wkhvg', 'template_reset', templateParams, '-bWQfYQkiTFxtiAOE')
    .then((response) => {
    
      return response;
    
     
    }, (error) => {
     return error;
     
    });
    };
    

export async function encryptEmailCesar(email:string, shift:number) {
    return email.split('').map(char => {
      const charCode = char.charCodeAt(0);
  
      if (charCode >= 97 && charCode <= 122) {
        return String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
      }
  
      if (charCode >= 65 && charCode <= 90) {
        return String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
      }
  
      return char;
    }).join('');
  }
  export async function decryptEmailCesar(encryptedEmail:string, shift:number) {
    return encryptedEmail.split('').map(char => {
      const charCode = char.charCodeAt(0);
  
      if (charCode >= 97 && charCode <= 122) {
        return String.fromCharCode(((charCode - 97 - shift + 26) % 26) + 97);
      }
  
      if (charCode >= 65 && charCode <= 90) {
        return String.fromCharCode(((charCode - 65 - shift + 26) % 26) + 65);
      }
  
      return char;
    }).join('');
  }
  