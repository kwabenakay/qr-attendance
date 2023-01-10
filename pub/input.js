
let dep=document.getElementById("department");
let name=document.getElementById("name");

function loader (){
fetch("/data")
.then(()=>{return response.json();})
.then((data)=>{
    for(i=o; i<data.currentStaff.length;i++){
        const node = document.createElement("option");
        node.innerHTML(data.currentStaff[i].department);
        node.value(data.currentStaff[i].department);
        dep.appendChild(node);
    }
})

}
