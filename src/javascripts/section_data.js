// AJAX封装
let xhr = ( type , url , callback , data = {} ) => {
    if( typeof data === "object" && data !== null && !(data instanceof Array) ){
        let temp = "" ;
        for ( let attr in data ){
            temp += `&${attr}=${data[attr]}` ;
        }
        data += temp.slice(1) ;
    }
    if( type === "GET" && typeof data === "string" ){
        url += "?" + data ;
    }
    let xhr = new XMLHttpRequest() ;
    xhr.open( type , url );
    if( type === "POST" && typeof data === "string" ){
        xhr.send( data ) ;
    }else {
        xhr.send() ;
    }
    xhr.onreadystatechange = () => {
        if( xhr.readyState === 4 && xhr.status === 200 ){
            callback( xhr.responseText );
        }
    };
};


// 课程展示部分
xhr( "GET" , "https://api.gogoup.com/p1/data/recommend?type=0&pageNo=4&pageSize=5&fromId=1193&jsonpcallback=callback" , ( res ) => {
    console.log(res);   
});
