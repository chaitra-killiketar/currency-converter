const BASE_URL = "https://api.frankfurter.dev/v1/latest";

  const dropdowns=document.querySelectorAll(".dropdown select");
  const btn=document.querySelector("form button");
  const fromCurr=document.querySelector(".from select");
  const ToCurr=document.querySelector(".To select");
  const msg=document.querySelector(".msg");
 
 

  for(let select of dropdowns){
    for (currCode in countryList){
      let newOption=document.createElement("option");
      newOption.innerText=currCode;
      newOption.value=currCode;
      if(select.name === "from" && currCode === "USD"){
        newOption.selected="selected"
      }else if(select.name === "To" && currCode === "INR"){
        newOption.selected="selected"
      }
      select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
      updateFlag(evt.target);
    })

  }

  updateExchangeRate = async() => {
      let amount=document.querySelector(".amount input");
      let amtValue=amount.value;
      if(amtValue ==="" || amtValue <1){
        amtValue=1;
        amount.value="1";

      }

      const URL = `${BASE_URL}?from=${fromCurr.value}&to=${ToCurr.value}`;
      let response = await fetch(URL);
      let data = await response.json();

      let rate = data.rates[ToCurr.value];

      let finalAmount = amtValue * rate;

      msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${ToCurr.value}`;
    }
  
  const updateFlag=(element) =>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
  }

  btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
  })

  window.addEventListener("load",()=>{
  updateExchangeRate();
 })