---
layout: doc
title: UserVariableComponent
permalink: /doc/Scripts/SBE-Scripts/Components/UserVariableComponent/
---
# UserVariableComponent

Works with User-Variables

Syntax:
{% highlight java %}

#[var name]
{% endhighlight %}

{% highlight java %}

#[var name = mixed value]
{% endhighlight %}

Samples:
{% highlight java %}

#[var branchSha1 = #[File sout("git", "rev-parse --short HEAD")]]
{% endhighlight %}
{% highlight java %}

#[var ver = #[var ver].#[var revBuild]]
{% endhighlight %}

# Operations

**v0.11.3+**

## Unset variable

Operator the '**-**'(minus). Use this as first symbol for variable name that must be removed:

{% highlight java %}

#[var -name]
{% endhighlight %}

## Default value for variable

You can use this for re/definition variable with default value for compatibility with variables from [MSBuild](../../../MSBuild/) core.

Operator the '**+**'(plus). Use this as first symbol for variable name that must be re/defined by default:
{% highlight java %}

#[var +name]
{% endhighlight %}


# Examples

## Empty string

Allowed in **v0.11.3+**
{% highlight java %}

#[var name =]
{% endhighlight %}

For older versions - you should use 1 or more symbols (whitespace characters or any other value), for example:
{% highlight java %}

#[var name = ]
{% endhighlight %}
** you can trim this if needed later with [MSBuild](../../../MSBuild/)*

## Whitespace characters for values

The all variables should skip the first whitespace characters to set values for compatibility. However, you can use the [MSBuild](../../../MSBuild/) core and static methods, for example:

* [String.Concat Method (Object)](https://msdn.microsoft.com/en-us/library/khca9w90%28v=vs.100%29.aspx)
* * [String.Concat Method (String, String)](https://msdn.microsoft.com/en-us/library/a6d350wd%28v=vs.100%29.aspx)
* [String.Format Method (String, Object, Object)](https://msdn.microsoft.com/en-us/library/zf3d0ccc%28v=vs.100%29.aspx)
* and similar..

Example - only 5 whitespace character as value:
{% highlight java %}

#[var name = $([System.String]::Concat("     "))]
{% endhighlight %}

Others:
{% highlight java %}

#[var name = $([System.String]::Concat("  ")) mixed value]
#[var name = $([System.String]::Format("{0} - {1}", "      ", "test"))]
{% endhighlight %}

*You can escape evaluation of this sequence with a '$' symbols if needed.*

**Or** you can use [MSBuild core](../../../MSBuild/) for work with User-Variables, for example:

{% highlight bash %}

$(name = " ")
$(name = "  - Platform is a $(Platform)  ")
{% endhighlight %}
*For more details: see [MSBuild page](../../../MSBuild/)*

# References

* [Operations with strings]({{site.baseurl}}/{{site.docp}}/Features/Strings)
* [MSBuild](../../../MSBuild)
* [Examples & Features]({{site.baseurl}}/{{site.docp}}/Examples)
