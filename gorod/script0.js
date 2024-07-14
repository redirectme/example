var lastslidenum=[]
var safeid=""
var thisshape=""
var onceshape=[]
var before_slide=[]
var shuffledvector=[]               
var shuffledvectorbeg=0, shuffledvectorend=0

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function anew(a=1){
	if (a!=1 ) {
		var ok = confirm("Вы действительно хотите начать всё заново?");
	} else ok=true;
	if (ok) document.location.replace("index.html");
}

function startgame() {
if (safeid>"") initsafe(safeid);
$('#slide1').hide()
console.log('s=', getURLParameter('s'));
if(getURLParameter('s')) toslide(0,getURLParameter('s'),2); else toslide(0,2,1);
}

function returnslide(f,op="") {
var t=0;
if (lastslidenum.length>0){
	if(op=="next"){
	  t=lastslidenum.pop();
          $('#slide'+f).hide()	
	  toslide(op,t,t);
        }
        else  {
	        $('#slide'+f).hide()	
	        $('#slide'+lastslidenum.pop()).show()	
        }
}
}

function SlidesShuffle(a=0,b=0){
	if(a==0 || b==0) {
	  shuffledvector=[];
	  shuffledvectorbeg=0;	
	  shuffledvectorend=0;
	  return;               
	}
   	var j;
	shuffledvectorbeg=b;	
	shuffledvectorend=a;
	for (var i=a;i <=b;i++){
      		j= getRandomInRange(a,i)
      		shuffledvector[i]=shuffledvector[j]
      		shuffledvector[j]=i
	}
}

function enterShuffled(){
 	 if (shuffledvectorend>shuffledvectorbeg){
		var t=shuffledvectorend;
		shuffledvectorend=shuffledvectorbeg;
		shuffledvectorbeg=t;
	}
}


function toslide(el,t,f) {
	lastslidenum.push(f);
	$('#slide'+f).hide()
	if (el=="pred")
	   if(t-1==shuffledvectorend) t=shuffledvector[t-1]; 
	   else {
 	   	var p=shuffledvector.indexOf(t);
		if(p==-1) t=t-1;
		else if (p==shuffledvectorbeg)t=p-1;
		else t=shuffledvector[p-1]; 
	}
	if (el=="next"){
	   if (shuffledvectorend<shuffledvectorbeg){
		   if(t+1==shuffledvectorend) {
			shuffledvectorend=shuffledvectorbeg;
			shuffledvectorbeg=t+1;
			t=shuffledvector[t+1]; 
		   }		
	   }else{
 	   	var p=shuffledvector.indexOf(t);
		if(p==-1) t=t+1;
		else if (p==shuffledvectorend)t=p+1;
		else t=shuffledvector[p+1]; 
		}
	}
	if (typeof (before_slide[t])=== "function") before_slide[t]();
	$('#slide'+t).show()	
}

function gotolocalurl(t){
    var k=t.indexOf("//");
    t=t.slice(k+2)
     var s=document.location.href
     k=s.lastIndexOf("/")
     s=s.substr(0,k+1)+t;
    window.open(s, '_blank').focus();

}

function gotourl(t,f) {
   if(f) 
    window.open(t, '_blank').focus();
   else 
    document.location.replace(t);	
}

function hideShape(s,cl=false){
if(cl) $('.'+s).hide();else $('#'+s).hide();
}

function showShape(s,cl=false){
if(cl) $('.'+s).show();else $('#'+s).show();
}

function unicode(s){
 var  sAscii, ascval
  sAscii = ''
  for (var x = 0; x<s.length;x++){
    ascval = s.charCodeAt(x)
    if (ascval < 0)   ascval = 65536 + ascval; 
    sAscii = sAscii+'&#'+ ascval+';'
  }
  return sAscii;
}

function Npadezh(k,s1,s2,s3){
if(k>=5 && k<20) return s3;
if (k%10==1) return s1;
if (k%10==2 || k%10==3 || k%10==4) return s2;
return s3;
}


function borderShape(s,b="green solid 6px"){
$('#'+s).css('border',b);
}



function onceClick(s){
	if (onceshape.indexOf(s)>=0) {
		return false;
	}
	onceshape.push(s);
	return true;
}




function initsafe(n){
    $("#"+n).attr('value',"");	
}


