document.querySelectorAll('[data-filter]').forEach(button=>{
  button.addEventListener('click',()=>{
    document.querySelectorAll('[data-filter]').forEach(other=>{
      other.classList.toggle('selected',other===button);
      other.setAttribute('aria-pressed',String(other===button));
    });
    document.querySelectorAll('.dish').forEach(dish=>{
      dish.hidden=button.dataset.filter!=='all'&&dish.dataset.category!==button.dataset.filter;
    });
  });
});
const branches=[
  {name:'Soho',jp:'ソーホー',area:'central',label:'Central London',slug:'soho'},
  {name:'Covent Garden',jp:'コヴェントガーデン',area:'central',label:'Central London',slug:'covent-garden'},
  {name:'Holborn',jp:'ホルボーン',area:'central',label:'Central London',slug:'holborn'},
  {name:'Notting Hill',jp:'ノッティングヒル',area:'west',label:'West London',slug:'notting-hill'},
  {name:'Hammersmith',jp:'ハマースミス',area:'west',label:'West London',slug:'hammersmith'},
  {name:'Golders Green',jp:'ゴルダーズグリーン',area:'north',label:'North London',slug:'GoldersGreen'},
  {name:'G2 · Shabu-Shabu',jp:'しゃぶしゃぶ',area:'north',label:'Golders Green · North London',slug:'G2',map:'Eat Tokyo G2 Shabu Shabu Golders Green London'}
];
function renderBranches(area){
  const list=document.querySelector('#branch-list');
  list.replaceChildren();
  branches.filter(branch=>area==='all'||branch.area===area).forEach(branch=>{
    const row=document.createElement('article');row.className='branch-item';
    const description=document.createElement('div');
    const name=document.createElement('div');name.className='branch-name';
    const heading=document.createElement('h3');heading.textContent=branch.name;
    const japanese=document.createElement('span');japanese.className='branch-jp';japanese.lang='ja';japanese.textContent=branch.jp;
    name.append(heading,japanese);
    const region=document.createElement('p');region.className='branch-area';region.textContent=branch.label;
    description.append(name,region);
    const actions=document.createElement('div');actions.className='branch-actions';
    const details=document.createElement('a');details.href='https://www.eattokyo.co.uk/'+branch.slug;details.textContent='Menu & branch details ↗';details.setAttribute('aria-label',branch.name+' menu and branch details');
    const directions=document.createElement('a');directions.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(branch.map||'Eat Tokyo '+branch.name+' London');directions.textContent='Directions ↗';directions.setAttribute('aria-label','Directions to Eat Tokyo '+branch.name);
    [details,directions].forEach(link=>{link.target='_blank';link.rel='noopener';actions.append(link);});
    row.append(description,actions);list.append(row);
  });
}
renderBranches('all');
document.querySelector('#area').addEventListener('change',event=>renderBranches(event.target.value));
const sourceToggle=document.querySelector('.source-toggle');
sourceToggle.addEventListener('click',()=>{
  const expanded=sourceToggle.getAttribute('aria-expanded')==='true';
  sourceToggle.setAttribute('aria-expanded',String(!expanded));
  document.querySelector('#photo-sources').hidden=expanded;
});
