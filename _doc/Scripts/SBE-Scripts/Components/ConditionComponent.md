---
layout: doc
title: ConditionComponent
permalink: /doc/Scripts/SBE-Scripts/Components/ConditionComponent/
---
# ConditionComponent

Conditional statements for [scripts]({{site.baseurl}}/{{site.docp}}/Scripts/).

## Syntax

{% highlight java %}

#[(condition){ 
  body if the condition has true value
}
else{ 
  body if the condition has false value
}]
{% endhighlight %}

{% highlight java %}

#[(condition){ body if condition has true value }]
{% endhighlight %}


## Available operators

{% highlight text %}

 ===, !==, ~=, ==, !=, >=, <=, !, >, < 
{% endhighlight %}
**v0.11.3+**:
{% highlight text %}

 ^=, =^
{% endhighlight %}
Rules of comparison:

* **===** 
    * Compares as: left == right as string
* **!==**
    * Compares as: left != right as string
* **~=**
    * Compares as: left Contains right ?
* **^=**
    * Compares as: left Begins with right ?
* **=^**
    * Compares as: left Ends with right ?
* **==** 
    * Compares in order of: 
        * left == right as numeric
        * left == right as boolean
        * left == right as string
* **!=** 
    * Compares in order of: 
        * left != right as numeric
        * left != right as boolean
        * left != right as string
* **>**
    * Compares as: left > right as numeric
* **>=**
    * Compares as: left >= right as numeric
* **<**
    * Compares as: left < right as numeric
* **<=**
    * Compares as: left <= right as numeric
* **!**
    * Inverts result of the expression in the used brackets

## Composite Conditions ##

Composite Conditions **available with v0.11** with limited Short-circuit Evaluation (separately for all brackets)

### && and || ###


{% highlight java %}

#[( #[var count] > 10 || ($(isAllow) && !false) ) {
    ...
}
else{
    ...
}]
{% endhighlight %}

{% highlight java %}

#[($(Configuration) ~= Deb && $(count) > 10 || $(Configuration) == "Release" ) {
    ...
}]
{% endhighlight %}

{% highlight java %}

#[( (1 < 2 && 2 == 2 && ( true || ((false || 2 >= 2) && (1 > 7 && true)))) )
{
    #[( #[var count] > 10 || ($(isAllow) && !false) ) {
        ...
    }
    else{
        ...
    }]
}]
{% endhighlight %}


## Examples ##

{% highlight java %}

#[($(Configuration) ~= Deb){
    #[var ver = #[var ver].#[var revBuild]]
}]
{% endhighlight %}

{% highlight java %}

#[(#[Build projects.find("ZenLib").IsBuildable]){
    #[var branchSha1 = #[File sout("git", "rev-parse --short HEAD")]]
}]
{% endhighlight %}

{% highlight java %}

#[(!1 > 2){
    is greater
}]
{% endhighlight %}

### Comparing strings. Case insensitive.

You can use the [MSBuild](../../../MSBuild) core and [String.ToLower](https://msdn.microsoft.com/en-us/library/system.string.tolower.aspx) Method for your variables, for example:

{% highlight java %}

#[( $(left.ToLower()) ^= $(right.ToLower()) ) {
    Yes
}
else{
    No
}]
{% endhighlight %}