function opensafe(s,l,n,sn){

    var w = ""
    var v = s.charCodeAt(l)-65
    var d=0
    for(var  i = 0;i<l;i++){
	d=(s.charCodeAt(i)-65+22-3-v)*3
        w=w+String.fromCharCode((d-4+11)%11+48)
    }
    s=document.getElementById(n).value;
	document.getElementById(n).value="";
    if(s.length==l){
        s=s.replace(/[^0-9]/g, "");
	if(s.length==l){
	        if(s==w) toslide(0,sn+1,sn); 
		else document.getElementById(n+'_error_click').click();

	}
   }
}


function spswap(c1,c2,p=true){
var y1=$('#'+c1)[0].style.top
var y2=$('#'+c2)[0].style.top
$('#'+c1).css('top',y2)
$('#'+c2).css('top',y1)
if(p){
var n1=(Number.parseInt(y1)-8)/9;
var n2=(Number.parseInt(y2)-8)/9;
console.log(n1,n2)
t=arr1[n1]
arr1[n1]=arr1[n2];
arr1[n2]=t;
console.log(arr1[n1],arr1[n2])
if(arr1[n1]==n1){ $('#'+c2).hide();$('#t'+c2.charAt(1)).show();sarr1++ }
if(n1!=n2 && arr1[n2]==n2){ $('#'+c1).hide();$('#t'+c1.charAt(1)).show();sarr1++}
}
}

function fun_runch1(){
if(chsl1==0) { chsl1=thisShape; $('#'+thisShape).css('background-color','red') }
else chsl2=thisShape;
if(chsl1!=0 && chsl2!=0){ spswap(chsl1,chsl2);
$('#'+chsl1).css('background-color','transparent')
$('#'+chsl2).css('background-color','transparent')
chsl1=0; chsl2=0
}
if (sarr1==10) showShape('nextans');
}




function crw_input_control(evn, pattern) {

	evn = evn || window.event;
	var sender = evn.target || evn.srcElement;
	var isIE = document.all;
	var str=sender.value;
	var isize=sender.size;
	if (pattern=='' ) {sender.value='';$('#'+sender.id).attr('value',''); $('#'+sender.id).css('color','black'); 
	$('#'+sender.id).css('text-decoration','none');$('#'+sender.id).attr('placeholder','')
	return;}                                       

	if (sender.tagName.toUpperCase()=='INPUT')
	{
		var keyPress = isIE ? evn.keyCode : evn.which;

		if (keyPress < 32 || evn.altKey || evn.ctrlKey){
                  if(keyPress==13)  {inpword2(anstext.value);return false;}           
			return true;}

	    var symbPress = String.fromCharCode(keyPress);
        	    if (!pattern.test(symbPress))
	    	{$('#'+sender.id).attr('placeholder','А-Яа-я');return false;}

       if (str.length>isize-1) return false;

	}

	return true;

}


function inpword(sn)
{  var re = /^(\d*)\(по\s(.).*\.\,\s?(\d*).*\)/;
if(sn.id>"") {sn=sn.id;sn=sn.substring(7)} 
console.log('numword'+sn);
s=document.getElementById('numword'+sn).title;
var nameList = s.match(re);
if(document.getElementById('numword'+nameList[1]).className>"") return;
var ans=document.getElementById("ans");
var k=s.indexOf(").") 
$('#anstext').click();
ans.getElementsByTagName('p')[0].innerText=s.substr(0,k+1);
document.getElementById("anstext").size=nameList[3];
document.getElementById("anstext").value="";
if(nameList[2]=='в')
document.getElementById("anstext").min=nameList[1];
else
document.getElementById("anstext").min=-nameList[1];
ans.hidden=false;
$('#ans').show();
document.getElementById("anstext").focus();
}
var anscrw=['нет','ЛУКОМОРЬЯ','НАЛЕВО','КОТ','КУРЬИХ','РУСАЛКА','ДВЕРЕЙ','ЛЕШИЙ','ЦЕПИ','ЦЕПЬ','НАПРАВО', 'ЗЕЛЕНЫЙ','ДУБ' ,'ДОРОЖКАХ','ОКОН'];

