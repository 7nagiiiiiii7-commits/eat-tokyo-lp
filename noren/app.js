const mobileToggle = document.querySelector('.mobile-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeNavigation(){mobileNav.hidden=true;mobileToggle.setAttribute('aria-expanded','false');mobileToggle.setAttribute('aria-label','Open menu');}
mobileToggle.addEventListener('click',()=>{const open=mobileToggle.getAttribute('aria-expanded')!=='true';mobileToggle.setAttribute('aria-expanded',String(open));mobileToggle.setAttribute('aria-label',open?'Close menu':'Open menu');mobileNav.hidden=!open;});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNavigation));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeNavigation();});
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
  document.querySelectorAll('.food-card').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;});
}));
document.querySelectorAll('[data-curtain-filter]').forEach(link=>link.addEventListener('click',()=>{
  const filter=document.querySelector('.filter[data-filter="'+link.dataset.curtainFilter+'"]');
  if(filter)filter.click();
}));
const branches = [
  {name:'Soho',area:'central',label:'Central London',slug:'soho'},
  {name:'Covent Garden',area:'central',label:'Central London',slug:'covent-garden'},
  {name:'Holborn',area:'central',label:'Central London',slug:'holborn'},
  {name:'Notting Hill',area:'west',label:'West London',slug:'notting-hill'},
  {name:'Hammersmith',area:'west',label:'West London',slug:'hammersmith'},
  {name:'Golders Green',area:'north',label:'North London',slug:'GoldersGreen'},
  {name:'G2 · Shabu-Shabu',area:'north',label:'Golders Green · North London',slug:'G2'}
];
function renderBranches(area){
  const list=document.querySelector('#branch-list');list.replaceChildren();
  branches.filter(branch=>area==='all'||branch.area===area).forEach(branch=>{
    const item=document.createElement('article');item.className='branch-item';
    const heading=document.createElement('h3');heading.textContent=branch.name;
    const label=document.createElement('p');label.className='branch-area';label.textContent=branch.label;
    const actions=document.createElement('div');actions.className='branch-actions';
    const details=document.createElement('a');details.href='https://www.eattokyo.co.uk/'+branch.slug;details.textContent='Menu & details ↗';details.setAttribute('aria-label',branch.name+' menu and details');
    const map=document.createElement('a');map.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('Eat Tokyo '+branch.name+' London');map.textContent='Map ↗';map.setAttribute('aria-label','Directions to Eat Tokyo '+branch.name);
    for(const link of [details,map]){link.target='_blank';link.rel='noopener';actions.append(link);}
    item.append(heading,label,actions);list.append(item);
  });
}
renderBranches('all');document.querySelector('#area').addEventListener('change',e=>renderBranches(e.target.value));
const food={
  sushi:{title:'Sushi & sashimi',image:'eat-tokyo-nigiri.jpg',description:'Explore sushi, sashimi, nigiri and more. Pick your favourites from the menu at your local Eat Tokyo.'},
  bento:{title:'Bento boxes',image:'eat-tokyo-bento.jpg',description:'A box with a little variety. Explore the bento combinations on your local branch menu.'},
  noodles:{title:'Noodles & rice bowls',image:'eat-tokyo-noodles.jpg',description:'A comforting bowl for a hungry day. Check your branch menu for its selection of noodles and rice dishes.'},
  katsu:{title:'Katsu & curry',image:'eat-tokyo-katsu.jpg',description:'Golden katsu and Japanese curry. Find the dishes available at your local Eat Tokyo.'}
};
const dialog=document.querySelector('#food-dialog');
document.querySelectorAll('.food-open').forEach(button=>button.addEventListener('click',()=>{const detail=food[button.dataset.food];document.querySelector('#dialog-title').textContent=detail.title;document.querySelector('#dialog-description').textContent=detail.description;const image=document.querySelector('#dialog-image');image.src='assets/'+detail.image;image.alt=button.querySelector('img').alt;dialog.showModal();}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
document.querySelector('#dialog-branches').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const rect=dialog.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)dialog.close();}});
