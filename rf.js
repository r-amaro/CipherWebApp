function init() {
    document.getElementById('encryptB').addEventListener('click', encrypt);
    document.getElementById('decryptB').addEventListener('click', decrypt);
}


function encrypt(){
    var key = document.getElementById("key").value;
    key = parseInt(key, 10);
    var plain = document.getElementById("ptext").value;
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
    document.getElementById("ctext").value = final;
}

function decrypt() {
    var key = document.getElementById("key").value;
    key = parseInt(key, 10);
    var ctext = document.getElementById("ctext").value;
    var down = true;
    var row = 0;
    var t = 0;
    var counter = 0;

    //  Creates the 2D Array depending on size of plaintext & key.
    var array = Array.from(Array(ctext.length), () => new Array(key))

    //  logic for the top
    if(row === t){
        var top = true;
    }else{
        top = false;
    }


    //  logic for the bottom
    if(row === (key-1)){
        var bottom = true;
    }else{
        bottom = false;
    }

    while(counter < ctext.length){
        //  Fills top row only in array with the cipher text, except the last time.
        for(var i = 0; i < array.length; i++){

            //  Checks if at the top.
            if(top){
                // prints character
                array[i][row] = ctext[counter];
                counter++;
                alert(counter);
                down = true;
            }
            else if(!top){
                if(array[i][row] === "undefined"){
                    array[i][row] = "-";
                }
            }

            //  Checks for down direction.
            if(down === true){
                
                //  Checks for the bottom row.
                if(bottom){
                    //redirect
                    var down = false;
                    row--;  //sets to the below row.
                }else{
                    row++;
                }
            }
            //  Checks for up direction.
            else if(down === false){
                row--;  //sets to the above row.
            }
            alert(array);
        }

        t++;    //Shifts the top, one row lower.
        row = 0;
        down = true;
        i = 0;

        //  Last Print Run
        if(top && bottom){

            //  Fills array with the cipher text for last row.
            for(var i = 0; i < array.length; i++){
                
                //  Checks for down direction.
                if(down === true){

                    //Checks for last empty slots
                    if(array[i][row] === "-"){
                        //Continues writing out the cipher text.
                        array[i][row] = ctext[counter];
                        counter++;
                        alert(counter);
                        alert(array[i][row]);
                        //top = bottom, so index is at the bottom.
                        down = false;
                        row--;  //sets to the above row.

                    }else{
                        row++;  //sets to the bellow row.
                    }
                }

                //Checks for up direction.
                else if(down === false){
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
    }

    //  Final array picking up the plain text.
    var  final = new Array(ctext.length);
    counter = 0;
    alert(counter);
    row = 0;
    t = 0;
    down = true;

    //Reads diagonally
    for(var i = 0; i < array.length; i++){
        //  Checks for down direction.
        if(down === true && array[i][row] !== undefined){
            //puts character into final array.
            final[counter] = array[i][row];
            counter++;
            alert(counter);
            if(bottom){
                var down = false;   //redirect
                row--;  //sets to the above row.
            }else{
            row++;  //sets to the bellow row.
            }
        }
        //  Checks for up direction.
        else if(down === false && array[i][row] !== undefined){
            //puts character into final array.
            final[counter] = array[i][row];
            counter++;
            alert(counter);
            if(top){
                //redirect
                var down = true;
                row++;  //sets to the bellow row.
            }else{
            row--;  //sets to the above row.
            }
        }
        else
            alert("error with reading");
    }
    
    //  Changes final array into a string and removes commas.
    final = final.toString();
    final = final.replace(/,/g, '') 
    document.getElementById("ptext").value = final;
}

document.addEventListener('DOMContentLoaded', init);