function inpword2(w)
{  
var chok=false;
w=w.toUpperCase();
w=w.replace('Ё','Е');
anstext.value=w;
ans.hidden=true;
w=w.trim();
w=w.substring(0,document.getElementById("anstext").size);
var numword=document.getElementById("anstext").min;
var vert=true;
var isize=document.getElementById("anstext").size;

if (w===anscrw[Math.abs(numword)]) chok=true;
if(document.getElementById('numword'+Math.abs(numword)).className>"") return;
if (numword<0) {vert=false;numword=-numword;}
var tr2 = document.getElementById('crosw').getElementsByTagName('tr');
var j=0;
var q="-";
if(vert)
for(var i=0;i<isize;i++){
    var c=w.substring(i,i+1).toUpperCase();
    if (c=='Ё') c='Е';
if(c>='а' && c<='я' ||c>='А' && c<='Я' ||c=='ё'||c=='Ё') {  

    	var td2 = tr2[getcoord(numword,0)+j].getElementsByTagName('td');
	var em=td2[0+getcoord(numword,1)].getElementsByTagName('em');
	var st=td2[0+getcoord(numword,1)].getElementsByTagName('strong');	em[0].innerText=c;
	if (em[0].innerText=='') td2[0+getcoord(numword,1)].innerHTML='<strong>'+st[0].innerHTML+'</strong><em></em>'+c;
	else if (st[0].innerText=='') td2[0+getcoord(numword,1)].innerHTML='<em>'+em[0].innerHTML+'</em><strong></strong>'+c;
	else if (st[0].innerText!=em[0].innerText) {td2[0+getcoord(numword,1)].innerHTML='<strong>'+st[0].innerHTML+'</strong><em>'+em[0].innerHTML+'</em><span>'+c+'</span>';q='';}
	else td2[0+getcoord(numword,1)].innerHTML='<strong>'+st[0].innerHTML+'</strong><em>'+em[0].innerHTML+'</em>'+c;


	j=j+1;q=q+c;}
if(chok)
{document.getElementById('numword'+numword).className='numwordsel'; 
}else document.getElementById('numword'+numword).className=''; 
}
else 
for(var i=0;i<isize;i++){
    var c=w.substring(i,i+1).toUpperCase();
    if (c=='Ё') c='Е';
if(c>='а' && c<='я' ||c>='А' && c<='Я' ||c=='ё'||c=='Ё') {  
var td2 = tr2[getcoord(numword,0)].getElementsByTagName('td');    	
	var em=td2[j+getcoord(numword,1)].getElementsByTagName('em');
	var st=td2[j+getcoord(numword,1)].getElementsByTagName('strong');
	st[0].innerText=c;
	if (em[0].innerText=='') td2[j+getcoord(numword,1)].innerHTML='<strong>'+st[0].innerHTML+'</strong><em></em>'+c;
	else if (st[0].innerText=='') td2[j+getcoord(numword,1)].innerHTML='<em>'+em[0].innerHTML+'</em><strong></strong>'+c;
	else if (st[0].innerText!=em[0].innerText) {td2[j+getcoord(numword,1)].innerHTML='<strong>'+st[0].innerHTML+'</strong><em>'+em[0].innerHTML+'</em><span>'+c+'</span>';q='';}
	else td2[j+getcoord(numword,1)].innerHTML='<strong>'+st[0].innerHTML+'</strong><em>'+em[0].innerHTML+'</em>'+c;

	j=j+1;q=q+c;} 
if(chok)
{document.getElementById('numword'+numword).className='numwordsel'; 
}else document.getElementById('numword'+numword).className=''; 
}
if(chok){
document.getElementById('numword'+numword).className='numwordsel'; 
p8++;
if(p8==14){$('#arrow4').show(); $('#arrow4').show();$('#lukom4').show();}  
}
else document.getElementById('numword'+numword).className=''; 
}	     

function getcoord(n,d){
var dstr=document.getElementById("poswords").innerHTML.trim()
return dstr.charCodeAt(2*parseInt(n)-1+d)-64
}

