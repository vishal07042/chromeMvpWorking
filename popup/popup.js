const opt = document.getElementById('selectQuestion');

const options = document.createElement('option');
const form = document.getElementById('form');

for (let i = 0; i < 10; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = i;
  opt.appendChild(option);
}




form.addEventListener('submit', function(e){
    e.preventDefault();
    console.log('form submitted');
    console.log(opt.value);
    
  let  startingValueadd = opt.value;

  chrome.runtime.sendMessage({startingValueadd: startingValueadd},function(){
    console.log('message sent');
    //window.close();
  });
})







