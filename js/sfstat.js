---
layout: empty
---
$(document).ready(function ()
{
    var url = "{{site.sfstat}}";
    $.get(url, function(data)
    {
        var limit = 9; // max countries
        
        var sum = 0;
        for(var idx in data.countries){
            sum += data.countries[idx][1];
        }
        
        var ret = "[";
        for(var i = 0, n = Math.min(limit, data.countries.length); i < n; ++i)
        {
            ret += format(data.countries[i][0], data.countries[i][1], sum);
            if(i == 0){
                ret += " ]";
                continue;
            }
            ret += ",";
        };
        if(data.countries.length > limit){
            ret += " ..";
        }
        $("#sfstat").html(ret);
    })
    .fail(function() {
        $("#sfstat").html("Statistic is temporarily not available - server is down");
    });
    
    var format = function(name, count, sum)
    {
        return " " + name + ": " + (((count / sum) * 100).toFixed(2)) + "%";
    };
});