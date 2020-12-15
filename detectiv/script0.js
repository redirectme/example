var lastslidenum=[]
var safeid=""
                                               
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
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
toslide(2,2);
}


function returnslide(el,f) {
if (lastslidenum.length>0){
	$('#slide'+f).hide()	
	$('#slide'+lastslidenum.pop()).show()	
}
}


function toslide(el,t,f) {
	lastslidenum.push(f);
	$('#slide'+f).hide()	
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






initsafe('safe');
safeid='safe';
