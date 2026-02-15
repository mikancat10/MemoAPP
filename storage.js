const Storage={
 load(){return JSON.parse(localStorage.getItem("fastmemo")||"[]")},
 save(data){localStorage.setItem("fastmemo",JSON.stringify(data))},
 loadFont(){return localStorage.getItem("fastmemo_font")||"system-ui"},
 saveFont(f){localStorage.setItem("fastmemo_font",f)}
};