function field_input_control(evn, pattern) {

	evn = evn || window.event;
	var sender = evn.target || evn.srcElement;
	var isIE = document.all;
	var str=sender.value;
	var chr;
	var isize=sender.size;
	if($('#'+sender.id).attr('readonly')) return;
	if (pattern=='' ) {sender.value='';$('#'+sender.id).attr('value',''); $('#'+sender.id).css('color','black'); 
	$('#'+sender.id).css('text-decoration','none');$('#'+sender.id).attr('placeholder','')
	return;}                                       
	if (sender.tagName.toUpperCase()=='INPUT')
	{
		var keyPress = isIE ? evn.keyCode : evn.which;

		if (keyPress < 32 || evn.altKey || evn.ctrlKey){
			return false;}

	    var symbPress = String.fromCharCode(keyPress);

	    if (!pattern.test(symbPress))
	    	{$('#'+sender.id).attr('placeholder','А-Яа-я');return false;}

       if (str.length>isize-1) return false;

	chr=symbPress.toUpperCase();
	if (chr==='Ё') chr='Е';
	sender.value=sender.value.toUpperCase()+chr;
	var fg='';
        $('#'+sender.id).attr('value',sender.value)
        $('#'+sender.id).css('color','black')
	$('#'+sender.id).css('text-decoration','none');
	return false;
      }

}

function change_input_control(evn) {

	evn = evn || window.event;
	var sender = evn.target || evn.srcElement;
	var isIE = document.all;
	var str=sender.value;
	var isize=sender.size;
        sender.value=$('#'+sender.id).attr('value').toUpperCase()

        $('#'+sender.id).attr('value',sender.value)

	return true;

}




