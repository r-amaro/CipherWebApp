let btnE = document.querySelector('#encryptB')
let btnD = document.querySelector('#decryptB')

function init() {
    btnE.addEventListener('click', encrypt);
    btnD.addEventListener('click', decrypt);
}


function encrypt(event){
    event.preventDefault();
    var key = document.querySelector("#key").value;
    key = parseInt(key, 10);
    var plain = document.querySelector("#ptext").value;
    var down = true;
    var row = 0;

    //Creates the 2D Array depending on size of plaintext & key.
    var array = Array.from(Array(plain.length), () => new Array(key))

    //  Fills array with the plaintext
    for(var i = 0; i < array.length; i++){
        //  Checks for down direction.
        if(down === true){
            //prints character
            array[i][row] = plain[i];
            //Checks for the bottom row.
            if(row === (key-1)){
                //redirect
                var down = false;
                //sets to the above row.
                row--;
            }else{
            //sets to the bellow row.
            row++;
            }
        }
        //  Checks for up direction.
        else if(down === false){
            //prints character
            array[i][row] = plain[i];
            //Checks if back at the top.
            if(row === 0){
                //redirect
                var down = true;
                //sets to the bellow row.
                row++;
            }else{
            //sets to the above row.
            row--;
            }
        }
    }

    //final array will hold the cipher text.
    var final = new Array(plain.length);
    var counter = 0;
    row = 0;
    //Stays on the same column level while searching the entire row.
    while(row < key){
        for(let i = 0; i < plain.length; i++){
            //if the address is not empty, save to final array.
            if(array[i][row] !== undefined){
                let x = array[i][row];
                final[counter] = x.toString();
                counter++;
            }
        }
        row++;
    }
    //  Changes final array into a string and removes commas.
    final = final.toString();
    final = final.replace(/,/g, '') 
    document.querySelector("#ctext").value = final;
}

function decrypt(event) {
    event.preventDefault();
    var key = document.querySelector("#key").value;
    key = parseInt(key, 10);
    var ctext = document.querySelector("#ctext").value;
    var down = true;
    var row = 0;
    var t = 0;
    var counter = 0;

    //  Creates the 2D Array depending on size of plaintext & key.
    var array = Array.from(Array(ctext.length), () => new Array(key))
    //fills array with stars *
    for(var i = 0; i < ctext.length; i++){
        for(let j = 0; j < key; j++){
            array[i][j] = '*';
        }
    }

    while(counter !== ctext.length){   // while loop closes if counter equals the cipher text
        //  Fills top row only in array with the cipher text, except the last time.
        for(var i = 0; i < array.length; i++){

            
            if(row === t){  //  Checks if at the affected row.
                // prints character
                array[i][row] = ctext[counter];
                counter++;
            } 
            else{
                if(array[i][row] === '*'){
                    array[i][row] = "-";
                }
            }

            //  Checks for down direction.
            if(down === true){
                
                //  If not the bottom row.
                if(row !== (key-1)){
                    row++;  //sets to the below row.
                }
                else{ // If bottom
                    //redirect
                    var down = false;
                    row--;  //sets to the above row.
                }
            }
            //  If up direction.
            else{
                //  If not the top row.
                if(row !== 0){
                    row--;  //sets to the above row.
                }
                else{   //  If top
                    down = true;
                    row++;  //sets to the below row.
                }
            }
        }

        t++;    //Shifts the top, one row lower.

        //  Last Print Run (top = bottom)
        if(t === key-1){
            row = 0;
            down = true;
            i = 0;
            //  Fills array with the cipher text for last row.
            for(var i = 0; i < array.length; i++){
                
                //  Checks for down direction.
                if(down === true){

                    //Checks for last empty slots
                    if(array[i][row] === "-"){
                        //Continues writing out the cipher text.
                        array[i][row] = ctext[counter];
                        counter++;
                        //top = bottom, so index is at the bottom.
                        down = false;
                        row--;  //sets to the above row.

                    }else{
                        row++;  //sets to the bellow row.
                    }
                }
                //Checks for up direction.
                else{
                    //Checks if back at the first row.
                    if(row === 0){
                        var down = true;    //redirect
                        row++;  //sets to the bellow row.
                    }else{
                        row--;  //sets to the above row.
                    }
                }
            }
        }
        else{ // Reset
            row = 0;
            down = true;
            i = 0;
        }
    }   // while loop closes if counter equals the cipher text

    //  Final array picking up the plain text.
    var  final = new Array(ctext.length);
    counter = 0;
    row = 0;
    t = 0;
    down = true;

    //Reads diagonally
    for(var i = 0; i < array.length; i++){
        //  Checks for down direction.
        if(down === true){
            if(array[i][row] !== '-' || array[i][row] !== '*'){
                //puts character into final array.
                final[counter] = array[i][row];
                counter++;
            }
            if(row !== (key-1)){    //  If not bottom
                row++;  //set to the below row.
            }
            else{   //  If bottom
                var down = false;   //redirect
                row--;  //sets to the above row.
            }
        }
        //  Checks for up direction.
        else{
            if(array[i][row] !== '-' || array[i][row] !== '*'){
                //puts character into final array.
                final[counter] = array[i][row];
                counter++;
            }
            if(row !== 0){  //  If not top
                row--;  //sets to the above row.
                
            }else{  //  If top
                //redirect
                var down = true;
                row++;  //sets to the bellow row.
            }
        }
    }
    
    //  Changes final array into a string and removes commas.
    final = final.toString();
    final = final.replace(/,/g, '') 
    document.querySelector("#ptext").value = final;
}

document.addEventListener('DOMContentLoaded', init);