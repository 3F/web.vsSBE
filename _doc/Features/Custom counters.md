---
layout: doc
title: Custom counters
permalink: /doc/Features/Custom counters/
---
# Custom counters

*Should be enabled the [MSBuild](../../Scripts/MSBuild/) & [SBE-Scripts](../../Scripts/SBE-Scripts/).*

## Increment & Decrement Numbers

In examples below, we use the [MSBuild Property Functions](https://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx#BKMK_PropertyFunctions) and you can use any static method or property of these system classes:

* [System.Math](https://msdn.microsoft.com/en-us/library/system.math_methods%28v=vs.100%29.aspx)
* [System.Decimal](https://msdn.microsoft.com/en-us/library/system.decimal_methods%28v=vs.100%29.aspx)
* [System.Double](https://msdn.microsoft.com/en-us/library/system.double_methods%28v=vs.100%29.aspx)
* [System.UInt16](https://msdn.microsoft.com/en-us/library/system.uint16_methods%28v=vs.100%29.aspx)
* [System.UInt32](https://msdn.microsoft.com/en-us/library/system.uint32_methods%28v=vs.100%29.aspx)
* [System.UInt64](https://msdn.microsoft.com/en-us/library/system.uint64_methods%28v=vs.100%29.aspx)
* [System.Int16](https://msdn.microsoft.com/en-us/library/system.int16_methods%28v=vs.100%29.aspx)
* [System.Int32](https://msdn.microsoft.com/en-us/library/system.int32_methods%28v=vs.100%29.aspx)
* [System.Int64](https://msdn.microsoft.com/en-us/library/system.int64_methods%28v=vs.100%29.aspx)
* [System.TimeSpan](https://msdn.microsoft.com/en-us/library/system.timespan_methods%28v=vs.100%29.aspx)
* [System.DateTime](https://msdn.microsoft.com/en-us/library/system.datetime_methods%28v=vs.100%29.aspx)
* [...](https://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx#BKMK_Static)

Example of counter in the range 1 - 10:

{% highlight java %}

#[( $(counter) == "*Undefined*" ) {
    #[var counter = 0]
}]

    $(counter = $([MSBuild]::Add($(counter), 1)))

    #["
        The variable $(counter) should contain the number in the range 1 - 10
    "]

#[( $(counter) >= 10 ) {
    #[var counter = 0]
}]
{% endhighlight %}

Needed a more exotic control ? no problem:
{% highlight java %}

#[($(numX) == "*Undefined*") {
    #[var numX    = 0]
    #[var numY    = 0]
    #[var numYmod = 0]
}]

$(numY    = $([MSBuild]::Add($(numY), 1)))
$(numYmod = $([MSBuild]::Modulo($(numY), 12)))

#[($(numYmod) == 0) {
    $(numX = $([MSBuild]::Add($(numX), 1)))
}]

#[var spec = $(numX).$(numYmod).$(numY)]
{% endhighlight %}

The variable **spec** in example above should contain the next values - ![Value of variable - spec](../../Resources/examples/ver_spec.gif)

# Unique number for team

In example on page [Date & Time](../Date & Time/) now you know that the UTC it does not give any warranty for unique numbers and you should use the our **[CI features](../../CI/)** or something else..:

* You can also use any cryptographic hash function ([sha1](https://en.wikipedia.org/wiki/SHA-1), [MD5](https://en.wikipedia.org/wiki/MD5), [TTH](https://en.wikipedia.org/wiki/Merkle_tree#Tiger_tree_hash) etc.) with your specific unique identification (timestamp + computer identifier + ... and similar), for example:
{% highlight java %}

#[var utcnow = $([System.DateTime]::UtcNow.Ticks)]
#[File sout("cmd", "/C echo \"#[var utcnow]\" | openssl sha1 | sed 's/^.*\s//'")]
{% endhighlight %}
`f80ba367786b1fc075bf04104a69656141202aa5`

**Note:** In example above we use the [openssl](https://www.openssl.org/docs/apps/openssl.html)

* Of course you can use the [Globally Unique Identifier (GUID)](https://en.wikipedia.org/wiki/Globally_unique_identifier) as part of mscorlib.dll - [System.Guid](https://msdn.microsoft.com/en-us/library/system.guid%28v=vs.100%29.aspx):

{% highlight java %}

$([System.Guid]::NewGuid())
{% endhighlight %}
`364c741c-21da-4c85-8d33-abf15b7c9672`

if needed sha1 you can also recalculate this:
{% highlight java %}

#[var guid = $([System.Guid]::NewGuid())]
#[File sout("cmd", "/C echo \"#[var guid]\" | openssl sha1 | sed 's/^.*\s//'")]
{% endhighlight %}
`2580219018d287e84de683f4cd74822ba952c96f`

and similar..

# References #

* [SBE-Scripts](../../Scripts/SBE-Scripts/)
* * [ConditionComponent](../../Scripts/SBE-Scripts/Components/ConditionComponent/)
* [MSBuild](../../Scripts/MSBuild/)
* [Date & Time](../Date & Time/)
* [Automatic Version Numbering for VSIX Package](../../Examples/Version number/)
* [OpenSSL Project](https://openssl.org)
* MSDN:
* * [System.Guid](https://msdn.microsoft.com/en-us/library/system.guid%28v=vs.100%29.aspx)
* [Examples & Features](../../Examples/)