//
var  p1=false, p2=false, p3=false, p4=false, p55=0, p88=0,p44=0,p66=0,p22=0,p11=0, p33=0,p66=0,p99=0,p77=0
//"Страницы истории  3-7 слайды"
//"Интересные факты  8-15 слайды"
//"Городские сокровища  16-24 слайды"
//"Экскурсионное бюро  25-33 слайды"
//"Пазл -  35 слайд"
before_slide[(2)]=function(){
if(p55==0) hideShape('vert1'); else showShape('vert1');
if(p44==0) hideShape('vert2'); else showShape('vert2');
if(p22==0) hideShape('vert3'); else showShape('vert3');
if(p66==0) hideShape('vert4'); else showShape('vert4');
}
before_slide[(3)]=function(){ if (p55!=0) return;
for(var i=1;i<=6;i++) hideShape('no3'+i);
$('#slide3 div.next').hide();
}
function fun_check3(){
var c=thisShape. at(-1)
showShape('no3'+c);
if(c=='6') { $('#slide3 div.next').show();}
}
before_slide[(4)]=function(){ if(p55!=0) return;
for(var i=1;i<=3;i++) hideShape('no4'+i);
$('#slide4 div.next').hide();
}
function fun_check4(){
var c=thisShape. at(-1)
showShape('no4'+c);
if(c=='3') {$('#slide4 div.next').show(); }
}
var d5=0,t5=[0,0,0,0];
before_slide[(5)]=function() {if(p55<3)$('#slide5 div.next').hide()}
function fun_check5(){
var t,l,k;
var d=1*thisShape. slice(-1);
console.log(d,d5)
if(d5==0 ||  d5<4&& d<4 || d5>3&&d>3) {d5=d;
for(var i=1;i<=6;i++) if(i==d5)$('#btn5'+i).css('border', "2px solid gray");else $('#btn5'+i).css('border', "");
return
}
if(d5%3==d%3) {
if(d5<d) {k=d;d=d5;d5=k }
if(t5[d]==true){}else p55++;
t5[d]=true;
t=$('#btn5'+d)[0].style.top
l=t.slice(0,2);
t=''+(+l+0)+t.slice(2);
$('#btn5'+d5).css('top',t);
t=$('#btn5'+d)[0].style.left
l=t.slice(0,-2);
t=''+(+l+15)+"vh";
$('#btn5'+d5).css('left',t);
console.log(t);
d5=0;
if(p55==3)$('#slide5 div.next').show();
for(var i=1;i<=6;i++) $('#btn5'+i).css('border', "");
} else {
d5=d;
for(var i=1;i<=6;i++) if(i==d5)$('#btn5'+i).css('border', "2px solid gray");else $('#btn5'+i).css('border', "");
}
}
before_slide[(6)]=function(){ if (p77!=0) return;
for(var i=1;i<=4;i++) hideShape('no6'+i);
$('#slide6 div.next').hide();
}
function fun_check6(){
var c=thisShape. at(-1)
showShape('no6'+c);
if(c=='2') { $('#slide6 div.next').show();p77=1}
}
before_slide[(8)]=function(){ if (p88!=0) return;
for(var i=1;i<=5;i++) hideShape('no8'+i);
$('#slide8 div.next').hide();
}
function fun_check8(){
var c=thisShape. at(-1)
showShape('no8'+c);
if(c=='5') { $('#slide8 div.next').show();}
}
before_slide[(9)]=function(){ if (p88!=0) return;
for(var i=1;i<=6;i++) hideShape('no9'+i);
$('#slide9 div.next').hide();
}
function fun_check9(){
var c=thisShape. at(-1)
showShape('no9'+c);
if(c=='1') { $('#slide9 div.next').show();}
}
before_slide[(10)]=function(){ if (p88!=0) return;
for(var i=1;i<=9;i++) hideShape('yes0'+i);
$('#slide10 div.next').hide();
}
function fun_check10(){
var c=thisShape. at(-1)
hideShape(thisShape);
if(c>'0') {showShape('yes0'+c); p88++;
if (p88>0)$('#most').html('<p>'+p88+'<p>');
if(p88==9) { $('#slide10 div.next').show();}
}
}
before_slide[(12)]=function(){ if (p44!=0) return;
for(var i=1;i<=4;i++) hideShape('yes2'+i);
$('#slide12 div.next').hide();
}
function fun_check12(){
var c=thisShape. at(-1)
showShape('yes2'+c);
if(c=='1') { $('#slide12 div.next').show();}
}
before_slide[(14)]=function(){ if (p44!=0) return;
for(var i=1;i<=4;i++) hideShape('yes4'+i);
$('#slide14 div.next').hide();
}
function fun_check14(){
var c=thisShape. at(-1)
showShape('yes4'+c);
if(c=='3') { $('#slide14 div.next').show();p44=1;}
}
var d16=0,t16=[0,0,0,0,0,0,0];
before_slide[(16)]=function() {$('#slide16 div.check17').hide();if(p11<6)$('#slide16 div.next').hide()}
function fun_check16(){
var t,l,k;
var d=1*thisShape. slice(-2);
if(d16==0 ||  d16<17&& d<17 || d16>16&&d>16) {d16=d;
for(var i=11;i<=22;i++) if(i==d16)$('#w16'+i).css('border', "2px solid gray");else $('#w16'+i).css('border', "");
return
}
if((d16-10)%6==(d-10)%6) {
if(d16<d) {k=d;d=d16;d16=k }
if(t16[d-10]==true){}else p11++;
t16[d-10]=true;
t=$('#w16'+d)[0].style.top
l=t.slice(0,2);
t=''+(+l+3)+t.slice(2);
$('#w16'+d16).css('top',t);
t=$('#w16'+d)[0].style.left
l=t.slice(0,-2);
if(d>13) t=''+(+l-12)+"vh";else  t=''+(+l+33)+"vh";
$('#w16'+d16).css('left',t);
console.log(t);
d16=0;
if(p11==6)$('#slide16 div.next').show();
for(var i=11;i<=22;i++) $('#w16'+i).css('border', "");
} else {
d16=d;
for(var i=11;i<=22;i++) if(i==d16)$('#w16'+i).css('border', "2px solid gray");else $('#w16'+i).css('border', "");
}
}
before_slide[(17)]=function() {if(p22==0)$('#slide17 div.next').hide()}
var ans7=[]
ans7[1]= ['', 's7', 's4', 's8', 's6', 's9' , 's3',  's2', 's1', 's5' ]
function fun_check17() { var i;
var p=0; for( i=1;i<=9;i++)
if ($('#sel'+i).val()===ans7[1][i])
{ $('#sel'+i).html('<option value="'+ans7[1][i]+'">'+$('#sel'+i+' option:selected').text()+"</option>"); $('#sel'+i).css('color','green')} else p++;
if(p===0) {$('#slide17'+' div.check17').hide(); $('#slide17 div.next').show();}else
{ alert('Не все слова поставлены верно!');}
}
before_slide[(18)]=function() {if(p22==0)$('#slide18 div.next').hide()}
ans7[2]=['', 's4' , 's6' , 's7' , 's1' , 's5' , 's2' , 's3']
function fun_check18() { var i;
var p=0; for( i=1;i<=7;i++)
if ($('#sel1'+i).val()===ans7[2][i])
{ $('#sel1'+i).html('<option value="'+ans7[2][i]+'">'+$('#sel1'+i+' option:selected').text()+"</option>"); $('#sel1'+i).css('color','green')} else p++;
if(p===0) {$('#slide18'+' div.check17').hide(); $('#slide18 div.next').show();}else
{ alert('Не все слова поставлены верно!');}
}
before_slide[(19)]=function(){ if (p22!=0) return;
for(var i=1;i<=4;i++) hideShape('yes9'+i);
$('#slide19 div.next').hide();
}
function fun_check19(){
var c=thisShape. at(-1)
showShape('yes9'+c);
if(c=='2') { $('#slide19 div.next').show();}
}
before_slide[(21)]=function(){ if (p22!=0) return;
for(var i=1;i<=3;i++) hideShape('mb1'+i);
$('#slide21 div.next').hide();
}
function fun_check21(){
var c=thisShape. at(-1)
showShape('mb1'+c);
if(c=='2') { $('#slide21 div.next').show();p22=1;}
}
var d23=0,t23=[0,0,0,0];
before_slide[(23)]=function(){if(p33<3)$('#slide23 div.next').hide()}
function fun_check23(){
var t,l,k;
var d=1*thisShape. slice(-2);
if(d23==0 ||  d23<14&& d<14 || d23>13&&d>13) {d23=d;
for(var i=11;i<=16;i++) if(i==d23)$('#w23'+i).css('border', "2px solid gray");else $('#w23'+i).css('border', "");
return
}
if((d23-10)%3==(d-10)%3) {
if(d23<d) {k=d;d=d23;d23=k }
if(t23[d-10]==true){}else p33++;
t23[d-10]=true;
t=$('#w23'+d)[0].style.top
l=t.slice(0,2);
t=''+(+l+23)+t.slice(2);
$('#w23'+d23).css('top',t);
t=$('#w23'+d)[0].style.left
l=t.slice(0,-2);
t=''+(+l+0)+"vh";
$('#w23'+d23).css('left',t);
d23=0;
if(p33==3)$('#slide23 div.next').show();
for(var i=11;i<=16;i++) $('#w23'+i).css('border', "");
} else {
d23=d;
for(var i=11;i<=16;i++) if(i==d23)$('#w23'+i).css('border', "2px solid gray");else $('#w23'+i).css('border', "");
}
}
before_slide[(24)]=function(){ if (p66!=0) return;
for(var i=1;i<=5;i++) hideShape('mb4'+i);
$('#slide24 div.next').hide();
}
function fun_check24(){
var c=thisShape. at(-1)
showShape('mb4'+c);
if(c=='3') { $('#slide24 div.next').show();}
}
var d26=0,t26=[0,0,0,0,0,0,0,0];
var yt26=[16.4,19.5,41.5,63,60.7,66,43.8],yl26=[88.01,39,39,14.14,63.6,113.2,88.5];
before_slide[(26)]=function(){if(p99<7)$('#slide26 div.next').hide()}
function fun_check26(){
var t,l,k;
var d=1*thisShape. slice(-2);
if(d26==0 ||  d26<18&& d<18 || d26>17&&d>17) {d26=d;
for(var i=11;i<=24;i++) if(i==d26)$('#w26'+i).css('border', "2px solid gray");else $('#w26'+i).css('border', "");
return
}
if((d26-10)%7==(d-10)%7) {
if(d26<d) {k=d;d=d26;d26=k }
if(t26[d-10]==true){}else p99++;
t26[d-10]=true;
t=""+yt26[(d-10)%7]+"vh";
l=""+yl26[(d-10)%7]+"vh";
$('#w26'+d26).css('top',t);
$('#w26'+d26).css('left',l);
d26=0;
if(p99==7)$('#slide26 div.next').show();
for(var i=11;i<=24;i++) $('#w26'+i).css('border', "");
} else {
d26=d;
for(var i=11;i<=24;i++) if(i==d26)$('#w26'+i).css('border', "2px solid gray");else $('#w26'+i).css('border', "");
}
}
before_slide[(27)]=function(){ if (p66!=0) return;
for(var i=1;i<=3;i++) hideShape('mb7'+i);
$('#slide27 div.next').hide();
}
function fun_check27(){
var c=thisShape. at(-1)
showShape('mb7'+c);
if(c=='2') { $('#slide27 div.next').show();}
}
before_slide[(29)]=function(){ if (p66!=0) return;
for(var i=1;i<=3;i++) hideShape('mb9'+i);
$('#slide29 div.next').hide();
}
function fun_check29(){
var c=thisShape. at(-1)
showShape('mb9'+c);
if(c=='2') { $('#slide29 div.next').show();p66=1}
}
