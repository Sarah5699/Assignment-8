var nameValide = true, urlValide = true, cartoona;
if(localStorage.getItem("localBookmarks") == null)
{
    cartoona= [];
} else{
    cartoona = JSON.parse(localStorage.getItem("localBookmarks"));
    displayBookmarks();
}

function  ValidateSiteName(siteName){
    var regExp = /[A-Za-z]{3,}/
    if (!regExp.test(siteName)){
        nameValide = false;
        document.getElementById("bookmarkName").classList.remove("IsValide");
        document.getElementById("bookmarkName").classList.add("NotValide");
    } else{
        nameValide = true;
        document.getElementById("bookmarkName").classList.add("IsValide");
        document.getElementById("bookmarkName").classList.remove("NotValide");
    }
}
function  ValidateSiteUrl(siteUrl){
    var regExp = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    if (!regExp.test(siteUrl)){
        urlValide = false;
        document.getElementById("bookmarkURL").classList.remove("IsValide");
        document.getElementById("bookmarkURL").classList.add("NotValide");
    } else{
        urlValide = true;
        document.getElementById("bookmarkURL").classList.add("IsValide");
        document.getElementById("bookmarkURL").classList.remove("NotValide");
    }
}
function Submit(){

    if (nameValide && urlValide){
        var bookmark = {
            bookMarkName: getValue("bookmarkName"),
            bookMarkUrl: getValue("bookmarkURL")
        }
        if (!bookmark.bookMarkUrl.startsWith("http://") && !bookmark.bookMarkUrl.startsWith("https://")){
            bookmark.bookMarkUrl= "http://" + bookmark.bookMarkUrl;
        }
        cartoona.push(bookmark);
        localStorage.setItem("localBookmarks",JSON.stringify(cartoona));
        clearValues();
        displayBookmarks();
    } else{
        document.getElementById("box-info").classList.remove("d-none");
    }
}
function setValue(pId,pValue)
{
    document.getElementById(pId).value = pValue;
}
function getValue(pTagId) 
{
    tagValue = document.getElementById(pTagId).value;
    return(tagValue);
}
function clearValues(){
    setValue("bookmarkName",null);
    setValue("bookmarkURL",null);
}
function displayBookmarks()
{
    var hasalah= ``;

    for(var i=0;i< cartoona.length; i++)
    {
        hasalah += 
        `
            <tr>
                <td>${i+1}</td>
                <td>${cartoona[i].bookMarkName}</td>              
                <td>
                    <a class="btn btn-visit" target= "_blank" href="${cartoona[i].bookMarkUrl}">
                        <i class="fa-solid fa-eye pe-2"></i>
                        Visit
                    </a>
                </td>
                <td>
                    <button onClick= "deleteBookmark(${i})" class="btn btn-delete pe-2">
                        <i class="fa-solid fa-trash-can"></i>
                        Delete
                    </button>
                </td>     
            </tr>
        `
    }

    document.getElementById("tableContent").innerHTML = hasalah;
}
function deleteBookmark(index){
    cartoona.splice(index,1);
    localStorage.setItem("localBookmarks",JSON.stringify(cartoona));
    displayBookmarks();
}
function Close(){
    document.getElementById("box-info").classList.add("d-none");
}
