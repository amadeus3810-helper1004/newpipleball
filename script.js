
function setActive(){
  const file=location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.menu a').forEach(a=>{
    if(a.getAttribute('href')===file) a.classList.add('active');
  });
}
function searchCourt(){
  const q=(document.getElementById('keyword')?.value||'').toLowerCase();
  document.querySelectorAll('.court-card').forEach(card=>{
    card.style.display=card.innerText.toLowerCase().includes(q)?'block':'none';
  });
}
function openBooking(name){
  const modal=document.getElementById('bookingModal');
  if(!modal)return;
  document.getElementById('courtName').value=name;
  modal.style.display='flex';
}
function closeBooking(){
  const modal=document.getElementById('bookingModal');
  if(modal)modal.style.display='none';
}
function completeBooking(){
  const form=document.getElementById('bookingForm');
  if(!form)return;
  const data=Object.fromEntries(new FormData(form).entries());
  if(!data.date||!data.time||!data.name||!data.phone){
    alert('예약일, 시간, 이름, 연락처를 입력해주세요.');
    return;
  }
  const key='pickleballBookings';
  const list=JSON.parse(localStorage.getItem(key)||'[]');
  if(list.some(x=>x.court===data.court&&x.date===data.date&&x.time===data.time)){
    alert('이미 예약된 시간입니다. 다른 시간을 선택해주세요.');
    return;
  }
  list.push({...data,createdAt:new Date().toISOString()});
  localStorage.setItem(key,JSON.stringify(list));
  alert('예약이 완료되었습니다.');
  closeBooking();
  form.reset();
}
document.addEventListener('DOMContentLoaded',setActive);
