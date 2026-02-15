const Storage={
 load(){return JSON.parse(localStorage.getItem("fastmemo")||"[]")},
 save(data){localStorage.setItem("fastmemo",JSON.stringify(data))}
};
