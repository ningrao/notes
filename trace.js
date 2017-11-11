window.dbg={
notr:function(){this.tr.closed=true;}
,tr :function (a, c) {//trace;
	var insert=function(a,c){
		a=dbg.eh(a);
    if (a === null || a === undefined||a=="") a = (new Date()).valueOf();
    if (c) a = $("#traceWin_msg").html() + "<span style='color:red;'>|</span>" + a;
    $("#traceWin_msg").html(a);			
	}
	var closed=this.tr.closed;
	this.tr=function(a,c){
		if(this.tr.closed)return;
    if ($("#TRACEWINDOW").length == 0) {
        $("<div id='TRACEWINDOW' style='word-wrap:break-word;width:100%;opacity:0.8;filter:alpha(opacity=70);position:fixed;border:1px black solid;background:#eee;color:Black;left:0;bottom:0;font-size:20px;z-index:9999999'><div id='traceWin_msg' style='padding:3px;width:100%;'></div><div style='background:black;clear:both;'><input type='text'  id='traceWin_cmd' value='' style='width:300px'/><input type='button'  id='traceWin_btn' value='execute'></div></div>").appendTo("body");
        $("#traceWin_btn").click(function () {
            var e = "";
            try {
                e = eval($("#traceWin_cmd").val())
            } catch (b) {
                e = b.message
            }
            insert(e);
        });
        $("#traceWin_cmd").keyup(function (e) {
            e.keyCode === 13 && $("#traceWin_btn").click()
        })
    }
		insert(a,c);
	};
	this.tr.closed=closed;
	this.tr(a,c);
}
,ta:function(a){//trace with appending;
	this.tr(a,true);
}
,js: function (a) {//json to string
    if (typeof window.JSON=="object")
        this.js = JSON.stringify;
    else {
    		var t=this;
        var _parseJson = function (a) {
            var c = a;

            if ($.isPlainObject(a)) {
                c = "{";
                $.each(a, function (e, b) {
                    c += '"' + e + '":' + t.js(b) + ","
                });
                c = c.substr(0, c.length - 1) + "}"
            }
                  
		        return c
        };
        var _parseArray = function (a) {
            var c = a;
            if ($.isArray(a)) {
                c = "[";
                for (var e = a.length, b = 0; b < e; b++) c += t.js(a[b]) + ",";
                c = c.substr(0, c.length - 1);
                c += "]"
            }
            return c
        };
        this.js = function (a) {
            if (a == null) return '""';
            var c = a;
            if (typeof a === "string") {
                a = a.replace(/'/g, "\\'");
                a = a.replace(/"/g, '\\"');
                a = a.replace(/\\/g, "\\\\");
                c = '"' + a + '"'
            } else if ($.isPlainObject(a)) c = _parseJson(a);
            if ($.isArray(a)) c = _parseArray(a);
            return c
        };
    }
    return this.js(a);
}
,eh:function(html){//encode html;text() would do the trick, html() keeps untouched;
	return $("<div/>").text(html).html();	
}
,dh:function(html){//decode html;
	return $("<div/>").html(html).text();	
}
};
      
      window.TR=function(){dbg.tr.apply(dbg,arguments)};
      window.TA=function(){dbg.ta.apply(dbg,arguments)};
