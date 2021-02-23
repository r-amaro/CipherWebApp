function init() {
    document.getElementById('encryptB').addEventListener('click', encrypt);
    document.getElementById('decryptB').addEventListener('click', decrypt);
}


function encrypt(ev){
    ev.preventDefault();
    let ret = validateP();
    if(ret){
        var key = document.getElementById("key").value;
        let plain = document.getElementById("ptext").value;
        var down = true;
        var row = 0;

        //Array is set to length of plaintext.
        var array = new Array(plain.length);

        //Creates the 2D Array depending on size of plaintext & key.
        for(let i = 0; i < array.length; i++){
            array[i] = new Array(key-1); 
        }

        //Fills array with the plaintext
        for(let i = 0; i < array.length; i++){

            //Checks for direction.
            if(down === true){
                row++;

                //Prints the plaintext going DOWN in a diagonal-line.
                array[i][row] = plain[i];

                //Checks for the bottom row.
                if(row === (key-1)){
                    down = false;
                }
            }

            //Checks for direction.
            else if(down === false){
                row--;

                //Prints the plaintext going UP in a diagonal-line.
                array[i][row] = plain[i];

                //Checks if back at the top.
                if(row === 0){
                    down = true;
                }
            }
        }

        //Add each row of array together
        var cipher = new Array(plain.length)
        for(let i = 0; i < (key-1); i++){
            cipher = array[i][0]
        }
        
        document.getElementById("ctext").value = cipher;
        
    }
    else{
        let err = document.querySelector('.error');
        let input = err.querySelector('input');
        err.setAttribute('data-errormsg', `... Missing ${input.placeholder}`);
    }
  }

function decrypt(ev) {
    ev.preventDefault();
    let ret = validateC();
    if(ret){
        document.getElementById("ptext").value = "Plain text.";

    }else{
        let err = document.querySelector('.error');
        let input = err.querySelector('input');
        err.setAttribute('data-errormsg', `... Missing ${input.placeholder}`);
    }
}

//Checks everything necessary for Encryption is inputted
function validateP(ev){
    let valid = true;
    let chk = document.getElementById("rfc");
    if(!chk.checked){
        valid = false;
        chk.parentElement.classList.add('error');
        chk.parentElement.setAttribute('data-errormsg', 'Must have a cypher selected to Run operations.')
    }
    let textp = document.getElementById("ptext");
    let k = document.getElementById("key");
    return valid;
}
//Checks everything necessary for Decryption is inputted
function validateC(ev){
    let valid = true;
    let chk = document.getElementById("rfc");
    if(!chk.checked){
        valid = false;
        chk.parentElement.classList.add('error');
        chk.parentElement.setAttribute('data-errormsg', 'Must have a cypher selected to Run operations.')
    }
    let textc = document.getElementById("ctext");
    let k = document.getElementById("key");
    return valid;
}


document.addEventListener('DOMContentLoaded', init);