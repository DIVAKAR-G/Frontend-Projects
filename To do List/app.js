let addtask=document.getElementById('addtask');
let input=document.getElementById('put');
let over=document.getElementById('Completed');
let list=new Array();

document.addEventListener('click',(event)=>{
  if(put.value!=''){
    list.push(put.value);
    addtask.innerHTML+=`<li id="${list.length-1}"><button onclick="complete(${list.length-1})"> ${put.value}</button></li>`;
  put.value='';
  }
});
function complete(id){
  over.innerHTML+=`<li>${list[id]}</li>`;
  document.getElementById(id).style.display='none';
}